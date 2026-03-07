"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { Sparkles, Loader2, Shuffle, Lightbulb, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

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

/** Detail chips — keyword patterns to detect and label to show. */
const DETAIL_CHIPS = [
  { label: "colors", keywords: ["color", "colour", "palette", "tone", "theme", "dark", "light", "blue", "red", "green", "yellow", "orange", "purple", "pink", "black", "white", "navy", "pastel", "earth", "warm", "cool", "bright", "bold", "muted", "indigo", "teal", "gold", "rose", "ivory", "gray", "grey"] },
  { label: "sections", keywords: ["section", "about", "contact", "hero", "footer", "header", "testimonial", "pricing", "faq", "gallery", "portfolio", "blog", "team", "services", "features", "menu", "schedule", "timeline", "story", "bio"] },
  { label: "style", keywords: ["style", "modern", "minimal", "clean", "elegant", "bold", "playful", "professional", "cozy", "sleek", "vibrant", "vintage", "retro", "futuristic", "simple", "fancy", "classic", "vibe"] },
  { label: "images", keywords: ["photo", "image", "picture", "icon", "logo", "illustration", "graphic", "gallery", "hero image", "background"] },
];

/** Coaching hints shown after the user starts typing. */
const COACHING_HINTS = [
  "What should the title of your site say?",
  "Who will visit your site, and what do they want?",
  "Do you have a color scheme in mind?",
  "What sections should it have — about, contact, gallery?",
  "Do you have a tagline or slogan?",
  "Would you like photos or illustrations?",
  "Should it include a form to collect info?",
  "Do you have contact details to include?",
  "What\u2019s the vibe — professional, playful, minimal?",
  "Any specific fonts or styles you like?",
];

export default function DemoForm() {
  const [prompt, setPrompt] = useState("");
  const [isDraftPrompt, setIsDraftPrompt] = useState(true);
  const [promptIndex, setPromptIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingLine, setLoadingLine] = useState(0);
  const [error, setError] = useState("");
  const [hintIndex, setHintIndex] = useState(0);
  const [hasStartedTyping, setHasStartedTyping] = useState(false);
  const router = useRouter();

  const keystrokeCountRef = useRef(0);
  const hasAutoSelectedRef = useRef(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Pre-fill prompt with a random example on mount (avoids hydration mismatch)
  useEffect(() => {
    const idx = Math.floor(Math.random() * PLACEHOLDER_PROMPTS.length);
    setPromptIndex(idx);
    setPrompt(PLACEHOLDER_PROMPTS[idx]);
  }, []);

  // Cycle through loading copy every ~2.5 s while waiting
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadingLine((prev) => (prev + 1) % LOADING_LINES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [loading]);

  // Determine which detail chips are still relevant (not yet addressed)
  const activeChips = useMemo(() => {
    const lower = prompt.toLowerCase();
    return DETAIL_CHIPS.filter(
      (chip) => !chip.keywords.some((kw) => lower.includes(kw))
    );
  }, [prompt]);

  function handlePromptChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setPrompt(value);

    if (isDraftPrompt) {
      setIsDraftPrompt(false);
      setHasStartedTyping(true);
      keystrokeCountRef.current = 0;
    } else {
      if (!hasStartedTyping) setHasStartedTyping(true);
      keystrokeCountRef.current += 1;
      if (keystrokeCountRef.current >= 30) {
        keystrokeCountRef.current = 0;
        setHintIndex((prev) => (prev + 1) % COACHING_HINTS.length);
      }
    }
  }

  function handleShuffle() {
    const nextIndex = (promptIndex + 1) % PLACEHOLDER_PROMPTS.length;
    setPromptIndex(nextIndex);
    setPrompt(PLACEHOLDER_PROMPTS[nextIndex]);
    setIsDraftPrompt(true);
    setHasStartedTyping(false);
    hasAutoSelectedRef.current = false;
  }

  function handleFocus(e: React.FocusEvent<HTMLTextAreaElement>) {
    if (isDraftPrompt && !hasAutoSelectedRef.current) {
      hasAutoSelectedRef.current = true;
      e.target.select();
    }
  }

  function handleChipClick(label: string) {
    const suffixes: Record<string, string> = {
      colors: "Use [describe colors or mood] colors. ",
      sections: "Include sections for [list what you need]. ",
      style: "Make it feel [describe the vibe]. ",
      images: "Add photos of [describe what to show]. ",
    };
    const suffix = suffixes[label] || "";

    if (isDraftPrompt) {
      // Clear draft and start fresh with the chip suffix
      setPrompt(suffix);
      setIsDraftPrompt(false);
      setHasStartedTyping(true);
    } else {
      setPrompt((prev) => {
        const trimmed = prev.trimEnd();
        const separator = trimmed.length > 0 ? " " : "";
        return trimmed + separator + suffix;
      });
    }

    // Focus the textarea so user can continue typing
    textareaRef.current?.focus();
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
      {/* Label */}
      <label htmlFor="demo-prompt" className="block text-base font-medium text-gray-700 mb-2">
        Describe the website you want — AI builds it in seconds.
      </label>

      {/* Textarea + button: stacked on mobile, side-by-side on sm+ */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <textarea
            ref={textareaRef}
            id="demo-prompt"
            value={prompt}
            onChange={handlePromptChange}
            onFocus={handleFocus}
            className={cn(
              "w-full h-28 sm:h-24 px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-50 resize-none text-sm transition-all",
              isDraftPrompt ? "text-gray-400 italic" : "text-gray-800"
            )}
            maxLength={600}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e as unknown as React.FormEvent);
              }
            }}
          />

          {/* Shuffle button */}
          <button
            type="button"
            onClick={handleShuffle}
            title="Try a different example"
            className="absolute bottom-2 right-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 active:scale-90 rounded-lg p-2 transition-all"
          >
            <Shuffle size={16} />
          </button>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={!prompt.trim()}
          className="w-full sm:w-auto sm:self-start sm:h-24 whitespace-nowrap"
        >
          <Sparkles size={18} />
          Build It
        </Button>
      </div>

      {/* Coaching callout */}
      <div className="mt-3 flex items-center gap-2.5 rounded-lg bg-indigo-50 border border-indigo-100 px-3.5 py-2.5 min-h-[2.5rem]">
        <Lightbulb size={16} className="text-indigo-400 shrink-0" />
        <p
          key={hasStartedTyping ? hintIndex : "default"}
          className="text-sm text-indigo-600/70 flex-1 animate-hint-swap"
        >
          {hasStartedTyping
            ? COACHING_HINTS[hintIndex]
            : "Works great as-is — or describe your own idea."}
        </p>
        {hasStartedTyping && (
          <button
            type="button"
            onClick={() => setHintIndex((prev) => (prev + 1) % COACHING_HINTS.length)}
            title="Next tip"
            className="text-indigo-300 hover:text-indigo-500 shrink-0 transition-colors"
          >
            <RefreshCw size={14} />
          </button>
        )}
      </div>

      {/* Detail chips */}
      {hasStartedTyping && activeChips.length > 0 && (
        <div className="mt-2 flex flex-wrap justify-center sm:justify-start gap-1.5">
          {activeChips.map((chip) => (
            <button
              key={chip.label}
              type="button"
              onClick={() => handleChipClick(chip.label)}
              className="text-xs font-medium text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-full hover:bg-indigo-100 active:scale-95 transition-all"
            >
              + {chip.label}
            </button>
          ))}
        </div>
      )}

      {error && (
        <p className="mt-2 text-sm text-red-600 font-medium">{error}</p>
      )}
    </form>
  );
}
