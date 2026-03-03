/**
 * Extract metadata (title, description, hero image) from GPT-4o generated HTML.
 * Uses regex — no DOM parser needed, so it's Edge Runtime compatible.
 */

export interface DemoMeta {
  title: string;
  description: string;
  heroImageUrl: string | null;
}

function truncate(str: string, max: number): string {
  const cleaned = str.replace(/\s+/g, " ").trim();
  if (cleaned.length <= max) return cleaned;
  return cleaned.slice(0, max - 1) + "\u2026";
}

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export function extractDemoMeta(html: string, prompt: string): DemoMeta {
  // ── Title ──────────────────────────────────────────────────────
  let title = "";

  // Try <title>
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (titleMatch) title = stripTags(titleMatch[1]).trim();

  // Fallback: first <h1>
  if (!title) {
    const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    if (h1Match) title = stripTags(h1Match[1]).trim();
  }

  // Fallback: prompt
  if (!title) title = prompt;

  title = truncate(title, 70);

  // ── Description ────────────────────────────────────────────────
  let description = "";

  // Try <meta name="description">
  const metaDescMatch = html.match(
    /<meta\s+[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["'][^>]*\/?>/i
  );
  if (metaDescMatch) description = metaDescMatch[1].trim();

  // Also try content-first ordering: <meta content="..." name="description">
  if (!description) {
    const metaDescAlt = html.match(
      /<meta\s+[^>]*content=["']([\s\S]*?)["'][^>]*name=["']description["'][^>]*\/?>/i
    );
    if (metaDescAlt) description = metaDescAlt[1].trim();
  }

  // Fallback: first <p> with meaningful text
  if (!description) {
    const pMatches = html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi);
    for (const m of pMatches) {
      const text = stripTags(m[1]).trim();
      if (text.length >= 20) {
        description = text;
        break;
      }
    }
  }

  // Fallback: generic
  if (!description) {
    description = "An AI-generated website built in seconds on 1stvibe.ai";
  }

  description = truncate(description, 160);

  // ── Hero image ─────────────────────────────────────────────────
  let heroImageUrl: string | null = null;

  // Find first <img src="..."> with an absolute URL (Pixabay, Picsum, etc.)
  const imgMatches = html.matchAll(/<img[^>]*\ssrc=["'](https?:\/\/[^"']+)["'][^>]*\/?>/gi);
  for (const m of imgMatches) {
    const src = m[1];
    // Only use images from known stock photo sources to avoid tiny icons/logos
    if (
      src.includes("pixabay.com") ||
      src.includes("picsum.photos") ||
      src.includes("unsplash.com") ||
      src.includes("pexels.com") ||
      src.includes("images.unsplash.com")
    ) {
      heroImageUrl = src;
      break;
    }
  }

  return { title, description, heroImageUrl };
}
