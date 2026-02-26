import { cache } from "react";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { demoPages } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import SiteViewer from "./SiteViewer";
import type { Metadata } from "next";

const SESSION_COOKIE = "demo_session";

const getDemo = cache(async (id: string) => {
  const db = getDb();
  const [demo] = await db
    .select()
    .from(demoPages)
    .where(eq(demoPages.id, id))
    .limit(1);
  return demo ?? null;
});

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const demo = await getDemo(id);
  if (!demo) return {};

  const truncatedPrompt =
    demo.prompt.length > 70 ? demo.prompt.slice(0, 67) + "…" : demo.prompt;
  const title = `"${truncatedPrompt}" — Built with AI | 1stvibe.ai`;
  const description = `Someone described a website and AI built it in seconds. See what was created from: "${demo.prompt}"`;
  const ogImageUrl = `https://1stvibe.ai/api/og?prompt=${encodeURIComponent(demo.prompt)}`;
  const pageUrl = `https://1stvibe.ai/site/${id}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "1stvibe.ai",
      type: "website",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `AI-generated site: ${truncatedPrompt}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
    other: {
      "theme-color": "#4f46e5",
    },
  };
}

export default async function SitePage({ params, searchParams }: Props) {
  const { id } = await params;
  const { from } = await searchParams;

  const demo = await getDemo(id);

  if (!demo) return notFound();

  // Expired & not persisted
  if (demo.expiresAt < new Date() && !demo.persisted) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-5xl mb-4">⏳</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            This site has expired
          </h1>
          <p className="text-gray-500 mb-6 leading-relaxed">
            AI-generated sites are stored for 7 days. This one has passed its
            expiry. Build a new one in seconds!
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            Build a new one →
          </Link>
        </div>
      </div>
    );
  }

  // Determine edit ownership from session cookie
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE);
  const ownedIds: string[] = sessionCookie
    ? JSON.parse(sessionCookie.value || "[]")
    : [];
  const canEdit = ownedIds.includes(id);

  // "from=share" means a friend clicked a shared link
  const fromShare = from === "share";

  return (
    <SiteViewer
      demo={{
        id: demo.id,
        html: demo.html,
        prompt: demo.prompt,
        iterationCount: demo.iterationCount ?? 0,
      }}
      canEdit={canEdit}
      fromShare={fromShare}
    />
  );
}
