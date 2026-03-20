# Style Guide

> Updated: 2026-03-19

## Color Palette

All colors are defined as CSS custom properties in `app/globals.css` under `@theme inline`, which maps them to Tailwind utility classes.

### Primary Brand Colors

| Token | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| `--color-brand` | `#D35400` | `bg-brand` / `text-brand` | **Primary brand color** — buttons, CTAs, links, accents |
| `--color-brand-dark` | `#B34700` | `bg-brand-dark` / `text-brand-dark` | Hover states on primary elements |
| `--color-brand-50` | `#FDEBD0` | `bg-brand-50` / `text-brand-50` | Soft Peach — card backgrounds, input focus rings |
| `--color-amber` | `#F5A623` | `bg-amber` / `text-amber` | Amber Yellow — highlights, callout borders |
| `--color-amber-50` | `#FEF9E7` | `bg-amber-50` | Pale Yellow — callout backgrounds |
| `--color-charcoal` | `#2D3436` | `text-charcoal` / `bg-charcoal` | Charcoal — primary text alternative to `text-gray-900` |

### Opacity Modifiers

Use Tailwind v4 opacity modifiers for tints and rings:

| Usage | Class |
|-------|-------|
| Focus ring | `focus:ring-brand/40` |
| Light background tint | `bg-brand/10` |
| Border on light surface | `border-brand/20` |
| Icon on colored bg | `text-brand/60` |

### Neutrals: Gray

| Token | Usage |
|-------|-------|
| `gray-50` | Light section backgrounds |
| `gray-100` | Borders, dividers, card borders |
| `gray-200` | Input borders |
| `gray-300` | Disabled states, tracking lines |
| `gray-400` | Secondary/tertiary text, hints, placeholders |
| `gray-500` | Meta text, timestamps |
| `gray-600` | Default body text, secondary nav |
| `gray-700` | Section text, modal text |
| `gray-900` | Primary text, headings |

### Status Colors

| Color | Usage |
|-------|-------|
| `green-500` / `green-600` | Success states, checkmarks, completed text |
| `[#C0392B]` | Error messages, validation failures (Signal Red) |
| `rose-400` | Heart icon (Ko-fi support) |

### Gradients

```
bg-gradient-to-b from-brand-50 via-white to-white    — Hero background
bg-gradient-to-r from-brand to-amber                  — Promo / share banners
bg-gradient-to-r from-brand-50 to-white               — Popover headers
bg-gradient-to-br from-brand to-amber                 — Tutorial FAB button
```

---

## Typography

### Fonts

| Font | Variable | Use |
|------|----------|-----|
| **DM Sans** | `--font-dm-sans` | Headings (h1–h6), wordmark — applied globally via CSS |
| **Open Sans** | `--font-open-sans` | Body text, UI elements, captions — the default `font-sans` |

Both are imported via `next/font/google` in `app/layout.tsx` and applied as CSS variables to the `<body>`. DM Sans is applied to all heading elements (`h1`–`h6`) via a rule in `globals.css`.

### Heading Scale

| Element | Classes | Weight |
|---------|---------|--------|
| Hero h1 | `text-4xl sm:text-5xl lg:text-6xl` | `font-extrabold` |
| Section h2 | `text-3xl` | `font-bold` |
| Subsection h3 | `text-2xl` | `font-bold` |
| Body large | `text-lg` or `text-xl` | `font-normal` |
| Body default | `text-base` | `font-normal` |
| Small / meta | `text-sm` or `text-xs` | `font-medium` |

### Prose Styling (Tutorial MDX)

Defined in `app/globals.css`:
- Links: `#D35400` (brand orange), underline with 2px offset
- Code inline: monospace, `#D35400` text, `#f3f4f6` background
- Code blocks: dark theme (`#1e1e2e` background, `#cdd6f4` text)
- Blockquotes: 4px left border `#FDEBD0` (brand peach), italic
- Lists: `margin-bottom 0.35rem`, `line-height 1.65`

---

## Icons

**Library:** Lucide React

### Sizing Convention

| Size | Usage |
|------|-------|
| `size={12-13}` | Micro — inline checkmarks, tiny status |
| `size={14-15}` | Small — inline with text, form buttons |
| `size={16}` | Default — share, edit, nav toggle |
| `size={18-20}` | Medium — form submit, menu toggles |
| `size={22-24}` | Large — section icons, primary actions |
| `size={28}` | XL — hero CTA icons |

### Color Convention

- Primary actions: `className="text-brand"` or `text-white` on brand bg
- Success: `className="text-green-500"`
- Muted: `className="text-gray-300"` or `text-gray-400"`

---

## Spacing

### Common Padding/Margin

| Pattern | Usage |
|---------|-------|
| `px-4 sm:px-6` | Page-level horizontal padding |
| `py-6` to `py-8` | Component vertical padding |
| `py-16 sm:py-24` | Section vertical padding |
| `gap-2` to `gap-6` | Flex/grid item gaps |
| `space-y-4` to `space-y-6` | Vertical stacks |

### Container Max-Widths

| Class | Usage |
|-------|-------|
| `max-w-2xl` | Form containers, prose content |
| `max-w-3xl` | Section content |
| `max-w-4xl` | Hero section, wide content |
| `max-w-6xl` | Nav wrapper |

All containers use `mx-auto` for centering.

---

## Buttons

**Component:** `components/ui/Button.tsx`

### Variants

| Variant | Classes |
|---------|---------|
| `primary` | `bg-brand text-white hover:bg-brand-dark shadow-sm` |
| `secondary` | `bg-white text-brand border border-brand/20 hover:bg-brand-50` |
| `ghost` | `text-gray-600 hover:text-gray-900 hover:bg-gray-100` |

### Sizes

| Size | Classes |
|------|---------|
| `sm` | `text-sm px-3 py-1.5 gap-1.5` |
| `md` | `text-base px-5 py-2.5 gap-2` |
| `lg` | `text-lg px-7 py-3.5 gap-2` |

### Shared Styles

All buttons: `inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`

---

## Form Elements

### Textarea (DemoForm pattern)

```
h-28 sm:h-24
px-4 py-3.5
border-2 border-gray-200
focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand-50
text-gray-800 placeholder-gray-400 text-sm
rounded-xl resize-none
```

### Text Input (general pattern)

```
px-3 py-2
border border-gray-200
focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand
rounded-xl
```

---

## Borders and Shadows

### Border Radius

| Class | Usage |
|-------|-------|
| `rounded-full` | Circular elements (FAB, badges, pills) |
| `rounded-2xl` | Large containers, cards |
| `rounded-xl` | Form inputs, medium containers |
| `rounded-lg` | Small buttons |

### Shadows

| Class | Usage |
|-------|-------|
| `shadow-sm` | Subtle elevation (buttons) |
| `shadow-lg` | Card shadows |
| `shadow-xl` | Floating elements (FAB, popovers) |
| `shadow-2xl` | High emphasis modals |

---

## Animations

### Custom (globals.css)

| Name | Duration | Usage |
|------|----------|-------|
| `animate-spin-slow` | 4s linear infinite | Glow rings on FAB |
| `animate-fade-in` | 0.2s ease-out | Copy feedback messages |

### Tailwind Built-in

| Class | Usage |
|-------|-------|
| `animate-spin` | Loading spinners |
| `animate-ping` | Pulsing glow rings |
| `transition-all duration-200` | General transitions |
| `transition-colors` | Color-only changes |
| `active:scale-95` | Click/press feedback |

---

## Responsive Breakpoints

Standard Tailwind v4 breakpoints:

| Prefix | Width | Usage |
|--------|-------|-------|
| (none) | 0px+ | Mobile-first base |
| `sm:` | 640px+ | Tablets |
| `md:` | 768px+ | Small desktops |
| `lg:` | 1024px+ | Desktops |

---

## Card Patterns

```
White card:    bg-white rounded-2xl p-6 shadow-sm border border-gray-100
Gray card:     bg-gray-50 rounded-2xl p-6 border border-gray-100
Loading card:  bg-white rounded-2xl border-2 border-brand-50 shadow-lg
Elevated card: bg-white rounded-2xl shadow-2xl border border-gray-100
```

---

## Related Docs

- [Brand Kit](../strategy/brand-kit.md) — Full visual identity, colors, typography, voice
- [Brand Voice](../strategy/brand-voice.md) — Verbal companion to the visual guide
- [Code Standards](./code-standards.md) — How to write the code that implements these styles
- [Code Review Checklist](./code-review-checklist.md) — Style compliance checks
