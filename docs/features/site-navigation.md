# Site Navigation & Branding

> Updated: 2026-03-01

## Overview

The `Nav` component is a fixed top bar present on every page via the root layout. It includes the beaver mascot image, the "1stvibe.ai" wordmark, nav links, and a "Start Building →" CTA button.

**File:** `components/Nav.tsx`

## Nav Structure

```
[Fixed top bar — bg-white/95 backdrop-blur border-b border-gray-100]
  [Logo link → /]
    Beaver mascot image (108×108px, rounded-full)
    "1stvibe.ai" wordmark (text-xl font-bold text-indigo-600)

  [Desktop nav links — hidden sm:flex]
    Try the Demo   → /#demo
    Tutorial       → /tutorial/welcome
    AI Tools Explained → /tools-explained
    About          → /about
    Pushes         → /pushes
    Prompt         → /prompt
    [Start Building →] → /tutorial/welcome  (indigo-600 button)

  [Mobile toggle — sm:hidden]
    Hamburger / X icon (Lucide Menu/X)
    Dropdown with same links
```

## Mascot Image

- **File:** `public/mascot.png` (818KB, 1408×768px PNG)
- **Rendered size:** 108×108px
- **Style:** `rounded-full object-cover` — crops to a circle
- **Hover effect:** `group-hover:scale-110 transition-transform duration-200`
- **Implementation:** Plain `<img>` tag (not `next/image`) to avoid optimizer quirks at small circular sizes
- **ESLint suppression:** `{/* eslint-disable-next-line @next/next/no-img-element */}` required above the tag

## Logo Link

The entire logo area (mascot + wordmark) is wrapped in a single `<Link href="/">` with:
- `className="flex items-center gap-0 group"` — zero gap between mascot and text
- The `group` class enables the child hover scale effect

## Support Link (Ko-fi)

Support link in the Footer (`components/Footer.tsx`):
- **URL:** `https://ko-fi.com/1stvibe`
- **Text:** "Support Us"
- **Icon:** `Heart` (Lucide, 13px, `text-rose-400`)
- Also appears on the About page (`app/about/page.tsx`) as a CTA button

## Nav Link Order

Desktop and mobile menus must stay in sync. Current order:
1. Try the Demo
2. Tutorial
3. AI Tools Explained
4. About
5. Pushes
6. Prompt
7. Start Building → (CTA button, desktop only in the main row)

## Mobile Menu

- Triggered by `Menu`/`X` icon button (Lucide, 20px)
- State: `const [open, setOpen] = useState(false)`
- Each link calls `onClick={() => setOpen(false)}` to close on tap
- CTA button: `bg-indigo-600 text-white text-center px-4 py-2 rounded-lg`

## Related Docs

- [Style Guide](../guides/style-guide.md) — Color and spacing conventions
- [Homepage UX](./homepage-ux.md) — Hero section below the nav
- [AI Tools Explained](./ai-tools-explained.md) — Page the nav links to
