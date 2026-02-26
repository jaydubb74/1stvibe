# Code Standards

> Updated: 2026-02-26

## TypeScript

- **Strict mode** enabled (`tsconfig.json`)
- **No `any`** — use proper types or `unknown` with type guards
- **No unused variables** — ESLint will fail the build
- Path alias: `@/*` maps to project root (e.g., `@/lib/utils`, `@/components/ui/Button`)

## File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `DemoForm.tsx`, `ChecklistPane.tsx` |
| Pages/Routes | kebab-case (Next.js convention) | `app/site/[id]/page.tsx` |
| Utilities | kebab-case | `lib/ratelimit.ts`, `lib/openai.ts` |
| Types | kebab-case file, PascalCase exports | `types/index.ts` |
| Content | kebab-case | `content/tutorial/section-1/welcome.mdx` |

## Import Order

1. React / Next.js built-ins
2. Third-party packages
3. Local imports (`@/` paths)

```typescript
import { useState, useRef } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
```

## Component Patterns

### Client vs Server Components

- Default is Server Component (no directive needed)
- Add `"use client"` at the top only when you need:
  - `useState`, `useEffect`, `useRef`, or other hooks
  - Event handlers (`onClick`, `onChange`, etc.)
  - Browser APIs (`localStorage`, `window`, etc.)

### Component Structure

```typescript
"use client"; // only if needed

import { useState } from "react";
// ... imports

interface Props {
  // typed props, not inline
}

export default function ComponentName({ prop1, prop2 }: Props) {
  // hooks first
  // handlers next
  // return JSX
}
```

### `forwardRef` for UI Primitives

The `Button` component uses `forwardRef` so it can be wrapped by other libraries or receive refs:

```typescript
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, ...props }, ref) => {
    // ...
  }
);
```

## State Management

- **React state** (`useState`) for component-local state
- **`useRef`** for values that change often but shouldn't trigger re-renders (e.g., keystroke counters in DemoForm)
- **localStorage** for persistence across page loads (tutorial progress, iteration counts)
- **No global state library** — keep it simple, pass props or use server components

## Error Handling

### API Routes

```typescript
try {
  // business logic
  return NextResponse.json({ data });
} catch (error) {
  console.error("Descriptive context:", error);
  return NextResponse.json(
    { error: "User-friendly message" },
    { status: 500 }
  );
}
```

- Always catch at the route level
- Log the real error server-side
- Return a human-readable message to the client
- Use appropriate HTTP status codes

### Client Components

- Show error state in the UI (red text, not console-only)
- Clear errors when the user takes a new action
- Never show raw error objects or stack traces

## Tailwind CSS v4

- **No `tailwind.config.js`** — Tailwind v4 uses CSS-based configuration
- Import via `@import "tailwindcss"` in `globals.css`
- Theme customization via `@theme inline { }` in CSS
- Use `cn()` from `lib/utils.ts` for conditional class merging (clsx + tailwind-merge)

```typescript
import { cn } from "@/lib/utils";

<div className={cn(
  "base-classes",
  isActive && "active-classes",
  className
)} />
```

## Key Conventions

- **Icons:** Always use Lucide React (`lucide-react`), never inline SVGs
- **Font:** Geist only, via `--font-geist-sans` CSS variable
- **IDs:** Use `generateDemoId()` from `lib/utils.ts` for demo IDs, `crypto.randomUUID()` for user/email IDs
- **Dates:** Use `formatDate()` from `lib/utils.ts` for display
- **Database:** Always use `getDb()` — never instantiate Drizzle directly

## File Organization

- Components go in `components/` — grouped by feature (`demo/`, `tutorial/`, `ui/`)
- API logic stays in `app/api/` route files
- Shared logic goes in `lib/`
- Types go in `types/index.ts`
- Tutorial content goes in `content/tutorial/`

## Related Docs

- [Style Guide](./style-guide.md) — Visual design conventions
- [Code Review Checklist](./code-review-checklist.md) — Quality gates
- [Architecture Overview](../architecture/overview.md) — Where code lives and why
