"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Sparkles,
  Share2,
  X,
  Send,
  ArrowRight,
  BookOpen,
  Check,
  Loader2,
} from "lucide-react";

const MAX_ITERATIONS = 3;

interface Demo {
  id: string;
  html: string;
  prompt: string;
  iterationCount: number;
}

interface Props {
  demo: Demo;
  canEdit: boolean;
  fromShare: boolean;
}

export default function SiteViewer({ demo, canEdit, fromShare }: Props) {
  // ── State ─────────────────────────────────────────────────────
  const [html, setHtml] = useState(demo.html);
  const [fabOpen, setFabOpen] = useState(false);
  const [tweakPrompt, setTweakPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [friendBannerDismissed, setFriendBannerDismissed] = useState(false);
  const [shareState, setShareState] = useState<"idle" | "copied" | "shared">("idle");
  // Track iterations in localStorage so they survive page refreshes
  const [iterationsUsed, setIterationsUsed] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const storageKey = `vibeiter_${demo.id}`;
  const isExhausted = iterationsUsed >= MAX_ITERATIONS;
  const iterationsLeft = MAX_ITERATIONS - iterationsUsed;

  // ── Effects ───────────────────────────────────────────────────
  // Restore iteration count from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const parsed = parseInt(stored, 10);
      if (!isNaN(parsed)) setIterationsUsed(parsed);
    }
  }, [storageKey]);

  // Focus input when popover opens
  useEffect(() => {
    if (fabOpen && !isExhausted && inputRef.current) {
      const timer = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(timer);
    }
  }, [fabOpen, isExhausted]);

  // Update iframe when html changes (avoids full page reload)
  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = html;
    }
  }, [html]);

  // ── Tweak handler ─────────────────────────────────────────────
  const handleTweak = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!tweakPrompt.trim() || loading || isExhausted) return;

      setLoading(true);
      setError("");

      try {
        const res = await fetch("/api/demo/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: tweakPrompt.trim(), demoId: demo.id }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Tweak failed");

        // API now returns { id, html } — update iframe directly
        if (data.html) setHtml(data.html);

        const newCount = iterationsUsed + 1;
        setIterationsUsed(newCount);
        localStorage.setItem(storageKey, String(newCount));
        setTweakPrompt("");

        // Keep popover open to show exhaustion message if limit reached,
        // otherwise close it so the user sees their updated site.
        if (newCount < MAX_ITERATIONS) {
          setFabOpen(false);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Tweak failed. Try again.");
      } finally {
        setLoading(false);
      }
    },
    [tweakPrompt, loading, isExhausted, demo.id, iterationsUsed, storageKey]
  );

  // ── Share handler ─────────────────────────────────────────────
  const handleShare = useCallback(() => {
    const shareUrl = `${window.location.origin}/site/${demo.id}?from=share`;
    if (navigator.share) {
      navigator
        .share({
          title: "1stvibe.ai",
          text: "I made this in ~15 seconds with 1stvibe.ai - check it out!",
          url: shareUrl,
        })
        .then(() => setShareState("shared"))
        .catch(() => {}); // user cancelled — no-op
    } else {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setShareState("copied");
        setTimeout(() => setShareState("idle"), 2500);
      });
    }
  }, [demo.id]);

  // ── Render ────────────────────────────────────────────────────
  return (
    /*
     * position: fixed + inset-0 means this view covers the full viewport,
     * including the root layout's <Nav> and <Footer>. This gives us the
     * true full-screen experience without restructuring the Next.js layout tree.
     */
    <div className="fixed inset-0 z-50 bg-white flex flex-col overflow-hidden">
      {/* ── Friend-shared banner ──────────────────────────────── */}
      {fromShare && !friendBannerDismissed && (
        <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white px-4 py-2.5 flex items-center justify-between gap-3 shrink-0">
          <p className="text-sm font-medium text-center flex-1 leading-snug flex items-center justify-center gap-2 flex-wrap">
            <span className="font-black text-base tracking-tight">1stvibe.ai</span>
            <span className="opacity-90">
              ✨ Your friend built this in ~15 seconds with AI.
            </span>{" "}
            <Link
              href="/"
              className="underline font-bold hover:text-indigo-100 transition-colors"
            >
              Try vibecoding your own site now →
            </Link>
          </p>
          <button
            onClick={() => setFriendBannerDismissed(true)}
            className="text-white/70 hover:text-white shrink-0 transition-colors"
            aria-label="Dismiss"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* ── Top chrome bar ───────────────────────────────────── */}
      <div className="h-11 bg-white border-b border-gray-100 flex items-center justify-between px-4 shrink-0 shadow-sm">
        {/* Left: branding + prompt excerpt */}
        <div className="flex items-center gap-2.5 min-w-0">
          <Link
            href="/"
            className="text-indigo-600 font-black text-sm tracking-tight shrink-0 hover:text-indigo-700 transition-colors"
          >
            1stvibe.ai
          </Link>
          <span className="text-gray-200 hidden sm:block select-none">|</span>
          <span className="text-xs text-gray-400 truncate hidden sm:block max-w-xs">
            &ldquo;{demo.prompt.length > 70
              ? demo.prompt.slice(0, 70) + "…"
              : demo.prompt}&rdquo;
          </span>
        </div>

        {/* Right: share button */}
        <div className="flex items-center gap-2 shrink-0">
          {shareState === "copied" && (
            <span className="text-xs text-green-600 font-medium flex items-center gap-1 animate-fade-in">
              <Check size={12} />
              Link copied!
            </span>
          )}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-indigo-600 border border-gray-200 hover:border-indigo-300 rounded-lg px-3 py-1.5 transition-all hover:bg-indigo-50"
          >
            <Share2 size={13} />
            Share
          </button>
        </div>
      </div>

      {/* ── Iframe + floating controls ───────────────────────── */}
      <div className="flex-1 relative overflow-hidden">
        {/* The generated site */}
        <iframe
          ref={iframeRef}
          srcDoc={html}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin"
          title="Your AI-generated webpage"
        />

        {/* ── Floating sparkly FAB area ─────────────────────── */}
        {canEdit && (
          <div className="absolute bottom-6 right-5 flex flex-col items-end gap-3 pointer-events-none">
            {/* ── Chat / tweak popover ────────────────────── */}
            {fabOpen && (
              <div
                className="pointer-events-auto bg-white rounded-2xl shadow-2xl border border-gray-100 w-80 overflow-hidden"
                style={{ maxHeight: "calc(100vh - 120px)" }}
              >
                {!isExhausted ? (
                  <>
                    {/* Popover header */}
                    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-white">
                      <div>
                        <p className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                          <Sparkles size={14} className="text-indigo-500" />
                          Tweak your site
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {iterationsLeft} free tweak
                          {iterationsLeft !== 1 ? "s" : ""} remaining
                        </p>
                      </div>
                      <button
                        onClick={() => setFabOpen(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close"
                      >
                        <X size={16} />
                      </button>
                    </div>

                    {/* Input form */}
                    <form onSubmit={handleTweak} className="p-3">
                      <div className="flex gap-2">
                        <input
                          ref={inputRef}
                          type="text"
                          value={tweakPrompt}
                          onChange={(e) => setTweakPrompt(e.target.value)}
                          placeholder='e.g. "Make the buttons purple"'
                          className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 placeholder-gray-300 transition-all"
                          disabled={loading}
                          maxLength={400}
                        />
                        <button
                          type="submit"
                          disabled={!tweakPrompt.trim() || loading}
                          className="bg-indigo-600 text-white px-3 py-2 rounded-xl hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center"
                          aria-label="Apply tweak"
                        >
                          {loading ? (
                            <Loader2 size={15} className="animate-spin" />
                          ) : (
                            <Send size={14} />
                          )}
                        </button>
                      </div>
                      {error && (
                        <p className="mt-1.5 text-xs text-red-500 leading-snug">
                          {error}
                        </p>
                      )}
                      {loading && (
                        <p className="mt-2 text-xs text-indigo-500 flex items-center gap-1.5">
                          <Loader2 size={11} className="animate-spin" />
                          Updating your site…
                        </p>
                      )}
                    </form>
                  </>
                ) : (
                  /* ── Exhaustion / funnel state ─────────────── */
                  <div className="p-5 text-center">
                    <div className="text-3xl mb-2">🎉</div>
                    <p className="font-bold text-gray-900 text-sm mb-1 leading-snug">
                      You seem to have the hang of this!
                    </p>
                    <p className="text-xs text-gray-500 mb-5 leading-relaxed">
                      Let&apos;s teach you to build this for real — with your
                      own code, your own domain, deployed live to the world.
                    </p>
                    <Link
                      href="/tutorial/welcome"
                      className="flex items-center justify-center gap-2 bg-indigo-600 text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-indigo-700 transition-colors"
                    >
                      <BookOpen size={15} />
                      Start the Tutorial
                      <ArrowRight size={14} />
                    </Link>
                    <button
                      onClick={() => setFabOpen(false)}
                      className="mt-3 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      close
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ── The FAB itself ─────────────────────────── */}
            {!isExhausted ? (
              /* Sparkly tweak button */
              <button
                onClick={() => setFabOpen((v) => !v)}
                className={[
                  "pointer-events-auto relative w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-200",
                  fabOpen
                    ? "bg-indigo-700 scale-95 shadow-indigo-300/50"
                    : "bg-indigo-600 hover:bg-indigo-700 hover:scale-110 shadow-indigo-300/60",
                ].join(" ")}
                aria-label={fabOpen ? "Close tweak panel" : "Tweak your site"}
              >
                {/* Animated sparkle glow ring (only when closed) */}
                {!fabOpen && (
                  <>
                    <span className="absolute inset-0 rounded-full bg-indigo-400 animate-ping opacity-25" />
                    <span className="absolute inset-[-4px] rounded-full bg-gradient-to-tr from-violet-400 to-indigo-400 opacity-30 animate-spin-slow" />
                  </>
                )}
                <Sparkles
                  size={24}
                  className={`text-white relative z-10 transition-transform duration-200 ${
                    fabOpen ? "rotate-12" : ""
                  }`}
                />
              </button>
            ) : (
              /* Tutorial funnel button (after iterations exhausted) */
              <Link
                href="/tutorial/welcome"
                className="pointer-events-auto relative w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 shadow-xl flex items-center justify-center hover:scale-110 transition-transform duration-200"
                aria-label="Start the Tutorial"
                title="Ready to build for real? Start the Tutorial →"
              >
                <span className="absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-20" />
                <BookOpen size={22} className="text-white relative z-10" />
              </Link>
            )}
          </div>
        )}

        {/* ── Read-only "Build your own" FAB (non-owner visitors) ── */}
        {!canEdit && (
          <div className="absolute bottom-6 right-5">
            <Link
              href="/"
              className="flex items-center gap-2 bg-indigo-600 text-white text-sm font-bold px-4 py-3 rounded-full shadow-xl hover:bg-indigo-700 hover:scale-105 transition-all"
            >
              <Sparkles size={16} />
              Build yours free
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
