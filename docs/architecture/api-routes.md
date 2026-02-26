# API Routes

> Updated: 2026-02-26

## Overview

All API routes live in `app/api/`. Next.js App Router convention: each `route.ts` file exports HTTP method handlers.

---

## POST `/api/demo/generate`

**File:** `app/api/demo/generate/route.ts`

**Purpose:** Generate a new AI-powered website or edit an existing one.

**Auth:** None required (rate-limited by IP). Edit requires session cookie ownership.

### New Generation

**Request:**
```json
{ "prompt": "A landing page for my bakery" }
```

**Response (200):**
```json
{ "id": "a1b2c3d4", "html": "<!DOCTYPE html>..." }
```

**Flow:**
1. Validate prompt (non-empty, max 600 chars)
2. Rate limit check (3/hour per IP)
3. Content moderation (OpenAI Moderation API)
4. Generate HTML (GPT-4o, temperature 0.7, max 4096 tokens)
5. Resolve `{{photo:keyword:WxH}}` placeholders via Pixabay
6. Insert into `demoPages` table (7-day TTL)
7. Set `demo_session` httpOnly cookie

### Edit/Iteration

**Request:**
```json
{ "prompt": "Make the header blue", "demoId": "a1b2c3d4" }
```

**Response (200):**
```json
{ "id": "a1b2c3d4", "html": "<!DOCTYPE html>..." }
```

**Flow:**
1. Validate session cookie contains `demoId`
2. Moderate tweak prompt
3. Generate updated HTML (GPT-4o with existing HTML + change request)
4. Resolve image placeholders
5. Update `demoPages` record, increment `iterationCount`

### Error Responses

| Status | Reason |
|--------|--------|
| 400 | Missing or invalid prompt |
| 403 | Not the owner of this demo |
| 422 | Content moderation flagged |
| 429 | Rate limit exceeded (includes `resetInMinutes`) |
| 500 | Server error |

---

## GET `/api/auth/[...nextauth]`

**File:** `app/api/auth/[...nextauth]/route.ts`

**Purpose:** NextAuth v5 handler for all auth flows.

**Provider:** Resend magic link (passwordless email from `hello@1stvibe.ai`)

**Callbacks:**
- `signIn` — Upserts user in database (creates record with UUID + email on first sign-in)
- `session` — Enriches session with database user ID

**Custom Pages:**
- Sign-in: `/` (homepage)
- Verify email: `/verify-email`

---

## POST `/api/email/capture`

**File:** `app/api/email/capture/route.ts`

**Purpose:** Capture email addresses (newsletter, tutorial completion).

**Auth:** None required.

**Request:**
```json
{ "email": "user@example.com", "source": "tutorial_completion" }
```

**Response (200):**
```json
{ "success": true }
```

**Validation:**
- Email must contain `@`
- Lowercased and trimmed
- Duplicate emails silently ignored (`onConflictDoNothing`)

**Default source:** `"tutorial_completion"` if not specified.

### Error Responses

| Status | Reason |
|--------|--------|
| 400 | Invalid email |
| 500 | Server error |

---

## GET `/api/cron/cleanup`

**File:** `app/api/cron/cleanup/route.ts`

**Purpose:** Delete expired, non-persisted demo pages.

**Auth:** Bearer token (`CRON_SECRET` env var in Authorization header).

**Schedule:** Daily at 3 AM UTC (Vercel Cron, configured in `vercel.json`).

**Logic:**
```sql
DELETE FROM demo_pages WHERE expires_at < NOW() AND persisted = false
```

**Response (200):**
```json
{ "deleted": 42 }
```

### Error Responses

| Status | Reason |
|--------|--------|
| 401 | Missing or invalid bearer token |
| 500 | Server error |

---

## GET `/api/og`

**File:** `app/api/og/route.ts`

**Purpose:** Generate dynamic Open Graph images for social sharing.

**Runtime:** Edge

**Query params:**
- `prompt` — The demo prompt text (truncated to 180 chars)

**Response:** 1200x630 PNG image with gradient background and prompt text.

**Caching:** `public, max-age=86400, stale-while-revalidate=604800` (24h fresh, 7d stale)

---

## Rate Limiting

**File:** `lib/ratelimit.ts`

- Algorithm: In-memory rolling window
- Window: 1 hour
- Limit: 3 generations per IP
- Cleanup: Every 10 minutes (prevents memory bloat)
- IP extraction: `x-forwarded-for` or `x-real-ip` headers

> Note: For multi-region or high-traffic deployments, swap to Upstash Redis or Vercel KV. The interface stays identical.

## Related Docs

- [Architecture Overview](./overview.md) — System diagram and tech stack
- [Database](./database.md) — Schema details
- [Demo Generator](../features/demo-generator.md) — Full generation flow
- [Auth and Email](../features/auth-and-email.md) — Auth system details
