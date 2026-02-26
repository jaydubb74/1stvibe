"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { Sparkles, Loader2 } from "lucide-react";

/** Rotating copy shown on the loading screen while waiting for the AI. */
const LOADING_LINES = [
  "Asking the AI nicely…",
  "Writing your HTML…",
  "Choosing colors that don't clash…",
  "Making it mobile-friendly (yes, really)…",
  "Adding a footer so it looks legit…",
  "Double-checking the vibes…",
  "Almost there…",
];

export default function DemoForm() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingLine, setLoadingLine] = useState(0);
  const [error, setError] = useState("");
  const router = useRouter();

  // Cycle through loading copy every ~2.5 s while waiting
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadingLine((prev) => (prev + 1) % LOADING_LINES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [loading]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setError("");
    setLoadingLine(0);

    try {
      const res = await fetch("/api/demo/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      router.push(`/site/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again.");
      setLoading(false);
    }
  }

  // ── Loading overlay ────────────────────────────────────────────
  if (loading) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex flex-col items-center gap-5 py-8 px-6 bg-white rounded-2xl border-2 border-indigo-100 shadow-lg shadow-indigo-50">
          {/* Spinning sparkle */}
          <div className="relative flex items-center justify-center w-16 h-16">
            <div className="absolute inset-0 rounded-full bg-indigo-100 animate-ping opacity-40" />
            <div className="w-14 h-14 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200">
              <Sparkles size={28} className="text-white" />
            </div>
          </div>

          <div className="text-center">
            <p className="text-lg font-bold text-gray-900 mb-1">
              Building your site…
            </p>
            <p className="text-sm text-indigo-500 font-medium min-h-[1.5rem] transition-all duration-500">
              {LOADING_LINES[loadingLine]}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Loader2 size={13} className="animate-spin" />
            Usually takes 10–20 seconds
          </div>

          <p className="text-xs text-gray-400 italic text-center max-w-sm leading-relaxed">
            &ldquo;{prompt.length > 80 ? prompt.slice(0, 80) + "…" : prompt}&rdquo;
          </p>
        </div>
      </div>
    );
  }

  // ── Input form ─────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="I want a webpage for my dog-walking business with a booking form and friendly colors…"
            className="w-full h-20 sm:h-14 px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-50 resize-none text-gray-800 placeholder-gray-400 text-base transition-all"
            maxLength={600}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as unknown as React.FormEvent);
              }
            }}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={!prompt.trim()}
          className="sm:self-end sm:h-14 whitespace-nowrap"
        >
          <Sparkles size={18} />
          Build It
        </Button>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>
      )}

      <p className="mt-2 text-xs text-gray-400 text-center">
        Free to try · No account required · Takes ~15 seconds
      </p>
    </form>
  );
}
