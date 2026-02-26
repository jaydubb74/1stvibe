import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const prompt = req.nextUrl.searchParams.get("prompt") ?? "My AI-Generated Website";

  // Truncate long prompts
  const displayPrompt =
    prompt.length > 180 ? prompt.slice(0, 177) + "…" : prompt;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px",
          background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #a855f7 100%)",
          fontFamily: "sans-serif",
          color: "white",
        }}
      >
        {/* Branding */}
        <div style={{ display: "flex", fontSize: 28, fontWeight: 700, opacity: 0.9 }}>
          1stvibe.ai
        </div>

        {/* Prompt card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            padding: "0 20px",
          }}
        >
          <div
            style={{
              display: "flex",
              background: "rgba(255,255,255,0.15)",
              borderRadius: 24,
              padding: "40px 48px",
              maxWidth: "100%",
              textAlign: "center",
              fontSize: 36,
              fontWeight: 600,
              lineHeight: 1.4,
            }}
          >
            &ldquo;{displayPrompt}&rdquo;
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: 22,
            opacity: 0.85,
            fontWeight: 500,
          }}
        >
          Built with AI in ~15 seconds
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}
