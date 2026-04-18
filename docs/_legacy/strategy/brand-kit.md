# 1stvibe.ai Brand Kit

> Version 1.2 / March 2026 / Confidential
> Source: brand-kit.pdf → converted to reference markdown

---

## Brand Overview

### Mission

1stvibe.ai empowers non-technical professionals to build websites and software applications using AI coding tools. We believe everyone deserves the confidence to create with technology, regardless of background.

### Brand Personality

| Trait | Description |
|-------|-------------|
| **Approachable** | We meet learners where they are, without jargon or intimidation. |
| **Empowering** | We build confidence through hands-on, guided learning experiences. |
| **Curious** | We celebrate the joy of exploration and the thrill of building something new. |
| **Trustworthy** | We provide credible, well-structured education backed by real expertise. |
| **Energetic** | We bring enthusiasm and momentum to every learning moment. |

### Design Inspiration

- **Khan Academy** — Joyful, growth-mindset visuals; tactile, handmade elements; credible yet playful.
- **Coursera** — Premium trust through clean structure; warm, uplifting palette.
- **Duolingo** — Bold, energetic character; rewarding micro-interactions; approachable tone.

---

## Color Palette

### Warm Primary

| Hex | Name | Usage | Tailwind Token |
|-----|------|-------|----------------|
| `#D35400` | Burnt Orange | Primary / CTAs | `bg-brand` / `text-brand` |
| `#B34700` | Burnt Orange Dark | Hover states (darken 15%) | `bg-brand-dark` / `hover:bg-brand-dark` |
| `#F5A623` | Amber Yellow | Highlights / Accents | `bg-amber` / `text-amber` |
| `#C0392B` | Signal Red | Emphasis / Alerts | `text-[#C0392B]` / `border-[#C0392B]` |

### Soft Warm Tints

| Hex | Name | Usage | Tailwind Token |
|-----|------|-------|----------------|
| `#FDEBD0` | Soft Peach | Card backgrounds | `bg-brand-50` |
| `#FEF9E7` | Pale Yellow | Highlight areas | `bg-amber-50` |
| `#FADBD8` | Light Coral | Attention surfaces | `bg-[#FADBD8]` |

### Greys & Whites

| Hex | Name | Usage | Tailwind Equivalent |
|-----|------|-------|---------------------|
| `#2D3436` | Charcoal | Primary text | `text-charcoal` / `text-gray-900` |
| `#636E72` | Slate Gray | Secondary text | `text-gray-600` |
| `#95A5A6` | Medium Gray | Muted / Tertiary | `text-gray-400` |
| `#BDC3C7` | Silver | Borders / Dividers | `border-gray-300` |
| `#F1F2F6` | Light Gray | Backgrounds | `bg-gray-50` |
| `#FFFFFF` | White | Clean surfaces | `bg-white` |

### Color Usage Guidelines

**Recommended ratios:** 45% Grey/White · 25% Orange · 15% Yellow

**Do:**
- Use Charcoal for headers and primary navigation
- Use Burnt Orange for CTAs and interactive elements
- Pair warm tints with white for breathing room
- Use Amber Yellow for celebratory / progress moments
- Maintain WCAG AA contrast (4.5:1 body text)
- Reserve Signal Red for emphasis and alerts only

**Don't:**
- Use more than 3 warm colors on a single screen
- Place yellow text on white backgrounds
- Use Signal Red as a large background fill
- Mix all warm tones at full saturation together
- Use light grey text on white backgrounds
- Override Burnt Orange with off-brand oranges

### Accessibility

| Pairing | Contrast | Result |
|---------|----------|--------|
| Charcoal on White | 15.4:1 | ✅ Pass |
| Charcoal on Light Gray | 12.1:1 | ✅ Pass |
| Burnt Orange on White | 4.6:1 | ✅ Pass |
| White on Charcoal | 15.4:1 | ✅ Pass |
| White on Burnt Orange | 4.6:1 | ✅ Pass |

---

## Typography

### Primary Typeface: Open Sans

- **Use:** Body text, UI elements, captions, general communication
- **Import:** Google Fonts (open source, 582+ language support)
- **Why:** Humanist design balances readability with warmth — ideal for educational content
- **Weights:** Regular (400), Medium (500), SemiBold (600), Bold (700)

### Display / Heading Typeface: DM Sans

- **Use:** Headings, titles, display text, the wordmark
- **Import:** Google Fonts (open source, geometric, modern)
- **Why:** Clean geometric forms project confidence and modernity while remaining approachable

### Type Scale

| Role | Size | Weight | Font |
|------|------|--------|------|
| Display / Hero | 28pt / `text-3xl` | Bold | DM Sans |
| Page Title (H1) | 22pt / `text-2xl` | SemiBold | DM Sans |
| Section Heading (H2) | 16pt / `text-lg` | Medium | DM Sans |
| Subheading (H3) | 13pt / `text-sm` | SemiBold | Open Sans |
| Body Text | 11pt / `text-base` | Regular | Open Sans |
| Caption / Label | 9pt / `text-xs` | Regular | Open Sans |

### Font Alternatives

| Font | Use Case |
|------|----------|
| Inter | Body text alternative; excellent readability at small sizes |
| Source Sans Pro | Body text; used by Coursera for global language support |
| Work Sans | Heading alternative; clean geometric with personality |
| Nunito Sans | Body text; slightly rounder, very approachable |

### Hierarchy Rules

- No more than 2 typefaces per layout (DM Sans + Open Sans)
- Limit to 3 font weights per composition: Regular, Medium, Bold
- Minimum body text: 11pt (print) / 16px (web)
- Line height: 1.5x body text, 1.2x headings
- Line length: 45–75 characters for optimal readability
- Left-align body text; center-align only for short display text

### Fonts to Avoid

Comic Sans, Papyrus, Impact, Lobster, Jokerman, overly decorative or script fonts, condensed fonts at small sizes, serif fonts for UI/product interfaces.

---

## Voice & Tone

### Voice Principles

**Conversational, Not Casual** — Write like explaining to a smart friend over coffee. Friendly but never sloppy. Skip jargon, not substance.

**Encouraging, Not Patronizing** — Celebrate progress without talking down. Like a great coach: challenging yet supportive.

**Clear, Not Oversimplified** — Complex ideas in plain language without losing nuance. Every sentence earns its place.

**Confident, Not Arrogant** — We know our subject and share it generously. Expertise expressed with warmth, never gatekeeping.

### Tone by Context

| Context | Tone |
|---------|------|
| Marketing / Landing pages | Energetic and inspiring. Lead with benefits. Create excitement. |
| Tutorials / Course content | Supportive and patient. Step-by-step clarity. Celebrate milestones. |
| Error states / Help docs | Calm and reassuring. Focus on solutions, not blame. |
| Social media / Community | Casual and playful. Emojis welcome. Relatable references. |
| Investor / Press | Polished and data-driven. Confident authority. Clear impact. |

### Preferred Language

| We Say | We Avoid |
|--------|----------|
| "Build your first app in minutes" | "Leverage synergies to optimize..." |
| "No coding experience needed" | "Simply configure the API endpoint..." |
| "You've got this" | "This is easy" (minimizes struggle) |
| "Let's figure this out together" | "As a non-technical user, you..." |
| "Here's how it works" | "Obviously, you would..." |
| "Nice work! You just built something real." | "Just do X" (implies it's trivial) |
| "AI-powered tools make it possible" | "Disruptive paradigm shift" |
| "Start creating today" | "Best-in-class solution" |

### Key Writing Rules

- Use active voice: "You can build..." not "It can be built..."
- Lead with the benefit, not the feature
- Keep sentences under 25 words when possible
- Use 'you' and 'your' to speak directly to the learner
- Embrace contractions (you'll, we're, it's) for natural flow
- Avoid acronyms on first use; spell them out
- Write headings as actions: "Build Your First App" not "App Building"
- Use numbered steps for processes, bullets for lists

### Brand Terminology

| Term | Usage |
|------|-------|
| `1stvibe.ai` | Always styled exactly as shown. Never "1stVibe", "FirstVibe", or "first vibe". |
| `vibe coding` | Our core concept. Two words, lowercase 'c' unless starting a sentence. |
| `Builder` | Preferred over 'user' or 'student'. Our audience builds things. |
| `Project` | Preferred over 'assignment' or 'exercise'. Learning feels like creating. |

---

## Logo Usage

### Wordmark

The wordmark is always set in **DM Sans Bold**. Approved color combinations:

| Variant | Background |
|---------|------------|
| Charcoal (`#2D3436`) | Light / White |
| White | Charcoal (`#2D3436`) |
| White | Burnt Orange (`#D35400`) |
| Charcoal | White |

**Minimum size:** 80px wide (digital), 0.75 inches (print)

**Clear space:** Equal to the height of the '1' character on all sides

**Do:** Use approved color combinations · Keep clear space · Scale proportionally

**Don't:** Stretch, rotate, or skew · Add drop shadows or outlines · Change font or letter spacing · Place on busy/clashing backgrounds

---

## UI Components (CSS Reference)

### Buttons

```html
<!-- Primary Button -->
<button class="bg-brand hover:bg-brand-dark text-white font-medium px-6 py-2.5 rounded-md transition-colors">
  Get Started
</button>

<!-- Secondary Button (Outline) -->
<button class="border-2 border-brand text-brand hover:bg-brand-50 font-medium px-6 py-2.5 rounded-md">
  Learn More
</button>

<!-- Ghost / Text Button -->
<button class="text-brand hover:underline font-medium bg-transparent p-0">View Details</button>

<!-- Inline Links -->
<a href="/guide" class="text-brand underline hover:text-brand-dark">getting started guide</a>
```

### Forms & Inputs

```html
<!-- Text Input (default) -->
<input class="w-full border border-[#BDC3C7] rounded-md px-3 py-2.5 text-sm
  focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none" />

<!-- Input — Error State -->
<input class="border-2 border-[#C0392B] rounded-md px-3 py-2.5 focus:ring-2 focus:ring-[#C0392B]/20" />
<p class="text-[#C0392B] text-xs mt-1">Please enter a valid email address</p>

<!-- Checkbox / Radio -->
<input type="checkbox" class="w-4 h-4 rounded accent-brand" />
```

### Headers & Containers

```html
<!-- H1 -->
<h1 class="text-3xl font-bold text-charcoal tracking-tight">Start Building Today</h1>
<p class="text-base text-gray-600 mt-2">Create your first project in under 10 minutes.</p>

<!-- H2 with left border accent -->
<h2 class="text-xl font-semibold text-charcoal border-l-[3px] border-brand pl-3">
  Choose Your Learning Path
</h2>

<!-- Content Card -->
<div class="bg-white rounded-lg border border-gray-200 shadow-sm p-5 hover:shadow-md transition-shadow">
  <h3 class="font-semibold text-charcoal">Title</h3>
  <p class="text-sm text-gray-600 mt-1">Description</p>
  <span class="mt-3 text-xs bg-brand-50 text-brand px-3 py-1 rounded-full">Tag</span>
</div>

<!-- Callout / Highlight Box (Pro Tip) -->
<div class="bg-amber-50 border-l-4 border-amber rounded-md p-4 flex items-start gap-3">
  <span class="bg-amber text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shrink-0">!</span>
  <div>
    <p class="font-semibold text-sm text-charcoal">Pro Tip</p>
    <p class="text-sm text-gray-600">Your tip content here</p>
  </div>
</div>
```

### Alerts

```html
<!-- Success -->
<div class="bg-green-50 border-l-4 border-green-500 rounded-md p-3 flex items-start gap-3" role="alert">
  <!-- CheckCircleIcon text-green-500 -->
  <p class="font-semibold text-green-800">Published</p>
</div>

<!-- Error -->
<div class="bg-[#FADBD8] border-l-4 border-[#C0392B] rounded-md p-3 flex items-start gap-3" role="alert">
  <!-- XCircleIcon text-[#C0392B] -->
  <p class="font-semibold text-red-900">Build Failed</p>
</div>

<!-- Warning -->
<div class="bg-amber-50 border-l-4 border-amber rounded-md p-3 flex items-start gap-3" role="alert">
  <!-- AlertTriangleIcon text-amber -->
  <p class="font-semibold text-amber-900">Unsaved Changes</p>
</div>

<!-- Toast -->
<div class="fixed bottom-6 right-6 bg-charcoal text-white px-5 py-3 rounded-lg shadow-lg flex items-center gap-4">
  <span class="text-sm">Changes saved</span>
  <button class="text-gray-400 hover:text-white">&times;</button>
</div>
```

---

## Quick Reference Card

### Full Palette (Hex)

```
Burnt Orange  #D35400   Amber Yellow  #F5A623   Signal Red    #C0392B
Soft Peach    #FDEBD0   Pale Yellow   #FEF9E7   Light Coral   #FADBD8
Charcoal      #2D3436   Slate Gray    #636E72   Medium Gray   #95A5A6
Silver        #BDC3C7   Light Gray    #F1F2F6   White         #FFFFFF
```

### Tailwind v4 CSS Tokens (globals.css @theme)

```css
--color-brand:      #D35400;   /* Burnt Orange */
--color-brand-dark: #B34700;   /* Burnt Orange hover */
--color-brand-50:   #FDEBD0;   /* Soft Peach */
--color-amber:      #F5A623;   /* Amber Yellow */
--color-amber-50:   #FEF9E7;   /* Pale Yellow */
--color-charcoal:   #2D3436;   /* Charcoal */
```

### Design Principles

| Principle | Description |
|-----------|-------------|
| **Clarity First** | Clean layouts, generous white space, obvious hierarchy |
| **Earned Color** | Every color serves a purpose. Default to neutrals. |
| **Human Touch** | Authentic photography, handmade elements, real stories |
| **Joyful Progress** | Celebrate micro-wins. Learning should feel rewarding. |
| **Accessible** | Always WCAG AA. Global language support. Works on any device. |

---

## Related Docs

- [Brand Voice](./brand-voice.md) — Verbal companion to the visual guide
- [Style Guide](../guides/style-guide.md) — Tailwind implementation of this brand system
- [Customer Profile](./customer-profile.md) — Who we're building for
