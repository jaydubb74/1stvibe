# v1 Legacy Code

This directory holds the v1 1stvibe codebase, preserved for reference during the v2 rebuild. **It is not wired into the v2 build** — no imports resolve here, no routes are served from here, no code runs from here.

## What's here

- `app/` — v1 Next.js routes (homepage, demo, tutorial, site viewer, etc.)
- `components/` — v1 React components
- `lib/` — v1 utilities and integrations (OpenAI, Pexels, auth, db, rate-limit)
- `content/` — v1 tutorial MDX files
- `drizzle/` — v1 database schema
- `scripts/` — v1 one-off scripts
- `types/` — v1 shared TypeScript types
- `dev.sh` — v1 dev script
- `instrumentation.ts` — v1 Next.js instrumentation hook
- `eslint.config.mjs` — v1 ESLint config (v2 uses Biome)

Sibling directory `/docs/_legacy/` holds archived v1 documentation (architecture, features, style guide originals, strategy docs).

## Why preserve instead of delete

- **Reference during v2 build.** Specific v1 patterns, prompts, or UI decisions may be worth referencing as we rebuild.
- **Style guide source.** The v1 style guide and brand kit have been consolidated into `/docs/rebuild/brand-and-style.md` — originals archived here for traceability.
- **Git history continuity.** All v1 code was moved via `git mv`, preserving blame and history through the rename.

## How to actually run v1

If you need v1 running:

```bash
git checkout v1-final   # or: git checkout archive/v1
npm install
npm run dev
```

Both `v1-final` (tag) and `archive/v1` (branch) point at the final v1 state before the rebuild began. See [prd-notes.md §12 Archive & Rollback Strategy](../docs/rebuild/prd-notes.md#12-archive--rollback-strategy).

## What v2 uses from v1

Nothing directly. But we carry forward:

- **Brand identity** (colors, fonts, voice) — consolidated into [`/docs/rebuild/brand-and-style.md`](../docs/rebuild/brand-and-style.md)
- **Logo and brand assets** — still at `/public/`
- **Base Node.js + Next.js tooling decisions** — though many dependencies are being refreshed for v2

## Don't

- Don't import from `_legacy/` in v2 code. If you need a pattern, copy it explicitly into the v2 location and adapt. `_legacy/` may be deleted entirely once v2 ships.
- Don't edit files in `_legacy/`. If a file is worth evolving, extract what's needed and put the v2 version in the right `app/`, `components/`, or `lib/` location.
- Don't reference `_legacy/` in `CLAUDE.md`, imports, or build configs.

## Exclusion from v2 tooling

When v2 build tooling is set up (next step after the engineering playbook is drafted), `_legacy/` should be excluded from:

- Next.js compilation (`next.config.ts` — excluded from page discovery)
- TypeScript project (`tsconfig.json` — added to `exclude`)
- Biome linting (`biome.json` — added to `files.ignore`)
- Test runners (Vitest config — excluded from `include` globs)
