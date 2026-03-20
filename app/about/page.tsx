import type { Metadata } from "next";
import { Heart, ExternalLink, Linkedin } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — 1stvibe.ai",
  description:
    "The origin story of 1stvibe.ai — inspired by WebMonkey in 1999, built for the AI coding era.",
};

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand-50 to-white pt-10 pb-10 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
            <span className="text-brand">About 1stvibe.ai</span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed">
            No fluff. Just the fastest path to your first build.
          </p>
        </div>
      </section>

    <div className="max-w-2xl mx-auto px-4 py-16">

      {/* Mission */}
      <section className="mb-12 space-y-4 text-gray-700 text-lg leading-relaxed">
        <h2 className="text-2xl font-bold text-gray-900">Our approach</h2>
        <p>
          We&apos;re not trying to build the most powerful AI coding tool. We&apos;re
          trying to build the most accessible on-ramp to the AI coding era.
        </p>
        <p>
          That means: no ads, no dark patterns, no upsells at every turn. Just a
          well-designed, honest path from &ldquo;I&apos;ve heard about this AI coding thing&rdquo;
          to &ldquo;I just shipped something.&rdquo; If we do our job right, you leave here
          with a live website and enough confidence to build the next thing on
          your own.
        </p>
        <p>
          The platform is free. We run on community support from people who found
          value here and want to help others have the same experience.
        </p>
      </section>

      {/* Origin story */}
      <section className="mb-12 space-y-5 text-gray-700 text-lg leading-relaxed">
        <h2 className="text-2xl font-bold text-gray-900">Where this started</h2>

        <p>
          In 1999, there was a website called WebMonkey. It published JavaScript
          tutorials that were casual, direct, and genuinely fun to read. For a
          generation of curious people — designers, writers, hobbyists — it was
          the first place they learned to make something on the internet that
          actually worked.
        </p>

        <p>
          One of those people was Mike. He was a teenager, not a programmer, and
          he stumbled onto a WebMonkey tutorial that showed him how to make a
          dropdown menu with JavaScript. It was stupid simple. But something
          clicked: <em>I just made the computer do something.</em>
        </p>

        <p>
          That moment set a direction. Not immediately, not in a straight line —
          but eventually, toward a career building products at the intersection
          of technology and healthcare.
        </p>

        <div className="bg-brand-50 border border-brand-50 rounded-xl p-5 flex flex-col sm:flex-row gap-4 items-start">
          <span className="text-2xl">🕸️</span>
          <div>
            <p className="text-sm font-semibold text-brand mb-1">WebMonkey, circa 1999</p>
            <p className="text-sm text-brand-dark/80">
              The original &ldquo;learn to build stuff on the internet&rdquo; guide for the
              non-programmer generation.{" "}
              <a
                href="https://web.archive.org/web/19991012062637*/webmonkey.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-brand inline-flex items-center gap-1"
              >
                See it on the Wayback Machine <ExternalLink size={12} />
              </a>
            </p>
          </div>
        </div>

        <p>
          Thirty years later, the tools have changed completely. But the feeling
          — the moment when something you described becomes a real thing on the
          internet — that feeling hasn&apos;t changed at all. It&apos;s still the best
          feeling in tech.
        </p>

        <p>
          We built 1stvibe.ai to give that moment to a new generation. The AI
          coding era means that moment is now accessible to anyone — not just
          people who went to school for this, not just developers. Anyone
          who&apos;s curious enough to try.
        </p>
      </section>

      {/* Founders */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Who we are</h2>
        <div className="max-w-sm">
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col">
            <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand font-bold text-lg mb-3">
              J
            </div>
            <p className="font-bold text-gray-900">Josh Wetzel</p>
            <p className="text-sm text-brand font-medium mb-3">Co-founder</p>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Go-to-market leader and builder at Wetzel Ventures in Palo Alto. Josh has spent his career scaling businesses and revenue teams, and more recently leading the implementation of AI-driven tools for sales and customer engagement. He believes the best way to understand what&apos;s coming is to build with it yourself.
            </p>
            <a
              href="https://www.linkedin.com/in/joshwetzel/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center gap-1.5 text-sm text-brand hover:text-brand-dark font-medium transition-colors"
            >
              <Linkedin size={14} />
              LinkedIn
              <ExternalLink size={11} />
            </a>
          </div>
        </div>
      </section>

      {/* Privacy */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Privacy</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          You can read our Privacy Notice{" "}
          <Link href="/privacy" className="text-brand hover:text-brand-dark underline underline-offset-2 transition-colors">
            here
          </Link>
          .
        </p>
      </section>

      {/* Terms of Service */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Terms of Service</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          You can read our Terms of Service{" "}
          <Link href="/terms" className="text-brand hover:text-brand-dark underline underline-offset-2 transition-colors">
            here
          </Link>
          .
        </p>
      </section>

      {/* CTA */}
      <div className="bg-brand rounded-2xl p-8 text-white text-center">
        <p className="text-xl font-bold mb-2">Ready to build your first thing?</p>
        <p className="text-white/80 mb-6">
          Takes about an hour. No experience required.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/tutorial/welcome"
            className="bg-white text-brand font-semibold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors"
          >
            Start the tutorial →
          </Link>
          <a
            href="https://ko-fi.com/1stvibe"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-white/30 text-white px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
          >
            <Heart size={16} />
            Support Us
          </a>
        </div>
      </div>
    </div>
    </div>
  );
}
