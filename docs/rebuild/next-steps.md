# Next Steps — Session Handoff (2026-04-19)

> Written at the end of a long session. The NEXT Claude Code session should read this file first, then `CLAUDE.md`, before doing anything else.

---

## TL;DR

All five v2 design docs are complete and committed on the `v2-rebuild` branch:

- [persona.md](./persona.md) — target customer (Morgan the AI-Curious Pro)
- [prd-notes.md](./prd-notes.md) — product definition (1,260 lines, 13 sections)
- [technical-architecture.md](./technical-architecture.md) — implementation blueprint (2,800 lines, 18 sections)
- [engineering-playbook.md](./engineering-playbook.md) — process + Claude Code conventions (1,100 lines, 16 sections)
- [brand-and-style.md](./brand-and-style.md) — visual + voice (consolidated from v1 docs)
- [build-plan.md](./build-plan.md) — sequenced implementation plan (9 phases, ~50 ticket seeds, 5 milestones)

v1 code is archived in `_legacy/` (preserved via `git mv` for blame continuity).

**The actual build has not started.** We're at the setup boundary, ready to begin Phase A (Foundation) of `build-plan.md` once the account consolidation below is complete.

---

## What happened in this session (2026-04-19)

Long build-up session that produced the entire v2 design doc set. Key moves:

- Drafted the five design docs through iterative user interviews + two focused web-research passes
- Archived v1 code and docs to `_legacy/` (all via `git mv` so git blame continuity is preserved)
- Consolidated three v1 brand-related docs into a single v2 `brand-and-style.md`
- Rewrote root `CLAUDE.md` and `README.md` for v2
- Attempted Linear workspace setup; hit friction from distributed ownership across accounts
- Handled the April 19 Vercel security incident (Mike not in affected subset; precautionary: 2FA on, tokens rotated, integrations reviewed — clean)
- Agreed with Josh on account consolidation: Mike creates a fresh repo under his own GitHub, migrates everything there, owns all integrations

---

## The account consolidation plan (Mike + Josh aligned)

Josh owns the current repo at `jaydubb74/1stvibe`. Mike is the primary builder. All of today's Linear/Vercel/GitHub integration friction came from the split ownership. Consolidating under Mike's accounts eliminates that for good.

**Decision:** Mike creates a FRESH repo on his account (`Alt0Pal0/1stvibe`) and pushes everything there. Josh becomes a collaborator. The old `jaydubb74/1stvibe` can be archived or left dormant.

---

## Migration checklist — Mike to execute between sessions

Do these before starting the next Claude Code session.

### 1. Create the fresh repo

1. Go to https://github.com/new while signed in as `Alt0Pal0`
2. Repository name: `1stvibe`
3. Private
4. **Do NOT** initialize with README / .gitignore / license — we have content already
5. Create

### 2. Push current work to the new repo

From this existing worktree (wherever this session has been running):

```bash
# Add the new repo as a second remote
git remote add mike https://github.com/Alt0Pal0/1stvibe.git

# Push the main branch (has v1 code + current state)
git push mike main

# Push the v2-rebuild branch (has all our design docs)
git push mike v2-rebuild

# Push tags (v1-final tag is our rollback insurance policy)
git push mike --tags

# Push the archive/v1 branch
git push mike archive/v1
```

Then flip the remote over so `origin` = new repo:

```bash
git remote rename origin old-origin
git remote rename mike origin
git remote -v  # verify: origin should now point to Alt0Pal0/1stvibe
```

Optional: leave `old-origin` for a while as safety, or remove: `git remote remove old-origin`.

### 3. Invite Josh as collaborator

On the new repo: **Settings → Collaborators → Add people** → invite `jaydubb74` with write access. He can continue copy contributions via PR from his account.

### 4. Reconnect Vercel to the new repo

1. Vercel dashboard → find the existing `1stvibe` project
2. Project Settings → Git → disconnect from old repo
3. Connect to `Alt0Pal0/1stvibe`
4. Deploy branch: `main` (still the live v1 site until cutover)
5. Verify: `git push origin main` triggers a Vercel deploy

### 5. Install Linear GitHub App on your account

1. https://github.com/apps/linear/installations/new
2. Install on `Alt0Pal0`, scoped to **only** `1stvibe` (not all repos)
3. Permissions: standard (read checks/metadata + read/write issues and PRs)

If LiarsDice is already included in your Linear install from today's session, leave it — it's for your other Linear workspace.

### 6. Connect Linear workspace to GitHub

1. Go to https://linear.app/1stvibe/settings/integrations/github
2. Click **Connect workspace** (should work now that the GitHub App install matches your account)
3. Select your install when prompted
4. Enable **Private repositories** and **Public repositories** toggles

### 7. (Optional) Archive the old repo

On `jaydubb74/1stvibe`: Settings → scroll to bottom → **Archive this repository** → confirm. Freezes it read-only. Our `v1-final` tag + `archive/v1` branch live on in Mike's repo now, so this is safe.

---

## Next Claude Code session — how to kick it off

**Before starting:** make sure you're in a worktree/clone of the new `Alt0Pal0/1stvibe` repo.

**Kickoff prompt:**

> Resume the 1stvibe v2 build. Read `docs/rebuild/next-steps.md` first for context, then `CLAUDE.md` for orientation. Integration setup should be complete — GitHub + Vercel + Linear are all on my account now. We're ready to start Phase A (Foundation) of `docs/rebuild/build-plan.md`.
>
> First thing: verify Linear MCP is available in this session (check available tools). If it is, create the label taxonomy from build-plan §13 plus tickets for Phase A (A1–A7). If Linear MCP isn't loaded, stop and tell me so we can fix before proceeding.

---

## State notes for the next session

### Design docs are authoritative — don't re-derive decisions

Every non-trivial decision made today is captured in one of the five design docs. When in doubt, read the doc, don't re-ask Mike. In particular:

- **Product questions** → `prd-notes.md` (13 sections, TOC at top)
- **Tech stack / architecture** → `technical-architecture.md` (18 sections)
- **How we work with Claude Code** → `engineering-playbook.md` (16 sections)
- **Colors, voice, component patterns** → `brand-and-style.md`
- **Who we're building for** → `persona.md`

### Known state as of 2026-04-19

- **Vercel:** Pro plan, 2FA on, tokens rotated (only current session remains), integrations clean (just Neon). Mike was NOT in affected subset of the April 19 breach.
- **Domain:** `1stvibe.ai` is active, v1 site still deploying from `main`.
- **v1 site:** live, running the old codebase preserved at tag `v1-final` / branch `archive/v1`.
- **Linear workspace:** `1stvibe`, team key `1ST`, cycles disabled (continuous flow).
- **Linear tickets:** NONE yet. Build plan is the seed material; tickets get created from it in the next session.
- **Claude Code MCP:** Linear MCP was registered on user scope today. Should load automatically in new sessions.

### Don't

- Don't touch `_legacy/` — it's archived v1 code for reference only.
- Don't commit direct to `main` — that's the live v1 site. All work happens on `v2-rebuild`.
- Don't re-litigate decisions already in the design docs — if something feels wrong, flag it, but don't just redo it.

### Do

- Start with Phase A tickets. Commit directly to `v2-rebuild` for standard-risk work. Use feature branches + PRs only for `risk:high` (see `engineering-playbook.md` §5).
- Read the relevant design doc section before starting any ticket.
- Use Plan Mode for anything non-trivial.
- Post a Linear checkpoint comment at session end (per `engineering-playbook.md` §6.4).

---

## After migration + first successful session: delete this file

Once the next session confirms everything works, this `next-steps.md` has served its purpose. Delete it in a cleanup commit — it's a transient handoff, not a permanent doc.
