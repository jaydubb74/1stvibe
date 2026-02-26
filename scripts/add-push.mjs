#!/usr/bin/env node

/**
 * Insert a push log entry into the Neon database.
 *
 * Usage:
 *   npx dotenv -e .env.local -- node scripts/add-push.mjs "<author>" "<summary>" ["<commitHash>"]
 *
 * Example:
 *   npx dotenv -e .env.local -- node scripts/add-push.mjs "Michael" "Added dark mode support" "a1b2c3d"
 */

import { neon } from "@neondatabase/serverless";

const [author, summary, commitHash] = process.argv.slice(2);

if (!author || !summary) {
  console.error("Usage: node scripts/add-push.mjs <author> <summary> [commitHash]");
  process.exit(1);
}

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL not set. Run via: npx dotenv -e .env.local -- node scripts/add-push.mjs ...");
  process.exit(1);
}

const sql = neon(process.env.DATABASE_URL);
const id = crypto.randomUUID();

await sql`
  INSERT INTO pushes (id, author, summary, commit_hash, created_at)
  VALUES (${id}, ${author}, ${summary}, ${commitHash || null}, NOW())
`;

console.log(`Push entry logged: ${id}`);
