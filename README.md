# 1stvibe.ai

The fastest path from "I want a website" to a real, deployed site on the internet. Type what you want, see an AI-generated website in ~15 seconds, then follow a guided tutorial to build and deploy your own — no coding experience required.

**Live at [1stvibe.ai](https://1stvibe.ai)**

## Quick Start

```bash
# Clone the repo
git clone <repo-url>
cd 1stvibe

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Fill in: DATABASE_URL, OPENAI_API_KEY, RESEND_API_KEY, NEXTAUTH_SECRET, CRON_SECRET

# Push database schema
npx drizzle-kit push

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## What It Does

1. **Instant demo** — Describe a website, get a real one in ~15 seconds (GPT-4o generates HTML with stock photos)
2. **Guided tutorial** — 19-step walkthrough: install tools, build with AI, push to GitHub, deploy on Vercel
3. **Real deployment** — Users end up with their own code, their own site, their own domain

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| UI | React 19 + Tailwind CSS 4 |
| Database | Neon PostgreSQL + Drizzle ORM |
| Auth | NextAuth v5 + Resend (magic link) |
| AI | OpenAI GPT-4o |
| Deployment | Vercel |

## Project Structure

```
app/                  # Pages + API routes
components/           # React components (demo/, tutorial/, ui/)
lib/                  # Shared utilities (openai, auth, db, ratelimit)
content/tutorial/     # MDX tutorial content (5 sections, 19 steps)
drizzle/              # Database schema
docs/                 # Full project documentation
```

## Key Commands

```bash
npm run dev            # Development server
npm run build          # Production build
npx drizzle-kit push   # Push schema to database
npx drizzle-kit studio # Database browser
```

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `OPENAI_API_KEY` | GPT-4o generation + moderation |
| `RESEND_API_KEY` | Magic link email |
| `NEXTAUTH_URL` | Base URL for auth |
| `NEXTAUTH_SECRET` | Session encryption |
| `CRON_SECRET` | Cron job auth |
| `PIXABAY_API_KEY` | Stock photos (optional) |

## Documentation

Full documentation lives in [`docs/INDEX.md`](docs/INDEX.md) — strategy, architecture, guides, and feature docs.

## Contributing

This project is maintained by two co-founders working in Claude Code. If you're one of us:
- Run `/restart` in Claude Code to get up to speed at the start of a session
- Run `/onboard-partner` to see what your partner has been working on
- See `docs/guides/code-standards.md` for conventions
- See `docs/guides/code-review-checklist.md` before merging
