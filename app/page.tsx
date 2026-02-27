import Link from "next/link";
import Image from "next/image";
import DemoForm from "@/components/demo/DemoForm";
import { ArrowRight, Zap, BookOpen, Globe, CheckCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 via-white to-white px-4 pt-20 pb-16 sm:pt-28 sm:pb-24">
        {/* background accent */}
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-indigo-100/60 blur-3xl pointer-events-none"
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Image
              src="/donkey.png"
              alt="A donkey doing a spread eagle off a ski jump"
              width={896}
              height={512}
              className="rounded-2xl shadow-xl"
              priority
            />
          </div>

          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Zap size={14} className="text-indigo-500" />
            No experience required
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
            Build your first website
            <br className="hidden sm:block" />
            <span className="text-indigo-600"> with AI.</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            You&apos;ve heard the hype about AI coding tools. Here&apos;s the fastest way
            to see it for yourself — no setup, no CS degree, no BS. Just type
            what you want and watch it appear.
          </p>

          {/* Instant Demo */}
          <div id="demo" className="scroll-mt-20">
            <DemoForm />
          </div>

          {/* Start Tutorial CTA */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <Link
              href="/tutorial/welcome"
              className="inline-flex items-center gap-3 bg-indigo-600 text-white text-xl font-bold px-10 py-5 rounded-2xl hover:bg-indigo-700 active:scale-95 transition-all shadow-lg shadow-indigo-200"
            >
              <BookOpen size={24} />
              Start the Tutorial
              <ArrowRight size={24} />
            </Link>
            <p className="text-sm text-gray-400">
              If you can describe it, you can build it.
            </p>
          </div>
        </div>
      </section>

      {/* ── Why This Matters ─────────────────────────────────────── */}
      <section className="px-4 py-20 max-w-3xl mx-auto w-full">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Why this matters right now
        </h2>
        <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
          <p>
            Something genuinely big is happening. For the first time, you can
            describe what you want to build in plain English — and AI will write
            the code. Not perfect code, but <em>working</em> code. A real thing
            that lives on the internet with your name on it.
          </p>
          <p>
            Most people hear about this on a podcast, maybe try ChatGPT once,
            and then go back to their day. They never have the moment where it
            clicks. We built 1stvibe.ai because that moment is worth having — and
            it&apos;s closer than you think.
          </p>
          <p>
            You don&apos;t need a computer science degree. You don&apos;t need to
            understand how servers work. You need about an hour, some curiosity,
            and this guide. We&apos;ll handle everything else.
          </p>
        </div>
      </section>

      {/* ── What You'll Do ───────────────────────────────────────── */}
      <section className="bg-gray-50 px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Here&apos;s what you&apos;re about to do
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Four steps. One hour. A real live URL you can share with anyone.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Zap size={24} className="text-indigo-500" />,
                step: "01",
                title: "Instant Demo",
                desc: "Type what you want. Get a live link in under 60 seconds. Feel what the hype is about.",
              },
              {
                icon: <BookOpen size={24} className="text-indigo-500" />,
                step: "02",
                title: "Setup",
                desc: "Install Claude Code and create a free account. Takes 5 minutes, works on Mac and Windows.",
              },
              {
                icon: <CheckCircle size={24} className="text-indigo-500" />,
                step: "03",
                title: "Build",
                desc: "Have a real conversation with AI. Watch it generate your website. Tweak it until it's yours.",
              },
              {
                icon: <Globe size={24} className="text-indigo-500" />,
                step: "04",
                title: "Deploy",
                desc: "Push to GitHub, deploy to Vercel. Your site gets a real URL. The whole internet can see it.",
              },
            ].map(({ icon, step, title, desc }) => (
              <div
                key={step}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  {icon}
                  <span className="text-xs font-bold text-gray-300 tracking-widest">
                    {step}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────── */}
      <section className="px-4 py-24 bg-indigo-600 text-center">
        <blockquote className="text-2xl sm:text-4xl font-bold text-white leading-tight mb-4">
          &ldquo;See what all the hype is about.
          <br className="hidden sm:block" /> Build your first thing.&rdquo;
        </blockquote>
        <p className="text-indigo-200 text-lg mb-10">
          Try the demo above, then follow the tutorial to do it yourself — for real.
        </p>
        <Link
          href="/tutorial/welcome"
          className="inline-flex items-center gap-3 bg-white text-indigo-600 text-2xl font-extrabold px-12 py-6 rounded-2xl hover:bg-indigo-50 active:scale-95 transition-all shadow-xl"
        >
          <BookOpen size={28} />
          Start the Tutorial
          <ArrowRight size={28} />
        </Link>
        <p className="mt-6 text-indigo-300 text-sm">Free. No credit card. No fluff.</p>
      </section>
    </div>
  );
}
