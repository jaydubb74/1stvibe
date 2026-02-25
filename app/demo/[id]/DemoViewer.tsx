"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { ExternalLink, Pencil, ArrowRight, Check, X } from "lucide-react";
import Link from "next/link";

interface Props {
  demo: { id: string; html: string; prompt: string };
  canEdit: boolean;
}

export default function DemoViewer({ demo, canEdit }: Props) {
  const [editPrompt, setEditPrompt] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [hasEdited, setHasEdited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const demoUrl = `/demo/${demo.id}`;

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault();
    if (!editPrompt.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/demo/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: editPrompt, demoId: demo.id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Edit failed");
      setHasEdited(true);
      setShowEdit(false);
      setEditPrompt("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Edit failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/" className="text-indigo-600 font-bold text-sm shrink-0">
            1stvibe.ai
          </Link>
          <span className="text-gray-300">|</span>
          <span className="text-sm text-gray-500 truncate">
            &ldquo;{demo.prompt}&rdquo;
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-indigo-600 transition-colors"
          >
            <ExternalLink size={14} />
            Open in new tab
          </a>
        </div>
      </div>

      {/* Preview */}
      <div className="flex-1 relative">
        <iframe
          srcDoc={demo.html}
          className="w-full h-full min-h-[calc(100vh-200px)] border-0"
          sandbox="allow-scripts allow-same-origin"
          title="Your generated webpage"
        />
      </div>

      {/* Bottom action bar */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        {!hasEdited && canEdit && !showEdit && (
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-3">
            <div className="flex-1 text-center sm:text-left">
              <p className="font-semibold text-gray-900">You just built a webpage! 🎉</p>
              <p className="text-sm text-gray-500">Want to tweak it? You get one edit — make it count.</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => setShowEdit(true)}
                className="flex items-center gap-1.5"
              >
                <Pencil size={14} />
                Tweak it
              </Button>
              <Link href="/tutorial/welcome">
                <Button className="flex items-center gap-1.5">
                  Learn to do this yourself
                  <ArrowRight size={14} />
                </Button>
              </Link>
            </div>
          </div>
        )}

        {showEdit && (
          <form onSubmit={handleEdit} className="max-w-2xl mx-auto">
            <p className="text-sm font-medium text-gray-700 mb-2">
              What would you like to change?
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={editPrompt}
                onChange={(e) => setEditPrompt(e.target.value)}
                placeholder="e.g. Make the background dark blue and add a contact button"
                className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-400"
                autoFocus
              />
              <Button type="submit" size="sm" loading={loading} disabled={!editPrompt.trim()}>
                <Check size={14} />
                Apply
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setShowEdit(false)}
              >
                <X size={14} />
              </Button>
            </div>
            {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
          </form>
        )}

        {(hasEdited || !canEdit) && (
          <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-3">
            <div className="flex-1 text-center sm:text-left">
              <p className="font-semibold text-gray-900">
                {hasEdited ? "Looking good! ✨" : "Someone built this with 1stvibe.ai"}
              </p>
              <p className="text-sm text-gray-500">
                Now let&apos;s show you how to build your own — for real.
              </p>
            </div>
            <Link href="/tutorial/welcome">
              <Button className="flex items-center gap-1.5">
                Start the tutorial
                <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
