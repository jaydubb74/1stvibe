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
import { cn } from "@/lib/utils";

const MAX_ITERATIONS = 3;

type TweakWidgetPhase = "idle" | "teaser" | "open" | "dismissed" | "nudge";

const ALL_TWEAK_SUGGESTIONS = [
  // Colors & theme
  "Make the header blue",
  "Use a dark color scheme",
  "Make the buttons green",
  "Try a warm sunset color palette",
  "Change the accent color to coral",
  // Layout & structure
  "Add a second section with three columns",
  "Center everything on the page",
  "Make the hero section taller",
  "Add more whitespace between sections",
  "Stack the layout vertically",
  // Typography
  "Change the font to something modern",
  "Make the headings bigger and bolder",
  "Use a serif font for an elegant look",
  "Make the text easier to read",
  // Images & media
  "Add a photo to the hero",
  "Add a background image to the header",
  "Add icons next to the section headings",
  // Content tweaks
  "Make the headline catchier",
  "Add a call-to-action button",
  "Add a testimonials section",
  "Add a contact form at the bottom",
  "Write a more exciting tagline",
  // Style & polish
  "Add rounded corners to the cards",
  "Make it look more professional",
  "Give it a playful, fun vibe",
  "Add subtle shadows to the cards",
  "Make it feel more minimal and clean",
];

/** Pick `count` random items from an array (Fisher-Yates partial shuffle) */
function pickRandom<T>(arr: T[], count: number): T[] {
  const copy = [...arr];
  const n = Math.min(count, copy.length);
  for (let i = 0; i < n; i++) {
    const j = i + Math.floor(Math.random() * (copy.length - i));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, n);
}

interface Demo {
  id: string;
  html: string;
  prompt: string;
  iterationCount: number;
  siteTitle: string;
}

interface Props {
  demo: Demo;
  canEdit: boolean;
  fromShare: boolean;
}

export default function SiteViewer({ demo, canEdit, fromShare }: Props) {
  // ── State ─────────────────────────────────────────────────────
  const [html, setHtml] = useState(demo.html);
  const [widgetPhase, setWidgetPhase] = useState<TweakWidgetPhase>("idle");
  const [tweakPrompt, setTweakPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [friendBannerDismissed, setFriendBannerDismissed] = useState(false);
  const [shareState, setShareState] = useState<"idle" | "copied" | "shared">(
    "idle"
  );
  // Random suggestion chips — picked once per mount
  const [suggestions] = useState(() =>
    pickRandom(ALL_TWEAK_SUGGESTIONS, 3)
  );
  // Track iterations in localStorage so they survive page refreshes
  const [iterationsUsed, setIterationsUsed] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // Track whether nudge has already fired this session
  const nudgeFiredRef = useRef(false);

  const storageKey = `vibeiter_${demo.id}`;
  const dismissKey = `tweakdismissed_${demo.id}`;
  const isExhausted = iterationsUsed >= MAX_ITERATIONS;
  const iterationsLeft = MAX_ITERATIONS - iterationsUsed;

  // Derived booleans for readability
  const isOpen = widgetPhase === "open";
  const isTeaser = widgetPhase === "teaser";
  const isNudge = widgetPhase === "nudge";

  // ── Effects ───────────────────────────────────────────────────
  // Restore iteration count from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      const parsed = parseInt(stored, 10);
      if (!isNaN(parsed)) setIterationsUsed(parsed);
    }
  }, [storageKey]);

  // Check sessionStorage for prior dismissal on mount
  useEffect(() => {
    if (sessionStorage.getItem(dismissKey) === "true") {
      setWidgetPhase("dismissed");
      nudgeFiredRef.current = true; // don't re-nudge if already dismissed
    }
  }, [dismissKey]);

  // Teaser timer: show teaser 5s after idle (if not already dismissed)
  useEffect(() => {
    if (widgetPhase !== "idle" || isExhausted || !canEdit) return;
    const timer = setTimeout(() => {
      setWidgetPhase("teaser");
    }, 5000);
    return () => clearTimeout(timer);
  }, [widgetPhase, isExhausted, canEdit]);

  // Nudge timer: 20s after dismissal, show nudge (once per session)
  useEffect(() => {
    if (widgetPhase !== "dismissed" || nudgeFiredRef.current || isExhausted)
      return;
    const timer = setTimeout(() => {
      nudgeFiredRef.current = true;
      setWidgetPhase("nudge");
    }, 20000);
    return () => clearTimeout(timer);
  }, [widgetPhase, isExhausted]);

  // Nudge auto-fade: 8s after nudge appears, dismiss permanently
  useEffect(() => {
    if (widgetPhase !== "nudge") return;
    const timer = setTimeout(() => {
      setWidgetPhase("dismissed");
    }, 8000);
    return () => clearTimeout(timer);
  }, [widgetPhase]);

  // Focus input when popover opens
  useEffect(() => {
    if (isOpen && !isExhausted && inputRef.current) {
      const timer = setTimeout(() => inputRef.current?.focus(), 60);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isExhausted]);

  // Update iframe when html changes (avoids full page reload)
  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = html;
    }
  }, [html]);

  // Escape key closes popover
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setWidgetPhase("idle");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // ── Handlers ────────────────────────────────────────────────
  const handleFabClick = useCallback(() => {
    setWidgetPhase((prev) => (prev === "open" ? "idle" : "open"));
  }, []);

  const handleTeaserDismiss = useCallback(() => {
    setWidgetPhase("dismissed");
    sessionStorage.setItem(dismissKey, "true");
  }, [dismissKey]);

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      setTweakPrompt(suggestion);
      setWidgetPhase("open");
    },
    []
  );

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
          setWidgetPhase("idle");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Tweak failed. Try again."
        );
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
          title: demo.siteTitle,
          text: `Check out "${demo.siteTitle}" — I built it in ~15 seconds with 1stvibe.ai!`,
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
  }, [demo.id, demo.siteTitle]);

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
        <div className="bg-gradient-to-r from-brand to-amber text-white px-4 py-2.5 flex items-center justify-between gap-3 shrink-0">
          <p className="text-sm font-medium text-center flex-1 leading-snug flex items-center justify-center gap-2 flex-wrap">
            <span className="font-black text-base tracking-tight">
              1stvibe.ai
            </span>
            <span className="opacity-90">
              Your friend built this in ~15 seconds with AI.
            </span>{" "}
            <Link
              href="/"
              className="underline font-bold hover:text-white/80 transition-colors"
            >
              Try vibecoding your own site now
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
            className="text-brand font-black text-sm tracking-tight shrink-0 hover:text-brand-dark transition-colors"
          >
            1stvibe.ai
          </Link>
          <span className="text-gray-200 hidden sm:block select-none">|</span>
          <span className="text-xs text-gray-400 truncate hidden sm:block max-w-xs">
            &ldquo;
            {demo.prompt.length > 70
              ? demo.prompt.slice(0, 70) + "\u2026"
              : demo.prompt}
            &rdquo;
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
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-brand border border-gray-200 hover:border-brand/40 rounded-lg px-3 py-1.5 transition-all hover:bg-brand-50"
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
            {/* ── Teaser bubble ───────────────────────────── */}
            {isTeaser && !isExhausted && (
              <div
                role="status"
                aria-live="polite"
                className="pointer-events-auto bg-white rounded-2xl shadow-2xl border border-gray-100 w-72 sm:w-80 overflow-hidden animate-teaser-in"
                style={{ maxHeight: "calc(100dvh - 100px)" }}
              >
                <div className="px-4 pt-3.5 pb-3 relative">
                  {/* Close button */}
                  <button
                    onClick={handleTeaserDismiss}
                    className="absolute top-2.5 right-2.5 text-gray-300 hover:text-gray-500 transition-colors"
                    aria-label="Dismiss suggestion"
                  >
                    <X size={14} />
                  </button>

                  {/* Header */}
                  <p className="text-sm font-bold text-gray-900 flex items-center gap-1.5 pr-6">
                    <Sparkles size={14} className="text-brand" />
                    Want to change something?
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 mb-3">
                    Just tell me what to tweak.
                  </p>

                  {/* Suggestion chips */}
                  <div className="flex flex-wrap gap-1.5">
                    {suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="text-xs font-medium text-brand bg-brand-50 hover:bg-brand/10 border border-brand-50 rounded-full px-3 py-1.5 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Speech bubble tail */}
                <div className="flex justify-end pr-8">
                  <div className="w-3 h-3 bg-white border-b border-r border-gray-100 rotate-45 translate-y-[-6px]" />
                </div>
              </div>
            )}

            {/* ── Nudge pill ──────────────────────────────── */}
            {isNudge && !isExhausted && (
              <button
                role="status"
                aria-live="polite"
                onClick={() => setWidgetPhase("open")}
                className="pointer-events-auto flex items-center gap-1.5 bg-white text-brand text-xs font-semibold px-3.5 py-2 rounded-full shadow-lg border border-brand-50 hover:bg-brand-50 transition-colors animate-teaser-in"
              >
                <Sparkles size={12} />
                Try tweaking something
              </button>
            )}

            {/* ── Chat / tweak popover ────────────────────── */}
            {isOpen && (
              <div
                className="pointer-events-auto bg-white rounded-2xl shadow-2xl border border-gray-100 w-80 overflow-hidden"
                style={{ maxHeight: "calc(100vh - 120px)" }}
              >
                {!isExhausted ? (
                  <>
                    {/* Popover header */}
                    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-brand-50 to-white">
                      <div>
                        <p className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                          <Sparkles size={14} className="text-brand" />
                          Tweak your site
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {iterationsLeft} free tweak
                          {iterationsLeft !== 1 ? "s" : ""} remaining
                        </p>
                      </div>
                      <button
                        onClick={() => setWidgetPhase("idle")}
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
                          className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand placeholder-gray-300 transition-all"
                          disabled={loading}
                          maxLength={400}
                        />
                        <button
                          type="submit"
                          disabled={!tweakPrompt.trim() || loading}
                          className="bg-brand text-white px-3 py-2 rounded-xl hover:bg-brand-dark disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center"
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
                        <p className="mt-2 text-xs text-brand flex items-center gap-1.5">
                          <Loader2 size={11} className="animate-spin" />
                          Updating your site&hellip;
                        </p>
                      )}
                    </form>
                  </>
                ) : (
                  /* ── Exhaustion / funnel state ─────────────── */
                  <div className="p-5 text-center">
                    <div className="text-3xl mb-2">&#127881;</div>
                    <p className="font-bold text-gray-900 text-sm mb-1 leading-snug">
                      You seem to have the hang of this!
                    </p>
                    <p className="text-xs text-gray-500 mb-5 leading-relaxed">
                      Let&apos;s teach you to build this for real — with your
                      own code, your own domain, deployed live to the world.
                    </p>
                    <Link
                      href="/tutorial/welcome"
                      className="flex items-center justify-center gap-2 bg-brand text-white text-sm font-bold px-4 py-2.5 rounded-xl hover:bg-brand-dark transition-colors"
                    >
                      <BookOpen size={15} />
                      Start the Tutorial
                      <ArrowRight size={14} />
                    </Link>
                    <button
                      onClick={() => setWidgetPhase("idle")}
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
              /* Sparkly tweak button — pill with label when closed, circle when open */
              <button
                onClick={handleFabClick}
                className={cn(
                  "pointer-events-auto relative shadow-xl flex items-center justify-center transition-all duration-200",
                  isOpen
                    ? "w-14 h-14 rounded-full bg-brand-dark scale-95"
                    : "h-14 rounded-full bg-brand hover:bg-brand-dark hover:scale-105 shadow-brand/30 px-5 gap-2"
                )}
                aria-label={
                  isOpen
                    ? "Close tweak panel"
                    : "Tweak your site with AI"
                }
              >
                {/* Animated sparkle glow ring (only when closed) */}
                {!isOpen && (
                  <>
                    <span className="absolute inset-0 rounded-full bg-brand/60 animate-ping opacity-25" />
                    <span className="absolute inset-[-4px] rounded-full bg-gradient-to-tr from-brand/60 to-amber/60 opacity-30 animate-spin-slow" />
                  </>
                )}
                <Sparkles
                  size={isOpen ? 24 : 18}
                  className={cn(
                    "text-white relative z-10 transition-transform duration-200",
                    isOpen && "rotate-12"
                  )}
                />
                {!isOpen && (
                  <span className="text-white text-sm font-bold relative z-10">
                    Tweak it
                  </span>
                )}
              </button>
            ) : (
              /* Tutorial funnel button (after iterations exhausted) */
              <Link
                href="/tutorial/welcome"
                className="pointer-events-auto relative w-14 h-14 rounded-full bg-gradient-to-br from-brand to-amber shadow-xl flex items-center justify-center hover:scale-110 transition-transform duration-200"
                aria-label="Start the Tutorial"
                title="Ready to build for real? Start the Tutorial"
              >
                <span className="absolute inset-0 rounded-full bg-amber/40 animate-ping opacity-20" />
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
              className="flex items-center gap-2 bg-brand text-white text-sm font-bold px-4 py-3 rounded-full shadow-xl hover:bg-brand-dark hover:scale-105 transition-all"
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
