# Code Review Checklist

> Updated: 2026-02-26

Use this checklist when reviewing completed feature work. Each item should pass before merging.

## Build and Lint

- [ ] `npm run build` passes with no errors
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] No ESLint warnings or errors
- [ ] No unused imports or dead code

## Code Quality

- [ ] Follows [Code Standards](./code-standards.md) — TypeScript strict, no `any`, proper file naming
- [ ] Import order: react/next → third-party → local (`@/`)
- [ ] Uses `cn()` for conditional class merging (not manual string concatenation)
- [ ] No hardcoded secrets or `.env` values in code
- [ ] Error handling: try/catch in API routes, user-friendly messages in UI
- [ ] Loading states present where async operations occur

## Style Compliance

- [ ] Colors match [Style Guide](./style-guide.md) — primary is `indigo-600`, not arbitrary blues
- [ ] Uses Lucide React for icons (not inline SVGs or other icon libraries)
- [ ] Button uses the `Button` component with proper variant/size
- [ ] Spacing follows established patterns (`px-4 sm:px-6`, `gap-4`, etc.)
- [ ] Border radius is consistent (`rounded-xl` for inputs, `rounded-2xl` for cards, `rounded-lg` for buttons)
- [ ] Shadows match conventions (`shadow-sm` for buttons, `shadow-lg` for cards)

## Responsive Design

- [ ] Mobile-first approach — base styles work on small screens
- [ ] `sm:` breakpoint for tablet layout changes
- [ ] `lg:` breakpoint for desktop layout changes
- [ ] No horizontal overflow on mobile
- [ ] Touch targets at least 44px for interactive elements

## User Experience

- [ ] Error states visible in the UI (not just console)
- [ ] Loading/pending states for async operations
- [ ] Empty states are handled with helpful messages
- [ ] Interactive elements have hover/focus/active states
- [ ] Transitions on state changes (`transition-all duration-200`)

## Brand Voice

- [ ] User-facing copy follows [Brand Voice](../strategy/brand-voice.md) — friendly coach tone
- [ ] No jargon without explanation
- [ ] Error messages are human and helpful
- [ ] Success states celebrate the user's action
- [ ] No corporate speak, no exclamation overload

## Security

- [ ] No secrets in client-side code
- [ ] API routes validate input (type, length, format)
- [ ] User-generated content is handled safely (no XSS)
- [ ] Auth checks on protected operations (session cookie validation)
- [ ] Rate limiting on expensive operations

## Related Docs

- [Style Guide](./style-guide.md) — Visual design reference
- [Code Standards](./code-standards.md) — TypeScript and patterns reference
- [Brand Voice](../strategy/brand-voice.md) — Copy and tone reference
