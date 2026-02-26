---
name: stylecheck
description: Audit a component or page against the style guide
user-invocable: true
disable-model-invocation: true
argument-hint: "[component or page path]"
---

# /stylecheck — Style Guide Audit

Audit the specified component or page file against the project style guide.

## Steps

1. Read `docs/guides/style-guide.md` for the full design reference

2. Read the specified component or page file(s). If no path provided, ask which file to audit.

3. Check each style category and report findings:

### Color Tokens
- Primary actions use `indigo-600` (hover: `indigo-700`)
- Text hierarchy: `gray-900` (headings), `gray-600` (body), `gray-400` (meta/hints)
- Borders: `gray-100` (light), `gray-200` (inputs)
- No arbitrary or off-brand colors

### Typography
- Font: Geist only (via `font-sans` or CSS variable)
- Heading sizes match scale (text-4xl/3xl/2xl for h1/h2/h3)
- Correct font weights (extrabold for hero, bold for sections, semibold for buttons)

### Icons
- Uses Lucide React (not inline SVGs or other libraries)
- Sizing follows convention (12-14 micro, 16 default, 20-24 large, 28 XL)
- Color follows pattern (indigo-500 primary, gray-400 muted, green-500 success)

### Buttons
- Uses the `Button` component from `components/ui/Button.tsx`
- Correct variant (primary/secondary/ghost) for context
- Correct size (sm/md/lg) for context
- Not custom-styled buttons that bypass the component

### Spacing
- Container max-widths: max-w-2xl (forms), max-w-3xl (sections), max-w-4xl (hero)
- Horizontal padding: `px-4 sm:px-6`
- Section vertical padding: `py-16 sm:py-24`
- Gap values follow Tailwind scale (gap-2 through gap-6)

### Borders & Shadows
- Border radius: `rounded-2xl` (cards), `rounded-xl` (inputs), `rounded-lg` (buttons)
- Shadows: `shadow-sm` (buttons), `shadow-lg` (cards), `shadow-xl` (floating)
- No arbitrary border-radius or shadow values

### Responsive
- Mobile-first base styles
- `sm:` breakpoint for layout changes
- `lg:` breakpoint for desktop adjustments
- No missing responsive variants for layout-affecting properties

### Animations
- Uses `transition-all duration-200` for general transitions
- Active press: `active:scale-95` for clickable elements
- Consistent with existing animation patterns

4. Report in this format:

```
## Style Audit: {file path}

| Category | Status | Issues |
|----------|--------|--------|
| Colors | PASS/FAIL | line:XX — uses blue-500 instead of indigo-600 |
| Typography | PASS/FAIL | details |
| Icons | PASS/FAIL | details |
| Buttons | PASS/FAIL | details |
| Spacing | PASS/FAIL | details |
| Borders | PASS/FAIL | details |
| Responsive | PASS/FAIL | details |
| Animations | PASS/FAIL | details |

### Issues to Fix
1. Specific issue with file:line reference
2. ...

### Looks Good
- Things that are correctly following the style guide
```
