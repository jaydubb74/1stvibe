import { getDb } from "@/lib/db";
import { pushes } from "@/drizzle/schema";
import { desc } from "drizzle-orm";
import PushFeed from "./PushFeed";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Push Log — 1stvibe.ai",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function PushesPage() {
  const db = getDb();
  const entries = await db
    .select()
    .from(pushes)
    .orderBy(desc(pushes.createdAt));

  return (
    <PushFeed
      entries={entries.map((e) => ({
        id: e.id,
        author: e.author,
        summary: e.summary,
        commitHash: e.commitHash,
        createdAt: e.createdAt.toISOString(),
      }))}
    />
  );
}
