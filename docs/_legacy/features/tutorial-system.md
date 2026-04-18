# Tutorial System

> Updated: 2026-02-26

## Overview

A 19-step guided tutorial that takes users from zero to a deployed website. Organized into 5 sections, progressing from setup through building, deploying, and customizing.

## Structure

**File:** `content/tutorial/steps.ts`

| Section | Steps | Count | Notes |
|---------|-------|-------|-------|
| **Getting Started** | welcome, how-internet-works, install-claude-code, create-claude-account | 4 | how-internet-works is optional |
| **Build Something** | what-to-build, first-conversation, see-locally, iterate | 4 | Core building experience |
| **Put It on the Internet** | github-account, vercel-account, connect-github-vercel, push-to-github, deploy-vercel, big-moment | 6 | Deployment flow |
| **Make It Yours** | custom-domain, screenshot-trick, dev-console, whats-next | 4 | All optional |
| **You Did It** | completion | 1 | Celebration + email capture |

**19 total steps** — 5 are optional (marked with badge in sidebar).

## Key Files

| File | Purpose |
|------|---------|
| `content/tutorial/steps.ts` | Tutorial structure: sections, steps, ordering, optional flags |
| `content/tutorial/section-{1-5}/` | MDX content files for each step |
| `components/tutorial/TutorialLayout.tsx` | Two-column layout: sidebar + content |
| `components/tutorial/ChecklistPane.tsx` | Sidebar navigation with progress tracking |
| `components/tutorial/StepNav.tsx` | Previous/Next navigation + "Mark complete" button |
| `app/tutorial/[stepId]/StepContent.tsx` | Dynamic MDX loader per step |
| `app/tutorial/[stepId]/page.tsx` | Page route with `generateStaticParams` for SSG |

## Progress Tracking

### Anonymous Users (Default)
- **Storage:** localStorage key `tutorial_progress`
- **Format:** JSON array of completed step IDs (`["welcome", "install-claude-code", ...]`)
- **Survives:** Page refreshes, browser restarts
- **Does not survive:** Clearing browser data, different browser/device

### Authenticated Users
- **Storage:** `checklistProgress` JSON column on the `users` table
- **Synced:** On sign-in, server-side progress merges with localStorage

### Mark Complete Flow
1. User clicks "Mark complete" button in `StepNav`
2. `TutorialLayout.markComplete(stepId)` fires
3. Step ID added to localStorage array
4. `ChecklistPane` re-renders with green checkmark + strikethrough
5. If user is authenticated, also persists to database

## Components

### TutorialLayout
- **Layout:** Two-column — fixed sidebar (desktop) + scrollable content
- **Mobile:** Sidebar becomes an overlay drawer with hamburger toggle
- **Height:** `calc(100vh - 64px)` to account for the Nav component
- **Responsibilities:** Read/write localStorage, pass `markComplete` to children

### ChecklistPane
- **Sidebar navigation** showing all sections and steps
- **Visual states:**
  - Completed: green checkmark icon + strikethrough text
  - Current: filled circle with indigo background
  - Future: empty circle
  - Optional: "optional" badge (small gray tag)
- **Links:** Each step links to `/tutorial/{stepId}`
- **Responsive:** Fixed on desktop (`w-72`), overlay with backdrop on mobile

### StepNav
- **Previous/Next** navigation links between steps
- **"Mark complete"** button (only shown if step isn't already completed)
- **Completed badge** (green checkmark) if already done

### StepContent
- **Dynamic import** using `next/dynamic` to lazy-load MDX modules
- **Fallback:** "Content coming soon" if MDX file doesn't exist
- **Styling:** Renders inside prose container with custom MDX styles from `globals.css`

## MDX Content

Each step is a `.mdx` file in `content/tutorial/section-{N}/`:

```
content/tutorial/
  section-1/
    welcome.mdx
    how-internet-works.mdx
    install-claude-code.mdx
    create-claude-account.mdx
  section-2/
    what-to-build.mdx
    first-conversation.mdx
    see-locally.mdx
    iterate.mdx
  section-3/
    github-account.mdx
    vercel-account.mdx
    connect-github-vercel.mdx
    push-to-github.mdx
    deploy-vercel.mdx
    big-moment.mdx
  section-4/
    custom-domain.mdx
    screenshot-trick.mdx
    dev-console.mdx
    whats-next.mdx
  section-5/
    completion.mdx
```

## Adding a New Step

1. Add step entry to `TUTORIAL_SECTIONS` in `content/tutorial/steps.ts`
2. Create MDX file in the appropriate `section-{N}/` directory
3. Set `order` to place it in sequence
4. If optional, set `optional: true`
5. The dynamic import in `StepContent.tsx` will automatically pick it up

## Adding a New Section

1. Add section object to `TUTORIAL_SECTIONS` array in `steps.ts`
2. Create `content/tutorial/section-{N}/` directory
3. Add step MDX files
4. `ChecklistPane` automatically renders new sections

## Related Docs

- [Customer Profile](../strategy/customer-profile.md) — Who the tutorial is for
- [Brand Voice](../strategy/brand-voice.md) — Tone for tutorial content
- [Homepage UX](./homepage-ux.md) — How users discover the tutorial
