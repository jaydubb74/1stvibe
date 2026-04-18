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
            Here&apos;s who we are, what we built, and why.
          </p>
        </div>
      </section>

    <div className="max-w-2xl mx-auto px-4 py-16">

      {/* Mission */}
      <section className="mb-12 space-y-4 text-gray-700 text-lg leading-relaxed">
        <h2 className="text-2xl font-bold text-gray-900">What We&apos;re Building (and Why)</h2>
        <p>
          We&apos;re not building the most powerful AI coding tool. We&apos;re
          building the most accessible on-ramp to the AI coding era.
        </p>
        <p>
          That means no ads, no dark patterns, no upsells. Just a clear,
          honest path from &ldquo;I&apos;ve heard about this AI coding thing&rdquo;
          to &ldquo;I just shipped something real.&rdquo;
        </p>
        <p>
          When you finish here, you&apos;ll have a live website and the confidence
          to build the next thing yourself. That&apos;s the whole goal.
        </p>
        <p>
          1stvibe.ai is free. We&apos;re supported by builders who found value here
          and want others to have the same experience.
        </p>
      </section>

      {/* Origin story */}
      <section className="mb-12 space-y-5 text-gray-700 text-lg leading-relaxed">
        <h2 className="text-2xl font-bold text-gray-900">How This Started</h2>

        <p>
          In 1999, a website called WebMonkey published JavaScript
          tutorials that were casual, direct, and genuinely fun. For a
          generation of curious people — designers, writers, hobbyists — it was
          where they first learned to make something on the internet that
          actually worked.
        </p>

        <p>
          One of those people was Mike. As a teenager with no coding
          background, he stumbled onto a WebMonkey tutorial that showed him how to make a
          dropdown menu with JavaScript. It was a small thing. But something
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
          The tools have changed completely in thirty years. But the feeling
          — the moment when something you described becomes a real thing on the
          internet — hasn&apos;t changed at all. It&apos;s still the best
          feeling in tech. We built 1stvibe.ai to give that moment to a new generation.
        </p>

        <p>
          The AI coding era means it&apos;s now accessible to anyone curious
          enough to try — not just developers, not just people who
          studied computer science.
        </p>
      </section>

      {/* Founders */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">The Team</h2>
        <div className="max-w-sm">
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col">
            <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand font-bold text-lg mb-3">
              J
            </div>
            <p className="font-bold text-gray-900">Josh Wetzel</p>
            <p className="text-sm text-brand font-medium mb-3">Co-founder</p>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Go-to-market leader and builder at Wetzel Ventures in Palo Alto. Josh has spent his career scaling businesses and revenue teams, and more recently leading the implementation of AI-driven tools for sales and customer engagement. He believes the best way to understand what&apos;s coming is to build with it yourself — and he&apos;s been building 1stvibe.ai to prove it.
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
        <p className="text-xl font-bold mb-2">Ready to build something real?</p>
        <p className="text-white/80 mb-6">
          About an hour. Zero experience needed. Here&apos;s where you start.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/tutorial/welcome"
            className="bg-white text-brand font-semibold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors"
          >
            Start the Tutorial →
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
