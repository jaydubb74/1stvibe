interface PixabayHit {
  largeImageURL: string;
  webformatURL: string;
}

interface PixabaySearchResponse {
  hits: PixabayHit[];
}

/**
 * Search Pixabay for landscape photos matching a keyword.
 * Returns an array of image URLs.
 * Returns [] if the API key is missing or the request fails.
 */
export async function searchPhotos(
  query: string,
  count = 5,
): Promise<string[]> {
  const apiKey = process.env.PIXABAY_API_KEY;
  if (!apiKey) return [];

  try {
    const res = await fetch(
      `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&per_page=${count}&orientation=horizontal&image_type=photo&safesearch=true`,
    );
    if (!res.ok) return [];

    const data: PixabaySearchResponse = await res.json();
    return data.hits.map((h) => h.largeImageURL);
  } catch {
    return [];
  }
}

/**
 * Pixabay URLs already include size info, but we can use webformatURL
 * for a specific size. For now, just return the URL as-is since
 * largeImageURL is typically ~1280px wide which works for most layouts.
 */
export function pexelsImageUrl(baseUrl: string): string {
  return baseUrl;
}
