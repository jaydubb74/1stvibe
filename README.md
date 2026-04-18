# 1stvibe.ai

An AI-coached learning experience that takes non-engineer professionals from "I've heard of vibe coding" to "I shipped a live website I built myself with Claude Code" in a focused 4–6 hour weekend. For $39.

## Status: v2 rebuild in progress

The live site at [1stvibe.ai](https://1stvibe.ai) is running the v1 codebase, preserved in `_legacy/`. We're rebuilding from the ground up — new product, new tech, new learning experience — on the `v2-rebuild` branch.

## What to read

- **[docs/rebuild/persona.md](./docs/rebuild/persona.md)** — target customer
- **[docs/rebuild/prd-notes.md](./docs/rebuild/prd-notes.md)** — product definition
- **[docs/rebuild/technical-architecture.md](./docs/rebuild/technical-architecture.md)** — implementation blueprint
- **[docs/rebuild/brand-and-style.md](./docs/rebuild/brand-and-style.md)** — visual identity + voice
- **[CLAUDE.md](./CLAUDE.md)** — Claude Code guidance for working in this repo

## What's in the box

| Path | What it is |
|---|---|
| `docs/rebuild/` | Active v2 design docs (authoritative) |
| `docs/_legacy/` | Archived v1 docs (reference) |
| `_legacy/` | Archived v1 code (reference, not wired into build) |
| `public/` | Brand assets (logo, fonts) |
| `app/`, `components/`, `lib/`, `drizzle/`, `content/` | (empty — v2 code populates as we build) |

## Branches

- `main` — v1 live site (not touched during rebuild)
- `archive/v1` branch + `v1-final` tag — frozen v1 snapshot
- `v2-rebuild` — active rebuild work (this branch)

See [prd-notes.md §12](./docs/rebuild/prd-notes.md#12-archive--rollback-strategy) for the archive/rollback strategy.

## Running the code

**V1 (live site):**
```bash
git checkout v1-final
npm install
npm run dev
```

**V2 (rebuild in progress — no buildable app yet):** wait until we have the first vertical slice rehearsed. Steps will be added here as scaffolding lands.

## Contributing

This project is maintained by Mike Tadlock and Josh Wetzel, working in Claude Code. See [CLAUDE.md](./CLAUDE.md) for Claude Code guidance and [docs/rebuild/engineering-playbook.md](./docs/rebuild/engineering-playbook.md) (coming soon) for working conventions.
