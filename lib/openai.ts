import OpenAI from "openai";

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
- NEVER invent image URLs. NEVER use unsplash.com, placeholder.com, or any URL you aren't 100% sure is live. Fake URLs show as broken images and ruin the page.
- For ALL photos use Lorem Picsum with a seed: https://picsum.photos/seed/{descriptive-word}/800/600 — this ALWAYS returns a real photo. Change the seed word to match context (e.g. "ocean", "city", "dog"). Change dimensions as needed.
  Examples: https://picsum.photos/seed/sunset/800/600  https://picsum.photos/seed/forest/400/300  https://picsum.photos/seed/puppy/600/400
- For icons and simple graphics, use inline SVGs written directly in the HTML.
- For decorative elements, use CSS gradients, shapes, and background patterns — not images.
- NEVER use <img> with any src other than picsum.photos/seed/ or an inline data URI.

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

  return stripFences(response.choices[0].message.content ?? "");
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
