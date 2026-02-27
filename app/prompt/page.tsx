import type { Metadata } from "next";
import PromptEditor from "./PromptEditor";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "System Prompt Editor — 1stvibe.ai",
  robots: { index: false },
};

export default function PromptPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          System Prompt Editor
        </h1>
        <PromptEditor />
      </div>
    </main>
  );
}
