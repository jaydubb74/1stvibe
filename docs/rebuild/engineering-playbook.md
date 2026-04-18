# 1stvibe Engineering Playbook

> How we build 1stvibe with Claude Code. Conventions for git, Linear, sessions, tests, security, and day-to-day rhythm. Written for three audiences: Claude Code as working context, engineer-friend reviewers, and Mike + Josh as the primary humans in the loop.
>
> Companion docs: [persona.md](./persona.md) (who), [prd-notes.md](./prd-notes.md) (what), [technical-architecture.md](./technical-architecture.md) (how at the system level), [brand-and-style.md](./brand-and-style.md) (visual + voice).

**Last updated:** 2026-04-18
**Status:** pre-build; active engineering practice doc. Evolves as we build.

---

## Contents

1. [Orientation](#1-orientation)
2. [CLAUDE.md Strategy](#2-claudemd-strategy)
3. [Git Workflow](#3-git-workflow)
4. [Linear as Durable Memory](#4-linear-as-durable-memory)
5. [Risk Tiers](#5-risk-tiers)
6. [Claude Code Session Discipline](#6-claude-code-session-discipline)
7. [Prompt Patterns](#7-prompt-patterns)
8. [Testing Discipline](#8-testing-discipline)
9. [Documentation in Code](#9-documentation-in-code)
10. [Security Hygiene](#10-security-hygiene)
11. [Josh's Copy Workflow](#11-joshs-copy-workflow)
12. [Observability of the Dev Process](#12-observability-of-the-dev-process)
13. [Pre-Build Rehearsal](#13-pre-build-rehearsal)
14. [Roles & Ownership](#14-roles--ownership)
15. [Cadences & Rituals](#15-cadences--rituals)
16. [Getting Started for Claude Code](#16-getting-started-for-claude-code)

---

## 1. Orientation

### 1.1 Who does what

Mike builds. Josh does copy, brand, and growth. Claude Code is the primary implementer for both.

### 1.2 What this doc is for

- Claude Code reads this as working context. Conventions here are enforced in practice.
- Engineer-friend reviewers scan this to understand how we operate.
- Mike uses it as the operating manual.

### 1.3 How to use it

- Claude Code reads the root [CLAUDE.md](../../CLAUDE.md) at session start; it points here for process questions.
- For product questions → [prd-notes.md](./prd-notes.md).
- For architecture → [technical-architecture.md](./technical-architecture.md).
- For visual / voice → [brand-and-style.md](./brand-and-style.md).
- For *how* we build → this doc.

### 1.4 Principles that shape everything else

- **CLAUDE.md is an index, not an encyclopedia.** Process knowledge lives in this doc; CLAUDE.md points here.
- **Tickets are the durable memory, not sessions.** Linear is the context store across days, weeks, sessions.
- **Risk-tiered process, not uniform process.** Auth / billing / schema / security gets extra rigor. Content tweaks get a fast lane.
- **Short sessions over long sessions.** 30min–2hr focused work beats 6-hour marathons. Checkpoints preserve state across sessions.
- **Trust but verify.** Claude Code is excellent most of the time. Tests, reviews, and adversarial evals catch the not-most-of-the-time.

---

## 2. CLAUDE.md Strategy

### 2.1 Root CLAUDE.md — index plus invariants

The root [CLAUDE.md](../../CLAUDE.md) is deliberately short (~200 lines max). Its job is to orient, point at canonical docs, and encode non-negotiables. It loads into every session's context — every token costs us.

**What's in scope for root CLAUDE.md:**
- 5-7 links to the core design docs (read these first)
- Tech stack at a glance (table, no rationale)
- 5-10 architectural principles as bullets (not paragraphs)
- Non-goals (to prevent drift)
- Brand non-negotiables
- Git workflow basics
- "Don't touch `_legacy/`"

**What's out of scope for root CLAUDE.md:**
- Anything that would be >3 lines to explain — link to a full doc
- Decisions with rationale — those go in ADRs or design docs
- Tactical prompts or how-tos — those live in the relevant subdirectory's CLAUDE.md

### 2.2 Per-directory CLAUDE.md files

Per-directory CLAUDE.md files auto-load **when Claude Code reads or writes files in that directory** — lazy, not upfront. Add them where Claude Code operates with different posture than the root.

**Planned per-directory CLAUDE.md files:**

| Path | Purpose |
|---|---|
| `_legacy/CLAUDE.md` | "Never import from here. Never edit. Copy patterns explicitly if needed." |
| `content/CLAUDE.md` | "Config-as-code — YAML / MDX / markdown. Schemas in `lib/content/schema.ts`. No executable logic here." |
| `content/teammates/CLAUDE.md` | "One folder per teammate. SKILL.md is base persona. adjustments/returning-user.md is the composition layer. Don't inline conditionals in SKILL.md." |
| `drizzle/schema/CLAUDE.md` | "Schema changes require migrations via `drizzle-kit generate`. Never edit migration files. Run `drizzle-kit check` locally before PR." |
| `app/(admin)/CLAUDE.md` | "Admin routes. Middleware-gated. Every action writes an audit_log entry. No destructive operations without confirmation." |
| `tests/evals/CLAUDE.md` | "Promptfoo YAML. Every shipped LLM bug becomes an eval here. LLM-as-judge rubrics use sparingly (cost)." |
| `lib/ai/CLAUDE.md` | "Every LLM call goes through `lib/ai/call.ts`. Never call the Anthropic SDK directly from feature code." |

These get written as we build the corresponding directories.

### 2.3 The `@path/to/file` import pattern

Claude Code supports `@path/to/file` imports in CLAUDE.md — the file loads on demand when Claude is working in a context that references it.

Use imports to keep root CLAUDE.md short:

```markdown
## For detailed conventions

- Git workflow: @docs/rebuild/engineering-playbook.md#3-git-workflow
- Testing discipline: @docs/rebuild/engineering-playbook.md#8-testing-discipline
```

Better than copying content into CLAUDE.md — content stays in one place, auto-loads when relevant.

### 2.4 Keeping CLAUDE.md honest

- **CI link-check.** A GitHub Action runs on PRs that modify `CLAUDE.md` or any `*/CLAUDE.md` — fails if any referenced path doesn't exist. ~15 lines of bash, catches 80% of drift.
- **Quarterly refresh.** Calendar item for Mike to open a PR titled `chore: CLAUDE.md quarterly refresh`. Prune stale lines, re-validate links, trim anything grown too fat.
- **Ownership.** CLAUDE.md changes require Mike's review. Josh can propose changes; Mike merges.
- **"Last reviewed"** footer with date and reviewer name — visible marker of freshness.

### 2.5 Tone conventions for CLAUDE.md files

Write CLAUDE.md files for Claude Code, not for humans. Imperative. Short sentences. Bulleted constraints.

- ✅ "Never import from `_legacy/`. Copy patterns explicitly if needed."
- ❌ "This directory contains the v1 code that we've archived for reference. If you find yourself wanting to reference a v1 pattern, it's probably better to copy it into the v2 location and adapt it rather than importing it directly, because..."

---

## 3. Git Workflow

### 3.1 Branches

- **`main`** — live v1 site deployment. **Do not modify during rebuild.**
- **`archive/v1`** + **`v1-final`** tag — frozen v1 snapshot.
- **`v2-rebuild`** — active development branch.
- **Short-lived feature branches** — only when needed (see §3.2 below).

At launch: merge `v2-rebuild` → `main`. Rollback if catastrophic: `git reset --hard v1-final`.

### 3.2 When to commit direct vs. branch+PR

**Commit direct to `v2-rebuild`** for the common path — standard-risk work, solo sessions, moving fast. No PR overhead when you're both author and reviewer.

**Open a feature branch + PR** when:
- Work is `risk:high` (see [§5.1](#51-riskhigh--triggers-extra-process)) — needs the `security-review` skill pass before merge
- Josh contributes copy — Mike reviews voice consistency
- Work is large enough (~400+ LOC) that you want bisect-ability
- Engineer-friend review requested
- You want Vercel preview to test before merging

The branch+PR path isn't about ceremony; it's about getting a review where one's genuinely useful. Default to direct commit otherwise.

### 3.3 Worktrees for parallel work

When parallel sessions are in flight (Mike + Josh simultaneously, or two independent workstreams), use git worktrees:

```bash
git worktree add ../1stvibe-poe-tuning v2-rebuild
cd ../1stvibe-poe-tuning
# Claude Code session runs here in isolation
```

Worktree naming: descriptor + hash or date. Our harness already does `claude/charming-jackson-3beab1`-style names. Keep this pattern.

**Never switch branches in an active Claude Code session** — it corrupts Claude's mental context. Open a new worktree or a new session instead.

### 3.4 Branch naming

`<author>/<ticket-id>-<short-descriptor>`

Examples:
- `mike/lin-123-add-poe-skill`
- `josh/lin-156-refine-phase-1-copy`
- `claude/lin-199-orchestrator-middleware`

When Linear MCP creates a branch, it uses this pattern automatically.

### 3.5 Commit messages — Conventional Commits

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat` — new user-facing feature
- `fix` — bug fix
- `chore` — tooling, config, deps
- `docs` — docs-only change
- `refactor` — internal restructure, no behavior change
- `test` — tests only
- `perf` — performance improvement

**Scope** (optional): the area — `orchestrator`, `auth`, `teammates/poe`, etc.

**Subject:** imperative mood, <50 chars when possible, no period.

**Body:** what + why. Not how (the diff shows how).

**Footer always includes:**

```
Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

(Or whichever model was primary. The co-author trailer makes Claude's contributions unambiguous in git history.)

**Examples:**

```
feat(orchestrator): add token budget middleware

Enforces the $5-per-session soft cap by checking totalTokensUsed
before each teammate call. Returns a 429 response with a polite
message when the cap trips.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

```
fix(auth): scope Neon RLS policy to auth.user_id()

Previous policy used the pg_session_user which was incorrect for
Auth.js v5 — it's always 'authenticated'. Now correctly filters by
the authenticated user's ID.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

Commitlint hook (planned) blocks malformed messages at commit time.

### 3.6 PRs — when they exist, size them right

**Size budget:** aim for **~400 LOC net change** per PR. Soft cap — if you need to go bigger, include rationale in the PR description and propose how to review it.

Smaller PRs aren't just easier to review — they're easier to bisect when something breaks two PRs later.

**Templates** in `.github/pull_request_template.md`:

```markdown
## Summary
<what this PR does in 1-3 sentences>

## Why
<link to Linear issue; context if not obvious from the ticket>

## Screenshots
<if UI change — screenshot or link to Vercel preview>

## Test plan
- [ ] <behavior to verify>
- [ ] <...>

## Rollback
<what happens if we revert this — any data migration concerns?>
```

Claude Code fills this out reliably when asked.

**Co-author trailer** on every PR description body:

```
Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
```

### 3.7 Review on the rare PR

Since Mike commits most work direct, review only happens on `risk:high` PRs and Josh's copy PRs. No formal SLA needed — review when the PR lands, typically same-day because Claude Code sessions are waiting.

**When Mike reviews Josh's copy PR:** open the Vercel preview, verify voice consistency against [brand-and-style.md](./brand-and-style.md), spot-check that no behavior-affecting files changed. Approve.

**When engineer-friend review is requested on a `risk:high` PR:** explicit ask via PR comment; no time pressure.

### 3.8 Squash merges

All PRs to `v2-rebuild` are squash-merged. Keeps the branch history readable for non-engineer reviewers. The PR title becomes the squash commit message — make it a proper Conventional Commit.

### 3.9 Never do list

**Default-deny in Claude Code settings:**

- `git push` to `main` — ever
- `git reset --hard` — requires explicit confirmation per invocation
- `git rebase -i` — interactive; requires user
- `git commit --amend` on commits not authored by Claude in this session
- `--no-verify` flag on commits — bypasses hooks (we put hooks in place for a reason)
- `git config` writes — never modify global or local git config unprompted
- `rm -rf` — requires explicit confirmation per invocation
- Modifying anything under `_legacy/**` — repo-level hook blocks
- Modifying `.env*` files — hook blocks
- Modifying `.github/workflows/**` — requires explicit per-call approval

**Force-push:** never to `main`. Force-push to feature branches is OK (`git push --force-with-lease`, not `--force`).

### 3.10 Rollback discipline

If a PR breaks something post-merge:
1. Create a revert PR immediately (`git revert <sha>`)
2. Tag the broken commit in Linear for review
3. Re-do the work on a fresh branch with tests added for the regression

Never fix a broken merge with a follow-up "fix" commit to `v2-rebuild` without a revert — makes bisecting impossible.

---

## 4. Linear as Durable Memory

Linear isn't just a ticketing system — it's where context lives across sessions, days, and weeks. Claude Code sessions are ephemeral; tickets are persistent.

### 4.1 MCP setup

Install the Linear MCP server in Claude Code:

```bash
claude mcp add --transport sse linear https://mcp.linear.app/sse
```

This lets Claude Code read tickets, post comments, transition states, and create sub-issues in-session.

### 4.2 Ticket template

Every ticket (except trivial ones) includes these fields:

```markdown
## Acceptance criteria
- [ ] <behavior to verify — "when X, then Y">
- [ ] <...>

## Files likely touched
- `path/to/file.ts`
- `path/to/other.ts`

## Out of scope
- <explicitly not part of this ticket>

## Test plan
- <1-3 items — how we verify acceptance>

## Linked design doc
- [relevant section in docs/rebuild/...]
```

**Granularity rule:** if you can't write a one-sentence acceptance test, the ticket is too big. Break it down.

**Target size:** 2-6 hours of Claude Code time per ticket. Smaller is fine; larger means it needs splitting.

### 4.3 Label taxonomy

Keep under 15 labels total. Ours:

**Area (what it touches):**
- `area:orchestrator`
- `area:teammates`
- `area:auth`
- `area:billing`
- `area:admin`
- `area:content`
- `area:devex`
- `area:gallery`

**Kind (what it is):**
- `kind:feature`
- `kind:bug`
- `kind:chore`
- `kind:rehearsal`
- `kind:eval`
- `kind:copy`

**Process labels:**
- `claude-ready` — well-specified, hand to Claude Code
- `needs-human` — don't pick this up unprompted; requires discussion
- `risk:high` — triggers stricter process (see [§5](#5-risk-tiers))

### 4.4 State machine

```
Triage → Backlog → Ready → In progress → In review → Done
                            (Claude)      (PR open)   (merged)
```

- **Triage:** new ticket, not yet scoped
- **Backlog:** scoped but not prioritized
- **Ready:** at the top of the backlog, meets Definition of Ready (below)
- **In progress:** Claude picks this up, moves it here
- **In review:** PR opened, waiting for review
- **Done:** PR merged

**Definition of Ready:**
- Acceptance criteria written
- Files likely touched noted
- Out of scope clarified
- Linked to design doc if applicable
- Label applied (`claude-ready` or `needs-human`)

Only `claude-ready` + DoR-passing tickets can be picked up by Claude Code.

### 4.5 GitHub integration

Linear's native GitHub integration auto-links PRs to issues by:
- Branch name: `<author>/lin-123-<descriptor>` — Linear infers the issue ID
- PR title prefix: `LIN-123: ...` — explicit link

Use both for redundancy. The integration syncs PR status to Linear automatically — opening a PR moves the ticket to "In review," merging moves it to "Done."

### 4.6 Backlog grooming

Solo pass whenever the backlog feels stale (every week or two). Close tickets that are inactive without a clear plan. Re-sort the top of the backlog. Confirm the next few tickets are well-specified.

### 4.7 What goes to Linear, what doesn't

**In Linear:**
- Every meaningful unit of work
- Bugs as they're discovered
- Research / discovery items
- Weekly grooming outputs

**Not in Linear:**
- Mid-session TODOs — use `// TODO:` comments or `.claude/scratch/` files
- Tiny fixes bundled into a larger PR — just do them
- Design decisions — those go in ADRs or design docs

---

## 5. Risk Tiers

Not all changes deserve the same process. Risk tiering lets us move fast on low-risk work and slow down where the cost of a bug is high.

### 5.1 `risk:high` — triggers extra process

A ticket or PR is `risk:high` if it touches any of these paths:

- `app/api/auth/**`
- `app/api/webhooks/**` (Stripe, GitHub, Vercel)
- `lib/auth/**`
- `lib/security/**`
- `drizzle/schema/**` — any schema change
- `lib/billing/**`
- `lib/ai/safety.ts` — the defensive LLM wrapper
- `middleware.ts`
- `.github/workflows/**`
- `_legacy/**` — should never be touched; the rule catches accidents

### 5.2 `risk:high` process

**Before implementation:**
1. **Plan Mode required.** Claude produces a written plan before any code.
2. **Human-written tests first.** Mike (with Claude's help) writes the test before the implementation. This ensures the tests match *what we want*, not what Claude happens to produce.

**During implementation:**
3. **Smaller PRs.** Aim for <200 LOC for `risk:high` work, not the usual 400.
4. **No `claude-ready` without Mike's review of the ticket.** Josh can't sneak a `risk:high` task past review by labeling it `claude-ready`.

**Before merge:**
5. **`security-review` skill runs.** The skill is invoked automatically on any PR with `risk:high` label or touching listed paths. Findings appear as PR comments.
6. **Mike must approve personally.** Even if Josh reviewed the behavior, Mike signs off on the code for `risk:high` paths.

### 5.3 Standard process (most PRs)

**Default path for everything else:**
1. Plan Mode recommended, not required (still a good habit)
2. Tests for behavior, not necessarily test-first
3. Standard review SLA (24h)
4. Either Mike or Josh can approve

### 5.4 Copy fast lane (Josh's bread and butter)

For PRs that only touch `content/**` (excluding `content/configs/**` and `content/teammates/*/SKILL.md`, which affect product behavior more than copy):

- No test-first requirement
- No `security-review` skill invocation
- Mike does a quick voice-consistency check against `brand-and-style.md`
- Fast merge — same-session if possible

This is where Josh operates. The fast lane reflects that copy changes are genuinely lower-risk and Josh's work should feel unblocked.

**Edge case:** if Josh's copy change alters SKILL.md base persona (not just an adjustment file), it's standard process, not copy fast lane — it affects product behavior.

---

## 6. Claude Code Session Discipline

### 6.1 Session lifecycle

**Default: short, focused sessions. 30 min – 2 hours. One ticket per session.**

Long sessions (>3 hours of active work) degrade — Claude starts forgetting earlier decisions, contradicting CLAUDE.md, repeating itself. Short sessions + checkpoints outperform marathons.

**Session start ritual:**
1. Read the Linear ticket
2. Run Plan Mode (if non-trivial)
3. Review plan, adjust if needed
4. ExitPlanMode and execute

**Session end ritual:**
1. Commit or stash WIP
2. Post Linear comment: Status / Files touched / Next step / Blocked on
3. Update PR description if one's open
4. Close the session (or `/clear` and start fresh for a new ticket)

### 6.2 Plan Mode

Always use Plan Mode for:
- Anything `risk:high`
- Any ticket where the approach isn't obvious
- Any change spanning >3 files
- Any ticket expected to take >1 hour

Plan Mode workflow:
1. "Plan this, don't execute yet"
2. Review the plan — is it hitting the acceptance criteria? Is anything missing? Is the approach reasonable?
3. Push back: "Looks good, but do X instead of Y in step 3"
4. "ExitPlanMode and execute"

Spending 5 minutes planning saves 30 minutes of wrong-direction work.

### 6.3 The "three options" pattern

For design decisions inside a session:

> "Before you pick an approach, propose three options with tradeoffs. I'll choose."

Forces Claude to consider alternatives instead of committing to the first plausible idea. Especially valuable for:
- Data model decisions
- API shape decisions
- Testing strategy decisions
- Error-handling approach decisions

### 6.4 Checkpoint ritual

At the end of every session, Claude Code posts a comment on the active Linear ticket:

```markdown
## Session checkpoint — [date]

**Status:** in progress / blocked / ready for review

**Files touched:**
- `path/to/file.ts` — added X, refactored Y
- `path/to/other.ts` — bug fix for Z

**Next step:**
<what would happen in the next session>

**Blocked on:**
<if blocked, what's the block>

**Open questions:**
<any decisions we deferred>
```

Makes the next session (whether same user or the other) pick up cleanly.

### 6.5 Scratch files for multi-day work

For any ticket spanning multiple sessions, Claude maintains a scratch file:

```
.claude/scratch/lin-123-orchestrator-middleware.md
```

This file is **gitignored** (add `.claude/scratch/` to `.gitignore`). It tracks:
- What's done
- What's next
- Open questions
- Decisions we've made
- Files we've touched

Next session opens with: "Read `.claude/scratch/lin-123-orchestrator-middleware.md` and continue where we left off."

Works better than `/compact` for multi-day state because it's explicit, human-readable, and survives across sessions.

### 6.6 When to `/clear`, `/compact`, or start fresh

| Situation | Action |
|---|---|
| Switching to a new ticket in the same session | `/clear` |
| Mid-ticket, context got heavy from exploration | `/compact` |
| Starting a new session | Open a new Claude Code session fresh |
| Model is repeating itself or contradicting CLAUDE.md | Start fresh immediately |
| Made a major decision and want it "sealed" | End session; open fresh for next step |

**Don't rely on `/compact` as a memory-management strategy.** It's a survival tool for when context got away from you. The right move is preemptive: end sessions cleanly, checkpoint, start fresh.

### 6.7 Subagents — read-only investigation only

Subagents (spawned via Claude Code's Task tool inside a session) are good for:
- "Search the codebase for all references to X while I work on Y"
- "Check these three possible implementations and summarize tradeoffs"
- "Validate that the new schema doesn't conflict with existing RLS policies"

Subagents are **not** good for:
- Writing code in parallel (coordination cost dominates)
- Any task requiring cross-file mutation
- Long-running work (they have their own context limits)

Default posture: **use subagents for reads, not writes**.

---

## 7. Prompt Patterns

A small library of patterns that consistently produce better output. Expand as we find more.

### 7.1 "Plan first"

> "Before you write any code, lay out a plan with: files you'll touch, public API of new functions, tests you'll add. Wait for my approval."

This is Plan Mode framed as a prompt. Use when you want more control than Plan Mode's built-in UI offers.

### 7.2 "Three options"

> "Before you pick, give me three approaches with tradeoffs. I'll choose."

Forces exploration. See [§6.3](#63-the-three-options-pattern).

### 7.3 "Match the existing pattern"

> "Look at how `lib/ai/poe.ts` is structured and match that pattern for `lib/ai/dax.ts`."

Better than describing the pattern in prose. Claude infers structure from the example faster than it reads about it.

### 7.4 "Adversarial check"

> "Now play the role of a security reviewer and find three issues with this code."

Surfaces real problems about half the time. Cheap spot-check before merge.

### 7.5 "Ship-or-not?"

> "Pretend you're me and have to ship this on Friday. What would you fix first?"

Calibrates priority. Useful when the PR has too many loose ends and you're tempted to polish everything.

### 7.6 "What did you change?"

At session end:

> "Summarize every file you touched and why."

Catches scope creep and unintended edits. Often surfaces "oh, I also refactored Z" which shouldn't have been part of this PR.

### 7.7 "Read before write"

> "Before you propose an implementation, read these files: [list]. Then propose."

Forces Claude to ground the implementation in existing code, not in generic patterns from training.

### 7.8 "Why not simpler?"

> "Your proposal has 3 new files and a new abstraction. Is there a simpler way that uses what's already there?"

Counter to Claude's tendency to over-engineer greenfield work.

### 7.9 "Write the test first"

For `risk:high` work:

> "Before implementing, write the tests that would pass if this feature worked correctly. We'll review the tests first, then you'll implement."

Forces Claude to articulate the expected behavior precisely. Often surfaces missing acceptance criteria.

---

## 8. Testing Discipline

### 8.1 Test at boundaries, not at implementation details

Prioritize tests that verify behavior at surfaces where the system meets something else:

- **Server Actions** — every action has a happy-path test and an authz-check test
- **Zod schemas** — edge cases, boundary values, invalid inputs
- **Orchestrator routing** — every middleware, every handoff, every phase transition
- **Webhook handlers** — signature verification, idempotency, error cases
- **LLM safety wrappers** — input delimiting, output scanning, moderation queue

Don't write tests for:
- Internal helper functions with obvious behavior
- React component rendering details (test via Playwright behavior instead)
- Trivial getters / setters

### 8.2 Risk-tier → test posture

| Risk tier | Test posture |
|---|---|
| `risk:high` | Tests written or reviewed by Mike **before** implementation. 100% happy-path coverage + authz-check tests. Adversarial evals if LLM-involved. |
| Standard | Behavior tests for new features. Coverage thresholds on `lib/` (see below). |
| Copy fast lane | No test requirement. Voice check via `brand-and-style.md` is the review. |

### 8.3 Vitest / Playwright / Promptfoo — role of each

- **Vitest** — unit + integration tests on TypeScript code. Runs fast, runs locally, runs in CI.
- **Playwright** — end-to-end tests against a Vercel preview deployment. Smoke tests initially; expand as we build.
- **Promptfoo** — prompt eval suite. YAML fixtures. LLM-as-judge for subjective quality; `contains` / `not-contains` for objective checks.

### 8.4 LLM mocking strategy

**Unit tests** mock at the HTTP level via MSW (Mock Service Worker), not at the Anthropic SDK level. MSW tests your wrapper layers too — catches bugs in `lib/ai/call.ts` that SDK-level mocks miss.

**Integration tests** may use real Anthropic calls for smoke paths, but guarded behind a flag so PR CI doesn't burn API credits.

**Mock setup:**

```typescript
// tests/setup.ts
import { setupServer } from 'msw/node'
import { handlers } from './msw-handlers'

export const mswServer = setupServer(...handlers)

beforeAll(() => mswServer.listen())
afterEach(() => mswServer.resetHandlers())
afterAll(() => mswServer.close())
```

### 8.5 Coverage targets

Coverage is a smoke alarm, not a target. Low coverage = something might be wrong. High coverage ≠ correct.

- **`lib/`** — 70% line coverage floor
- **`lib/auth/**`, `lib/billing/**`, `lib/security/**`** — 90% branch coverage (not line — branches)
- **Server Actions** — 100% happy path + 100% authz checks via integration tests
- **React components** — no coverage target; test behavior via Playwright

Report coverage in CI; fail the build if below threshold. Don't obsess over inching it higher.

### 8.6 Promptfoo — non-blocking → blocking graduation

**Current state:** non-blocking (comments on PR, doesn't fail CI).

**Graduation criteria:** blocking once **≥30 stable evals OR 2026-06-01**, whichever first.

Rationale: early on we don't have enough evals for trend tracking, and noisy evals would block real work. Once we have a stable suite, regression matters.

### 8.7 Every shipped bug becomes an eval

When we ship an LLM-related bug (wrong teammate behavior, prompt injection that slipped through, handoff that broke):

1. Fix the bug
2. **Before merging the fix, add an eval to `tests/evals/` that would have caught it**
3. The eval stays forever as regression protection

Over time, the eval suite becomes a record of every prompt-related thing we've learned. Data flywheel for prompt quality.

### 8.8 Adversarial eval suite

`tests/evals/_adversarial/` contains known prompt-injection attempts, jailbreak prompts, and prompt-leak attempts. Every customer-facing teammate's CI eval suite includes these. Real attacks observed in production graduate into the suite (per [§8.7](#87-every-shipped-bug-becomes-an-eval)).

---

## 9. Documentation in Code

### 9.1 When to JSDoc, when not to

**JSDoc on:**
- Exports with non-obvious behavior, side effects, or invariants
- Functions where the type signature doesn't make intent clear
- Any function in `lib/ai/`, `lib/orchestrator/`, `lib/security/` — these are load-bearing

**Don't JSDoc:**
- Internal helpers
- Functions whose purpose is obvious from the type signature
- React components (prop types + component name are usually enough)

### 9.2 Inline comment density

Match density to risk. One-page React component: ~zero comments. 50-line auth middleware: comment every branch explaining the threat model.

**Document "why," never "what."**
- ❌ `// Increment counter`
- ✅ `// We increment before the async call because concurrent requests would otherwise double-count`

### 9.3 `CLAUDE-NOTE` and `CLAUDE-EXCEPTION` conventions

Two specific comment prefixes:

**`// CLAUDE-NOTE:`** — context for future Claude sessions. Survives forever.

```typescript
// CLAUDE-NOTE: We intentionally don't cache this because the config
// can change at admin-review time; cache invalidation would be worse
// than the ~50ms read cost.
const config = await loadConfig(roleId)
```

**`// CLAUDE-EXCEPTION:`** — documented violation of a convention. Triggers explicit human review.

```typescript
// CLAUDE-EXCEPTION: Using `any` here because Stripe's TypeScript
// types for this specific webhook event are incorrect upstream.
// See https://github.com/stripe/stripe-node/issues/12345
const event: any = rawEvent
```

CI can grep for `CLAUDE-EXCEPTION` and require a linked issue or ADR explaining the exception.

### 9.4 Module READMEs

Module READMEs earn their place only in directories where there's a coherent subsystem with non-obvious entry points.

**Planned module READMEs:**
- `lib/orchestrator/README.md` — teammate orchestration flow
- `lib/ai/README.md` — LLM call wrapping, prompt assembly, compaction
- `lib/mcp/README.md` — MCP server tools, token lifecycle
- `lib/email/README.md` — template system, send pipeline, idempotency

**Template:**

```markdown
# <module name>

## Purpose (one sentence)

## Public surface (exports in dependency order)

## Invariants (what must always be true)

## How to extend (where to add a new X)

## Gotchas
```

**Don't** write a README in every folder. One per major subsystem only.

### 9.5 ADR log

Architecture Decision Records live in `docs/adr/`. One short markdown file per significant decision.

**Template:**

```markdown
# ADR <number>: <short title>

Status: Proposed / Accepted / Superseded
Date: YYYY-MM-DD
Context: <what problem are we solving>
Decision: <what we chose>
Consequences: <what this implies>
Revisit if: <conditions that would prompt reconsideration>
```

Use ADRs for:
- Significant architecture decisions (e.g., "no LangGraph," "Server Actions over tRPC," "Anthropic-only LLM provider")
- Decisions with clear tradeoffs worth preserving the reasoning of
- Decisions likely to be revisited

Don't use ADRs for:
- Tactical code decisions (those live in comments or commit messages)
- Copy / content decisions
- One-way doors that don't need re-litigation

**Starter ADRs to write during the rehearsal slice:**
1. No LangChain / LangGraph / CrewAI (we chose in-house orchestrator)
2. Server Actions over tRPC
3. Biome over ESLint + Prettier
4. Anthropic-only LLM provider
5. Co-located MCP server (vs. separate service)

---

## 10. Security Hygiene

### 10.1 Secrets — never paste, never log

- **Never paste a secret value into a Claude Code prompt.** Use `.env.local` references; Claude can see the names without seeing values.
- **Pre-commit hook** runs `gitleaks` or `trufflehog` — blocks any commit containing strings matching known secret patterns (`sk_live_`, `sk-ant-`, `re_`, `ghp_`, AWS access key patterns, etc.)
- **`.env*` in `.gitignore`** + CI job fails if `.env` (without `.example`) appears in the diff
- **GitHub secret scanning** enabled at the repo level

### 10.2 Dependency scanning

- **Dependabot** — auto-PRs for security advisories. Auto-merge patches; review minors; discuss majors.
- **Socket.dev** — supply-chain awareness. Flags abandoned packages, install scripts, suspicious permissions. Free tier is enough at our scale.
- **GitHub CodeQL** — static analysis for common vulns. Free for public repos; enabled.

### 10.3 Forbidden-deps list

Packages we've decided not to use, with reasons:

| Package | Reason | Use instead |
|---|---|---|
| `request` | Deprecated, abandoned, security issues | native `fetch` |
| `node-fetch` | Node 18+ has native fetch | native `fetch` |
| `moment` | Huge bundle; immutable APIs better | `date-fns` or `Intl` |
| `lodash` | Modern JS has most of it natively | native ES |
| `axios` | `fetch` is native | native `fetch` |

Enforced via Biome rule + CI check. List grows as we encounter more.

### 10.4 PR review security checklist

Surfaced in the PR template for every PR:

- [ ] Any new `dangerouslySetInnerHTML`?
- [ ] Any new `eval` / `new Function`?
- [ ] Any new SQL not parameterized via Drizzle?
- [ ] Any new env var that isn't in `lib/env.ts`?
- [ ] Any new dependency? (Cross-check abandoned / typosquat lists)
- [ ] Any new external HTTP call? (Allowed domain? Rate-limited?)
- [ ] Any new Server Action without authz check?

Reviewers run through the checklist explicitly on `risk:high` PRs.

### 10.5 `security-review` skill

The `security-review` skill already exists in `.claude/skills/`. Runs automatically on:
- Any PR with `risk:high` label
- Any PR touching paths in [§5.1](#51-riskhigh--triggers-extra-process)

Findings appear as PR comments. Mike reviews findings before merging.

### 10.6 Prompt injection defenses

Architecture doc §11.2 has the defensive patterns. Playbook enforcement:

- Every LLM call goes through `lib/ai/call.ts` — never direct SDK calls
- User content always wrapped in `<user_message>...</user_message>` tags
- Structured outputs (Zod-validated) for any orchestrator decision
- Output scanner on every response; flagged responses quarantined
- Adversarial eval suite tests prompt injection attempts; grows from real incidents

### 10.7 Tool-use minimization

For customer-facing teammates, fewer tools = smaller blast radius on injection.

- Read-only tools by default
- Write capability requires explicit human-in-the-loop confirmation
- MCP server tools are typed via Zod; inputs validated before execution
- Every MCP tool call is audit-logged

---

## 11. Copy Contributions

When Josh contributes copy, he works primarily in `content/` — teammate adjustment layers, curriculum bullets, pro-tips, email templates, landing copy. His sessions are narrow scope (usually 1-3 files, a few lines each) and open a PR for Mike to check voice consistency against [brand-and-style.md](./brand-and-style.md).

Base teammate SKILL.md files and `content/configs/**` affect product behavior and get a heavier review — pair with Mike for those.

Permission-wise, a scoped Claude Code config for Josh that only allows writes to `content/**` and `docs/**` is worth setting up when he starts contributing.

---

## 12. Observability of the Dev Process

Keep it boring. We're a 2-person team building a substantial product; fancy dashboards aren't earned yet.

### 12.1 Signals worth tracking

Five metrics, all weekly:

1. **PRs merged** (from GitHub Insights — free)
2. **PRs reverted within 7 days** (manual tag — anything reverted is a signal)
3. **"Claude struggled" tags** on Linear tickets (took >2× estimate or required >1 redo)
4. **Promptfoo eval pass rate trend** (emitted by the eval suite)
5. **CI pass rate on first push** (GitHub Actions — trend down = less reliable code)

### 12.2 Claude retro — weekly 15 min

Mike + Josh, once a week:
- Review "Claude struggled" tags from the past week
- Look for clustering (e.g., "every billing ticket struggled" tells you the billing docs need work)
- Look for patterns in Promptfoo failures
- Discuss one lesson learned to apply next week

### 12.3 Claude Code session transcript archive

Claude Code already writes session transcripts to `~/.claude/projects/<project>/sessions/*.jsonl`. When something goes sideways, grep them. **Don't build a dashboard for them.**

### 12.4 What we don't do

- **No "agent observability" SaaS** in 2026 — category is too immature
- **No "lines of code per session"** or similar vanity metrics — reward verbosity
- **No formal productivity measurement** — the metrics that matter (did it ship, does it work, is it trustworthy) aren't quantifiable from agent telemetry

---

## 13. Pre-Build Rehearsal

Before starting the full MVP, a 3-5 day vertical-slice rehearsal to flush out architectural surprises cheaply.

### 13.1 The rehearsal slice

**Scope:** *User signs in → starts a Phase 1 Spark conversation → POE asks the opening question → Morgan types a response → the response saves as an artifact → the artifact appears on a `/settings` page.*

Touches every layer:
- Next.js route + React Server Components
- Server Action (with Zod validation)
- Auth.js magic-link login
- Drizzle + Neon DB write
- Anthropic LLM call via Vercel AI SDK v5
- Langfuse trace
- Inngest function (post-save hook)
- PostHog event
- Playwright smoke test

No design polish. No error UX. No retries. Just the happy path exercising every layer.

### 13.2 Deliverables — patterns and risk list, not code

**Pattern catalog** (`docs/patterns/`) — reusable patterns we discovered:
- How we structure a Server Action
- How we wrap an LLM call
- How we mock Anthropic for tests
- How we write a Zod schema with shared types
- How we handle a webhook

**Risk list** — things that surprised us:
- "Streaming through Server Actions has X gotcha"
- "Auth.js v5 beta has Y rough edge with Drizzle adapter"
- "Vercel preview + Neon branching has Z quirk"

**Budget check** — actual time-per-feature data. If the rehearsal took 3× the estimate, the MVP estimate is 3× off too. Replan before starting.

**Go/no-go gate** — if anything in the stack feels wrong by end of rehearsal, swap it now (not in week 6). Example: if we find Auth.js v5 beta is too rough, switch to Clerk before investing further.

### 13.3 Rehearsal discipline

- **Budget: 3-5 working days, max 1 week**
- **Deliverable is the pattern catalog + risk list, not shipped product**
- **Throw the rehearsal code away by default.** Keep only if it's genuinely production-quality AND the patterns match 1:1.
- **If tempted to extend the rehearsal into real MVP work,** stop. Declare rehearsal done, document patterns, start fresh.

### 13.4 Pre-rehearsal hypothesis

Write down what you expect to be hard before you start. After the rehearsal, score how right you were. This calibrates future estimates.

Example pre-rehearsal hypothesis:
- **Expected hard:** wiring Anthropic streaming through Server Actions
- **Expected easy:** Auth.js magic link
- **Expected surprising:** probably Langfuse tracing or Inngest cold starts

---

## 14. Roles

Mike builds the product with Claude Code. Josh occasionally contributes copy, with Mike reviewing for voice. Engineer friends review design docs and critical PRs when asked — not day-to-day contributors.

(Not to be confused: Claude Code is the agent we use to build. Claude Sonnet/Opus/Haiku are the models the product calls at runtime — see [technical-architecture.md §5](./technical-architecture.md#5-llm-strategy).)

---

## 15. Cadences & Rituals

Keep it light. Single-builder flow doesn't need meeting ceremony.

**As-needed:**
- Linear grooming — whenever the backlog gets stale (solo pass, ~10 min). Close dead tickets, re-sort the top.
- Claude retro — when something feels off. Look at recent friction, adjust the playbook if there's a real pattern.

**Once the product is live:**
- Data flywheel review — `/admin/signals` queue. Open PRs for accepted signals. Cadence TBD based on signal volume; probably weekly at first.

**Quarterly:**
- CLAUDE.md refresh PR (prune stale lines, re-validate links)
- Dependency health check (audit + major upgrades)
- Re-read persona + prd-notes — does the product still match our customer?

---

## 16. Getting Started for Claude Code

### 16.1 Before any session

1. Read the root [CLAUDE.md](../../CLAUDE.md)
2. Read the Linear ticket you're picking up
3. If the ticket references a design doc section, read it
4. Plan Mode for anything non-trivial

### 16.2 During a session

- Work within the ticket scope — resist touching adjacent files unless necessary
- When touching `risk:high` paths, write tests first (or review human-written tests)
- Use the [prompt patterns](#7-prompt-patterns) that fit the task
- If you find `_legacy/` tempting, stop — the answer is never to modify `_legacy/`
- If you need to break a convention, add a `CLAUDE-EXCEPTION` comment with rationale

### 16.3 At session end

1. Commit or stash WIP
2. Post a Linear checkpoint comment (Status / Files touched / Next step / Blocked on)
3. Update PR description if one's open
4. If you spotted something worth revisiting, open a follow-up Linear ticket
5. `/clear` or close the session

### 16.4 When in doubt

- Check [CLAUDE.md](../../CLAUDE.md) for the pointer
- Check [prd-notes.md](./prd-notes.md) for product questions
- Check [technical-architecture.md](./technical-architecture.md) for how questions
- Check this playbook for process questions
- Ask Mike (or Josh for copy questions) if still unclear — better than guessing

---

*This doc evolves as we build. Updates via normal PR workflow. Changes should be reviewed by Mike; Josh can propose.*
