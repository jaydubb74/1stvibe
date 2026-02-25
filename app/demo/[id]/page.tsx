import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { getDb } from "@/lib/db";
import { demoPages } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import DemoViewer from "./DemoViewer";

const SESSION_COOKIE = "demo_session";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DemoPage({ params }: Props) {
  const { id } = await params;

  const db = getDb();
  const [demo] = await db
    .select()
    .from(demoPages)
    .where(eq(demoPages.id, id))
    .limit(1);

  if (!demo) return notFound();

  // Check if expired
  if (demo.expiresAt < new Date() && !demo.persisted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <p className="text-4xl mb-4">⏳</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            This demo has expired
          </h1>
          <p className="text-gray-600 mb-6">
            Demo pages are temporary. Create an account to save your creations
            permanently.
          </p>
          <a
            href="/"
            className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Build a new one →
          </a>
        </div>
      </div>
    );
  }

  // Cookie-based access control
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE);
  const ownedIds: string[] = sessionCookie
    ? JSON.parse(sessionCookie.value || "[]")
    : [];
  const canEdit = ownedIds.includes(id);

  return <DemoViewer demo={{ id: demo.id, html: demo.html, prompt: demo.prompt }} canEdit={canEdit} />;
}
