# Architecture Overview

> Updated: 2026-02-26

## System Diagram

```
Browser (React 19)
  │
  ├── Next.js 15 App Router
  │     ├── Pages (/, /tutorial/[stepId], /site/[id], /about, /verify-email)
  │     └── API Routes
  │           ├── POST /api/demo/generate  → OpenAI GPT-4o → Pixabay → Neon DB
  │           ├── GET  /api/auth/[...nextauth] → Resend (magic link email)
  │           ├── POST /api/email/capture   → Neon DB
  │           ├── GET  /api/cron/cleanup    → Neon DB (delete expired demos)
  │           └── GET  /api/og              → Edge Runtime (OG image generation)
  │
  ├── Neon PostgreSQL (serverless)
  │     ├── users
  │     ├── demoPages
  │     └── emailCaptures
  │
  └── External Services
        ├── OpenAI (GPT-4o generation + moderation)
        ├── Pixabay (stock photos for generated sites)
        ├── Resend (transactional email for magic links)
        └── OneSignal (push notifications)
```

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 15.3.9 |
| UI | React | 19.2.3 |
| Language | TypeScript | 5 |
| Styling | Tailwind CSS | 4 (CSS-based config) |
| Database | Neon PostgreSQL | Serverless |
| ORM | Drizzle ORM | 0.45.1 |
| Auth | NextAuth | 5.0.0-beta.30 |
| Email | Resend | Magic link provider |
| AI | OpenAI SDK | 6.25.0 (GPT-4o) |
| Images | Pixabay API | Stock photo search |
| Icons | Lucide React | 0.575.0 |
| Content | MDX | @next/mdx 15.1.7 |
| Deployment | Vercel | Cron, Edge Runtime |

## Key Directories

```
app/                    # Next.js pages and API routes
  api/                  # Server-side API endpoints
  site/[id]/            # Dynamic demo viewer pages
  tutorial/[stepId]/    # Tutorial step pages
components/             # React components
  demo/                 # DemoForm and related
  tutorial/             # TutorialLayout, ChecklistPane, StepNav, StepContent
  ui/                   # Button and shared UI primitives
lib/                    # Shared utilities
  openai.ts             # GPT-4o generation, moderation, image resolution
  pexels.ts             # Pixabay API client (filename is legacy)
  ratelimit.ts          # IP-based rate limiting (in-memory)
  auth.ts               # NextAuth configuration
  db.ts                 # Drizzle DB singleton
  utils.ts              # cn(), generateDemoId(), formatDate()
content/tutorial/       # MDX tutorial content
  steps.ts              # Tutorial structure (5 sections, 19 steps)
  section-1/ ... section-5/  # MDX files per step
drizzle/                # Database
  schema.ts             # Table definitions
types/                  # TypeScript interfaces
public/                 # Static assets
```

## Request Flow: Demo Generation

1. User types a prompt in `DemoForm` on the homepage
2. Client sends `POST /api/demo/generate` with `{ prompt }`
3. Server extracts IP from `x-forwarded-for` header
4. **Rate limit check** — 3 generations per hour per IP (in-memory rolling window)
5. **Content moderation** — OpenAI Moderation API (fail-open on API errors)
6. **HTML generation** — GPT-4o with system prompt (~64 lines of rules)
7. **Image resolution** — Regex extracts `{{photo:keyword:WxH}}` placeholders, batch-searches Pixabay, falls back to picsum.photos
8. **Database insert** — Store in `demoPages` table with 7-day TTL
9. **Session cookie** — Set `demo_session` httpOnly cookie with owned demo IDs
10. **Response** — Return `{ id, html }`, client navigates to `/site/{id}`

## Environment Variables

| Variable | Purpose | Required |
|----------|---------|----------|
| `NEXTAUTH_URL` | Base URL for auth callbacks | Yes |
| `NEXTAUTH_SECRET` | Session encryption key | Yes |
| `DATABASE_URL` | Neon PostgreSQL connection string | Yes |
| `OPENAI_API_KEY` | GPT-4o and moderation API | Yes |
| `RESEND_API_KEY` | Magic link email sending | Yes |
| `CRON_SECRET` | Bearer token for cron endpoint | Yes |
| `PIXABAY_API_KEY` | Stock photo search | Optional (falls back to picsum) |

## Deployment

- **Hosting:** Vercel
- **Database:** Neon serverless PostgreSQL
- **Cron:** Vercel Cron runs cleanup daily at 3 AM UTC
- **Edge Runtime:** Used for `/api/og` (OG image generation)
- **Domain:** 1stvibe.ai

## Related Docs

- [API Routes](./api-routes.md) — Detailed endpoint documentation
- [Database](./database.md) — Schema and Drizzle patterns
- [Demo Generator](../features/demo-generator.md) — Full demo generation flow
- [Code Standards](../guides/code-standards.md) — TypeScript conventions
