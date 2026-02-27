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
    <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">About 1stvibe.ai</h1>
      <p className="text-lg text-gray-500 mb-12 leading-relaxed">
        No ads. No fluff. Just the fastest path to your first build.
      </p>

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

        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 flex flex-col sm:flex-row gap-4 items-start">
          <span className="text-2xl">🕸️</span>
          <div>
            <p className="text-sm font-semibold text-indigo-700 mb-1">WebMonkey, circa 1999</p>
            <p className="text-sm text-indigo-800/80">
              The original &ldquo;learn to build stuff on the internet&rdquo; guide for the
              non-programmer generation.{" "}
              <a
                href="https://web.archive.org/web/19991012062637*/webmonkey.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-indigo-600 inline-flex items-center gap-1"
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
        <div className="grid sm:grid-cols-2 gap-6">
          {[
            {
              name: "Mike Tadlock",
              role: "Co-founder",
              initial: "M",
              bio: "Product and digital health leader with patents in health tech and electronic communications. Based in San Francisco, Mike has spent his career building products at the intersection of technology and human wellbeing. When he's not at his day job, he's vibe coding passion projects with Claude Code and Gemini — which is exactly how 1stvibe.ai came to be.",
              linkedin: "https://www.linkedin.com/in/miketadlock/",
            },
            {
              name: "Josh Wetzel",
              role: "Co-founder",
              initial: "J",
              bio: "Go-to-market leader and builder at Wetzel Ventures in Palo Alto. Josh has spent his career scaling businesses and revenue teams, and more recently leading the implementation of AI-driven tools for sales and customer engagement. He believes the best way to understand what's coming is to build with it yourself.",
              linkedin: "https://www.linkedin.com/in/joshwetzel/",
            },
          ].map(({ name, role, initial, bio, linkedin }) => (
            <div
              key={name}
              className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col"
            >
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-lg mb-3">
                {initial}
              </div>
              <p className="font-bold text-gray-900">{name}</p>
              <p className="text-sm text-indigo-600 font-medium mb-3">{role}</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">{bio}</p>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
              >
                <Linkedin size={14} />
                LinkedIn
                <ExternalLink size={11} />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Privacy</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          You can read our Privacy Notice{" "}
          <Link href="/privacy" className="text-indigo-600 hover:text-indigo-800 underline underline-offset-2 transition-colors">
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
          <Link href="/terms" className="text-indigo-600 hover:text-indigo-800 underline underline-offset-2 transition-colors">
            here
          </Link>
          .
        </p>
      </section>

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
          The platform is free. We run on Patreon support from people who found
          value here and want to help others have the same experience.
        </p>
      </section>

      {/* CTA */}
      <div className="bg-indigo-600 rounded-2xl p-8 text-white text-center">
        <p className="text-xl font-bold mb-2">Ready to build your first thing?</p>
        <p className="text-indigo-200 mb-6">
          Takes about an hour. No experience required.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/tutorial/welcome"
            className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors"
          >
            Start the tutorial →
          </Link>
          <a
            href="https://patreon.com/1stvibe"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-white/30 text-white px-6 py-3 rounded-xl hover:bg-white/10 transition-colors"
          >
            <Heart size={16} />
            Support on Patreon
          </a>
        </div>
      </div>
    </div>
  );
}
