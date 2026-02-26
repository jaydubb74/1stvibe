# Homepage UX

> Updated: 2026-02-26

## Overview

The homepage (`app/page.tsx`) is the primary entry point and conversion funnel. Its job: get users to try the demo, then funnel them into the tutorial.

## Page Structure

```
[Nav — fixed, bg-white/95 backdrop-blur]

[Hero Section — gradient bg]
  Feature pill: "No experience required"
  Headline: "Build your first website with AI."
  Subheadline: explains what this is
  DemoForm (textarea + "Build It" button)
  Supporting text: "If you can describe it, you can build it."

[Why This Matters — white bg]
  Prose explaining the mission

[What You'll Do — gray-50 bg]
  4-column grid of steps (demo → build → deploy → customize)

[Final CTA — indigo-600 bg]
  Blockquote + "Start the Tutorial" button
```

## Hero Section

### Background
- Gradient: `bg-gradient-to-b from-indigo-50 via-white to-white`
- Decorative accent blob: `w-[800px] h-[400px] rounded-full bg-indigo-100/60 blur-3xl` (aria-hidden)

### Feature Pill
- Above the headline
- Style: `inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium px-4 py-1.5 rounded-full`
- Icon: Zap (14px, indigo-500)
- Text: "No experience required"

### Headline
- "Build your first website with AI."
- `text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900`
- "with AI." wrapped in `<span className="text-indigo-600">`

### Subheadline
- `text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto`
- Explains: AI coding tools are real, this is the fastest way to see it

## DemoForm

**File:** `components/demo/DemoForm.tsx`

### Layout
- Mobile: Vertical stack (`flex-col`)
- Desktop: Horizontal (`sm:flex-row`)
- Wrapped in scroll anchor: `id="demo" className="scroll-mt-20"`

### Textarea
- Height: `h-28 sm:h-24`
- Border: `border-2 border-gray-200`, focus: `border-indigo-400 ring-4 ring-indigo-50`
- Rounded: `rounded-xl`, resize disabled
- Max length: 600 characters
- Placeholder: Random from 15 examples (set on mount, hydration-safe)

### Placeholder Prompts (15)

Examples cover various industries to show range:
- "A landing page for a neighborhood bakery..."
- "A modern portfolio for a freelance graphic designer..."
- "A booking page for a mobile pet grooming service..."
- And 12 more covering e-commerce, travel, fitness, real estate, etc.

### Provocation Hints System

While the user types, coaching hints appear below the form:

**10 hints:**
1. "What should the title of your site say?"
2. "Who will visit your site, and what do they want?"
3. "Do you have a color scheme in mind?"
4. "What sections should it have?"
5. "Do you have a tagline or slogan?"
6. "Would you like photos or icons on the page?"
7. "Should we add a form to collect info?"
8. "Do you have contact details to include?"
9. "What's the vibe — professional, playful, minimal?"
10. "Any specific fonts or styles you like?"

**Behavior:**
- Hidden until user starts typing
- **Initial burst:** On first keystroke, hints cycle rapidly through several examples
- **Keystroke rotation:** After the burst, hints advance every ~30 keystrokes
- **Manual advance:** Refresh button (RefreshCw icon) to skip to next hint
- **Smooth transition:** `transition-opacity duration-300`

### Submit Button
- Variant: primary, Size: lg
- Text: "Build It" with Sparkles icon (18px)
- Mobile: Full width
- Desktop: `sm:self-start sm:h-24` (aligns to textarea top)
- Disabled when prompt is empty

### Loading State

Replaces the entire form with a loading card:
- Card: `bg-white rounded-2xl border-2 border-indigo-100 shadow-lg shadow-indigo-50`
- Spinner: Sparkles icon in 56px indigo circle with pulsing ping ring
- Title: "Building your site..."
- **Rotating messages** (every 2.5s):
  1. "Asking the AI nicely..."
  2. "Writing your HTML..."
  3. "Choosing colors that don't clash..."
  4. "Making it mobile-friendly (yes, really)..."
  5. "Adding a footer so it looks legit..."
  6. "Double-checking the vibes..."
  7. "Almost there..."
- Footer: "Usually takes 10-20 seconds" + truncated prompt preview (80 chars)

### Error State
- `text-sm text-red-600 font-medium` below the form
- Clears on next submission attempt

## What You'll Do Section

- Background: `bg-gray-50`
- Grid: `grid sm:grid-cols-2 lg:grid-cols-4 gap-6`
- Each card:
  - White background, rounded corners, shadow, border
  - Step counter: `text-xs font-bold text-gray-300 tracking-widest`
  - Lucide icon (24px, indigo-500)
  - Title + description

## Final CTA Section

- Background: `bg-indigo-600`
- Text: white
- Blockquote: `text-2xl sm:text-4xl font-bold`
- Secondary CTA button: White on indigo, `px-12 py-6 rounded-2xl`
- Link text: "Start the Tutorial" with BookOpen + ArrowRight icons
- Sub-text: "Free. No credit card. No fluff."

## Related Docs

- [Demo Generator](./demo-generator.md) — What happens after "Build It"
- [Brand Voice](../strategy/brand-voice.md) — Copy tone guidelines
- [Style Guide](../guides/style-guide.md) — Visual design reference
- [Customer Profile](../strategy/customer-profile.md) — Who this page is for
