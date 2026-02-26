---
name: codereview
description: Review recently completed feature work against best practices
user-invocable: true
disable-model-invocation: true
argument-hint: "[files or branch]"
---

# /codereview — Structured Code Review

Perform a structured code review of the specified files or recent changes.

## Steps

1. Read `docs/guides/code-review-checklist.md` for the review criteria
2. Read `docs/guides/style-guide.md` for visual design reference
3. Read `docs/guides/code-standards.md` for coding conventions

4. Identify what to review:
   - If specific files were provided as arguments, review those files
   - If a branch was specified, run `git diff main...HEAD` to see changes
   - If nothing specified, run `git diff HEAD~1` to review the last commit's changes

5. Run `npm run build` to verify the build passes

6. Review each changed file against the checklist:
   - **Build & Lint:** TypeScript errors, ESLint warnings, unused imports
   - **Code Quality:** Strict types, import order, cn() usage, error handling
   - **Style Compliance:** Correct colors (indigo-600 primary), Lucide icons, Button component, spacing, border-radius
   - **Responsive:** Mobile-first, sm:/lg: breakpoints, no horizontal overflow
   - **UX:** Error states, loading states, empty states, hover/focus/active
   - **Brand Voice:** Friendly coach tone, no jargon, helpful errors
   - **Security:** No secrets in client code, input validation, auth checks

7. Report results in this format:

```
## Code Review Results

### Build
- [ ] or [x] `npm run build` passes

### File: {path}
| Criterion | Status | Notes |
|-----------|--------|-------|
| TypeScript | PASS/FAIL | details |
| Style guide | PASS/FAIL | file:line — specific issue |
| Responsive | PASS/FAIL | details |
| ... | ... | ... |

### Summary
- **Passing:** X/Y criteria
- **Issues:** list specific problems with file:line references
- **Suggestions:** optional improvements (not blockers)
```
