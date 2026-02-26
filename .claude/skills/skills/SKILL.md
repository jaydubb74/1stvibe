---
name: skills
description: List all available Claude Code skills with descriptions and usage
user-invocable: true
disable-model-invocation: true
---

# /skills — Available Skills Reference

Print the following skill reference for the user:

---

## Available Skills

| Skill | File | What it does | When to use it |
|-------|------|-------------|----------------|
| `/restart` | `.claude/skills/restart/SKILL.md` | Reads all project docs and gets Claude up to speed on the codebase, audience, brand voice, tech stack, and conventions | **Start of every session** — first thing you run |
| `/planbuild` | `.claude/skills/planbuild/SKILL.md` | Researches strategy + architecture docs, explores the codebase, produces a structured implementation plan | **Before building** a new feature — get alignment before writing code |
| `/codereview` | `.claude/skills/codereview/SKILL.md` | Audits changed files against the code review checklist: build, style, responsive, UX, brand voice, security | **After completing** feature work — before pushing |
| `/stylecheck` | `.claude/skills/stylecheck/SKILL.md` | Audits a specific component/page against the style guide (colors, spacing, typography, icons, borders, responsive) | When you want a **focused style audit** on a specific file |
| `/document` | `.claude/skills/document/SKILL.md` | Creates or updates docs in the appropriate docs/ category, updates INDEX.md | **After finishing** a feature or making material changes |
| `/push` | `.claude/skills/push/SKILL.md` | Builds, commits, pushes to GitHub (triggering Vercel deploy), and logs the push to 1stvibe.ai/pushes | **When you're done working** — ships code and logs it for your partner |
| `/onboard-partner` | `.claude/skills/onboard-partner/SKILL.md` | Summarizes recent git commits and doc changes into a briefing | When you want to **catch up** on what your co-founder has been doing |
| `/skills` | `.claude/skills/skills/SKILL.md` | This list! Shows all available skills | When you **forget** what's available |

## Typical Workflow

```
/restart                    ← Start of session
  ... work on features ...
/codereview                 ← Check your work
/document                   ← Update docs if needed
/push                       ← Ship it and log it
```

## Partner Sync Workflow

```
/restart                    ← Get up to speed
/onboard-partner            ← See what they shipped
  ... continue their work or start new work ...
```
