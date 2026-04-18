import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { getDb } from "@/lib/db";
import { demoPages } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { extractDemoMeta } from "@/lib/extract-meta";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  // ── Site-specific OG image ───────────────────────────────────
  if (id) {
    try {
      const db = getDb();
      const [demo] = await db
        .select({ html: demoPages.html, prompt: demoPages.prompt })
        .from(demoPages)
        .where(eq(demoPages.id, id))
        .limit(1);

      if (demo) {
        const meta = extractDemoMeta(demo.html, demo.prompt);

        // Layout A: with hero image
        if (meta.heroImageUrl) {
          return new ImageResponse(
            (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  fontFamily: "sans-serif",
                  color: "white",
                  position: "relative",
                }}
              >
                {/* Hero image background */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={meta.heroImageUrl}
                  alt=""
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                {/* Dark gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.85) 100%)",
                    display: "flex",
                  }}
                />

                {/* Content overlay */}
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    padding: "0 60px 0 60px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      fontSize: 52,
                      fontWeight: 800,
                      lineHeight: 1.2,
                      maxWidth: "900px",
                      textShadow: "0 2px 12px rgba(0,0,0,0.5)",
                    }}
                  >
                    {meta.title}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      fontSize: 24,
                      opacity: 0.9,
                      marginTop: "12px",
                      maxWidth: "800px",
                      lineHeight: 1.4,
                      textShadow: "0 1px 8px rgba(0,0,0,0.5)",
                    }}
                  >
                    {meta.description}
                  </div>
                </div>

                {/* Bottom branding bar */}
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px 60px 32px 60px",
                    marginTop: "20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      fontSize: 28,
                      fontWeight: 900,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    1stvibe.ai
                  </div>
                  <div
                    style={{
                      display: "flex",
                      fontSize: 18,
                      opacity: 0.8,
                      fontWeight: 500,
                    }}
                  >
                    Built with AI in ~15 seconds
                  </div>
                </div>
              </div>
            ),
            {
              width: 1200,
              height: 630,
              headers: {
                "Cache-Control":
                  "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
              },
            }
          );
        }

        // Layout B: no hero image — warm orange gradient with actual site title
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
                background:
                  "linear-gradient(135deg, #C0392B 0%, #D35400 40%, #F5A623 100%)",
                fontFamily: "sans-serif",
                color: "white",
              }}
            >
              {/* Branding */}
              <div
                style={{
                  display: "flex",
                  fontSize: 40,
                  fontWeight: 900,
                  letterSpacing: "-0.02em",
                }}
              >
                1stvibe.ai
              </div>

              {/* Site title + description */}
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
                      textAlign: "center",
                      fontSize: 48,
                      fontWeight: 700,
                      lineHeight: 1.3,
                      maxWidth: "900px",
                    }}
                  >
                    {meta.title}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      textAlign: "center",
                      fontSize: 24,
                      opacity: 0.85,
                      maxWidth: "800px",
                      lineHeight: 1.4,
                      fontWeight: 400,
                    }}
                  >
                    {meta.description}
                  </div>
                </div>
              </div>

              {/* Bottom tagline */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: 22,
                  opacity: 0.9,
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
              "Cache-Control":
                "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
            },
          }
        );
      }
    } catch {
      // Fall through to generic image on any error
    }
  }

  // ── Generic fallback (no id, demo not found, or error) ───────
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
          background:
            "linear-gradient(135deg, #C0392B 0%, #D35400 40%, #F5A623 100%)",
          fontFamily: "sans-serif",
          color: "white",
        }}
      >
        {/* Branding */}
        <div
          style={{
            display: "flex",
            fontSize: 40,
            fontWeight: 900,
            letterSpacing: "-0.02em",
          }}
        >
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
                fontSize: 48,
                fontWeight: 700,
                lineHeight: 1.3,
                maxWidth: "900px",
              }}
            >
              Build a website in ~15 seconds with AI
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
          No coding required. Just describe what you want.
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control":
          "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      },
    }
  );
}
