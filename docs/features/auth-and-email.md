# Auth and Email

> Updated: 2026-02-26

## Authentication

### Stack

- **NextAuth v5** (beta.30) — `lib/auth.ts`
- **Resend** — Magic link email provider
- **From address:** `hello@1stvibe.ai`

### Flow

1. User enters email on sign-in page
2. NextAuth sends magic link via Resend
3. User clicks link in email
4. `signIn` callback fires:
   - Check if user exists in database by email
   - If new: create user record with `crypto.randomUUID()` + email
   - If existing: proceed
5. `session` callback enriches session with database user ID
6. User is authenticated

### Custom Pages

| Page | Route | Purpose |
|------|-------|---------|
| Sign-in | `/` (homepage) | Redirects sign-in to homepage |
| Verify email | `/verify-email` | "Check your email" confirmation page |

### Configuration

```typescript
// lib/auth.ts
NextAuth({
  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: "1stvibe.ai <hello@1stvibe.ai>",
    }),
  ],
  callbacks: {
    signIn: async ({ user }) => { /* upsert user in DB */ },
    session: async ({ session }) => { /* hydrate user.id from DB */ },
  },
  pages: {
    signIn: "/",
    verifyRequest: "/verify-email",
  },
});
```

### Exports

`lib/auth.ts` exports: `{ handlers, auth, signIn, signOut }`

- `handlers` — Used in `app/api/auth/[...nextauth]/route.ts`
- `auth` — Server-side session check
- `signIn` / `signOut` — Server actions

### Environment Variables

| Variable | Purpose |
|----------|---------|
| `NEXTAUTH_URL` | Base URL for callbacks (e.g., `http://localhost:3000`) |
| `NEXTAUTH_SECRET` | Session encryption key (`openssl rand -base64 32`) |
| `RESEND_API_KEY` | Resend API key for sending magic link emails |

## Email Capture

### Endpoint

**POST `/api/email/capture`** — `app/api/email/capture/route.ts`

### Purpose

Capture email addresses for future outreach. Primary use: tutorial completion celebration. Not tied to authentication — this is a simple email collection mechanism.

### Request

```json
{
  "email": "user@example.com",
  "source": "tutorial_completion"
}
```

### Behavior

1. Validate email contains `@`
2. Lowercase and trim
3. Insert into `emailCaptures` table
4. On duplicate: silently ignore (`onConflictDoNothing`)
5. Return `{ success: true }`

### Schema

```
emailCaptures:
  id       — UUID (PK)
  email    — text (unique)
  source   — text (default: "tutorial_completion")
  createdAt — timestamp
```

### Sources

The `source` field tracks where the email was captured:
- `"tutorial_completion"` — User finished the tutorial (default)
- Custom values can be added for future capture points

## Session Management for Demos

Separate from auth, demos use a simpler cookie-based ownership system:

- **Cookie:** `demo_session` (httpOnly, sameSite: lax)
- **Content:** JSON array of demo IDs the user created
- **Purpose:** Determine edit access on `/site/{id}`
- **Max age:** Matches demo TTL (7 days)

This means unauthenticated users can still edit their demos — they just need the same browser session.

## Related Docs

- [Database](../architecture/database.md) — users and emailCaptures schemas
- [API Routes](../architecture/api-routes.md) — Endpoint details
- [Demo Generator](./demo-generator.md) — Demo session cookie details
