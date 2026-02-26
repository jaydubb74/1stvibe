import { NextRequest, NextResponse } from "next/server";
import { generateDemoPage, moderatePrompt } from "@/lib/openai";
import { checkRateLimit } from "@/lib/ratelimit";
import { getDb } from "@/lib/db";
import { demoPages } from "@/drizzle/schema";
import { generateDemoId } from "@/lib/utils";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

const SESSION_COOKIE = "demo_session";
const DEMO_TTL_HOURS = 168; // 7 days

/** Best-effort IP extraction that works on Vercel and local dev. */
function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "127.0.0.1"
  );
}

export async function POST(req: NextRequest) {
  try {
    const { prompt, demoId } = await req.json();

    // ── Basic validation ────────────────────────────────────────
    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }
    if (prompt.length > 600) {
      return NextResponse.json(
        { error: "Prompt too long (max 600 characters)." },
        { status: 400 }
      );
    }

    const db = getDb();
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE);

    // ── Edit / iteration flow ───────────────────────────────────
    // (Rate limiting and moderation still apply to edits)
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

      // ── Moderation on tweak prompt ────────────────────────────
      const modResult = await moderatePrompt(prompt.trim());
      if (!modResult.safe) {
        return NextResponse.json({ error: modResult.reason }, { status: 422 });
      }

      const updatedHtml = await generateDemoPage(
        prompt.trim(),
        existing[0].html
      );

      await db
        .update(demoPages)
        .set({ html: updatedHtml, prompt: prompt.trim() })
        .where(eq(demoPages.id, demoId));

      // Return the updated HTML so the client can refresh the iframe
      // without a full page reload.
      return NextResponse.json({ id: demoId, html: updatedHtml });
    }

    // ── New generation flow ─────────────────────────────────────

    // Rate limiting — checked BEFORE the expensive OpenAI call
    const ip = getIp(req);
    const rateLimit = checkRateLimit(ip);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: `You've generated ${3} sites this hour. Come back in ${rateLimit.resetInMinutes} minute${rateLimit.resetInMinutes !== 1 ? "s" : ""} to try again!`,
          rateLimited: true,
        },
        { status: 429 }
      );
    }

    // Content moderation
    const modResult = await moderatePrompt(prompt.trim());
    if (!modResult.safe) {
      return NextResponse.json({ error: modResult.reason }, { status: 422 });
    }

    // Generate HTML
    const id = generateDemoId();
    const html = await generateDemoPage(prompt.trim());
    const expiresAt = new Date(Date.now() + DEMO_TTL_HOURS * 60 * 60 * 1000);

    await db.insert(demoPages).values({ id, html, prompt: prompt.trim(), expiresAt });

    // Update session cookie with new owned ID
    const existingOwned: string[] = sessionCookie
      ? JSON.parse(sessionCookie.value || "[]")
      : [];
    const updatedOwned = [...existingOwned, id];

    const response = NextResponse.json({ id, html });
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
      { error: "Failed to generate. Please try again." },
      { status: 500 }
    );
  }
}
