---
name: planbuild
description: Plan a new feature by researching codebase and strategy docs
user-invocable: true
disable-model-invocation: true
argument-hint: "[feature description]"
---

# /planbuild — Plan a New Feature

Research the codebase and documentation, then produce a detailed implementation plan.

## Steps

1. Read the feature description provided as the argument

2. Read relevant strategy docs for context:
   - `docs/strategy/vision.md` — Does this feature align with our mission?
   - `docs/strategy/customer-profile.md` — How does this serve our audience?
   - `docs/strategy/brand-voice.md` — What tone should user-facing elements use?

3. Read relevant architecture docs:
   - `docs/architecture/overview.md` — How does this fit the system?
   - `docs/architecture/api-routes.md` — Any new endpoints needed?
   - `docs/architecture/database.md` — Any schema changes needed?

4. Read development guides:
   - `docs/guides/style-guide.md` — Visual design conventions to follow
   - `docs/guides/code-standards.md` — Code patterns to follow

5. Explore the codebase for related existing code:
   - Search for similar patterns
   - Identify files that will need changes
   - Understand current data flow

6. Produce a plan with these sections:

```
## Feature: {name}

### What We're Building
One paragraph describing the feature and why it matters.

### User Story
As a [user type], I want [action] so that [benefit].

### Files to Change
| File | Change |
|------|--------|
| path/to/file.tsx | What to modify and why |

### New Files
| File | Purpose |
|------|---------|
| path/to/new-file.tsx | What it does |

### API Changes (if any)
- New/modified endpoints with request/response shapes

### Database Changes (if any)
- New columns, tables, or migrations needed

### UX Considerations
- Brand voice alignment
- Mobile responsiveness
- Loading/error states
- Accessibility

### Implementation Order
1. Step one
2. Step two
3. ...

### Open Questions
- Any decisions that need input before starting
```

7. Present the plan and ask for approval before writing any code.
