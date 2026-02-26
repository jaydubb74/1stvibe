"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { Sparkles, Loader2, RefreshCw } from "lucide-react";

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

/** Random placeholder prompts covering popular site categories. */
const PLACEHOLDER_PROMPTS = [
  "A modern online store for handmade candles — earthy tones, product grid with prices, and an 'About the Maker' story section…",
  "A clean website for my plumbing company — navy and white, service list, pricing table, and a 'Request a Quote' form…",
  "A minimal portfolio for a graphic designer — dark background, large image gallery, hover effects, and a short bio with contact link…",
  "A cozy travel blog — warm pastel colors, featured post at the top, category tags, and an email subscribe box…",
  "An interactive online resume — timeline of work experience, skills chart, education section, and a downloadable PDF button…",
  "A one-page site for a taco truck — bright yellow and red, photo of the truck, scrollable menu with prices, and a Google Map…",
  "A landing page for an animal rescue — soft greens, hero photo of a puppy, donate button, volunteer form, and success stories…",
  "An elegant wedding site — rose gold and ivory, our story timeline, RSVP form, photo gallery, and a countdown to the big day…",
  "A sleek real estate page — hero search bar, featured listings with photos and prices, testimonials, and a contact form…",
  "A vibrant fitness coaching site — bold orange accents, class schedule, before-and-after photos, pricing cards, and a free trial signup…",
  "A photography portfolio — full-screen hero image, masonry gallery, filter by category, and a booking inquiry form…",
  "A welcoming church site — soft blue and white, service times, upcoming events, sermon archive, and a visitor info card…",
  "A bold site for an indie band — dark theme with neon accents, embedded music player, tour dates, merch section, and a mailing list…",
  "A course landing page — friendly purple palette, lesson outline, instructor bio, student testimonials, and an 'Enroll Now' button…",
  "A team page for our soccer league — green and white, match schedule, standings table, player roster with photos, and a signup form…",
];

/** Provocation hints shown below the textarea to coach the user. */
const PROVOCATION_HINTS = [
  "What should the title of your site say?",
  "Who will visit your site, and what do they want?",
  "Do you have a color scheme in mind?",
  "What sections should it have?",
  "Do you have a tagline or slogan?",
  "Would you like photos or icons on the page?",
  "Should we add a form to collect info?",
  "Do you have contact details to include?",
  "What's the vibe — professional, playful, minimal?",
  "Any specific fonts or styles you like?",
];

export default function DemoForm() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingLine, setLoadingLine] = useState(0);
  const [error, setError] = useState("");
  const router = useRouter();

  // Random placeholder prompt (set on mount to avoid hydration mismatch)
  const [placeholderText, setPlaceholderText] = useState("");

  // Provocation hint state
  const [hintIndex, setHintIndex] = useState(0);
  const [hintVisible, setHintVisible] = useState(true);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const [isInitialBurst, setIsInitialBurst] = useState(false);
  const keystrokeCountRef = useRef(0);
  const hintIndexRef = useRef(0);

  // Pick random placeholder on mount
  useEffect(() => {
    setPlaceholderText(
      PLACEHOLDER_PROMPTS[Math.floor(Math.random() * PLACEHOLDER_PROMPTS.length)]
    );
  }, []);

  // Cycle through loading copy every ~2.5 s while waiting
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadingLine((prev) => (prev + 1) % LOADING_LINES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [loading]);

  // Initial burst animation: rapidly cycle through ~4 hints then settle on #0
  useEffect(() => {
    if (!isInitialBurst) return;
    let count = 0;
    const maxCycles = 4;
    const interval = setInterval(() => {
      count++;
      if (count >= maxCycles) {
        clearInterval(interval);
        setHintIndex(0);
        hintIndexRef.current = 0;
        setHintVisible(true);
        setIsInitialBurst(false);
        return;
      }
      setHintIndex(count % PROVOCATION_HINTS.length);
    }, 150);
    return () => clearInterval(interval);
  }, [isInitialBurst]);

  /** Advance to the next hint with a fade transition. */
  const advanceHint = useCallback(() => {
    setHintVisible(false);
    setTimeout(() => {
      const next = (hintIndexRef.current + 1) % PROVOCATION_HINTS.length;
      hintIndexRef.current = next;
      setHintIndex(next);
      setHintVisible(true);
    }, 300);
  }, []);

  /** Handle keystrokes in the textarea for hint logic. */
  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    // Enter to submit
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
      return;
    }

    // Ignore modifier-only keys
    if (["Shift", "Control", "Alt", "Meta"].includes(e.key)) return;

    // First keystroke — trigger burst animation
    if (!hasStartedTyping) {
      setHasStartedTyping(true);
      setIsInitialBurst(true);
      keystrokeCountRef.current = 1;
      return;
    }

    // Count keystrokes and rotate hint every ~30
    keystrokeCountRef.current++;
    if (keystrokeCountRef.current % 30 === 0) {
      advanceHint();
    }
  }

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
            placeholder={placeholderText}
            className="w-full h-28 sm:h-24 px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-50 resize-none text-gray-800 placeholder-gray-400 text-sm transition-all"
            maxLength={600}
            onKeyDown={handleKeyDown}
          />
        </div>
        <Button
          type="submit"
          size="lg"
          disabled={!prompt.trim()}
          className="sm:self-start sm:h-24 whitespace-nowrap"
        >
          <Sparkles size={18} />
          Build It
        </Button>
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>
      )}

      <div className="mt-2 min-h-[1.25rem] flex items-center justify-center">
        {!hasStartedTyping ? (
          <p className="text-xs text-gray-400 text-center">
            If you can describe it, you can build it.
          </p>
        ) : (
          <div className="flex items-center justify-center gap-1.5">
            <p
              className="text-xs text-gray-400 text-center transition-opacity duration-300"
              style={{ opacity: hintVisible ? 1 : 0 }}
            >
              {PROVOCATION_HINTS[hintIndex]}
            </p>
            <button
              type="button"
              onClick={advanceHint}
              className="text-gray-300 hover:text-gray-500 transition-colors flex-shrink-0"
              aria-label="Next hint"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>
    </form>
  );
}
