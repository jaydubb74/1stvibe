---
name: push
description: Build, commit, push to GitHub, and log the change to the push feed
user-invocable: true
disable-model-invocation: true
---

# /push — Build, Commit, Push, and Log

Verify the build, commit all changes, push to GitHub (triggering Vercel deploy), and log the push to the team feed at 1stvibe.ai/pushes.

## Steps

### 1. Verify the build

Run `npm run build` and confirm it passes. If it fails, stop and report the errors — do NOT commit or push broken code.

### 2. Get the author name

Run `git config user.name` to identify who is pushing.

### 3. Analyze changes

Run `git status` (never use -uall flag) and `git diff --staged` and `git diff` to understand all changes. Also run `git log --oneline -5` to see recent commit style.

### 4. Stage and commit

- Stage all relevant changed files (use specific file names, not `git add -A` — avoid staging .env or secrets)
- Write a clear, concise commit message summarizing what changed and why
- End the commit message with: `Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>`

### 5. Push to GitHub

Run `git push` to push to the remote. This triggers a Vercel deployment.

If there's no upstream branch set, use `git push -u origin <branch>`.

### 6. Get the commit hash

Run `git rev-parse --short HEAD` to get the short commit hash.

### 7. Write a push summary

Write a human-readable summary of what was shipped. This is what Michael and Josh will read on the push feed. Be specific and helpful:
- What was added, changed, or fixed
- Why it matters
- Any notable technical details

Keep it to 2-5 sentences. Write for a co-founder, not a git log.

### 8. Log the push entry

Run:
```bash
npx dotenv -e .env.local -- node scripts/add-push.mjs "<author>" "<summary>" "<commitHash>"
```

Replace `<author>` with the git user name, `<summary>` with your push summary, and `<commitHash>` with the short hash.

**Important:** Properly escape the summary for shell (use single quotes if the summary contains double quotes, etc.)

### 9. Confirm

Report to the user:
- What was committed (files and summary)
- The commit hash
- That it was pushed to GitHub
- That the push was logged to 1stvibe.ai/pushes
- Remind them the Vercel deploy will take ~1 minute
