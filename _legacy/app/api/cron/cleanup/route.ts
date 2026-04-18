import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { demoPages } from "@/drizzle/schema";
import { lt, eq, and } from "drizzle-orm";

// Vercel Cron: runs daily at 3am UTC
// Add to vercel.json: { "crons": [{ "path": "/api/cron/cleanup", "schedule": "0 3 * * *" }] }
export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();

  const db = getDb();
  await db
    .delete(demoPages)
    .where(and(lt(demoPages.expiresAt, now), eq(demoPages.persisted, false)));

  return NextResponse.json({
    success: true,
    deletedAt: now.toISOString(),
  });
}
