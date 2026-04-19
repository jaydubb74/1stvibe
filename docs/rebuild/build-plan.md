# 1stvibe v2 Build Plan

> Sequenced implementation plan for the v2 rebuild. Translates the product + technical + engineering-playbook decisions into a concrete order of operations. The deliverable of each numbered ticket is a Linear issue — titles and descriptions here are the seed material.
>
> Companion docs: [prd-notes.md](./prd-notes.md) (what), [technical-architecture.md](./technical-architecture.md) (how, system), [engineering-playbook.md](./engineering-playbook.md) (how, process).

**Last updated:** 2026-04-18
**Status:** pre-build plan; will become Linear tickets once the Linear MCP is fully wired

---

## Contents

1. [How to Read This Plan](#1-how-to-read-this-plan)
2. [Milestones and Gates](#2-milestones-and-gates)
3. [Phase A — Foundation (scaffold + tooling)](#3-phase-a--foundation)
4. [Phase B — Auth + Data Model + Basic UI Shell](#4-phase-b--auth--data-model--basic-ui-shell)
5. [Phase C — Orchestrator + First Teammate (POE / Phase 1 Spark)](#5-phase-c--orchestrator--first-teammate)
6. [Phase D — Paywall, Payment, Expense UX](#6-phase-d--paywall-payment-expense-ux)
7. [Phase E — Dev Ops Phase 2 + Integrations (GitHub App, Vercel, MCP, Skills)](#7-phase-e--dev-ops-phase-2--integrations)
8. [Phase F — Curriculum Generation + Remaining Teammates](#8-phase-f--curriculum-generation--remaining-teammates)
9. [Phase G — Gallery + Completion + Wrap-up Email](#9-phase-g--gallery--completion--wrap-up-email)
10. [Phase H — Admin + Telemetry + Moderation](#10-phase-h--admin--telemetry--moderation)
11. [Phase I — Polish, Evals Graduation, Launch Prep](#11-phase-i--polish-evals-graduation-launch-prep)
12. [Fast-follow Parking Lot](#12-fast-follow-parking-lot)
13. [Ticket Creation Process](#13-ticket-creation-process)

---

## 1. How to Read This Plan

### 1.1 Structure

Work is organized into **phases** (A through I). Phases are roughly sequential but with known parallelism points. Each phase contains **tickets** — Linear issue seeds sized at 2-6 hours of Claude Code time each.

### 1.2 Ticket format

Every ticket below includes:

- **Title** (becomes Linear issue title)
- **Description** (summary of what needs to happen)
- **Acceptance criteria** (behavior-focused; what "done" looks like)
- **Risk tier** (`risk:high`, `area:*` labels)
- **Depends on** (prior tickets that must be complete)
- **Files likely touched** (hint for Plan Mode)

### 1.3 Risk tiering reminder

Per [engineering-playbook §5](./engineering-playbook.md#5-risk-tiers), `risk:high` tickets:
- Require Plan Mode
- Human-written or human-reviewed tests first
- `security-review` skill runs before merge
- Feature branch + PR (never direct commit)

All other tickets default to standard process — direct commit to `v2-rebuild` unless you choose otherwise.

### 1.4 Explicit non-scope for v1

Per PRD §11.2, these are **deferred to fast-follow**, not part of this plan:

- Generic landing pages beyond homepage
- Referral landing page templates + metadata-encoded links
- Cohort-lite pods
- Gallery comments
- Follow / subscribe / notifications
- In-product aggregate coaching
- Living gallery crawler + AI-summary updates
- Agent-led founder interviews
- Full graduation kit (Linear workspace auto-creation, advanced resources, etc.)
- Remaining 3 roles (Sales, Finance, Account Management)
- Pre-provisioning GitHub / Vercel accounts
- Chrome extension overlays
- "Refresh this lesson" button
- Thumbs-up (v1 ships thumbs-down only)
- Custom admin dashboard beyond PostHog
- Team SKUs, advanced courses, comp codes

See [§12 Fast-follow Parking Lot](#12-fast-follow-parking-lot) for the canonical list.

### 1.5 Pre-build rehearsal — skipped

Per user decision, we're skipping the 3-5 day vertical-slice rehearsal. Architectural surprises will surface during Phase A–C work and we'll adapt. The rehearsal is still available as a fallback if we hit a wall.

---

## 2. Milestones and Gates

Five milestones with go/no-go review points. Each is a natural pause to verify the architecture is working and pricing, positioning, and UX are still the right calls.

| M# | Name | Gate check | Expected elapsed |
|---|---|---|---|
| **M1** | Auth + Empty App Shell | Can sign in, land on empty /app page, all telemetry firing | ~week 1 |
| **M2** | First Working Teammate | Unauthenticated user can have a Phase 1 Spark conversation with POE and see an artifact | ~week 2-3 |
| **M3** | Paid Flow End-to-End | Sign in → Phase 1 Spark → pay via Stripe → land on Phase 2 setup page | ~week 3-4 |
| **M4** | Full Curriculum Works | Paid user can complete all 7 phases with all 6 teammates and reach "Ship & Share" | ~week 6-8 |
| **M5** | Production Ready | Admin UI, moderation queue, DSAR flow, evals graduated to blocking, security review done | ~week 8-10 |

**Go/no-go at each milestone:** pause for 1-2 days. Exercise the milestone manually. Identify what's rough. Fix critical issues before proceeding; log non-critical as backlog.

**Launch gate (after M5):** engineer-friend review of the full product. Fix blockers. Cut over `v2-rebuild` → `main`.

---

## 3. Phase A — Foundation

**Goal:** project scaffolding, tooling, CI, base config. No product functionality yet.

**Milestone:** none yet — foundation only.

### A1 — Initialize v2 Next.js project structure

**Description:** Scaffold the v2 Next.js 15 app in the empty active directories (`app/`, `components/`, `lib/`, etc.). Carry forward `package.json`, `next.config.ts`, `tsconfig.json` as starting points; iterate them for the new stack.

**Acceptance criteria:**
- [ ] `pnpm install` succeeds
- [ ] `pnpm dev` starts a Next.js dev server
- [ ] `localhost:3000` shows a placeholder home page (just "1stvibe v2" for now)
- [ ] TypeScript strict mode enabled
- [ ] No build errors, no lint errors
- [ ] Biome configured (replaces `eslint.config.mjs` archived in `_legacy/`)

**Risk tier:** standard
**Labels:** `area:devex`, `kind:chore`
**Depends on:** —
**Files likely touched:** `package.json`, `next.config.ts`, `tsconfig.json`, `biome.json`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `postcss.config.mjs`

### A2 — Configure Tailwind v4 with brand tokens

**Description:** Set up Tailwind v4 CSS config with the brand tokens from `brand-and-style.md` §4.5 and §10.1 (teammate colors). Ensure DM Sans + Open Sans are wired via `next/font/google` per §5.1.

**Acceptance criteria:**
- [ ] `globals.css` imports Tailwind v4
- [ ] `@theme inline` block defines: `--color-brand`, `--color-brand-dark`, `--color-brand-50`, `--color-amber`, `--color-amber-50`, `--color-charcoal`
- [ ] Teammate tokens defined: `--color-teammate-poe/dax/ed/dot/bea/gal` per §10.1
- [ ] DM Sans + Open Sans load via `next/font/google` in `app/layout.tsx`
- [ ] Placeholder home page uses a brand-colored button (smoke test)

**Risk tier:** standard
**Labels:** `area:devex`, `kind:chore`
**Depends on:** A1
**Files likely touched:** `app/globals.css`, `app/layout.tsx`, `tailwind.config.* (if applicable to v4)`

### A3 — Set up Zod-validated env module

**Description:** Implement `lib/env.ts` per tech arch §11.4. All env vars validated at boot; malformed config fails at module load, not at runtime.

**Acceptance criteria:**
- [ ] `lib/env.ts` exports `env` validated via Zod
- [ ] Unknown env vars are ignored; missing required vars throw at boot
- [ ] `.env.local.example` updated with all required vars for v2
- [ ] `.env.local` never imported directly elsewhere in code — only via `lib/env.ts`

**Risk tier:** `risk:high` (secrets handling)
**Labels:** `area:devex`, `kind:chore`, `risk:high`
**Depends on:** A1
**Files likely touched:** `lib/env.ts`, `.env.local.example`

### A4 — Biome config + CI workflow

**Description:** Configure Biome (replaces ESLint + Prettier). Set up GitHub Actions CI that runs typecheck, lint, and placeholder tests.

**Acceptance criteria:**
- [ ] `biome.json` configured with our rules (type-aware linting enabled)
- [ ] `pnpm biome check .` passes clean
- [ ] `.github/workflows/ci.yml` with jobs for: typecheck, lint, schema-check
- [ ] CI fails on TypeScript errors
- [ ] CI fails on Biome violations
- [ ] `_legacy/**` excluded from all checks

**Risk tier:** standard
**Labels:** `area:devex`, `kind:chore`
**Depends on:** A1
**Files likely touched:** `biome.json`, `.github/workflows/ci.yml`, `tsconfig.json` (exclude `_legacy`)

### A5 — Vitest + Playwright + Promptfoo scaffolding

**Description:** Install testing tools and set up directory structure. No tests to write yet; just the scaffolding.

**Acceptance criteria:**
- [ ] Vitest installed and configured; `pnpm test:unit` runs (no tests yet, passes)
- [ ] Playwright installed; `pnpm test:e2e` scaffolded against Vercel preview URL
- [ ] Promptfoo installed; `tests/evals/` directory with a placeholder YAML
- [ ] MSW installed for HTTP mocking
- [ ] `tests/setup.ts` exists with MSW server setup pattern

**Risk tier:** standard
**Labels:** `area:devex`, `kind:chore`
**Depends on:** A1
**Files likely touched:** `package.json`, `vitest.config.ts`, `playwright.config.ts`, `tests/setup.ts`, `tests/evals/promptfoo.yaml`

### A6 — Secrets pre-commit hooks

**Description:** Install `gitleaks` (or equivalent) as a pre-commit hook. Block commits containing secret patterns.

**Acceptance criteria:**
- [ ] `.husky/` or similar pre-commit hook configured
- [ ] Hook runs `gitleaks protect --staged` on every commit
- [ ] Test commit containing a fake `sk-ant-...` string is blocked
- [ ] `.env` files explicitly blocked from commit

**Risk tier:** `risk:high` (security infrastructure)
**Labels:** `area:devex`, `kind:chore`, `risk:high`
**Depends on:** A1
**Files likely touched:** `.husky/pre-commit`, `package.json`, `gitleaks.toml` (if config needed)

### A7 — Security headers middleware

**Description:** Implement `middleware.ts` with response headers per tech arch §11.3. CSP, HSTS, X-Frame-Options, etc.

**Acceptance criteria:**
- [ ] `middleware.ts` applies security headers to all responses
- [ ] CSP appropriately configured (allows self, Stripe, PostHog, Vercel; blocks everything else)
- [ ] HSTS header with preload
- [ ] Test: curl localhost and verify all headers present

**Risk tier:** `risk:high`
**Labels:** `area:devex`, `kind:feature`, `risk:high`
**Depends on:** A1
**Files likely touched:** `middleware.ts`, `lib/security/headers.ts`

---

## 4. Phase B — Auth + Data Model + Basic UI Shell

**Goal:** Users can sign in; base DB schema in place; `/app` route gated behind auth.

**Milestone:** **M1 — Auth + Empty App Shell.** Can sign in, land on `/app`, all telemetry fires.

### B1 — Drizzle + Neon initialization

**Description:** Install Drizzle ORM, configure connection to Neon, initialize `drizzle/` directory.

**Acceptance criteria:**
- [ ] `drizzle.config.ts` configured
- [ ] `drizzle/schema/` directory scaffolded
- [ ] `lib/db/index.ts` exports a `getDb()` singleton
- [ ] `npx drizzle-kit studio` opens the database browser
- [ ] Connection to Neon dev branch works

**Risk tier:** `risk:high` (schema work)
**Labels:** `area:devex`, `kind:chore`, `risk:high`
**Depends on:** A3
**Files likely touched:** `drizzle.config.ts`, `drizzle/schema/index.ts`, `lib/db/index.ts`

### B2 — Auth.js v5 + Drizzle adapter + Resend provider

**Description:** Implement Auth.js v5 with `@auth/drizzle-adapter` and the Resend magic-link provider. Email magic links working end-to-end.

**Acceptance criteria:**
- [ ] `app/api/auth/[...nextauth]/route.ts` configured
- [ ] Drizzle adapter installed and pointed at `users`, `accounts`, `sessions`, `verificationTokens` tables
- [ ] Resend provider sends magic-link email from `hello@1stvibe.ai`
- [ ] Sign-in flow: email → receive link → click → authenticated
- [ ] Session persists across page reloads
- [ ] `auth()` helper usable in Server Actions

**Risk tier:** `risk:high`
**Labels:** `area:auth`, `kind:feature`, `risk:high`
**Depends on:** B1
**Files likely touched:** `app/api/auth/[...nextauth]/route.ts`, `lib/auth.ts`, `drizzle/schema/auth.ts`, `middleware.ts`

### B3 — Core schema tables (users, journeys, sessions)

**Description:** Implement the foundational tables per tech arch §4: `users` (extended), `paidJourneys`, `learningSessions`. Plus enums.

**Acceptance criteria:**
- [ ] `drizzle/schema/auth.ts` has `users` with role enum, stripeCustomerId, expenseEmailAlias
- [ ] `drizzle/schema/journey.ts` has `paidJourneys`, `learningSessions`
- [ ] pgEnums defined: `userRoleEnum`, `paymentStatusEnum`, `phaseEnum`
- [ ] `drizzle/_types.ts` exports friendly types (`User`, `LearningSession`, etc.)
- [ ] `drizzle-kit generate` produces clean migration
- [ ] Migration applied to dev DB successfully

**Risk tier:** `risk:high` (schema)
**Labels:** `area:auth`, `area:orchestrator`, `kind:feature`, `risk:high`
**Depends on:** B1
**Files likely touched:** `drizzle/schema/auth.ts`, `drizzle/schema/journey.ts`, `drizzle/schema/index.ts`, `drizzle/_types.ts`, `drizzle/migrations/0001_*.sql`

### B4 — Authorized DB wrapper

**Description:** Implement `lib/db/authorized.ts` — the typed wrapper that requires `userId` and applies `where(userId = ...)` filters per tech arch §10.2.

**Acceptance criteria:**
- [ ] `AuthorizedDb` class with methods for each core resource
- [ ] `getAuthorizedDb()` helper resolves from Auth.js session
- [ ] Admin role bypasses user filter (with audit log entry)
- [ ] Unit tests verify non-admin users cannot read other users' rows

**Risk tier:** `risk:high`
**Labels:** `area:auth`, `kind:feature`, `risk:high`
**Depends on:** B2, B3
**Files likely touched:** `lib/db/authorized.ts`, `tests/unit/lib/db/authorized.test.ts`

### B5 — Base UI shell — homepage + /app layout

**Description:** Implement the marketing homepage (simple — conversion-oriented per PRD §3.1) and the authenticated `/app` layout per brand-and-style §10.7.

**Acceptance criteria:**
- [ ] `app/(marketing)/page.tsx` — homepage with minimal copy, sign-in CTA
- [ ] `app/(app)/layout.tsx` — 2-panel layout shell (left nav placeholder, right content)
- [ ] `/app` redirects to sign-in if not authenticated
- [ ] Authenticated user lands on `/app` with the 2-panel shell
- [ ] No teammate, no checklist, no content — just the empty shell

**Risk tier:** standard
**Labels:** `area:devex`, `kind:feature`
**Depends on:** B2
**Files likely touched:** `app/(marketing)/page.tsx`, `app/(app)/layout.tsx`, `app/(app)/page.tsx`, `components/ui/Button.tsx`, `middleware.ts`

### B6 — PostHog + Sentry initialization

**Description:** Install and initialize PostHog and Sentry per tech arch §13. Zod-validated `CaptureEventSchema` pattern. Capture a `session.start` event on every page load.

**Acceptance criteria:**
- [ ] PostHog initialized server-side and client-side
- [ ] Sentry wrapped around Next.js per their guide
- [ ] `lib/observability/posthog.ts` exports `capture()` with schema validation
- [ ] `lib/observability/sentry.ts` exported
- [ ] Sentry release tracking tied to git SHA
- [ ] Test: triggering an error on a test route shows up in Sentry
- [ ] Test: page load fires `session.start` in PostHog

**Risk tier:** standard
**Labels:** `area:devex`, `kind:feature`
**Depends on:** B5
**Files likely touched:** `lib/observability/posthog.ts`, `lib/observability/sentry.ts`, `sentry.server.config.ts`, `sentry.client.config.ts`, `app/layout.tsx`

### B7 — Basic `lib/logger` with pino

**Description:** Structured logger via pino. Trace-correlated with Sentry.

**Acceptance criteria:**
- [ ] `lib/observability/log.ts` exports a pino logger
- [ ] Log lines are JSON with `{env, service, level, trace_id, user_id, session_id}` fields
- [ ] Log level configurable via env (default info in prod, debug in dev)
- [ ] Test: error log line shows in Sentry

**Risk tier:** standard
**Labels:** `area:devex`, `kind:chore`
**Depends on:** B6
**Files likely touched:** `lib/observability/log.ts`

### 🎯 Milestone M1 — Auth + Empty App Shell

**Gate check:** Can sign in with magic link. Land on `/app`. Telemetry events firing in PostHog. Logs flowing. Errors going to Sentry.

---

## 5. Phase C — Orchestrator + First Teammate

**Goal:** POE teammate in Phase 1 Spark mode. Pre-paywall conversation that produces a spark spec. **This is where the product actually starts existing.**

**Milestone:** **M2 — First Working Teammate.** User can have a Phase 1 Spark conversation with POE and see an artifact.

### C1 — Anthropic SDK + Vercel AI SDK setup

**Description:** Install `@anthropic-ai/sdk` + `ai` (Vercel AI SDK v5) + `@ai-sdk/anthropic`. Wire up `lib/ai/call.ts` — the defensive wrapper that all LLM calls go through.

**Acceptance criteria:**
- [ ] Dependencies installed; `ANTHROPIC_API_KEY` validated in `lib/env.ts`
- [ ] `lib/ai/call.ts` implements the defensive wrapper per tech arch §5.6
- [ ] Includes automatic user-input wrapping (`<user_message>...</user_message>`)
- [ ] Includes Langfuse trace emission (see C2)
- [ ] Includes cost-tracking (updates `learningSessions.totalTokensUsed`)
- [ ] Test: simple call to Haiku 4.5 returns a response and logs the trace

**Risk tier:** `risk:high`
**Labels:** `area:orchestrator`, `kind:feature`, `risk:high`
**Depends on:** B3
**Files likely touched:** `lib/ai/call.ts`, `lib/ai/model-policy.ts`, `lib/ai/__mocks__/anthropic.ts`

### C2 — Langfuse integration

**Description:** Install Langfuse SDK. Auto-instrument every LLM call via `lib/ai/call.ts`.

**Acceptance criteria:**
- [ ] `lib/observability/langfuse.ts` exports `langfuse` singleton
- [ ] `LANGFUSE_*_KEY` env vars validated
- [ ] Every `lib/ai/call.ts` invocation creates a trace with session/user/task metadata
- [ ] Token usage (including cache reads) recorded
- [ ] Langfuse dashboard shows real traces

**Risk tier:** standard
**Labels:** `area:orchestrator`, `kind:feature`
**Depends on:** C1
**Files likely touched:** `lib/observability/langfuse.ts`, `lib/ai/call.ts`

### C3 — Model policy + prompt assembly

**Description:** Implement `pickModel()` per tech arch §5.1 and prompt assembly per §5.2. Cacheable prefix structure.

**Acceptance criteria:**
- [ ] `lib/ai/model-policy.ts` exports `pickModel(task: TeammateTask): ModelId`
- [ ] `lib/ai/prompts/assemble.ts` builds the layered prompt (coaching-principles + persona + journey brief + conversation)
- [ ] Cache breakpoints correctly placed via `cache_control` on stable sections
- [ ] Test: prompt assembly for POE includes both shared coaching + POE persona

**Risk tier:** `risk:high`
**Labels:** `area:orchestrator`, `area:teammates`, `kind:feature`, `risk:high`
**Depends on:** C1
**Files likely touched:** `lib/ai/model-policy.ts`, `lib/ai/prompts/assemble.ts`

### C4 — Teammate registry + content loader

**Description:** Implement `lib/orchestrator/registry.ts` that loads teammate SKILL.md files from `content/teammates/` at boot. Zod-validate the structure.

**Acceptance criteria:**
- [ ] `content/teammates/poe/SKILL.md` exists with POE's base persona
- [ ] `content/teammates/shared/coaching-principles.md` exists with the shared prefix
- [ ] `lib/orchestrator/registry.ts` loads all teammates into a Map at boot
- [ ] Zod schema validates teammate metadata (id, name, role, phases, etc.)
- [ ] Malformed YAML or missing fields cause boot-time failure

**Risk tier:** standard
**Labels:** `area:orchestrator`, `area:teammates`, `area:content`, `kind:feature`
**Depends on:** C3
**Files likely touched:** `lib/orchestrator/registry.ts`, `content/teammates/poe/SKILL.md`, `content/teammates/shared/coaching-principles.md`, `content/teammates/poe/adjustments/returning-user.md`

### C5 — Conversation + turn schema

**Description:** Implement `conversations` and `conversationTurns` tables per tech arch §4. Append-only turn log.

**Acceptance criteria:**
- [ ] `drizzle/schema/conversation.ts` defines both tables
- [ ] `turnRoleEnum` defined
- [ ] Migration applied
- [ ] `lib/conversation/persist.ts` helpers for creating conversation + appending turns
- [ ] Test: simulated conversation persists cleanly, turns retrievable in order

**Risk tier:** `risk:high` (schema)
**Labels:** `area:orchestrator`, `kind:feature`, `risk:high`
**Depends on:** B3, C1
**Files likely touched:** `drizzle/schema/conversation.ts`, `lib/conversation/persist.ts`, migrations

### C6 — Streaming chat route for POE

**Description:** Implement `app/api/chat/[teammate]/route.ts` using Vercel AI SDK v5's `streamText`. Wires to `lib/ai/call.ts`.

**Acceptance criteria:**
- [ ] Route accepts POST with `{ messages, sessionId }`
- [ ] Authorizes request (user owns the sessionId)
- [ ] Calls POE via the prompt assembly + call wrapper
- [ ] Streams response back using AI SDK's `toDataStreamResponse()`
- [ ] On completion: persists turn, updates token count
- [ ] Test: client-side `useChat` hook shows streaming response from POE

**Risk tier:** `risk:high`
**Labels:** `area:teammates`, `area:orchestrator`, `kind:feature`, `risk:high`
**Depends on:** C4, C5, B4
**Files likely touched:** `app/api/chat/[teammate]/route.ts`, `actions/phase.ts`

### C7 — Phase 1 Spark UI — the conversation happens

**Description:** Implement the client-side UI for Phase 1 Spark. 2-panel layout with POE's conversation in the main panel (State 1 per brand §10.2).

**Acceptance criteria:**
- [ ] `app/(app)/phase/phase_1_spark/page.tsx` exists
- [ ] Unauthenticated users redirected to sign-in; sign-in continues to this page
- [ ] On first visit, POE greets with opener per PRD §3.2
- [ ] Morgan can reply; POE streams back
- [ ] Structured choice UI components (role picker, project frame picker)
- [ ] Conversation persists across page reload (reads from `conversations` table)

**Risk tier:** standard
**Labels:** `area:teammates`, `kind:feature`
**Depends on:** C6, B5
**Files likely touched:** `app/(app)/phase/phase_1_spark/page.tsx`, `components/teammate-chat/ChatBubble.tsx`, `components/learning-env/ContentPanel.tsx`

### C8 — Artifacts schema + spark spec generation

**Description:** Implement `artifacts` table. After enough conversation, POE generates `01-project-spark.md` as an artifact.

**Acceptance criteria:**
- [ ] `drizzle/schema/artifact.ts` defines `artifacts` + `artifactKindEnum`
- [ ] `lib/orchestrator/artifacts.ts` has `writeArtifact()` Server Action
- [ ] POE's conversation, when it hits the "close" phase, prompts POE to generate the spark spec via structured output (Zod-validated)
- [ ] Artifact saved to DB
- [ ] Test: complete Phase 1 conversation produces a spark spec artifact

**Risk tier:** `risk:high` (new schema + LLM output validation)
**Labels:** `area:orchestrator`, `kind:feature`, `risk:high`
**Depends on:** C5, C7
**Files likely touched:** `drizzle/schema/artifact.ts`, `lib/orchestrator/artifacts.ts`, `content/teammates/poe/SKILL.md` (close-phase instructions)

### C9 — Artifact display in UI

**Description:** Implement the artifact materialization UI per brand §10.6. Card slides in with celebratory treatment.

**Acceptance criteria:**
- [ ] When artifact created, UI shows a slide-in card with teammate accent border
- [ ] Card shows artifact title + preview (first ~3 lines)
- [ ] User can click to expand / view full
- [ ] Micro-confetti burst on first appearance
- [ ] Framer Motion installed + spring physics used

**Risk tier:** standard
**Labels:** `area:teammates`, `kind:feature`
**Depends on:** C8, A2
**Files likely touched:** `components/artifacts/ArtifactCard.tsx`, `lib/celebration.ts`

### C10 — Seed POE content

**Description:** Write the initial content for POE — coaching principles, persona, returning-user adjustments, opening questions, structured-choice options.

**Acceptance criteria:**
- [ ] `content/teammates/shared/coaching-principles.md` is ~2000 tokens of the shared prefix
- [ ] `content/teammates/poe/SKILL.md` is ~2000 tokens of POE's persona
- [ ] `content/teammates/poe/adjustments/returning-user.md` is ~500 tokens
- [ ] Content incorporates: defensive prompt clauses (injection mitigation), problem-distillation coaching principles, MVP-steering rules from PRD §4.5
- [ ] Smoke test: running a real Phase 1 Spark conversation with this content produces a coherent spark spec

**Risk tier:** standard (no code)
**Labels:** `area:content`, `area:teammates`, `kind:copy`
**Depends on:** C4
**Files likely touched:** `content/teammates/poe/*`, `content/teammates/shared/*`

### 🎯 Milestone M2 — First Working Teammate

**Gate check:** sign in → land on Phase 1 Spark page → have a coherent conversation with POE → see spark spec artifact materialize.

---

## 6. Phase D — Paywall, Payment, Expense UX

**Goal:** Morgan can convert from Phase 1 Spark to paid. Receipt + expense alias flow works.

**Milestone:** **M3 — Paid Flow End-to-End.**

### D1 — Stripe setup + checkout action

**Description:** Install Stripe SDK, create Price in Stripe dashboard ($39 one-time), implement `actions/billing.ts` with `createCheckoutSession()`.

**Acceptance criteria:**
- [ ] Stripe Price ID exists in dashboard
- [ ] `STRIPE_SECRET_KEY` + `STRIPE_PRICE_ID_STANDARD` + `STRIPE_WEBHOOK_SECRET` env vars validated
- [ ] `actions/billing.ts` exports `createCheckoutSession()`
- [ ] Action returns a Stripe Checkout URL
- [ ] URL success redirects to `/phase/phase_2_setup?session_id={CHECKOUT_SESSION_ID}`

**Risk tier:** `risk:high` (billing)
**Labels:** `area:billing`, `kind:feature`, `risk:high`
**Depends on:** B4
**Files likely touched:** `actions/billing.ts`, `lib/stripe/client.ts`

### D2 — Stripe webhook handler + signature verification

**Description:** Implement `app/api/webhooks/stripe/route.ts` per tech arch §11.1 + §9.7. Signature verification, idempotency via `stripeReceipts`.

**Acceptance criteria:**
- [ ] Webhook verifies signature on raw body
- [ ] `checkout.session.completed` events mark `paidJourneys.status = 'paid'`
- [ ] Idempotency key via `stripeEventId` unique constraint
- [ ] Duplicate events return 200 without re-processing
- [ ] Smoke test with Stripe CLI: `stripe trigger checkout.session.completed` works

**Risk tier:** `risk:high`
**Labels:** `area:billing`, `kind:feature`, `risk:high`
**Depends on:** D1, C5 (receipts table)
**Files likely touched:** `app/api/webhooks/stripe/route.ts`, `drizzle/schema/billing.ts`, `lib/stripe/webhooks.ts`

### D3 — Paywall UI — Stripe embedded checkout

**Description:** When POE presents the finished spark spec, paywall fires. Stripe Checkout embeds in the main panel.

**Acceptance criteria:**
- [ ] At end of Phase 1 Spark, POE's completion triggers the paywall
- [ ] Stripe Checkout embed replaces the conversation in the main panel
- [ ] Checkout card shows $39 one-time, expense-friendly messaging
- [ ] Successful payment redirects to `/phase/phase_2_setup`
- [ ] Payment failure keeps user on paywall with retry option

**Risk tier:** `risk:high` (payment flow)
**Labels:** `area:billing`, `kind:feature`, `risk:high`
**Depends on:** D1, D2, C9
**Files likely touched:** `app/(app)/phase/phase_1_spark/Paywall.tsx`, `components/payment/StripeCheckout.tsx`

### D4 — Post-payment transition + expense alias prompt

**Description:** After successful payment, show a brief transition screen that asks for an optional expense email alias per PRD §2.4.

**Acceptance criteria:**
- [ ] Post-payment screen shows "You're in" message
- [ ] Optional expense email alias input with autocomplete for common platforms
- [ ] `PATCH /api/users/me` saves `expenseEmailAlias` on user record
- [ ] Dismissible; users can skip
- [ ] Transitions into Phase 2 within 2 seconds

**Risk tier:** standard
**Labels:** `area:billing`, `kind:feature`
**Depends on:** D3
**Files likely touched:** `app/(app)/phase/phase_2_setup/PostPaymentScreen.tsx`, `actions/user.ts`

### D5 — Branded PDF receipt + email send

**Description:** When payment completes, generate a branded PDF receipt (via `@react-pdf/renderer`) and email it via Resend. CC the expense alias if set.

**Acceptance criteria:**
- [ ] `@react-pdf/renderer` installed
- [ ] `lib/pdf/receipt.tsx` renders a branded receipt PDF
- [ ] PDF uploaded to Vercel Blob; signed URL included in the email
- [ ] Email sent via `lib/email/send.ts` with kind `payment_receipt`
- [ ] CC includes expense alias if present on user record
- [ ] Email subject: "1stvibe receipt — ready to expense"
- [ ] Forward-to-manager button in email with pre-drafted template

**Risk tier:** `risk:high` (billing-adjacent)
**Labels:** `area:billing`, `kind:feature`, `risk:high`
**Depends on:** D2, D4
**Files likely touched:** `lib/pdf/receipt.tsx`, `lib/email/send.ts`, `content/emails/payment-receipt.tsx`, `lib/queue/email.ts` (Inngest)

### D6 — Inngest scaffolding + email pipeline

**Description:** Install Inngest. Set up the first Inngest function — the email send triggered by Stripe webhook.

**Acceptance criteria:**
- [ ] `@inngest/sdk` + `inngest` installed
- [ ] Inngest app registered at `/api/inngest`
- [ ] `lib/queue/email.ts` has `sendEmailJob` Inngest function
- [ ] Stripe webhook fires `billing/payment.completed` event
- [ ] Inngest function receives event and calls `lib/email/send.ts`
- [ ] Test: successful payment triggers email delivery

**Risk tier:** standard
**Labels:** `area:billing`, `area:devex`, `kind:feature`
**Depends on:** D5
**Files likely touched:** `app/api/inngest/route.ts`, `lib/queue/*`, `lib/email/*`

### 🎯 Milestone M3 — Paid Flow End-to-End

**Gate check:** Sign in → Phase 1 Spark → pay $39 (test mode) → land on Phase 2 setup with receipt email received.

---

## 7. Phase E — Dev Ops Phase 2 + Integrations

**Goal:** DOT teammate runs Phase 2 Set Up. GitHub App, Vercel API, MCP server, Skill pack all working.

### E1 — 1stvibe starter template repo

**Description:** Create a public GitHub repo `jaydubb74/1stvibe-starter` with the Next.js + Tailwind starter per PRD §3.4.

**Acceptance criteria:**
- [ ] Public repo created at `github.com/jaydubb74/1stvibe-starter`
- [ ] Contains: bare Next.js 15 + Tailwind v4 project
- [ ] `/.1stvibe/` directory scaffolded with `.gitkeep`
- [ ] `README.md` stub with "Built with 1stvibe" credit
- [ ] Marked as "template" in GitHub settings so "Use this template" works
- [ ] Deploys cleanly on Vercel with one click

**Risk tier:** standard
**Labels:** `area:devex`, `kind:chore`
**Depends on:** —
**Files likely touched:** separate repo (1stvibe-starter)

### E2 — GitHub App registration + token exchange

**Description:** Register `1stvibe[bot]` as a GitHub App. Implement token exchange in `lib/github/` per tech arch §9.1.

**Acceptance criteria:**
- [ ] GitHub App registered with name "1stvibe"
- [ ] Permissions: `contents:read`, `metadata:read` initially
- [ ] Webhook events subscribed: push, pull_request, create, delete
- [ ] `GITHUB_APP_ID`, `GITHUB_APP_PRIVATE_KEY`, `GITHUB_WEBHOOK_SECRET` env vars validated
- [ ] `lib/github/app.ts` exports Octokit App client
- [ ] Test: installation token minted successfully

**Risk tier:** `risk:high`
**Labels:** `area:devex`, `kind:feature`, `risk:high`
**Depends on:** A3
**Files likely touched:** `lib/github/app.ts`, `lib/env.ts`, Anthropic App config (external)

### E3 — GitHub App install flow in UI

**Description:** During Phase 2 Step 3, Morgan installs the 1stvibe App on her newly-created repo via deep-link per tech arch §9.1.

**Acceptance criteria:**
- [ ] `drizzle/schema/integrations.ts` defines `githubInstallations`
- [ ] UI shows "Install 1stvibe App" button in Phase 2
- [ ] Deep-link to GitHub's app install page with repo pre-scoped
- [ ] Post-install callback records the installation in our DB
- [ ] Can verify installation status on return

**Risk tier:** `risk:high`
**Labels:** `area:devex`, `kind:feature`, `risk:high`
**Depends on:** E2
**Files likely touched:** `drizzle/schema/integrations.ts`, `app/(app)/phase/phase_2_setup/GitHubInstall.tsx`, `app/api/github/install-callback/route.ts`

### E4 — GitHub webhook handler

**Description:** Implement `app/api/webhooks/github/route.ts` per tech arch §9.1. Signature verification, event fan-out to Inngest.

**Acceptance criteria:**
- [ ] Webhook verifies signature via `@octokit/webhooks` `verifyAndReceive()`
- [ ] Events logged to observability
- [ ] `push` events fire a `github/push.received` Inngest event
- [ ] `push` events update `learningSessions.lastActiveAt`
- [ ] Test: pushing to connected repo shows up in logs

**Risk tier:** `risk:high`
**Labels:** `area:devex`, `kind:feature`, `risk:high`
**Depends on:** E2, D6
**Files likely touched:** `app/api/webhooks/github/route.ts`, `lib/github/webhook.ts`, `lib/queue/github.ts`

### E5 — Vercel API client + webhook handler

**Description:** Implement Vercel webhook + API client per tech arch §9.2. Monitor `deployment.ready` events.

**Acceptance criteria:**
- [ ] `app/api/webhooks/vercel/route.ts` verifies signature (HMAC-SHA1)
- [ ] Subscribes to `deployment.*`, `project.*` events
- [ ] `deployment.ready` with `target: 'production'` is the graduation trigger signal
- [ ] `drizzle/schema/integrations.ts` `vercelProjects` table
- [ ] Test: manual Vercel deploy shows up in our logs

**Risk tier:** `risk:high`
**Labels:** `area:devex`, `kind:feature`, `risk:high`
**Depends on:** D6
**Files likely touched:** `app/api/webhooks/vercel/route.ts`, `lib/vercel/client.ts`, `lib/vercel/webhook.ts`

### E6 — 1stvibe MCP server

**Description:** Implement `app/api/mcp/[...slug]/route.ts` — Streamable HTTP MCP server per tech arch §9.3. Token-based auth.

**Acceptance criteria:**
- [ ] MCP server at `/api/mcp/*` responds to Streamable HTTP protocol
- [ ] Token auth via `Authorization: Bearer` header
- [ ] `lib/mcp/tools.ts` exports a registry of tools
- [ ] `drizzle/schema/integrations.ts` `mcpTokens` table
- [ ] Initial tools: `get_current_session`, `get_artifacts`, `add_backlog_item`
- [ ] Test: curl the MCP endpoint with a valid token and get a tool list

**Risk tier:** `risk:high`
**Labels:** `area:devex`, `kind:feature`, `risk:high`
**Depends on:** B4, C5
**Files likely touched:** `app/api/mcp/[...slug]/route.ts`, `lib/mcp/tools.ts`, `lib/mcp/auth.ts`, `drizzle/schema/integrations.ts`

### E7 — `@1stvibe/skills` npm package — scaffolding

**Description:** Set up `packages/1stvibe-skills/` per tech arch §6.5. Publishable via `npm publish`; installable via `npx @1stvibe/skills install`.

**Acceptance criteria:**
- [ ] `packages/1stvibe-skills/` directory with `package.json`
- [ ] Contains BEA's Skill (`skills/bea/SKILL.md` + adjustments)
- [ ] `bin/install.ts` prompts for Linear-style auth, writes to `~/.claude/skills/` + MCP config
- [ ] `npm run build` in the package creates a publishable tarball
- [ ] `npx @1stvibe/skills install` (pre-publish, via `npm link`) works locally

**Risk tier:** standard
**Labels:** `area:devex`, `area:teammates`, `kind:feature`
**Depends on:** E6, C4
**Files likely touched:** `packages/1stvibe-skills/**`

### E8 — DOT teammate content + Phase 2 UI

**Description:** Implement DOT (Dev Ops Tutor) teammate with Phase 2 walkthrough content. UI that walks Morgan through the 7 Set Up steps.

**Acceptance criteria:**
- [ ] `content/teammates/dot/SKILL.md` written
- [ ] `app/(app)/phase/phase_2_setup/page.tsx` implements the 7-step checklist UI
- [ ] Each step: narrative + action (e.g., "click here to create repo")
- [ ] Checklist tick animations per brand §10.4
- [ ] Returning-user detection (if accounts exist, short-circuit) per tech arch §6.5
- [ ] `localhost.first_preview` + `vercel.first_deploy` events fire when detected

**Risk tier:** standard
**Labels:** `area:teammates`, `area:content`, `kind:feature`
**Depends on:** C4, E3, E5
**Files likely touched:** `content/teammates/dot/*`, `app/(app)/phase/phase_2_setup/*`, `lib/orchestrator/returning-user-detection.ts`

---

## 8. Phase F — Curriculum Generation + Remaining Teammates

**Goal:** Morgan can complete all 7 phases. All 6 teammates active. Handoffs working.

**Milestone:** **M4 — Full Curriculum Works.**

### F1 — Config data model — Layers 1-3

**Description:** Implement role configs, project-type configs, and intersection configs per PRD §5.3 + tech arch §4.

**Acceptance criteria:**
- [ ] `content/configs/roles/` with 6 YAMLs (marketing, ops, HR, PM, CS, design + `other`)
- [ ] `content/configs/project-types/` with 6 YAMLs (landing-page, internal-tool, dashboard, etc. + `personal-project`)
- [ ] `content/configs/intersections/` with ~3 seeded YAMLs
- [ ] `lib/content/schema.ts` has Zod schemas for all layers
- [ ] `lib/content/registry.ts` loads + validates at boot
- [ ] Malformed config fails boot

**Risk tier:** standard
**Labels:** `area:content`, `kind:feature`
**Depends on:** C4
**Files likely touched:** `content/configs/**`, `lib/content/**`

### F2 — Learned signals schema

**Description:** Implement `learnedSignals` + `signalReviewStatusEnum` per tech arch §4.1. PII sanitizer wraps all writes.

**Acceptance criteria:**
- [ ] `drizzle/schema/moat.ts` defined
- [ ] `lib/security/pii.ts` sanitizer function with snapshot tests
- [ ] `lib/moat/write.ts` wraps all inserts through the sanitizer
- [ ] Test: attempting to write PII-containing content results in sanitized output

**Risk tier:** `risk:high` (PII handling)
**Labels:** `area:orchestrator`, `kind:feature`, `risk:high`
**Depends on:** C5
**Files likely touched:** `drizzle/schema/moat.ts`, `lib/security/pii.ts`, `lib/moat/write.ts`

### F3 — Lesson renders + checklist completions schema

**Description:** Implement `lessonRenders`, `checklistItemCompletions`, `lessonStateEnum`, `completionTriggerEnum` per tech arch §4.

**Acceptance criteria:**
- [ ] Schema implemented and migrated
- [ ] `lib/curriculum/generate.ts` has `generateLesson()` per tech arch §7.1
- [ ] `lib/curriculum/lock.ts` has `lockLesson()`
- [ ] `lib/curriculum/preview.ts` has `getPhaseGenericPreview()`
- [ ] Test: generating a lesson produces a valid Lesson object; locking it prevents re-generation

**Risk tier:** standard
**Labels:** `area:orchestrator`, `kind:feature`
**Depends on:** F1, C5
**Files likely touched:** `drizzle/schema/curriculum.ts`, `lib/curriculum/**`

### F4 — Curriculum phase YAMLs — all 7

**Description:** Write phase YAMLs per PRD §5.2 table. Negotiable + non-negotiable bullets, generation guidance, handoff schemas.

**Acceptance criteria:**
- [ ] `content/curriculum/phases/01-your-idea.yaml` through `07-ship-share.yaml`
- [ ] Each follows the schema in `lib/content/schema.ts`
- [ ] Zod-validated at boot

**Risk tier:** standard
**Labels:** `area:content`, `kind:feature`
**Depends on:** F1
**Files likely touched:** `content/curriculum/phases/**`

### F5 — Left-panel curriculum checklist UI

**Description:** Implement the left-panel checklist per brand §10 and PRD §5.5.

**Acceptance criteria:**
- [ ] 7 phases visible with collapsible sub-items
- [ ] Current phase auto-expanded
- [ ] Glyph states (pending / active / just-completed / done) per brand §10.4
- [ ] Teammate badge next to each phase name
- [ ] Click-to-peek on future phases shows unpersonalized preview
- [ ] Checklist item ticks fire the celebration burst animation

**Risk tier:** standard
**Labels:** `area:content`, `kind:feature`
**Depends on:** F3, A2
**Files likely touched:** `components/learning-env/ChecklistPanel.tsx`, `components/learning-env/PhaseItem.tsx`, `lib/celebration.ts`

### F6 — DAX teammate

**Description:** Implement DAX (Design) teammate. Phase 5 Design.

**Acceptance criteria:**
- [ ] `content/teammates/dax/SKILL.md` + adjustments
- [ ] Phase 5 Design page + conversation flow
- [ ] Produces `04-design-notes.md` artifact
- [ ] Structured-choice UI for visual preferences (color, mood, etc.)

**Risk tier:** standard
**Labels:** `area:teammates`, `area:content`, `kind:feature`
**Depends on:** F3, C10
**Files likely touched:** `content/teammates/dax/*`, `app/(app)/phase/phase_5_design/*`

### F7 — ED teammate (Engineering consult)

**Description:** Implement ED (Engineering). Consulting role — pulled in during build phases for architecture decisions.

**Acceptance criteria:**
- [ ] `content/teammates/ed/SKILL.md` + adjustments
- [ ] Invisible consult pattern (per PRD §4.5) — ED is called by BEA when needed
- [ ] Produces optional `05-architecture-notes.md`

**Risk tier:** standard
**Labels:** `area:teammates`, `area:content`, `kind:feature`
**Depends on:** C4
**Files likely touched:** `content/teammates/ed/*`

### F8 — BEA teammate (Build Partner) — cross-phase

**Description:** Implement BEA. Primary teammate for Phase 3 (First Build), Phase 5 (Design — paired with DAX), Phase 6 (Build Out).

**Acceptance criteria:**
- [ ] `content/teammates/bea/SKILL.md` + adjustments
- [ ] Phase 3 First Build page + conversation
- [ ] "First real Claude Code prompt" triggers ah-ha celebration
- [ ] `localhost.first_preview` event triggers milestone banner
- [ ] BEA persists across Phase 3 / 5 / 6 — same conversation, same session state

**Risk tier:** `risk:high` (teammate that persists across phases has more edge cases)
**Labels:** `area:teammates`, `area:content`, `kind:feature`, `risk:high`
**Depends on:** F3, E7
**Files likely touched:** `content/teammates/bea/*`, `app/(app)/phase/phase_3_first_build/*`, `app/(app)/phase/phase_6_build_out/*`

### F9 — GAL teammate (GTM)

**Description:** Implement GAL. Phase 7 Ship & Share.

**Acceptance criteria:**
- [ ] `content/teammates/gal/SKILL.md` + adjustments
- [ ] Phase 7 page + conversation flow
- [ ] Drafts LinkedIn post, Twitter text, email-to-manager template
- [ ] Produces `06-launch-notes.md`

**Risk tier:** standard
**Labels:** `area:teammates`, `area:content`, `kind:feature`
**Depends on:** F3, C10
**Files likely touched:** `content/teammates/gal/*`, `app/(app)/phase/phase_7_ship/*`

### F10 — Orchestrator router + middleware

**Description:** Complete the orchestrator per tech arch §6. `router.ts` + middleware chain (rate limit, token budget, compaction check, artifact mirror).

**Acceptance criteria:**
- [ ] `lib/orchestrator/router.ts` routes user input to current teammate
- [ ] `lib/orchestrator/middleware/*.ts` implemented
- [ ] Middleware chain runs in order; short-circuits on stop conditions
- [ ] Token budget middleware blocks at cap
- [ ] Test: session at 500k tokens returns 429

**Risk tier:** `risk:high`
**Labels:** `area:orchestrator`, `kind:feature`, `risk:high`
**Depends on:** C3, F2
**Files likely touched:** `lib/orchestrator/router.ts`, `lib/orchestrator/middleware/**`

### F11 — Handoff system + SSE events

**Description:** Implement handoff mechanics per tech arch §6.2 and §8.2. SSE channel for push events. Visible handoff ceremony per brand §10.3.

**Acceptance criteria:**
- [ ] `app/api/events/stream/route.ts` SSE handler per tech arch §8.2
- [ ] Redis pub/sub for event distribution (Upstash)
- [ ] `lib/orchestrator/handoff.ts` fires handoff events
- [ ] Client-side `useSessionEvents` hook subscribes to events
- [ ] Phase transition fires: `handoff_starting` → wrap-up message → compaction summary → `handoff_complete` → next teammate intro
- [ ] Framer Motion animations for the ceremony

**Risk tier:** `risk:high` (critical UX flow)
**Labels:** `area:orchestrator`, `kind:feature`, `risk:high`
**Depends on:** F10, A2
**Files likely touched:** `app/api/events/stream/route.ts`, `lib/realtime/**`, `lib/orchestrator/handoff.ts`, `components/teammate-chat/HandoffCeremony.tsx`

### F12 — Artifact mirroring to user's repo

**Description:** Via the GitHub App, write produced artifacts to `/.1stvibe/` in the user's repo per tech arch §6.8. Requires the `contents:write` permission upgrade.

**Acceptance criteria:**
- [ ] Permission upgrade flow — asks user to approve write scope at artifact-mirror consent
- [ ] Artifacts written as numbered markdown files in `/.1stvibe/`
- [ ] Mirror happens asynchronously via Inngest
- [ ] Opt-out toggle respected
- [ ] Failure to mirror doesn't break product flow

**Risk tier:** `risk:high` (GitHub write scope)
**Labels:** `area:orchestrator`, `kind:feature`, `risk:high`
**Depends on:** E2, C8, D6
**Files likely touched:** `lib/github/mirror.ts`, `lib/queue/artifacts.ts`, `actions/artifact.ts`

### F13 — Phase 4 Scope teammate logic

**Description:** POE returns for Phase 4. MVP steering session state + backlog management per PRD §4.5.

**Acceptance criteria:**
- [ ] POE's Phase 4 conversation populates `learningSessions.phaseState.mvp_features` and `.backlog`
- [ ] Pushback / yield logic per PRD §4.5 (`yields_granted` counter)
- [ ] Produces `02-requirements-backlog.md` + `03-mvp-scope.md`
- [ ] UI shows the growing feature list with check-off tracking

**Risk tier:** standard
**Labels:** `area:teammates`, `area:content`, `kind:feature`
**Depends on:** F10, F3
**Files likely touched:** `content/teammates/poe/adjustments/phase-4-scope.md`, `app/(app)/phase/phase_4_scope/*`

### 🎯 Milestone M4 — Full Curriculum Works

**Gate check:** Paid user can go from sign-in through Phase 7 with all teammates, all handoffs, all artifacts. End-to-end happy path.

---

## 9. Phase G — Gallery + Completion + Wrap-up Email

**Goal:** Complete the graduation flow. Gallery, celebration, wrap-up email.

### G1 — Gallery schema + publish action

**Description:** Implement `galleryProjects` schema + `publishProjectToGallery()` Server Action per tech arch §9.6.

**Acceptance criteria:**
- [ ] Schema migrated
- [ ] `actions/gallery.ts` has `publishProjectToGallery()`
- [ ] Creates draft (`isPublic: false`) row
- [ ] Fires `gallery/project.publish_requested` Inngest event

**Risk tier:** standard
**Labels:** `area:gallery`, `kind:feature`
**Depends on:** C5, D6
**Files likely touched:** `drizzle/schema/gallery.ts`, `actions/gallery.ts`

### G2 — Screenshot capture + AI summary job

**Description:** Inngest function that captures screenshot (Vercel OG) and generates AI summary (Haiku via Batch API). Marks project public on success.

**Acceptance criteria:**
- [ ] `processGalleryPublish` Inngest function implemented
- [ ] Screenshot uploaded to Vercel Blob
- [ ] AI summary via Haiku; Zod-validated structured output
- [ ] Marks `isPublic: true` on success
- [ ] Fires graduation events on success

**Risk tier:** standard
**Labels:** `area:gallery`, `kind:feature`
**Depends on:** G1, C1
**Files likely touched:** `lib/queue/gallery.ts`, `lib/gallery/screenshot.ts`, `lib/gallery/summary.ts`

### G3 — Gallery index + project detail pages

**Description:** Implement gallery browse page + individual project page per PRD §7.3.

**Acceptance criteria:**
- [ ] `app/(marketing)/gallery/page.tsx` lists public projects
- [ ] `app/(marketing)/gallery/[id]/page.tsx` shows individual project
- [ ] Like button (increments counter)
- [ ] Share buttons (LinkedIn, Twitter, copy link)
- [ ] Builder name shown; clicks through to profile (G4)
- [ ] Veteran builder badge for multi-project builders

**Risk tier:** standard
**Labels:** `area:gallery`, `kind:feature`
**Depends on:** G2
**Files likely touched:** `app/(marketing)/gallery/**`, `components/gallery/**`

### G4 — Builder profile page

**Description:** Implement builder profile per PRD §7.3 + §3.12. N projects chronologically; veteran badge if 2+.

**Acceptance criteria:**
- [ ] `app/(marketing)/builders/[id]/page.tsx`
- [ ] Lists all of builder's public projects
- [ ] Veteran badge displayed for 2+ shipped
- [ ] Follow-up links between related projects

**Risk tier:** standard
**Labels:** `area:gallery`, `kind:feature`
**Depends on:** G3
**Files likely touched:** `app/(marketing)/builders/[id]/page.tsx`

### G5 — Completion detection + celebration

**Description:** When user publishes to gallery, fires the graduation flow. Celebration + wrap-up email.

**Acceptance criteria:**
- [ ] Gallery publish success triggers:
  - `phase_completed: phase_7_ship` event
  - Celebration takeover screen (mega confetti tier per brand §10.5)
  - `learningSessions.completedAt` set
  - Wrap-up email Inngest job fired
- [ ] Celebration screen shows live URL, pre-drafted LinkedIn post, completion summary PDF link

**Risk tier:** standard
**Labels:** `area:gallery`, `kind:feature`
**Depends on:** G2, D6
**Files likely touched:** `lib/queue/graduation.ts`, `components/graduation/CelebrationScreen.tsx`

### G6 — Wrap-up email template + send

**Description:** Wrap-up email per PRD §3.10. Journey summary, live URL, pro-tips, return invitation, domain add-on prompt.

**Acceptance criteria:**
- [ ] `content/emails/wrap-up.tsx` React Email template
- [ ] Renders journey stats (time invested, artifacts produced, MVP features shipped)
- [ ] Links to live URL + gallery page
- [ ] Curated pro-tips for continued building
- [ ] Return invitation: "$39 per project, easily expensable"
- [ ] Custom domain add-on flow for Vercel-subdomain shippers
- [ ] Completion summary PDF attached

**Risk tier:** standard
**Labels:** `area:content`, `kind:copy`
**Depends on:** G5, D5 (email pipeline)
**Files likely touched:** `content/emails/wrap-up.tsx`, `lib/pdf/completion-summary.tsx`

### G7 — Completion summary PDF

**Description:** Separate PDF render per PRD §2.4. One-page summary for performance reviews / LinkedIn / expense justification.

**Acceptance criteria:**
- [ ] `lib/pdf/completion-summary.tsx` renders branded PDF
- [ ] Content: what she built, time invested, skills developed, deliverable
- [ ] Attached to wrap-up email
- [ ] Accessible from Settings → Receipts/Documents

**Risk tier:** standard
**Labels:** `area:content`, `kind:feature`
**Depends on:** G5
**Files likely touched:** `lib/pdf/completion-summary.tsx`, `app/(app)/settings/documents/page.tsx`

---

## 10. Phase H — Admin + Telemetry + Moderation

**Goal:** Admin surface functional. Moderation queue. DSAR flow. Engagement/retention flows live.

### H1 — Admin middleware + admin dashboard

**Description:** `/admin/**` route protection + dashboard page per tech arch §15. Only `user.role = 'admin'` accesses.

**Acceptance criteria:**
- [ ] Middleware redirects non-admin users away from `/admin/**`
- [ ] Dashboard shows high-level metrics (users this week, conversion rate, daily spend, flagged outputs count)
- [ ] PostHog SQL queries power the cards

**Risk tier:** `risk:high`
**Labels:** `area:admin`, `kind:feature`, `risk:high`
**Depends on:** B2, B6
**Files likely touched:** `app/(admin)/page.tsx`, `middleware.ts`

### H2 — Admin user list + user detail

**Description:** `/admin/users` list + `/admin/users/[id]` detail pages.

**Acceptance criteria:**
- [ ] Searchable user list
- [ ] Detail page shows all journeys, paid status, artifacts, role
- [ ] Actions: trigger refund (manual Venmo via a note), trigger deletion
- [ ] Every action writes to `auditLog`

**Risk tier:** `risk:high`
**Labels:** `area:admin`, `kind:feature`, `risk:high`
**Depends on:** H1
**Files likely touched:** `app/(admin)/users/**`, `drizzle/schema/events.ts` (auditLog)

### H3 — Impersonation

**Description:** Admin impersonation per tech arch §10.5. Time-limited, audit-logged, guard-railed.

**Acceptance criteria:**
- [ ] `startImpersonation()` Server Action creates 30-min session
- [ ] Signed cookie sets impersonation state
- [ ] Persistent banner shown when impersonating
- [ ] Destructive actions (billing, delete, irreversible ops) blocked during impersonation
- [ ] Auto-logout after window
- [ ] Audit log entries for start/end

**Risk tier:** `risk:high`
**Labels:** `area:admin`, `kind:feature`, `risk:high`
**Depends on:** H2
**Files likely touched:** `actions/admin/impersonate.ts`, `drizzle/schema/admin.ts`, `components/admin/ImpersonationBanner.tsx`

### H4 — Moderation queue

**Description:** `/admin/moderation` — queue of LLM outputs flagged by `scanOutput()`. Approve / reject / block user.

**Acceptance criteria:**
- [ ] Queue shows flagged outputs with user + session context
- [ ] Approve releases to user
- [ ] Reject drops the response
- [ ] Block marks the user (future: actually enforce the block)

**Risk tier:** `risk:high`
**Labels:** `area:admin`, `kind:feature`, `risk:high`
**Depends on:** H2
**Files likely touched:** `app/(admin)/moderation/page.tsx`, `lib/ai/safety.ts`

### H5 — Data export (DSAR) flow

**Description:** Self-service data export per tech arch §12.1.

**Acceptance criteria:**
- [ ] `/settings/privacy` page with "Export my data" button
- [ ] Clicking fires `dsar/export.requested` Inngest event
- [ ] Inngest job builds JSON zip (profile + journeys + conversations + artifacts + gallery)
- [ ] Uploads to Blob, emails signed URL (7-day retention)
- [ ] `dsarRequests` table tracks status

**Risk tier:** `risk:high` (privacy)
**Labels:** `area:admin`, `kind:feature`, `risk:high`
**Depends on:** D6
**Files likely touched:** `actions/dsar.ts`, `lib/queue/dsar.ts`, `app/(app)/settings/privacy/page.tsx`, `drizzle/schema/dsar.ts`

### H6 — Data deletion (DSAR) flow

**Description:** Self-service account deletion per tech arch §12.2.

**Acceptance criteria:**
- [ ] "Delete my account" button in privacy settings
- [ ] Confirmation email flow
- [ ] Inngest job cascades DB delete + PostHog/Langfuse API purge
- [ ] Audit-log stub retained (hashed ID + timestamp) for 90 days

**Risk tier:** `risk:high`
**Labels:** `area:admin`, `kind:feature`, `risk:high`
**Depends on:** H5
**Files likely touched:** `actions/dsar.ts`, `lib/queue/dsar.ts`

### H7 — Engagement / retention email flows

**Description:** Inngest functions for the three abandonment-point flows per PRD §3.11.

**Acceptance criteria:**
- [ ] `scheduleSparkRetention` — 24h/3d/7d/14d emails for registered-didn't-pay
- [ ] `schedulePaidRetention` — 7d/30d emails for paid-didn't-finish
- [ ] `scheduleCompletedEngagement` — 1w views nudge, 1m interview (stub for v1), 3m next-project
- [ ] All emails respect `unsubscribePreferences`
- [ ] Templates in `content/emails/retention/**`

**Risk tier:** standard
**Labels:** `area:content`, `kind:feature`
**Depends on:** D6, G5
**Files likely touched:** `lib/queue/retention.ts`, `content/emails/retention/**`

### H8 — Signal capture + admin queue stub

**Description:** Capture learned signals to `learnedSignals` during teammate conversations. Simple admin queue view (full "approve → auto-PR" is fast-follow).

**Acceptance criteria:**
- [ ] Orchestrator middleware captures signals heuristically (frustration markers, repeated questions, etc.)
- [ ] Written to `learnedSignals` with `reviewStatus: 'pending'`
- [ ] `/admin/signals` lists pending signals with context
- [ ] Manual accept/reject UI (auto-PR generation is fast-follow)

**Risk tier:** standard
**Labels:** `area:admin`, `area:orchestrator`, `kind:feature`
**Depends on:** F2, H1
**Files likely touched:** `lib/moat/capture.ts`, `app/(admin)/signals/page.tsx`

---

## 11. Phase I — Polish, Evals Graduation, Launch Prep

**Goal:** Ship-ready. Evals blocking. Security review complete. Engineer-friend review done.

**Milestone:** **M5 — Production Ready.**

### I1 — Pro Tips module content + delivery

**Description:** Pro tips lesson between Phase 2 and Phase 3 per PRD §4.7. BEA delivers.

**Acceptance criteria:**
- [ ] `content/curriculum/pro-tips/claude-code-basics.yaml` with top 8-10 tips
- [ ] Module delivered as a brief lesson between Phase 2 and Phase 3
- [ ] "Skip — I've done this before" option for returning users
- [ ] In-context pro-tip delivery via BEA during build phases (signal-triggered)

**Risk tier:** standard
**Labels:** `area:content`, `kind:copy`
**Depends on:** F8
**Files likely touched:** `content/curriculum/pro-tips/**`

### I2 — Promptfoo adversarial eval suite

**Description:** Per tech arch §14.3 + engineering-playbook §8.8. Grows from every real bug.

**Acceptance criteria:**
- [ ] `tests/evals/_adversarial/` with known prompt-injection attempts
- [ ] Each teammate has ≥5 evals (happy path + adversarial)
- [ ] CI runs the suite; reports in PR comments

**Risk tier:** standard
**Labels:** `area:devex`, `kind:eval`
**Depends on:** all teammates shipped
**Files likely touched:** `tests/evals/**`, `.github/workflows/evals.yml`

### I3 — E2E test suite — key flows

**Description:** Playwright smoke tests for the critical paths.

**Acceptance criteria:**
- [ ] Sign-in flow
- [ ] Phase 1 Spark completion
- [ ] Paywall + Stripe test-mode checkout
- [ ] Phase 2 setup (can be mocked for E2E)
- [ ] Ship to gallery
- [ ] Admin routes redirect unauthenticated users

**Risk tier:** standard
**Labels:** `area:devex`, `kind:test`
**Depends on:** M4 complete
**Files likely touched:** `tests/e2e/**`

### I4 — Pricing page + terms + privacy

**Description:** Public-facing pricing page (brief), Terms of Service, Privacy Policy.

**Acceptance criteria:**
- [ ] `/pricing` with $39 flat copy + expense-friendly messaging
- [ ] `/terms` — TOS drafted (use a template, lawyer-reviewed ideally)
- [ ] `/privacy` — privacy policy covering what we collect, why, retention, DSAR, processors
- [ ] Session replay disclosure per PRD §10.5

**Risk tier:** `risk:high` (legal)
**Labels:** `area:content`, `kind:copy`, `risk:high`
**Depends on:** —
**Files likely touched:** `app/(marketing)/pricing/page.tsx`, `app/(marketing)/terms/page.tsx`, `app/(marketing)/privacy/page.tsx`

### I5 — Cookie / privacy notice (US baseline)

**Description:** US-focused privacy posture per PRD §10.6.

**Acceptance criteria:**
- [ ] Footer "Do Not Sell or Share My Personal Information" link
- [ ] Global Privacy Control header honored
- [ ] No GDPR banner at launch (US-focused)

**Risk tier:** standard
**Labels:** `area:content`, `kind:feature`
**Depends on:** I4
**Files likely touched:** `components/Footer.tsx`, `middleware.ts`

### I6 — Engineer-friend review cycle

**Description:** Request engineer-friend review of the design docs + critical PRs.

**Acceptance criteria:**
- [ ] Engineer friends have read `persona.md`, `prd-notes.md`, `technical-architecture.md`, `engineering-playbook.md`
- [ ] Feedback captured as issues
- [ ] Critical issues addressed before launch
- [ ] Non-critical issues logged in backlog

**Risk tier:** standard
**Labels:** `kind:chore`
**Depends on:** M4 complete
**Files likely touched:** N/A (review process)

### I7 — Security review

**Description:** Full `security-review` skill pass on the codebase. Plus manual review of `risk:high` paths.

**Acceptance criteria:**
- [ ] `security-review` skill invoked on entire `app/` + `lib/` tree
- [ ] Findings triaged; critical issues fixed
- [ ] Webhook signature verification verified on all three providers
- [ ] RLS policies confirmed working (test with non-admin user attempting cross-user reads)
- [ ] Secrets audit: no hardcoded secrets anywhere

**Risk tier:** `risk:high`
**Labels:** `area:devex`, `kind:chore`, `risk:high`
**Depends on:** M4 complete
**Files likely touched:** N/A (review)

### I8 — Launch cutover

**Description:** Merge `v2-rebuild` → `main`. v1 site goes away; v2 goes live.

**Acceptance criteria:**
- [ ] All M5 gate checks pass
- [ ] Engineer-friend review complete
- [ ] Security review complete
- [ ] Final smoke test on Vercel preview
- [ ] Merge `v2-rebuild` → `main`
- [ ] Monitor Sentry / PostHog / Langfuse for first 24h
- [ ] Rollback plan confirmed: `git reset --hard v1-final && git push --force origin main` ready if needed

**Risk tier:** `risk:high`
**Labels:** `area:devex`, `kind:chore`, `risk:high`
**Depends on:** I6, I7
**Files likely touched:** git operations

### 🎯 Milestone M5 — Production Ready

**Gate check:** Admin works. Moderation works. DSAR flow works. Evals blocking. Security review done. Engineer friends have signed off.

---

## 12. Fast-follow Parking Lot

Explicitly deferred from v1 scope per PRD §11.2. Revisited once v1 has real user data.

**Growth & promotion:**
- Generic landing pages beyond homepage
- Referral landing page templates + metadata-encoded links
- Cookie-based visitor context for POE

**Community & social:**
- Cohort-lite pods
- Gallery comments
- Follow / subscribe / notifications
- In-product aggregate coaching

**Living gallery:**
- Auto-crawler for live-URL changes
- AI-summary regeneration on project evolution
- Agent-led founder interviews

**Graduation kit (full):**
- Linear workspace auto-creation
- "How to keep building with Claude Code" advanced resources
- Advanced technique pointers
- Course upsells

**Role coverage:**
- Sales, Finance, Account Management role configs

**Dev ops refinement:**
- Pre-provisioning GitHub / Vercel accounts on user's behalf
- Chrome extension overlays
- Multiple project-type templates

**UX polish:**
- "Refresh this lesson" button
- Thumbs-up on every response
- Custom admin dashboard beyond PostHog

**Commercial expansion:**
- Team SKUs
- Advanced courses
- Comp / referral / promo codes
- Price A/B testing
- Built money-back guarantee flow (v1 is manual)

---

## 13. Ticket Creation Process

When Linear MCP is connected to our Claude Code session, tickets get created mechanically from this plan.

**Per ticket in this doc, the Linear issue gets:**
- Title = "Ticket title" line above
- Description = "Description" paragraph + "Acceptance criteria" checklist + "Files likely touched" list
- Labels = from the Labels line
- State = Backlog (Ready after ordering)
- Cycle = none (continuous flow)

**Label creation** (one-time, before ticket creation):
- `area:devex`, `area:auth`, `area:billing`, `area:admin`, `area:content`, `area:gallery`, `area:teammates`, `area:orchestrator`
- `kind:feature`, `kind:bug`, `kind:chore`, `kind:copy`, `kind:eval`, `kind:test`
- `risk:high`, `claude-ready`, `needs-human`

**Ordering:**
- Phase A tickets at top of backlog
- Within a phase: respect "depends on" relationships
- Dependency-free tickets within a phase can run in parallel (rare in single-builder flow)

**Post-creation:**
- Once tickets exist, promoting the top ~5 to "Ready" gives a working queue
- Pick one at a time, execute in Claude Code, PR or direct commit per risk tier, merge, pick next

---

*This plan evolves. If you discover a missing ticket mid-build, add it to the relevant phase. If you discover a phase is over-scoped, split. Commit plan changes alongside the work that motivated them.*
