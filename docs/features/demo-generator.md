# Demo Generator

> Updated: 2026-02-26

## What It Does

Users type a description of a website they want, and the AI generates a fully functional single-page HTML site in ~15 seconds. This is the primary hook that gets users into the product.

## Flow

```
User types prompt in DemoForm
  → POST /api/demo/generate { prompt }
    → Rate limit check (3/hour per IP)
    → Content moderation (OpenAI Moderation API)
    → GPT-4o generates HTML (system prompt + user prompt)
    → Regex extracts {{photo:keyword:WxH}} placeholders
    → Batch search Pixabay for images
    → Replace placeholders with real image URLs
    → Insert into demoPages table (7-day TTL)
    → Set demo_session httpOnly cookie
    → Return { id, html }
  → Client navigates to /site/{id}
```

## Key Files

| File | Purpose |
|------|---------|
| `components/demo/DemoForm.tsx` | Input form with placeholder prompts, provocation hints, loading overlay |
| `app/api/demo/generate/route.ts` | API route: validation, rate limiting, generation, storage |
| `lib/openai.ts` | GPT-4o generation, content moderation, image placeholder resolution |
| `lib/pexels.ts` | Pixabay API client (filename is legacy — actually uses Pixabay) |
| `lib/ratelimit.ts` | IP-based rate limiting (in-memory rolling window) |
| `app/site/[id]/page.tsx` | Server component: fetch demo, check expiry, generate OG metadata |
| `app/site/[id]/SiteViewer.tsx` | Client component: iframe display, tweak FAB, share button |

## GPT-4o System Prompt

The system prompt (`lib/openai.ts`, ~64 lines) enforces:
- Output raw HTML only — no markdown fences, no explanation
- All CSS inline in a `<style>` tag (Tailwind CDN allowed)
- Mobile responsive design
- Footer: "Made with 1stvibe.ai"
- Single page — no multi-page navigation
- **Image rule:** Never use external image URLs. Use `{{photo:keyword:WxH}}` placeholders with descriptive hyphenated keywords
- **Lucide icons** via CDN with `lucide.createIcons()` and explicit size classes
- **Form rule:** All `<form>` elements must have `onsubmit="event.preventDefault(); alert('...')"` explaining this is a prototype

### Image Placeholder System

**Pattern:** `{{photo:keyword:WIDTHxHEIGHT}}`

**Examples:**
- `{{photo:sunset-over-ocean:1200x600}}` (hero banner)
- `{{photo:modern-office-space:800x500}}` (card image)
- `{{photo:fresh-pasta-dish:400x400}}` (thumbnail)

**Resolution process:**
1. Regex extracts all placeholders from HTML
2. Deduplicate keywords
3. Batch-search Pixabay for each keyword (up to 5 results per keyword)
4. Replace placeholders: rotate through results so same keyword gets different images
5. Fallback: `picsum.photos/seed/{keyword}/{w}/{h}` if Pixabay returns nothing

**Recommended dimensions:**
- Hero/banner: 1200x600
- Card image: 800x500
- Thumbnail/avatar: 400x400
- Gallery: 600x400

## Rate Limiting

- **Limit:** 3 generations per hour per IP
- **Algorithm:** In-memory rolling window
- **Cleanup:** Every 10 minutes to prevent memory bloat
- **IP source:** `x-forwarded-for` or `x-real-ip` headers
- **Response on limit:** 429 with `resetInMinutes` field

## Content Moderation

- Uses OpenAI Moderation API before generation
- Returns flagged category as user-friendly message
- **Fail-open policy:** If the moderation API errors, the request is allowed (prioritizes UX over false positives)

## Site Viewer

Once generated, demos are viewed at `/site/{id}`:

- **Iframe rendering** with `sandbox="allow-scripts allow-same-origin"`
- **Top bar:** Branding, truncated prompt, Share button
- **Share:** Native Web Share API or clipboard copy
- **Tweak FAB** (owner only): Input for edit prompts
  - Max 3 free iterations (tracked in localStorage as `vibeiter_{id}`)
  - After exhaustion: "Start the Tutorial" CTA (funnel to tutorial)
- **Visitor FAB:** "Build yours free" (funnel to homepage)
- **Friend banner** (via `?from=share`): "Your friend built this in ~15 seconds with AI"

## Demo TTL

- **Expiry:** 7 days (168 hours) from creation
- **Cleanup:** Cron job at 3 AM UTC deletes expired, non-persisted demos
- **Persisted flag:** If `persisted = true`, demo survives cleanup (for authenticated users)

## Session/Ownership

- `demo_session` httpOnly cookie contains JSON array of owned demo IDs
- SameSite: lax, path: /
- Max age matches demo TTL
- Edit access checked by verifying `demoId` exists in session cookie

## Related Docs

- [API Routes](../architecture/api-routes.md) — Endpoint details
- [Database](../architecture/database.md) — demoPages schema
- [Homepage UX](./homepage-ux.md) — DemoForm UX patterns
- [Architecture Overview](../architecture/overview.md) — System diagram
