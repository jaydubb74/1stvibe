# Database

> Updated: 2026-02-26

## Overview

- **Database:** Neon PostgreSQL (serverless)
- **ORM:** Drizzle ORM 0.45.1
- **Schema file:** `drizzle/schema.ts`
- **Connection:** `lib/db.ts` (lazy singleton via `getDb()`)
- **Migrations:** `npx drizzle-kit push` (push-based, no migration files)

## Schema

### `users`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | text | PK | UUID, generated on sign-in |
| `email` | text | unique | User's email address |
| `createdAt` | timestamp | default: now | Account creation time |
| `checklistProgress` | json | default: [] | Array of completed tutorial step IDs |
| `demoPageId` | text | nullable | Linked demo page (if authenticated) |

### `demoPages`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | text | PK | 8-char alphanumeric (`generateDemoId()`) |
| `html` | text | | Full HTML document of generated site |
| `prompt` | text | | User's original prompt |
| `userId` | text | nullable | Authenticated user who created it |
| `createdAt` | timestamp | default: now | Creation time |
| `expiresAt` | timestamp | | 7 days from creation (DEMO_TTL_HOURS = 168) |
| `persisted` | boolean | default: false | If true, exempt from auto-cleanup |
| `iterationCount` | integer | default: 0 | Number of AI tweaks applied |

### `emailCaptures`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | text | PK | UUID |
| `email` | text | unique | Captured email address |
| `source` | text | default: "tutorial_completion" | Where the email was captured |
| `createdAt` | timestamp | default: now | Capture time |

## Connection Pattern

```typescript
// lib/db.ts — lazy singleton
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "@/drizzle/schema";

let db: ReturnType<typeof drizzle>;

export function getDb() {
  if (!db) {
    const sql = neon(process.env.DATABASE_URL!);
    db = drizzle(sql, { schema });
  }
  return db;
}
```

The lazy pattern prevents build-time failures when `DATABASE_URL` isn't available (e.g., during `next build` on CI).

## Common Queries

**Insert a demo page:**
```typescript
await getDb().insert(demoPages).values({
  id: generateDemoId(),
  html,
  prompt,
  expiresAt: new Date(Date.now() + DEMO_TTL_HOURS * 60 * 60 * 1000),
});
```

**Get a demo by ID:**
```typescript
const demo = await getDb().query.demoPages.findFirst({
  where: eq(demoPages.id, id),
});
```

**Delete expired demos:**
```typescript
await getDb()
  .delete(demoPages)
  .where(
    and(
      lt(demoPages.expiresAt, new Date()),
      eq(demoPages.persisted, false)
    )
  );
```

**Upsert email capture:**
```typescript
await getDb()
  .insert(emailCaptures)
  .values({ id: crypto.randomUUID(), email, source })
  .onConflictDoNothing();
```

## Migration Workflow

We use Drizzle Kit's push-based workflow (no migration files):

```bash
# Push schema changes directly to Neon
npx drizzle-kit push

# Open Drizzle Studio to browse data
npx drizzle-kit studio
```

**Config:** `drizzle.config.ts`
```typescript
{
  schema: "./drizzle/schema.ts",
  dialect: "postgresql",
  out: "./drizzle/migrations",
}
```

### `pushes`

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | text | PK | UUID |
| `author` | text | not null | Name of the person who pushed (from git config) |
| `summary` | text | not null | Human-readable summary of what was shipped |
| `commitHash` | text | nullable | Short git commit hash |
| `createdAt` | timestamp | default: now | When the push was logged |

## Related Docs

- [Architecture Overview](./overview.md) — System diagram
- [API Routes](./api-routes.md) — Endpoints that read/write the database
- [Demo Generator](../features/demo-generator.md) — How demos are stored
- [Auth and Email](../features/auth-and-email.md) — User creation flow
