import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { demoPages } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import SiteViewer from "./SiteViewer";

const SESSION_COOKIE = "demo_session";

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ from?: string }>;
}

export default async function SitePage({ params, searchParams }: Props) {
  const { id } = await params;
  const { from } = await searchParams;

  const db = getDb();
  const [demo] = await db
    .select()
    .from(demoPages)
    .where(eq(demoPages.id, id))
    .limit(1);

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
