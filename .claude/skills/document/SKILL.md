---
name: document
description: Document a completed feature or material update
user-invocable: true
disable-model-invocation: true
argument-hint: "[feature name or files]"
---

# /document — Document Completed Work

Create or update documentation for a completed feature or material change.

## Steps

1. Read `docs/guides/documentation-standards.md` for format and placement rules
2. Read `docs/INDEX.md` to understand the existing documentation structure

3. Identify what changed:
   - If a feature name was provided, explore the relevant source files
   - If specific files were provided, read them to understand the changes
   - If nothing specified, run `git log --oneline -10` and `git diff HEAD~1` to see recent work

4. Determine the right action:
   - **New feature?** Create a new doc in the appropriate `docs/` category:
     - Strategy decisions → `docs/strategy/`
     - System/API/database changes → `docs/architecture/`
     - Convention changes → `docs/guides/`
     - Feature behavior → `docs/features/`
   - **Update to existing feature?** Find and update the relevant existing doc

5. Write the documentation following the standards:
   - Title as `# Clear Title`
   - Updated date as `> Updated: YYYY-MM-DD`
   - Organized sections with `##` headings
   - Tables for structured data
   - File paths for key source files
   - `## Related Docs` section with cross-links

6. Update `docs/INDEX.md` if a new file was added (add entry in the right category table)

7. Update `CLAUDE.md` only if architectural patterns or key conventions changed

8. Summarize what was documented and what files were created/updated.
