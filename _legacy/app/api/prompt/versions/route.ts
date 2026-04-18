import { NextRequest, NextResponse } from "next/server";
import { getAllVersions, saveNewVersion, seedIfEmpty } from "@/lib/prompt";
import { HARDCODED_SYSTEM_PROMPT } from "@/lib/openai";

// GET /api/prompt/versions — list all versions (auto-seeds on first call)
export async function GET() {
  try {
    await seedIfEmpty(HARDCODED_SYSTEM_PROMPT);
    const versions = await getAllVersions();
    return NextResponse.json({ versions });
  } catch (err) {
    console.error("[api/prompt/versions] GET error:", err);
    return NextResponse.json(
      { error: "Failed to load prompt versions" },
      { status: 500 },
    );
  }
}

// POST /api/prompt/versions — save a new version
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { content, label } = body as { content?: string; label?: string };

    if (!content || typeof content !== "string" || content.trim().length === 0) {
      return NextResponse.json(
        { error: "content is required" },
        { status: 400 },
      );
    }

    const created = await saveNewVersion(content.trim(), label);
    return NextResponse.json({ version: created }, { status: 201 });
  } catch (err) {
    console.error("[api/prompt/versions] POST error:", err);
    return NextResponse.json(
      { error: "Failed to save prompt version" },
      { status: 500 },
    );
  }
}
