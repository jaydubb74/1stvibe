# Documentation Standards

> Updated: 2026-02-26

## When to Document

- **After completing a feature** — Document what was built, why, and how it works
- **After material architecture changes** — New API routes, schema changes, new integrations
- **After strategy decisions** — New audience insights, brand voice updates, positioning changes
- **When onboarding is painful** — If a new Claude Code session struggles with context, the docs need updating

## What to Document

| Category | What goes here | Example |
|----------|---------------|---------|
| **Strategy** (`docs/strategy/`) | Why we make decisions — vision, audience, voice | "Our audience is non-technical creators" |
| **Architecture** (`docs/architecture/`) | How the system works — tech stack, data flow, APIs | "Demo generation uses GPT-4o with a 64-line system prompt" |
| **Guides** (`docs/guides/`) | How to build correctly — style, code standards, review criteria | "Primary color is indigo-600, use Lucide for icons" |
| **Features** (`docs/features/`) | What specific features do — behavior, files, edge cases | "Users get 3 free tweaks, then funnel to tutorial" |

## Format

Every doc should have:

1. **Title** — `# Clear Title` as the first line
2. **Updated date** — `> Updated: YYYY-MM-DD` below the title
3. **Content** — Organized with `##` sections, tables where helpful
4. **Related Docs** — `## Related Docs` section at the bottom with links to connected docs

### Cross-Links

Use relative paths for all links between docs:

```markdown
[Style Guide](../guides/style-guide.md)
[Architecture Overview](../architecture/overview.md)
[Vision](./vision.md)  <!-- same directory -->
```

## Where New Docs Go

| If it's about... | Put it in... | Named like... |
|------------------|-------------|---------------|
| Product direction, audience, voice | `docs/strategy/` | `topic-name.md` |
| System design, APIs, database | `docs/architecture/` | `topic-name.md` |
| How-to-build conventions | `docs/guides/` | `topic-name.md` |
| A specific feature's behavior | `docs/features/` | `feature-name.md` |

Use kebab-case for filenames. Be specific: `auth-and-email.md` not `auth.md`.

## Updating INDEX.md

When you add a new doc:

1. Open `docs/INDEX.md`
2. Add an entry in the appropriate category section
3. Include: relative link + one-line description
4. Keep entries alphabetical within their category

## Updating CLAUDE.md

Update `CLAUDE.md` only when:
- The tech stack changes (new framework, new service)
- Key commands change (new scripts, new migration workflow)
- Architectural conventions change (new file organization patterns)
- Brand voice fundamentally shifts

`CLAUDE.md` stays lean. Details live in `docs/`.

## Writing Tips

- **Be specific** — "indigo-600" not "blue"
- **Include file paths** — `components/demo/DemoForm.tsx` not "the demo form"
- **Show, don't just tell** — Code snippets, tables, and examples beat paragraphs
- **Keep it current** — Outdated docs are worse than no docs
- **Write for a new Claude Code session** — Assume the reader has zero context about this project

## Related Docs

- [INDEX.md](../INDEX.md) — Master table of contents
- [Code Standards](./code-standards.md) — Code conventions to reference from docs
