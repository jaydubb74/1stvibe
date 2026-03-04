import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tools Explained | 1stvibe.ai",
  description:
    "A practical guide to AI coding agents, app builders, image generators, writing tools, hosting, code repos, and domain registrars — with pricing, pros/cons, and recommendations.",
};

export default function ToolsExplainedPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-50 to-white pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            <span className="text-indigo-600">AI Tools Explained</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
            <strong className="text-gray-900">Stop Guessing. Start Building.</strong> The AI
            landscape is a wild frontier, so we&apos;ve mapped out the essential gear you need
            for the journey. This isn&apos;t a list of every tool ever made—it&apos;s a curated
            selection of the best ones for the job. We keep the pulse on new releases so you
            can focus on what matters: creating cool stuff.
          </p>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="border-b border-gray-100 py-8 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Jump to section
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "1. AI Coding Agents", href: "#coding-agents" },
              { label: "2. AI App Builders", href: "#app-builders" },
              { label: "3. AI Writing Tools", href: "#writing-tools" },
              { label: "4. Hosting Solutions", href: "#hosting" },
              { label: "5. Code Repositories", href: "#code-repos" },
              { label: "6. Domain Registration", href: "#domains" },
              { label: "Bottom Line Stack", href: "#bottom-line" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="bg-white border border-indigo-200 text-indigo-600 text-sm font-medium px-4 py-2 rounded-full hover:bg-indigo-600 hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-16 space-y-24">

        {/* ── 1. AI CODING AGENTS ── */}
        <section id="coding-agents">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">01</span>
            <h2 className="text-3xl font-bold text-gray-900">AI Coding Agents</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-8">
            These are tools that live inside your terminal or IDE and act as autonomous coding
            assistants — think of them as AI pair programmers that can understand your entire
            codebase and execute multi-step development tasks. However with some, such as Claude
            Code, you can use their desktop application to build in plain language. You need to
            give it access to your terminal and folders but at this juncture it is magic.
          </p>

          {/* Comparison Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-200 mb-10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Tool</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Free Tier?</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Pricing</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Interface</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Best For</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  {
                    tool: "Claude Code",
                    free: "❌ (Pro required)",
                    pricing: "Pro $20/mo; Max $100–200/mo; Team $125–150/user/mo",
                    interface: "Terminal CLI + VS Code/JetBrains",
                    best: "Complex codebases, code quality",
                    rating: "⭐⭐⭐⭐⭐",
                  },
                  {
                    tool: "OpenAI Codex",
                    free: "✅ (limited, temp.)",
                    pricing: "Plus $20/mo; Pro $200/mo; Business $30/user/mo",
                    interface: "Cloud agent + CLI + IDE",
                    best: "Parallel tasks, speed, delegation",
                    rating: "⭐⭐⭐⭐",
                  },
                  {
                    tool: "Gemini Code Assist",
                    free: "✅ (very generous)",
                    pricing: "Free (1K req/day); Standard $19/user/mo; Enterprise $45/user/mo",
                    interface: "IDE + Terminal (Gemini CLI)",
                    best: "Google ecosystem, budget teams",
                    rating: "⭐⭐⭐⭐",
                  },
                  {
                    tool: "Cursor",
                    free: "✅ (2K completions)",
                    pricing: "Pro $20/mo; Ultra $200/mo",
                    interface: "VS Code fork",
                    best: "Power devs, multi-model",
                    rating: "⭐⭐⭐⭐⭐",
                  },
                  {
                    tool: "Google AI Studio",
                    free: "✅",
                    pricing: "$0 (no Pro tier; API billed separately)",
                    interface: "Web console for Gemini API",
                    best: "Prompt/schema & app flow design",
                    rating: "⭐⭐⭐⭐",
                  },
                  {
                    tool: "GitHub Copilot",
                    free: "✅ (limited)",
                    pricing: "Individual $10/mo; Business $19/user/mo",
                    interface: "IDE extension",
                    best: "Inline suggestions, broad IDE",
                    rating: "⭐⭐⭐⭐",
                  },
                ].map((row) => (
                  <tr key={row.tool} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">{row.tool}</td>
                    <td className="px-4 py-3 text-gray-600">{row.free}</td>
                    <td className="px-4 py-3 text-gray-600">{row.pricing}</td>
                    <td className="px-4 py-3 text-gray-600">{row.interface}</td>
                    <td className="px-4 py-3 text-gray-600">{row.best}</td>
                    <td className="px-4 py-3">{row.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Detailed Breakdowns */}
          <div className="space-y-8">
            <ToolCard
              name="Claude Code"
              href="https://claude.ai/code"
              description="Widely regarded as the best AI coding agent for code quality and codebase comprehension as of February 2026. It runs locally by default, analyzing your code on your machine for maximum privacy. Key strengths include deep dependency mapping (tested accurately on 50K+ line codebases), autonomous issue-to-PR conversion with tests, and MCP integration with 55+ plugins. Developers consistently report 3–5× productivity gains across tasks like writing endpoints, fixing bugs, refactoring, and documentation. The Pro plan at $20/mo provides ~40–80 hours/week of usage with Claude Sonnet; the Max $100/mo tier (5× usage) is the sweet spot for professional daily use."
              pros={[
                "Best code quality and reasoning; excellent codebase understanding",
                "Autonomous multi-step task execution",
                "Strong Git/PR integration; active Discord community",
              ]}
              cons={[
                "No free tier (Pro minimum $20/mo)",
                "70% more expensive than GitHub Copilot; usage caps can be opaque",
                "Generated code is ~80–90% correct and still needs review",
                "Limited to VS Code + JetBrains",
              ]}
            />
            <ToolCard
              name="OpenAI Codex"
              href="https://openai.com/codex"
              description="Takes a cloud-first approach with a fundamentally different architecture. Tasks spin up sandboxed cloud environments where Codex can run builds, execute tests, and verify changes without touching your local machine. The killer feature is true parallelism — you can fire off multiple coding tasks simultaneously each in isolated containers, then review all proposed changes together. The CLI is fully open source. Access comes bundled with ChatGPT subscriptions."
              pros={[
                "Cloud sandbox execution (safe, parallel)",
                "Open-source CLI; strong delegation model for team workflows",
                "3× more token-efficient than Claude Code",
                "Bundled with ChatGPT — no separate subscription",
              ]}
              cons={[
                "Less accurate than Claude Code on complex tasks",
                "Faster but requires more iteration/cleanup",
                "Cloud-first model means dependency on internet",
                "Pro at $200/mo is expensive for individual devs",
              ]}
            />
            <ToolCard
              name="Gemini Code Assist"
              href="https://codeassist.google"
              description="Has the most generous free tier of any AI coding tool — 6,000 code completions/day, 240 chat requests/day, and 1,000 model requests/day for CLI/agent mode, all at $0. Supports VS Code, JetBrains, Android Studio, and Cloud Workstations. The 1M token context window enables whole-project understanding, and it scored 63.8% on SWE-bench vs. GitHub Copilot's 33.2%."
              pros={[
                "Most generous free tier by far",
                "Strong benchmark performance (63.8% SWE-bench)",
                "1M token context window; deep Google Cloud/Firebase integration",
                "Gemini CLI is open source",
              ]}
              cons={[
                "Can be slower than Copilot at inline completions",
                "Verbose responses not ideal for speed-focused workflows",
                "Less mature ecosystem than GitHub Copilot",
                "Enterprise pricing jumped 137% post-promotional period",
              ]}
            />
          </div>

          {/* Head-to-Head Comparison */}
          <div className="mt-10">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Head-to-Head Comparison</h3>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Dimension</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Claude Code</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">OpenAI Codex</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Gemini Code Assist</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Cursor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-gray-600">
                  {[
                    ["Execution model", "Local-first", "Cloud sandbox", "Cloud + local", "Local (VS Code)"],
                    ["Parallelism", "Via sub-agents", "✅ Native, best-in-class", "Limited", "Limited"],
                    ["Open source", "❌ Closed", "✅ CLI is OSS", "✅ CLI is OSS", "❌ Closed"],
                    ["SWE-bench", "Highest tier", "Mid-tier", "63.8%", "High tier"],
                    ["Token efficiency", "Lower (verbose)", "~3× more efficient", "Good", "Good"],
                    ["Context window", "200K tokens", "Varies by model", "1M tokens", "128K+ tokens"],
                    ["Best free option", "❌ None", "✅ Temporary promo", "✅ Very generous", "✅ 2K completions"],
                    ["Cheapest paid", "$20/mo", "$20/mo (via Plus)", "$0 / $19/mo", "$20/mo"],
                  ].map(([dim, ...vals]) => (
                    <tr key={dim} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-700">{dim}</td>
                      {vals.map((v, i) => <td key={i} className="px-4 py-3">{v}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <RecommendationBox>
            Buy Claude Pro to start. It&apos;s the most powerful coding product to date but also a strong
            agentic tool and a powerful chat to deliver on all your needs. If you&apos;re going to build a lot,
            you may end up needing Max.
          </RecommendationBox>
        </section>

        {/* ── 2. AI APP BUILDERS ── */}
        <section id="app-builders">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">02</span>
            <h2 className="text-3xl font-bold text-gray-900">AI App Builders</h2>
            <span className="text-sm text-gray-500 font-normal">&ldquo;Vibe Coding&rdquo; / Prompt-to-App</span>
          </div>
          <p className="text-gray-600 leading-relaxed mb-8">
            These are no-code/low-code platforms where you describe what you want in natural language
            and get a working app or website. Less control than coding agents, but dramatically faster
            for prototyping. These are fine but compared to Claude Code (and the recent coding assistant
            tools), we do not recommend building with these products.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-200 mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Tool</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Free Tier?</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Pricing</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Best For</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["v0 (Vercel)", "✅ ($5 credits/mo)", "Premium $20/mo; Team $30/user/mo", "Frontend/React components", "⭐⭐⭐⭐⭐"],
                  ["Bolt.new", "✅ (1M tokens/mo)", "Starter ~$20/mo; Pro $50–100/mo", "Full-stack rapid prototyping", "⭐⭐⭐⭐"],
                  ["Google AI Studio", "✅", "$0; API pay-as-you-go via Gemini pricing", "AI flows, prompt/schema design, starter apps", "⭐⭐⭐⭐"],
                  ["Lovable", "✅ (5 credits/day)", "Pro $25/mo; Business $50/mo", "Non-technical founders, MVPs", "⭐⭐⭐⭐"],
                  ["Replit", "✅ Limited", "Core $25/mo; Teams $40/user/mo", "End-to-end browser dev", "⭐⭐⭐⭐"],
                ].map(([tool, free, pricing, best, rating]) => (
                  <tr key={tool} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">{tool}</td>
                    <td className="px-4 py-3 text-gray-600">{free}</td>
                    <td className="px-4 py-3 text-gray-600">{pricing}</td>
                    <td className="px-4 py-3 text-gray-600">{best}</td>
                    <td className="px-4 py-3">{rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { label: "v0", href: "https://v0.dev" },
              { label: "Bolt.new", href: "https://bolt.new" },
              { label: "Lovable", href: "https://lovable.dev" },
              { label: "Replit", href: "https://replit.com" },
            ].map((link) => (
              <ExternalLink key={link.label} href={link.href}>{link.label}</ExternalLink>
            ))}
          </div>

          <RecommendationBox>
            Given your prosumer/builder profile: use Claude Code. These vibe-coding platforms are
            faster for initial mockups but Claude Code gives you far more control, quality, and a
            path to production.
          </RecommendationBox>
        </section>

        {/* ── 3. AI WRITING TOOLS ── */}
        <section id="writing-tools">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">03</span>
            <h2 className="text-3xl font-bold text-gray-900">AI Writing Tools</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-8">
            AI writing tools use artificial intelligence to generate, refine, or enhance written
            content by understanding context, tone, and intent. Their value lies in boosting
            productivity and creativity — helping users write faster, communicate more clearly,
            and produce higher-quality work with less effort.
          </p>
          <h3 className="text-xl font-bold text-gray-900 mb-4">General-Purpose AI Assistants</h3>
          <div className="overflow-x-auto rounded-xl border border-gray-200 mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Tool</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Free Tier?</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Pricing</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Writing Strength</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["ChatGPT", "✅ (limited)", "Plus $20/mo; Pro $200/mo", "Research, structured content", "⭐⭐⭐⭐⭐"],
                  ["Claude", "✅ (30–100 msgs/day)", "Pro $20/mo; Max $100–200/mo", "Creative writing, natural tone", "⭐⭐⭐⭐⭐"],
                  ["Gemini", "✅ (most generous free)", "AI Pro $19.99/mo; Ultra $249.99/mo", "Google integration, research", "⭐⭐⭐⭐"],
                  ["Grok", "✅ Limited", "SuperGrok $30/mo; Heavy $300/mo", "Edgy content, X integration", "⭐⭐⭐"],
                ].map(([tool, free, pricing, strength, rating]) => (
                  <tr key={tool} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">{tool}</td>
                    <td className="px-4 py-3 text-gray-600">{free}</td>
                    <td className="px-4 py-3 text-gray-600">{pricing}</td>
                    <td className="px-4 py-3 text-gray-600">{strength}</td>
                    <td className="px-4 py-3">{rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-4 mb-10 text-sm text-gray-600 leading-relaxed">
            <p>
              <strong className="text-gray-900">ChatGPT Plus</strong> is the best all-rounder — strongest for
              research-heavy content, structured writing, data analysis, and versatility across tasks. The ecosystem
              (plugins, custom GPTs, image generation, voice) is unmatched. Con: Can be formulaic; occasionally hallucinates citations.
            </p>
            <p>
              <strong className="text-gray-900">Claude Pro</strong> consistently wins for creative writing, maintaining
              natural tone, and following nuanced style instructions. It&apos;s also the strongest at code generation and
              long-context tasks. Con: Smaller ecosystem; less integrated with external tools; free tier more restrictive than Gemini&apos;s.
            </p>
            <p>
              <strong className="text-gray-900">Gemini</strong> has the most generous free tier and benefits from deep
              Google Workspace integration (Docs, Sheets, Gmail). Con: Writing quality sits between ChatGPT and Claude without
              excelling at either&apos;s strengths.
            </p>
            <p>
              <strong className="text-gray-900">Grok</strong> via X is the &ldquo;rebel&rdquo; option — less filtered, more willing
              to tackle edgy topics. Useful for real-time trending analysis. Con: Less polished outputs; expensive premium tiers.
            </p>
          </div>

          <h3 className="text-xl font-bold text-gray-900 mb-4">Specialized AI Writing Platforms</h3>
          <div className="overflow-x-auto rounded-xl border border-gray-200 mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Tool</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Free Tier?</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Pricing</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Best For</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["Writer.com", "❌ (14-day trial)", "Starter $29–39/user/mo; Enterprise custom", "Enterprise brand compliance", "⭐⭐⭐⭐"],
                  ["Jasper", "❌ (7-day trial)", "From $39/mo; Team $99/mo (3 seats)", "Marketing content at scale", "⭐⭐⭐⭐"],
                  ["Grammarly", "✅ (basic grammar)", "Premium $12/mo", "Editing, clarity, tone", "⭐⭐⭐⭐"],
                  ["Rytr", "✅ (10K chars/mo)", "Unlimited $9/mo", "Budget AI writing", "⭐⭐⭐"],
                  ["Copy.ai", "✅ (2K words/mo)", "From $36/mo", "Social, brainstorming", "⭐⭐⭐"],
                ].map(([tool, free, pricing, best, rating]) => (
                  <tr key={tool} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">{tool}</td>
                    <td className="px-4 py-3 text-gray-600">{free}</td>
                    <td className="px-4 py-3 text-gray-600">{pricing}</td>
                    <td className="px-4 py-3 text-gray-600">{best}</td>
                    <td className="px-4 py-3">{rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { label: "ChatGPT", href: "https://chat.openai.com" },
              { label: "Claude", href: "https://claude.ai" },
              { label: "Gemini", href: "https://gemini.google.com" },
              { label: "Grok", href: "https://grok.com" },
              { label: "Writer", href: "https://writer.com" },
              { label: "Jasper", href: "https://jasper.ai" },
              { label: "Grammarly", href: "https://grammarly.com" },
            ].map((link) => (
              <ExternalLink key={link.label} href={link.href}>{link.label}</ExternalLink>
            ))}
          </div>

          <RecommendationBox>
            To start, use your Claude Code subscription or the free tier at Gemini. If you find yourself
            needing a lot of volume, then consider the specialized tools above.
          </RecommendationBox>
        </section>

        {/* ── 2. AI IMAGE GENERATORS ── */}
        <section id="image-generators">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">02b</span>
            <h2 className="text-3xl font-bold text-gray-900">AI Image Generators</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-8">
            This is a broad category that includes creating images as well as broader design
            (such as Canva and Adobe).
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-200 mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Tool</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Free Tier?</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Pricing</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Best For</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["ChatGPT (GPT-4o Image)", "✅ Limited", "Plus $20/mo; Pro $200/mo", "General purpose, iteration", "⭐⭐⭐⭐⭐"],
                  ["Midjourney", "❌ (suspended)", "Basic $10/mo; Std $30/mo; Pro $60/mo", "Artistic/concept art", "⭐⭐⭐⭐⭐"],
                  ["Adobe Firefly", "✅ Limited credits", "Standard $9.99/mo; Photoshop $19.99/mo", "Photo editing, pro design", "⭐⭐⭐⭐"],
                  ["Ideogram", "✅ (10 credits/week)", "From $8/mo", "Text-in-image accuracy", "⭐⭐⭐⭐"],
                  ["FLUX", "✅ (local/free)", "API ~$0.01–0.05/image", "Custom workflows, API", "⭐⭐⭐⭐"],
                  ["Leonardo.ai", "✅ Generous", "Paid plans available", "Product mockups", "⭐⭐⭐⭐"],
                  ["Canva AI", "✅", "Pro $13/mo", "Social media design", "⭐⭐⭐"],
                  ["Stable Diffusion", "✅ (open source)", "Free locally; cloud varies", "Technical users, full control", "⭐⭐⭐⭐"],
                  ["Reve Image", "✅ Limited", "Pro $20/mo", "Prompt adherence", "⭐⭐⭐⭐"],
                ].map(([tool, free, pricing, best, rating]) => (
                  <tr key={tool} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">{tool}</td>
                    <td className="px-4 py-3 text-gray-600">{free}</td>
                    <td className="px-4 py-3 text-gray-600">{pricing}</td>
                    <td className="px-4 py-3 text-gray-600">{best}</td>
                    <td className="px-4 py-3">{rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-4 mb-8 text-sm text-gray-600 leading-relaxed">
            <p>
              <strong className="text-gray-900">ChatGPT (GPT-4o Image)</strong> is the consensus &ldquo;best overall&rdquo; for 2026.
              Excels at iterative editing through conversation, handles complex multi-element prompts well, and requires
              zero prompt engineering expertise. Con: Occasionally over-sanitizes outputs; less stylistic range than Midjourney.
            </p>
            <p>
              <strong className="text-gray-900">Midjourney</strong> remains the gold standard for artistic and aesthetic
              quality — mood boards, concept art, and cinematic imagery. Con: No free trial; Discord-based interface is clunky;
              less precise at following literal prompts.
            </p>
            <p>
              <strong className="text-gray-900">Adobe Firefly</strong> integrates directly into Photoshop, Illustrator,
              and Creative Cloud. Trained on licensed content, making it the safest for commercial use. Con: Less creative range;
              credit system runs out fast on free tier.
            </p>
            <p>
              <strong className="text-gray-900">Ideogram</strong> is the standout for rendering text within images accurately —
              great for logos, social graphics, and typography-heavy work. Con: Less photorealistic than ChatGPT or Midjourney.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { label: "ChatGPT", href: "https://chat.openai.com" },
              { label: "Midjourney", href: "https://midjourney.com" },
              { label: "Adobe Firefly", href: "https://firefly.adobe.com" },
              { label: "Ideogram", href: "https://ideogram.ai" },
              { label: "FLUX", href: "https://blackforestlabs.ai" },
              { label: "Leonardo.ai", href: "https://leonardo.ai" },
              { label: "Canva", href: "https://canva.com" },
              { label: "Stable Diffusion", href: "https://stability.ai" },
            ].map((link) => (
              <ExternalLink key={link.label} href={link.href}>{link.label}</ExternalLink>
            ))}
          </div>

          <RecommendationBox>
            To start you don&apos;t need to pay for anything. Your application or website design can be
            accomplished by describing what you want in Claude Code. However if you want to create a logo
            or a specific image, we&apos;d recommend Gemini Image or ChatGPT.
          </RecommendationBox>
        </section>

        {/* ── 4. HOSTING ── */}
        <section id="hosting">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">04</span>
            <h2 className="text-3xl font-bold text-gray-900">Hosting Solutions</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-8">
            The web hosting market is valued at $137–149B in 2025, projected to reach $355–661B by 2029–2034,
            growing at 12–18% CAGR. For your use case (deploying apps from vibe coding tools like v0, Bolt,
            Lovable), the JAMstack/edge hosting providers are most relevant.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-200 mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Platform</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Free Tier?</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Pro Pricing</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Bandwidth (Free)</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Best For</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["Vercel", "✅ (hobby, non-commercial)", "$20/user/mo", "100GB/mo", "Next.js, v0 deploys", "⭐⭐⭐⭐⭐"],
                  ["Netlify", "✅ (commercial OK)", "$19/user/mo", "100GB/mo", "General JAMstack", "⭐⭐⭐⭐"],
                  ["Cloudflare Pages", "✅ (unlimited bandwidth)", "$20/mo", "Unlimited", "Cost-conscious projects", "⭐⭐⭐⭐⭐"],
                  ["Replit", "✅ Limited", "$25/mo (bundled w/ AI)", "Included", "All-in-one dev+host", "⭐⭐⭐"],
                  ["Render", "✅", "From $7/mo", "100GB/mo", "Simple deployment", "⭐⭐⭐"],
                ].map(([platform, free, pricing, bw, best, rating]) => (
                  <tr key={platform} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">{platform}</td>
                    <td className="px-4 py-3 text-gray-600">{free}</td>
                    <td className="px-4 py-3 text-gray-600">{pricing}</td>
                    <td className="px-4 py-3 text-gray-600">{bw}</td>
                    <td className="px-4 py-3 text-gray-600">{best}</td>
                    <td className="px-4 py-3">{rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-4 mb-8 text-sm text-gray-600 leading-relaxed">
            <p>
              <strong className="text-gray-900">Vercel</strong> is the gold standard for Next.js deployment and the
              natural home for v0-generated projects. Edge functions, instant previews, and the best developer experience
              in the category. Con: Pricing can get aggressive at scale; free tier prohibits monetization.
            </p>
            <p>
              <strong className="text-gray-900">Netlify</strong> is the most framework-neutral option with a commercial-friendly
              free tier. New Free plan (Jan 2026): 100GB bandwidth, 300 build minutes, 125K function invocations.
              Con: Only 300 build minutes on free vs. Vercel&apos;s 6,000.
            </p>
            <p>
              <strong className="text-gray-900">Cloudflare Pages</strong> offers the best value at scale — unlimited bandwidth
              on the free tier, the largest edge network (300+ cities). At scale (500GB bandwidth, 10K builds/month), Cloudflare
              costs ~$20/mo vs. Netlify at ~$99 and Vercel at ~$150+.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { label: "Vercel", href: "https://vercel.com" },
              { label: "Netlify", href: "https://netlify.com" },
              { label: "Cloudflare Pages", href: "https://pages.cloudflare.com" },
              { label: "Replit", href: "https://replit.com" },
              { label: "Render", href: "https://render.com" },
            ].map((link) => (
              <ExternalLink key={link.label} href={link.href}>{link.label}</ExternalLink>
            ))}
          </div>

          <RecommendationBox>
            Cloudflare Pages is great to start because it&apos;s free with unlimited bandwidth. However,
            Vercel is the more advanced choice for commercial Next.js projects.
          </RecommendationBox>
        </section>

        {/* ── 5. CODE REPOSITORIES ── */}
        <section id="code-repos">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">05</span>
            <h2 className="text-3xl font-bold text-gray-900">Code Repositories</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-8">
            The global software repository market is projected to reach ~$7.89B by 2027 from $4.12B in 2022,
            at a 13.9% CAGR. GitHub dominates with 100M+ developers.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-200 mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Platform</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Free Tier?</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Paid Plans</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">CI/CD (Free)</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Best For</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["GitHub", "✅ (unlimited repos)", "Team $4/user/mo; Enterprise $21/user/mo", "2,000/mo", "Open source, community", "⭐⭐⭐⭐⭐"],
                  ["GitLab", "✅ (unlimited repos + CI/CD)", "Premium $29/user/mo; Ultimate $99/user/mo", "400/mo", "End-to-end DevOps", "⭐⭐⭐⭐"],
                  ["Bitbucket", "✅ (up to 5 users)", "Standard $3/user/mo; Premium $6.60/user/mo", "2,500/mo", "Atlassian teams, budget", "⭐⭐⭐"],
                ].map(([platform, free, paid, ci, best, rating]) => (
                  <tr key={platform} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">{platform}</td>
                    <td className="px-4 py-3 text-gray-600">{free}</td>
                    <td className="px-4 py-3 text-gray-600">{paid}</td>
                    <td className="px-4 py-3 text-gray-600">{ci}</td>
                    <td className="px-4 py-3 text-gray-600">{best}</td>
                    <td className="px-4 py-3">{rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { label: "GitHub", href: "https://github.com" },
              { label: "GitLab", href: "https://gitlab.com" },
              { label: "Bitbucket", href: "https://bitbucket.org" },
            ].map((link) => (
              <ExternalLink key={link.label} href={link.href}>{link.label}</ExternalLink>
            ))}
          </div>

          <RecommendationBox>
            GitHub is great to start — it&apos;s the largest community of developers and for initial projects
            it&apos;s free. The Team plan at $4/user/mo is the best value for small teams.
          </RecommendationBox>
        </section>

        {/* ── 6. DOMAIN REGISTRATION ── */}
        <section id="domains">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">06</span>
            <h2 className="text-3xl font-bold text-gray-900">Domain Registration Services</h2>
          </div>
          <p className="text-gray-600 leading-relaxed mb-8">
            The domain name registrar market is valued at ~$2.74B in 2025, projected to reach $3.93B by 2033
            at a 4.58% CAGR. There are ~364M total domain registrations globally. North America holds ~39% share.
          </p>

          <div className="overflow-x-auto rounded-xl border border-gray-200 mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Registrar</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">.com Registration</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">.com Renewal</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Free WHOIS?</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Best For</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["Cloudflare", "$10.46", "At cost (~$10.46)", "✅", "At-cost pricing, developers", "⭐⭐⭐⭐⭐"],
                  ["Porkbun", "~$9.73", "$11.08", "✅", "Budget, transparent pricing", "⭐⭐⭐⭐⭐"],
                  ["Namecheap", "$6.49–8.98", "$13.98–18.48", "✅", "Low initial registration", "⭐⭐⭐⭐"],
                  ["GoDaddy", "$11.99", "$21.99", "✅", "All-in-one ecosystem", "⭐⭐⭐"],
                  ["Squarespace", "$14", "$20", "✅", "Website builder users", "⭐⭐⭐"],
                ].map(([reg, cost, renewal, whois, best, rating]) => (
                  <tr key={reg} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900">{reg}</td>
                    <td className="px-4 py-3 text-gray-600">{cost}</td>
                    <td className="px-4 py-3 text-gray-600">{renewal}</td>
                    <td className="px-4 py-3 text-gray-600">{whois}</td>
                    <td className="px-4 py-3 text-gray-600">{best}</td>
                    <td className="px-4 py-3">{rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { label: "Cloudflare Registrar", href: "https://cloudflare.com/products/registrar" },
              { label: "Porkbun", href: "https://porkbun.com" },
              { label: "Namecheap", href: "https://namecheap.com" },
              { label: "GoDaddy", href: "https://godaddy.com" },
              { label: "Squarespace Domains", href: "https://domains.squarespace.com" },
            ].map((link) => (
              <ExternalLink key={link.label} href={link.href}>{link.label}</ExternalLink>
            ))}
          </div>

          <RecommendationBox>
            Cloudflare Registrar sells domains at cost — no markup, no renewal surprises. If you&apos;re
            already using Cloudflare for hosting/CDN, it&apos;s a no-brainer.
          </RecommendationBox>
        </section>

        {/* ── BOTTOM LINE ── */}
        <section id="bottom-line" className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-2xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Bottom Line: Recommended Stack</h2>
          <p className="text-indigo-200 mb-8">
            Given your profile as a prosumer building and shipping products quickly, here&apos;s the highest-value stack:
          </p>
          <div className="overflow-x-auto rounded-xl border border-white/20 mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left px-4 py-3 font-semibold text-indigo-200">Category</th>
                  <th className="text-left px-4 py-3 font-semibold text-indigo-200">Pick</th>
                  <th className="text-left px-4 py-3 font-semibold text-indigo-200">Monthly Cost</th>
                  <th className="text-left px-4 py-3 font-semibold text-indigo-200">Why</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {[
                  ["AI Image Gen", "ChatGPT Plus or Gemini", "Free–$20", "Best all-rounder; includes writing + image"],
                  ["AI App Builder", "Claude Pro", "$20", "Claude Code is the most powerful product"],
                  ["AI Writing", "Claude Pro (or Gemini free)", "$0 (if purchased to build)", "Covers structured + creative; industry consensus"],
                  ["Hosting", "Cloudflare Pages → Vercel", "$0–20", "Cloudflare for cost; Vercel for Next.js DX"],
                  ["Code Repo", "GitHub (Free or Team)", "$0–4/user", "Industry standard; Copilot ecosystem"],
                  ["Domain", "Cloudflare Registrar", "~$10.46/yr per .com", "At-cost, no renewal surprises"],
                ].map(([cat, pick, cost, why]) => (
                  <tr key={cat}>
                    <td className="px-4 py-3 font-medium text-white">{cat}</td>
                    <td className="px-4 py-3 text-indigo-100">{pick}</td>
                    <td className="px-4 py-3 text-indigo-100">{cost}</td>
                    <td className="px-4 py-3 text-indigo-200">{why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-indigo-100 text-sm leading-relaxed">
            <strong className="text-white">Total: ~$20–80/month</strong> covers best-in-class AI image generation,
            AI writing, AI coding, hosting, code repo, and domain — a collection of tools that would have cost
            thousands per month just a few years ago.
          </p>
        </section>

        {/* CTA */}
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4 text-sm">Ready to put these tools to work?</p>
          <Link
            href="/tutorial/welcome"
            className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-colors"
          >
            Start the Tutorial →
          </Link>
        </div>

      </div>
    </div>
  );
}

/* ── Shared sub-components ── */

function ToolCard({
  name,
  href,
  description,
  pros,
  cons,
}: {
  name: string;
  href: string;
  description: string;
  pros: string[];
  cons: string[];
}) {
  return (
    <div className="border border-gray-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-lg font-bold text-gray-900">{name}</h4>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-indigo-600 hover:underline"
        >
          {href.replace("https://", "")} ↗
        </a>
      </div>
      <p className="text-sm text-gray-600 leading-relaxed mb-4">{description}</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wide mb-2">Pros</p>
          <ul className="space-y-1">
            {pros.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-emerald-500 mt-0.5">✓</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold text-rose-700 uppercase tracking-wide mb-2">Cons</p>
          <ul className="space-y-1">
            {cons.map((c) => (
              <li key={c} className="flex items-start gap-2 text-sm text-gray-600">
                <span className="text-rose-400 mt-0.5">✗</span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function RecommendationBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-8 bg-indigo-50 border border-indigo-100 rounded-xl p-5 flex gap-3">
      <span className="text-indigo-600 text-xl mt-0.5">💡</span>
      <div>
        <p className="text-xs font-semibold text-indigo-700 uppercase tracking-wide mb-1">Our Recommendation</p>
        <p className="text-sm text-gray-700 leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
    >
      {children} ↗
    </a>
  );
}
