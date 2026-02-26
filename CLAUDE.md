# 1stvibe.ai

The fastest path from "I want a website" to a real, deployed site. Built for non-technical creators — instant AI demo → guided tutorial → real deployment.

## Quick Reference

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build (catches TS/ESLint errors)
npx drizzle-kit push # Push schema changes to Neon DB
npx drizzle-kit studio # Browse database in Drizzle Studio
```

## Tech Stack

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 (CSS-based config — no tailwind.config.js)
- **Database:** Neon PostgreSQL + Drizzle ORM
- **Auth:** NextAuth v5 beta + Resend magic links
- **AI:** OpenAI GPT-4o (demo generation + moderation)
- **Images:** Pixabay API (stock photos for generated sites)
- **Icons:** Lucide React (always use this, never inline SVGs)
- **Deployment:** Vercel

## Project Structure

```
app/                  # Pages + API routes (Next.js App Router)
components/           # React components (demo/, tutorial/, ui/)
lib/                  # Shared utilities (openai, auth, db, ratelimit)
content/tutorial/     # MDX tutorial content (5 sections, 19 steps)
drizzle/              # Database schema
docs/                 # Full documentation (see docs/INDEX.md)
```

## Key Conventions

- **Tailwind v4** — config is in CSS (`globals.css`), not a JS config file
- **Primary color:** `indigo-600` — see `docs/guides/style-guide.md` for full palette
- **Font:** Geist (via `next/font/google`)
- **Icons:** Lucide React — see style guide for sizing conventions
- **Class merging:** Use `cn()` from `lib/utils.ts` (clsx + tailwind-merge)
- **Database access:** Always use `getDb()` from `lib/db.ts` (lazy singleton)
- **Component location:** `components/` grouped by feature
- **No `any`** — TypeScript strict mode, no unused variables (ESLint enforced)

## Brand Voice (One-Liner)

Friendly coach — encouraging, approachable, casual, occasionally funny. See `docs/strategy/brand-voice.md`.

## Customer (One-Liner)

Non-technical creators who want a website but don't code. See `docs/strategy/customer-profile.md`.

## Full Documentation

See **[docs/INDEX.md](docs/INDEX.md)** for the complete documentation index covering strategy, architecture, guides, and features.
