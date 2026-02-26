import OpenAI from "openai";
import { searchPhotos, pexelsImageUrl } from "./pexels";

let _client: OpenAI | null = null;

function getClient(): OpenAI {
  if (_client) return _client;
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set. Add it to your .env.local file.");
  }
  _client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return _client;
}

const SYSTEM_PROMPT = `You are an expert web developer generating beautiful, complete, self-contained HTML pages.

RULES — follow every one of these exactly:

1. Return ONLY valid HTML. No markdown, no code fences, no explanation — just the raw HTML document.
2. Include ALL CSS in a <style> tag inside <head>. Use a clean, modern aesthetic: great typography, comfortable spacing, tasteful colors. The page must be fully mobile-responsive.
3. You may use Tailwind CSS via CDN (<script src="https://cdn.tailwindcss.com"></script>) if it helps — but never any other external CSS framework.
4. Make the page feel personal and alive — match the spirit and intent of the user's prompt. This should feel like a real website, not a template.
5. Include a subtle footer line: "Made with 1stvibe.ai" — small, tasteful, at the bottom.
6. Keep it to a single, complete, beautiful page. No multi-page navigation.

IMAGE RULES — extremely important, follow exactly:
- NEVER invent image URLs. NEVER use unsplash.com, placeholder.com, picsum.photos, or any image URL directly.
- For ALL photos, use this exact placeholder syntax: {{photo:keyword:WIDTHxHEIGHT}}
  These placeholders are automatically replaced with real, keyword-matched photos.
- Use specific, descriptive hyphenated keywords for best results:
  Good: "sunset-over-ocean", "modern-office-space", "fresh-pasta-dish", "golden-retriever-puppy"
  Bad: "image1", "photo", "background"
- Use DIFFERENT keywords for every image, even related ones (e.g. "team-meeting", "team-brainstorm", "team-celebration" — not "team" three times).
- Choose dimensions appropriate to the layout:
  Hero/banner: {{photo:sunset-over-ocean:1200x600}}
  Card/feature image: {{photo:modern-laptop-desk:800x500}}
  Thumbnail/avatar: {{photo:professional-headshot:400x400}}
  Gallery item: {{photo:mountain-lake-reflection:600x400}}
- For decorative elements, use CSS gradients, shapes, and background patterns — not images.
- NEVER use <img> with any src other than a {{photo:...}} placeholder.

ICON RULES — use Lucide Icons for a polished, professional look:
- Include in <head>: <script src="https://unpkg.com/lucide@latest"></script>
- Place just before </body>: <script>lucide.createIcons();</script>
- Use icons as: <i data-lucide="icon-name" class="w-5 h-5"></i>
- ALWAYS set an explicit size via Tailwind w-* h-* classes:
  Small inline: w-4 h-4    Standard: w-5 h-5    Medium: w-6 h-6
  Large feature: w-8 h-8   Hero highlight: w-10 h-10 or w-12 h-12
- Color with Tailwind text-color classes: class="w-5 h-5 text-indigo-600"
- Design best practices:
  • Always pair icons WITH text labels — never use a bare icon as the only way to convey meaning
  • Great places for icons: feature/benefit cards, bulleted lists, nav links, CTAs, stat blocks, testimonials, section headings
  • Keep icon sizes consistent within each section
  • Limit to 1-2 icons per content block — less is more
- Common icon names: heart, star, sun, moon, mail, phone, map-pin, arrow-right, check, x, menu, search, user, home, settings, globe, camera, code, zap, shield, clock, calendar, gift, trending-up, layers, palette, coffee, book, briefcase, award, rocket, send, shopping-cart, message-circle, play, lock, eye, download, upload, wifi, monitor, smartphone, truck, credit-card, bar-chart, activity, target, compass, feather, flag, link, tool, umbrella, music, image, pen-tool, film, headphones, mic, speaker, database, server, cpu

CRITICAL FORM RULE — this must be obeyed in every single output:
- Every <form> element MUST have an inline onsubmit handler that:
  (a) Calls event.preventDefault() to stop any real submission
  (b) Immediately calls alert() with this exact message (copy it verbatim):
      "This rich functionality isn't available on this prototyping tool. Jump into the tutorial to learn how to do this for real at 1stvibe.ai!"
- Apply this pattern to EVERY form, no exceptions:
  <form onsubmit="event.preventDefault(); alert('This rich functionality isn\\'t available on this prototyping tool. Jump into the tutorial to learn how to do this for real at 1stvibe.ai!')">
- Also intercept any standalone buttons that look like they'd trigger an action (contact, book, buy, submit, etc.) with the same alert.`;

/** Strip markdown code fences that some models add despite instructions. */
function stripFences(raw: string): string {
  return raw
    .replace(/^```html\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}

// ── Image placeholder resolution ─────────────────────────────────────────────

const PLACEHOLDER_RE = /\{\{photo:([\w-]+):(\d+)x(\d+)\}\}/g;

/**
 * Find all {{photo:keyword:WxH}} placeholders in the generated HTML,
 * batch-fetch matching photos from Pexels, and replace with real URLs.
 * Falls back to picsum.photos if Pexels returns no results.
 */
async function resolveImagePlaceholders(html: string): Promise<string> {
  const matches = [...html.matchAll(PLACEHOLDER_RE)];
  if (matches.length === 0) return html;

  // Deduplicate keywords
  const keywords = [...new Set(matches.map((m) => m[1]))];

  // Fetch all keywords in parallel
  const photoMap = new Map<string, string[]>();
  await Promise.all(
    keywords.map(async (keyword) => {
      const query = keyword.replace(/-/g, " ");
      const urls = await searchPhotos(query);
      photoMap.set(keyword, urls);
    }),
  );

  // Track per-keyword index so repeated keywords get different photos
  const usageIndex = new Map<string, number>();

  return html.replace(
    PLACEHOLDER_RE,
    (_match, keyword: string, w: string, h: string) => {
      const urls = photoMap.get(keyword) ?? [];
      const idx = usageIndex.get(keyword) ?? 0;
      usageIndex.set(keyword, idx + 1);

      if (urls.length > 0) {
        return pexelsImageUrl(urls[idx % urls.length], parseInt(w), parseInt(h));
      }
      // Fallback: picsum with keyword seed (random but at least not broken)
      return `https://picsum.photos/seed/${keyword}/${w}/${h}`;
    },
  );
}

// ── Page generation ──────────────────────────────────────────────────────────

export async function generateDemoPage(
  prompt: string,
  existingHtml?: string
): Promise<string> {
  const client = getClient();

  const userMessage = existingHtml
    ? `Here is an existing webpage:\n\n${existingHtml}\n\nThe user wants this change: ${prompt}\n\nReturn the full updated HTML page, following all system rules exactly.`
    : `Create a webpage for this idea: ${prompt}`;

  const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userMessage },
    ],
    max_tokens: 4096,
    temperature: 0.7,
  });

  const html = stripFences(response.choices[0].message.content ?? "");
  return resolveImagePlaceholders(html);
}

// ── Moderation ────────────────────────────────────────────────────────────────

export type ModerationResult =
  | { safe: true }
  | { safe: false; reason: string };

/**
 * Run the OpenAI Moderation API on user input.
 * Returns { safe: true } or { safe: false, reason: string }.
 * Never throws — if the moderation call itself fails we fail open (allow),
 * because blocking legitimate users due to an API blip is worse than
 * occasionally letting borderline content through to GPT-4o's own filters.
 */
export async function moderatePrompt(text: string): Promise<ModerationResult> {
  try {
    const client = getClient();
    const result = await client.moderations.create({ input: text });
    const output = result.results[0];

    if (!output.flagged) return { safe: true };

    // Find the top flagged category for a user-facing message
    const flaggedCategories = Object.entries(output.categories)
      .filter(([, flagged]) => flagged)
      .map(([cat]) => cat);

    const category = flaggedCategories[0] ?? "policy violation";
    return {
      safe: false,
      reason: `Your prompt was flagged for: ${category}. Please try a different description.`,
    };
  } catch (err) {
    // Fail open — log but don't block the user
    console.error("[moderation] API error, failing open:", err);
    return { safe: true };
  }
}
