import { getDb, schema } from "@/lib/db";
import { desc, eq } from "drizzle-orm";
import { generateDemoId } from "@/lib/utils";

// ---------------------------------------------------------------------------
// In-memory cache (60 s TTL)
// ---------------------------------------------------------------------------
let cachedPrompt: string | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 60_000;

export function invalidatePromptCache() {
  cachedPrompt = null;
  cacheTimestamp = 0;
}

// ---------------------------------------------------------------------------
// Read the currently-active prompt (cached)
// ---------------------------------------------------------------------------
export async function getActivePrompt(): Promise<string | null> {
  const now = Date.now();
  if (cachedPrompt !== null && now - cacheTimestamp < CACHE_TTL_MS) {
    return cachedPrompt;
  }

  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(schema.systemPrompts)
      .where(eq(schema.systemPrompts.isActive, true))
      .orderBy(desc(schema.systemPrompts.version))
      .limit(1);

    if (rows.length > 0) {
      cachedPrompt = rows[0].content;
      cacheTimestamp = now;
      return rows[0].content;
    }

    return null;
  } catch (err) {
    console.error("[prompt] Failed to read active prompt from DB:", err);
    return null;
  }
}

// ---------------------------------------------------------------------------
// All versions, newest first
// ---------------------------------------------------------------------------
export async function getAllVersions() {
  const db = getDb();
  return db
    .select()
    .from(schema.systemPrompts)
    .orderBy(desc(schema.systemPrompts.version));
}

// ---------------------------------------------------------------------------
// Save a new version (deactivates all others)
// ---------------------------------------------------------------------------
export async function saveNewVersion(content: string, label?: string) {
  const db = getDb();

  // Get next version number
  const latest = await db
    .select({ version: schema.systemPrompts.version })
    .from(schema.systemPrompts)
    .orderBy(desc(schema.systemPrompts.version))
    .limit(1);

  const nextVersion = (latest[0]?.version ?? 0) + 1;

  // Deactivate all active rows
  await db
    .update(schema.systemPrompts)
    .set({ isActive: false })
    .where(eq(schema.systemPrompts.isActive, true));

  // Insert new active row
  const newRow = {
    id: generateDemoId(),
    content,
    label: label ?? `Version ${nextVersion}`,
    version: nextVersion,
    isActive: true,
  };

  await db.insert(schema.systemPrompts).values(newRow);

  invalidatePromptCache();
  return newRow;
}

// ---------------------------------------------------------------------------
// Idempotent first-run seed
// ---------------------------------------------------------------------------
export async function seedIfEmpty(hardcodedPrompt: string) {
  const db = getDb();
  const rows = await db
    .select({ id: schema.systemPrompts.id })
    .from(schema.systemPrompts)
    .limit(1);

  if (rows.length > 0) return;

  await db.insert(schema.systemPrompts).values({
    id: generateDemoId(),
    content: hardcodedPrompt,
    label: "Version 1",
    version: 1,
    isActive: true,
  });

  invalidatePromptCache();
}
