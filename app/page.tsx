import Link from "next/link";
import DemoForm from "@/components/demo/DemoForm";
import { ArrowRight, Zap, BookOpen, Globe, CheckCircle, Star, Users, Clock, Rocket } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white px-4 pt-10 pb-10 sm:pt-14 sm:pb-16">
        {/* background accent */}
        <div
          aria-hidden
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-brand-50/60 blur-3xl pointer-events-none"
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-brand-50 border border-brand-50 text-brand text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Zap size={14} className="text-brand" />
            No experience required
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight mb-6">
            Build your first website
            <br className="hidden sm:block" />
            <span className="text-brand"> with AI.</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            You&apos;ve heard about AI coding tools. Here&apos;s the fastest way to see
            what they actually do — no setup, no CS degree, no prior experience
            needed. Describe what you want, and watch it appear.
          </p>

          {/* Instant Demo */}
          <div id="demo" className="scroll-mt-20">
            <DemoForm />
          </div>

          {/* Start Tutorial CTA */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <p className="text-sm text-gray-400">
              Ready to build your own?
            </p>
            <Link
              href="/tutorial/welcome"
              className="inline-flex items-center gap-3 bg-brand text-white text-xl font-bold px-10 py-5 rounded-2xl hover:bg-brand-dark active:scale-95 transition-all shadow-lg"
            >
              <BookOpen size={24} />
              Start the Tutorial
              <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Social Proof Metrics ──────────────────────────────────── */}
      <section className="border-y border-gray-100 bg-white px-4 py-10">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { value: "2,400+", label: "Builders" },
            { value: "Under 1 Hour", label: "to Deploy" },
            { value: "Free", label: "to Start" },
            { value: "4.9 ★", label: "Avg. Rating" },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="text-2xl sm:text-3xl font-extrabold text-brand">{value}</div>
              <div className="text-sm text-gray-500 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why This Works ───────────────────────────────────────── */}
      <section className="px-4 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            You Don&apos;t Need to Learn Code Anymore
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg max-w-2xl mx-auto">
            For the first time, you don&apos;t need to learn a computer&apos;s language — you just need to speak your own.
          </p>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: <Zap size={24} className="text-brand" />,
                title: "Build in Plain English",
                desc: "Tell the AI what you want. It writes the code. You ship the site.",
              },
              {
                icon: <Clock size={24} className="text-brand" />,
                title: "Live in Under an Hour",
                desc: "Go from zero to a live URL you can share with anyone — in about an hour.",
              },
              {
                icon: <Rocket size={24} className="text-brand" />,
                title: "Actually Yours",
                desc: "No templates. No drag-and-drop constraints. A real website built exactly the way you described it — live on the internet.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center">
                  {icon}
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What You'll Do ───────────────────────────────────────── */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Go From Zero to Live in Four Steps
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Four steps. About an hour. A real URL you can share with the world.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Zap size={24} className="text-brand" />,
                step: "01",
                title: "Try the Demo",
                desc: "Type what you want. Get a live link in under 60 seconds. You'll feel it immediately.",
              },
              {
                icon: <BookOpen size={24} className="text-brand" />,
                step: "02",
                title: "Set Up Your Tools",
                desc: "Install Claude Code and create a free account. Takes 5 minutes on Mac or Windows.",
              },
              {
                icon: <CheckCircle size={24} className="text-brand" />,
                step: "03",
                title: "Build Your Site",
                desc: "Have a real conversation with AI. Watch it build your site. Tweak it until it feels exactly right.",
              },
              {
                icon: <Globe size={24} className="text-brand" />,
                step: "04",
                title: "Put It on the Internet",
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

      {/* ── Testimonials ─────────────────────────────────────────── */}
      <section className="px-4 py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Builders Just Like You
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            No coding background. No tech degree. Just curiosity and a free afternoon.
          </p>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                quote: "I built a landing page for an executive dinner series we're running. Instead of being a cross functional project that would take a week or two, I was able to figure out how to build this with integration into our HubSpot instance in one afternoon. I kept waiting for it to get hard — it never did.",
                name: "Marisol T.",
                role: "Marketing Manager",
              },
              {
                quote: "I wanted to learn how to build dashboards and automate some of my general business analysis. It was incredibly easy and gratifying.",
                name: "David K.",
                role: "Director of FP&A",
              },
              {
                quote: "The ability for me to build a web application with agents to pull in web signals for calls, automate my research and then provide contextualized follow up has upped my game significantly. I am more prepared and spend less time overall on every opportunity. Learning how to use these tools has changed my career.",
                name: "Priya M.",
                role: "Account Executive",
              },
            ].map(({ quote, name, role }) => (
              <div
                key={name}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4"
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed flex-1">&ldquo;{quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                  <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand font-bold text-sm">
                    {name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{name}</div>
                    <div className="text-gray-400 text-xs">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ────────────────────────────────────────────── */}
      <section className="px-4 py-24 bg-brand text-center">
        <div className="inline-flex items-center gap-2 bg-white/20 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <Users size={14} />
          Join 2,400+ builders who already shipped
        </div>
        <p className="text-2xl sm:text-4xl font-bold text-white leading-tight mb-4">
          You&apos;ve got this. Start creating today.
        </p>
        <p className="text-white/80 text-lg mb-10">
          Try the demo above, then follow the tutorial to do it yourself — for real.
        </p>
        <Link
          href="/tutorial/welcome"
          className="inline-flex items-center gap-3 bg-white text-brand text-2xl font-extrabold px-12 py-6 rounded-2xl hover:bg-brand-50 active:scale-95 transition-all shadow-xl"
        >
          <BookOpen size={28} />
          Start the Tutorial
          <ArrowRight size={28} />
        </Link>
        <p className="mt-6 text-white/60 text-sm">Free to start. No credit card. No setup required.</p>
      </section>
    </div>
  );
}
