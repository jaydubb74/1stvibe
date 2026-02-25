import { NextRequest, NextResponse } from "next/server";
import { generateDemoPage } from "@/lib/openai";
import { getDb } from "@/lib/db";
import { demoPages } from "@/drizzle/schema";
import { generateDemoId } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

const SESSION_COOKIE = "demo_session";
const DEMO_TTL_HOURS = 24;

export async function POST(req: NextRequest) {
  try {
    const { prompt, demoId } = await req.json();

    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    if (prompt.length > 500) {
      return NextResponse.json({ error: "Prompt too long (max 500 chars)." }, { status: 400 });
    }

    const db = getDb();
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE);

    // Edit flow: demoId provided, must own it
    if (demoId) {
      if (!sessionCookie) {
        return NextResponse.json({ error: "Session expired." }, { status: 403 });
      }
      const existing = await db
        .select()
        .from(demoPages)
        .where(eq(demoPages.id, demoId))
        .limit(1);

      if (!existing.length) {
        return NextResponse.json({ error: "Demo not found." }, { status: 404 });
      }

      const ownedIds: string[] = JSON.parse(sessionCookie.value || "[]");
      if (!ownedIds.includes(demoId)) {
        return NextResponse.json({ error: "Not authorized." }, { status: 403 });
      }

      const updatedHtml = await generateDemoPage(prompt.trim(), existing[0].html);
      await db
        .update(demoPages)
        .set({ html: updatedHtml, prompt: prompt.trim() })
        .where(eq(demoPages.id, demoId));

      return NextResponse.json({ id: demoId });
    }

    // New demo
    const id = generateDemoId();
    const html = await generateDemoPage(prompt.trim());
    const expiresAt = new Date(Date.now() + DEMO_TTL_HOURS * 60 * 60 * 1000);

    await db.insert(demoPages).values({
      id,
      html,
      prompt: prompt.trim(),
      expiresAt,
    });

    // Update session cookie
    const existingOwned: string[] = sessionCookie
      ? JSON.parse(sessionCookie.value || "[]")
      : [];
    const updatedOwned = [...existingOwned, id];

    const response = NextResponse.json({ id });
    response.cookies.set(SESSION_COOKIE, JSON.stringify(updatedOwned), {
      httpOnly: true,
      sameSite: "lax",
      maxAge: DEMO_TTL_HOURS * 60 * 60,
      path: "/",
    });

    return response;
  } catch (err) {
    console.error("[demo/generate]", err);
    return NextResponse.json(
      { error: "Failed to generate demo. Please try again." },
      { status: 500 }
    );
  }
}
