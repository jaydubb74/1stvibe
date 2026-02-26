# Style Guide

> Updated: 2026-02-26

## Color Palette

### Primary: Indigo

| Token | Usage |
|-------|-------|
| `indigo-50` | Background accents, hover states, focus rings |
| `indigo-100` | Light borders, subtle backgrounds |
| `indigo-200` | Secondary button borders, light text on dark |
| `indigo-300` | Focus ring states |
| `indigo-400` | Icon accents, glow effects |
| `indigo-500` | Icon colors, text accents |
| `indigo-600` | **Primary brand color** — buttons, CTAs, links |
| `indigo-700` | Hover states on primary buttons |

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
| `red-500` / `red-600` | Error messages, validation failures |
| `rose-400` | Heart icon (Patreon) |

### Gradients

```
bg-gradient-to-b from-indigo-50 via-white to-white    — Hero background
bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600  — Premium banners
bg-gradient-to-r from-indigo-50 to-white               — Popover headers
bg-gradient-to-br from-indigo-600 to-purple-600         — Tutorial FAB button
```

## Typography

### Font

**Geist** — imported via `next/font/google`, applied as `--font-geist-sans` CSS variable.

No additional fonts. Everything uses the system font stack with Geist as primary.

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
- Links: `#4f46e5` (indigo), underline with 2px offset
- Code inline: monospace, `#4f46e5` text, `#f3f4f6` background
- Code blocks: dark theme (`#1e1e2e` background, `#cdd6f4` text)
- Blockquotes: 4px left border `#e0e7ff`, italic
- Lists: `margin-bottom 0.35rem`, `line-height 1.65`

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

- Primary actions: `className="text-indigo-500"` or `text-white` on indigo bg
- Success: `className="text-green-500"`
- Muted: `className="text-gray-300"` or `text-gray-400"`

### Commonly Used Icons

`Sparkles` (AI/magic), `ArrowRight`/`ArrowLeft` (navigation), `BookOpen` (tutorial), `Zap` (energy), `Menu`/`X` (hamburger), `Check`/`CheckCircle` (completion), `Share2` (share), `Loader2` (spinner), `RefreshCw` (refresh), `Pencil` (edit), `Globe` (deployment), `Send` (submit)

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

## Buttons

**Component:** `components/ui/Button.tsx`

### Variants

| Variant | Classes |
|---------|---------|
| `primary` | `bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm` |
| `secondary` | `bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50` |
| `ghost` | `text-gray-600 hover:text-gray-900 hover:bg-gray-100` |

### Sizes

| Size | Classes |
|------|---------|
| `sm` | `text-sm px-3 py-1.5 gap-1.5` |
| `md` | `text-base px-5 py-2.5 gap-2` |
| `lg` | `text-lg px-7 py-3.5 gap-2` |

### Shared Styles

All buttons: `inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`

## Form Elements

### Textarea (DemoForm pattern)

```
h-28 sm:h-24
px-4 py-3.5
border-2 border-gray-200
focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-50
text-gray-800 placeholder-gray-400 text-sm
rounded-xl resize-none
```

### Text Input (general pattern)

```
px-3 py-2
border border-gray-200
focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400
rounded-xl
```

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
| `shadow-indigo-50` | Indigo-tinted card shadows |
| `shadow-indigo-200` | Stronger indigo shadows |
| `shadow-indigo-300/50` | Glowing FAB effect |

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

## Responsive Breakpoints

Standard Tailwind v4 breakpoints:

| Prefix | Width | Usage |
|--------|-------|-------|
| (none) | 0px+ | Mobile-first base |
| `sm:` | 640px+ | Tablets |
| `md:` | 768px+ | Small desktops |
| `lg:` | 1024px+ | Desktops |

### Common Responsive Patterns

```
text-4xl sm:text-5xl lg:text-6xl        — Hero heading
flex flex-col sm:flex-row                — Stack → row
grid sm:grid-cols-2 lg:grid-cols-4      — Responsive grid
hidden sm:flex / lg:hidden               — Show/hide at breakpoints
px-4 sm:px-6                             — Responsive padding
```

## Card Patterns

```
White card:    bg-white rounded-2xl p-6 shadow-sm border border-gray-100
Gray card:     bg-gray-50 rounded-2xl p-6 border border-gray-100
Loading card:  bg-white rounded-2xl border-2 border-indigo-100 shadow-lg shadow-indigo-50
Elevated card: bg-white rounded-2xl shadow-2xl border border-gray-100
```

## Related Docs

- [Brand Voice](../strategy/brand-voice.md) — Verbal companion to the visual guide
- [Code Standards](./code-standards.md) — How to write the code that implements these styles
- [Code Review Checklist](./code-review-checklist.md) — Style compliance checks
