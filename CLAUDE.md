# 1stvibe.ai — Claude Code guidance

> This repo is in the middle of a **v2 rebuild**. The v1 codebase is archived in `_legacy/` (reference only, not wired into the build). Active v2 design lives in `docs/rebuild/`.

## Orient yourself here first

Before writing any code, read these in order:

1. **[docs/rebuild/persona.md](./docs/rebuild/persona.md)** — who we're building for. Morgan archetype.
2. **[docs/rebuild/prd-notes.md](./docs/rebuild/prd-notes.md)** — what we're building. Product definition with 13 sections covering strategy, user journey, AI teammates, curriculum, integrations, admin, security, and launch scope.
3. **[docs/rebuild/technical-architecture.md](./docs/rebuild/technical-architecture.md)** — how we build it. Full technical blueprint — stack choices, data model, LLM strategy, orchestrator shape, security implementation, testing strategy.
4. **[docs/rebuild/brand-and-style.md](./docs/rebuild/brand-and-style.md)** — visual identity and voice.
5. *(Coming)* **docs/rebuild/engineering-playbook.md** — conventions for how we build (git workflow, Claude Code conventions, testing patterns). Not yet drafted.
6. *(Coming)* **docs/rebuild/build-plan.md** — sequenced implementation plan. Not yet drafted.

## Project at a glance

**What it is:** A paid ($39), AI-coached learning experience that takes a non-engineer professional from "I've heard of vibe coding" to "I shipped a live website I built myself with Claude Code" in a focused 4-6 hour weekend.

**Differentiator:** Six specialized AI teammates (POE / DAX / ED / DOT / BEA / GAL) walk the user through product distillation, dev ops, design, engineering, build, and GTM. We compete on coaching quality, not output quality.

**Defensibility:** A data flywheel — every user interaction makes the next user's teammates sharper.

## Repository structure (v2)

```
1stvibe/
├── docs/
│   ├── rebuild/           # Active v2 design docs (authoritative)
│   └── _legacy/           # Archived v1 docs (reference only)
├── _legacy/               # Archived v1 code (reference only, not built)
├── public/                # Brand assets (logo, fonts)
├── app/                   # (empty — v2 Next.js routes will live here)
├── components/            # (empty — v2 React components)
├── lib/                   # (empty — v2 utilities)
├── drizzle/               # (empty — v2 database schema)
├── content/               # (empty — v2 config-as-code: teammates, curriculum, emails, etc.)
├── packages/              # (planned — @1stvibe/skills npm package)
├── tests/                 # (planned — Vitest + Playwright + Promptfoo)
├── package.json, next.config.ts, tsconfig.json, etc. — carry-forward base configs
└── CLAUDE.md              # this file
```

The empty active directories will fill up as we execute the build plan.

## Tech stack (decided, per technical-architecture.md)

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 + TypeScript strict |
| Styling | Tailwind CSS v4 (CSS-based config) |
| Database | Neon Postgres + Drizzle ORM |
| Auth | Auth.js v5 + Resend magic links |
| AI | Anthropic Claude (Sonnet 4.6 default, Haiku 4.5 for hot path, Opus 4.6/4.7 for rare high-stakes coaching) |
| LLM streaming | Vercel AI SDK v5 |
| Teammate primitive | Anthropic Skills |
| Orchestrator | Lightweight in-house (~300-500 LOC), no LangGraph/CrewAI |
| Payments | Stripe embedded Checkout |
| Observability | PostHog (analytics + replay + flags) + Langfuse (LLM traces) + Sentry (errors) |
| Background jobs | Inngest |
| Rate limiting | Upstash Redis + @upstash/ratelimit |
| Object storage | Vercel Blob |
| MCP server | Co-located at `/api/mcp/[...]` with Streamable HTTP transport |
| Lint + format | Biome |
| Tests | Vitest + Playwright + Promptfoo |

See `technical-architecture.md` §2 for full rationale.

## Key architectural principles

- **TypeScript strict everywhere.** No `any`. Types are documentation.
- **Zod at every boundary.** Env vars, API inputs, webhook payloads, LLM structured outputs — all runtime-validated.
- **Server Actions over REST.** Route handlers reserved for webhooks, MCP, SSE streams, and AI SDK endpoints.
- **Config-as-code.** All product behavior (teammate prompts, role configs, curriculum bullets, pro-tips, email templates) lives in `content/` as git-versioned files.
- **Small files (<300 lines).** Helps Claude Code load and reason fully.
- **Explicit over magical.** Middleware, orchestrator steps, observability — visible in the file where they're used.
- **Single source of truth per decision.** Cross-reference between docs, don't duplicate.

## Non-goals

Called out to prevent scope creep:

- No GraphQL
- No tRPC (Server Actions + Zod is sufficient)
- No microservices
- No LangGraph / CrewAI / AutoGen
- No OpenTelemetry full stack
- No event sourcing
- No custom admin UI framework
- No Docker / Kubernetes

## Brand constraints (unchanged from v1)

Preserved exactly:

- **Primary color:** `bg-brand` (Burnt Orange `#D35400`)
- **Typography:** DM Sans (headings) + Open Sans (body) via `next/font/google`
- **Voice:** Friendly coach — encouraging, approachable, casual, occasionally funny
- **Terminology:** `1stvibe.ai`, `vibe coding`, `Builder`, `Project`

Full details in `docs/rebuild/brand-and-style.md`.

## Working in this repo

### Git workflow

- `main` — still points at live v1 site. Do not touch during rebuild.
- `archive/v1` branch + `v1-final` tag — frozen v1 snapshot for reference / rollback.
- `v2-rebuild` — active development branch for v2. All rebuild work happens here.
- Cutover at launch: merge `v2-rebuild` → `main`.

### Editing product behavior

Per `prd-notes.md §8`, all product-behavior changes flow through git + PR. Specifically:

- Teammate Skills, role configs, project-type configs, curriculum YAMLs, pro-tips, email templates, landing copy — edit in `content/`, open a PR, ship.
- Never add a CRUD UI for product-behavior editing. Claude-Code-editing-in-the-repo is the workflow.

### Operational admin

Per `prd-notes.md §8`, admin UI lives at `/admin/**` (to be built). Scope is deliberate: dashboard, users, signal review queue, moderation, support, audit. Other operational work (session replay, LLM traces, error tracking) lives in third-party tools (PostHog, Langfuse, Sentry).

### Don't touch `_legacy/`

`_legacy/` is preserved v1 code for reference. Never import from it. Never edit files there. If you need a pattern from v1, copy it explicitly into the v2 location and adapt. See `_legacy/README.md`.

## When in doubt

- **Product question?** Check `prd-notes.md`. If unclear, ask.
- **Implementation question?** Check `technical-architecture.md`. If unclear, ask.
- **Style / UI question?** Check `brand-and-style.md`. If unclear, ask.
- **Anything else?** Ask.

Every decision we've made is in one of these docs. Docs + git history are the source of truth, not this file. This file points you at them.
