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

Rules:
- Return ONLY valid HTML. No markdown, no code fences, no explanation.
- Include ALL CSS inline in a <style> tag in the <head>.
- No external CSS frameworks. No external JS (a small CDN script is OK if truly useful).
- Use a clean, modern aesthetic: good typography, comfortable spacing, tasteful colors.
- The page must be fully responsive (mobile-friendly).
- Make it personal and delightful — match the spirit of the user's prompt.
- Include a subtle footer: "Made with 1stvibe.ai"
- Keep the page focused and complete. Aim for a single beautiful page, not a multi-page site.`;

export async function generateDemoPage(
  prompt: string,
  existingHtml?: string
): Promise<string> {
  const client = getClient();

  const userMessage = existingHtml
    ? `Here is an existing webpage:\n\n${existingHtml}\n\nUser wants this change: ${prompt}\n\nReturn the full updated HTML page.`
    : `Create a webpage for this idea: ${prompt}`;

  const response = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userMessage },
    ],
    max_tokens: 4000,
    temperature: 0.7,
  });

  const content = response.choices[0].message.content ?? "";
  return content
    .replace(/^```html\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();
}
