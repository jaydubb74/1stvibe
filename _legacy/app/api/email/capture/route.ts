import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { emailCaptures } from "@/drizzle/schema";

export async function POST(req: NextRequest) {
  try {
    const { email, source } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Valid email required." }, { status: 400 });
    }

    const db = getDb();
    await db
      .insert(emailCaptures)
      .values({
        id: crypto.randomUUID(),
        email: email.toLowerCase().trim(),
        source: source ?? "tutorial_completion",
      })
      .onConflictDoNothing();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[email/capture]", err);
    return NextResponse.json({ error: "Failed to save email." }, { status: 500 });
  }
}
