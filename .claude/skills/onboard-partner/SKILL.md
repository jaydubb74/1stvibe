---
name: onboard-partner
description: Generate a briefing on recent changes for your co-founder
user-invocable: true
disable-model-invocation: true
---

# /onboard-partner — Partner Briefing

Generate a summary of recent changes so your co-founder can quickly get up to speed.

## Steps

1. Run `git log --oneline -20` to see recent commits

2. For each meaningful commit (skip trivial ones like typo fixes):
   - Read the changed files if needed to understand the change
   - Summarize what was done and why

3. Check for recently updated documentation:
   - Look at modification times of files in `docs/`
   - Read any recently created or updated docs

4. Produce a briefing in this format:

```
## Partner Briefing — {today's date}

### Recent Changes
| When | What | Why |
|------|------|-----|
| commit date | Summary of change | Purpose/motivation |
| ... | ... | ... |

### New/Updated Docs
- `docs/path/to/file.md` — What was added or changed

### Key Decisions Made
- Any architectural or design decisions that affect future work

### In Progress / Open Items
- Work that's started but not finished
- Questions that need discussion

### What's Next
- Suggested priorities based on recent momentum

### Heads Up
- Anything that might surprise you (breaking changes, new dependencies, etc.)
```

5. Keep it concise — your partner is busy. Focus on what they need to know to start working effectively, not a detailed changelog.
