import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const prompt = req.nextUrl.searchParams.get("prompt") ?? "";

  // Short description for context — but NOT the raw prompt
  const hasPrompt = prompt.length > 0;

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
        <div style={{ display: "flex", fontSize: 40, fontWeight: 900, letterSpacing: "-0.02em" }}>
          1stvibe.ai
        </div>

        {/* Main message */}
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
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 64,
              }}
            >
              ✨
            </div>
            <div
              style={{
                display: "flex",
                textAlign: "center",
                fontSize: hasPrompt ? 42 : 48,
                fontWeight: 700,
                lineHeight: 1.3,
                maxWidth: "900px",
              }}
            >
              {hasPrompt
                ? "I made this website in ~15 seconds"
                : "Build a website in ~15 seconds with AI"}
            </div>
          </div>
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: 24,
            opacity: 0.9,
            fontWeight: 500,
          }}
        >
          {hasPrompt
            ? "Check it out — then build your own for free"
            : "No coding required. Just describe what you want."}
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
