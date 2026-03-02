# AI Tools Explained Page

> Updated: 2026-03-01

## Overview

A static informational page at `/tools-explained` that helps non-technical users understand the AI tool landscape for building websites and apps. Linked from the main nav as "AI Tools Explained."

**File:** `app/tools-explained/page.tsx`

## Purpose

Demystify the AI tool ecosystem for 1stvibe.ai's target audience — non-technical creators who have heard about AI coding but don't know where to start or what to buy.

## Page Structure

```
[Hero — indigo-50 gradient]
  Title: "AI Tools Explained" (indigo-600)
  Subhead: "Stop Guessing. Start Building." (bold) + intro copy

[Table of Contents — gray-50 band]
  Pill-style anchor links to each section

[6 Content Sections]
  01. AI Coding Agents
  02. AI App Builders ("Vibe Coding")
  02b. AI Image Generators
  03. AI Writing Tools
  04. Hosting Solutions
  05. Code Repositories
  06. Domain Registration Services

[Bottom Line Stack — indigo-600 gradient]
  Summary recommendation table
  Total monthly cost callout

[CTA]
  "Start the Tutorial →"
```

## Section Format

Each section follows a consistent pattern:
1. **Numbered badge** + section heading
2. **Intro paragraph** — what this category is and why it matters
3. **Comparison table** — tool, free tier, pricing, best for, star rating
4. **Detailed breakdowns** (coding agents only) — `ToolCard` component with pros/cons
5. **External link pills** — opens in new tab with `↗`
6. **Recommendation box** — `💡 Our Recommendation` in indigo-50

## Sub-Components (defined at bottom of file)

| Component | Props | Purpose |
|-----------|-------|---------|
| `ToolCard` | `name, href, description, pros[], cons[]` | Detailed pro/con breakdown card |
| `RecommendationBox` | `children` | Indigo-tinted callout box with lightbulb icon |
| `ExternalLink` | `href, children` | Pill-style external link with `↗` |

## Routing

- **URL:** `/tools-explained`
- **Nav label:** "AI Tools Explained" (between Tutorial and About)
- **Page type:** Static (`○`) — fully pre-rendered at build time
- **Metadata:** `title: "AI Tools Explained | 1stvibe.ai"`

## Content Maintenance

The page contains pricing and feature data that changes frequently. Key fields to update:
- Tool pricing tiers
- Free tier availability
- Star ratings
- Head-to-head comparison table (AI Coding Agents section)
- Bottom Line stack table

Update the `> Updated: YYYY-MM-DD` date in the metadata description when refreshing content.

## Related Docs

- [Homepage UX](./homepage-ux.md) — Primary entry point this page supports
- [Tutorial System](./tutorial-system.md) — Where users land after reading this page
- [Brand Voice](../strategy/brand-voice.md) — Tone for recommendation copy
- [Style Guide](../guides/style-guide.md) — Colors and component patterns used
