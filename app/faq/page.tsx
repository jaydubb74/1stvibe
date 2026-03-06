"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

type FAQItem = {
  id: number;
  question: string;
  answer: React.ReactNode;
  category: "basics" | "getting-started" | "prompting";
};

const faqItems: FAQItem[] = [
  // BASICS
  {
    id: 1,
    category: "basics",
    question: "What Is Vibe Coding, and How Is It Different from Traditional Coding?",
    answer: (
      <div className="space-y-3">
        <p>
          Vibe coding is the practice of building software by describing what you want in plain
          English, then letting an AI tool write the actual code for you. The term was coined in
          February 2025 by Andrej Karpathy, co-founder of OpenAI.
        </p>
        <p>
          Unlike traditional coding—where you write lines of HTML, JavaScript, or Python—vibe coding
          is a conversation. You focus on the <strong>what</strong> (the outcome you want) and the AI
          handles the <strong>how</strong> (the technical implementation).
        </p>
        <p>
          Think of it like working with a developer who never sleeps: you describe a feature, review
          what&apos;s built, and refine through follow-up prompts.
        </p>
      </div>
    ),
  },
  {
    id: 2,
    category: "basics",
    question: "What Are Tokens, and Why Should I Care?",
    answer: (
      <div className="space-y-3">
        <p>
          Tokens are the small chunks of text that AI models use to process your input and generate
          responses—think of them as the &quot;currency&quot; of every AI interaction. A rough rule
          of thumb: <strong>1 token ≈ ¾ of a word</strong>, so 100 tokens ≈ 75 words.
        </p>
        <p>Why does this matter to you?</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Cost:</strong> AI usage is metered by tokens. More tokens consumed = higher cost.
          </li>
          <li>
            <strong>Context window:</strong> Every AI model has a limit on how many tokens it can
            &quot;hold in memory&quot; during a conversation (Claude&apos;s standard window handles
            up to 200K tokens). If you exceed it, the AI starts forgetting earlier parts of the
            conversation.
          </li>
          <li>
            <strong>Efficiency:</strong> Writing clear, concise prompts saves tokens—which saves
            money and keeps the AI focused.
          </li>
        </ul>
        <p className="text-sm text-gray-600 italic">
          Note: Always use the latest, greatest model because token efficiency is highest on newer
          models.
        </p>
      </div>
    ),
  },

  // GETTING STARTED WITH CLAUDE CODE
  {
    id: 3,
    category: "getting-started",
    question: "What Is Claude Code, and What Do I Need to Get Started?",
    answer: (
      <div className="space-y-3">
        <p>
          Claude Code is Anthropic&apos;s AI coding assistant that works directly in your
          computer&apos;s terminal. You describe what you want to build in plain English, and Claude
          writes the files, runs commands, and creates a working application on your machine.
        </p>
        <p>To get started you need:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            A computer (ideally a Mac or Linux; Windows requires a few additional steps)
          </li>
          <li>
            A <strong>Claude Pro subscription ($20/month)</strong> is fine for building your first
            website and/or applications. As you advance into heavy usage, you may eventually need to
            upgrade to a Max plan ($100–$200/month).
          </li>
          <li>About 10 minutes for your first project</li>
        </ul>
      </div>
    ),
  },
  {
    id: 4,
    category: "getting-started",
    question: "What Is a Context Window, and Why Does It Affect My Results?",
    answer: (
      <div className="space-y-3">
        <p>
          The context window is the total amount of information (measured in tokens) the AI can
          &quot;see&quot; at one time during your conversation. Claude&apos;s standard context window
          is ~200K tokens, with extended options up to 400K+ on premium API tiers.
        </p>
        <p>
          When your conversation or project gets too long, earlier instructions and context start
          falling off—meaning the AI may forget what you told it 30 minutes ago.
        </p>
        <p>
          This is why breaking work into smaller, focused sessions and using a{" "}
          <strong>CLAUDE.md</strong> file (see Q7) produces better results.
        </p>
      </div>
    ),
  },

  // PROMPTING & WORKFLOW
  {
    id: 5,
    category: "prompting",
    question: "How Do I Write a Good Prompt for Vibe Coding?",
    answer: (
      <div className="space-y-3">
        <p>
          Prompting is the core skill of vibe coding—the quality of your output is directly tied to
          the clarity of your instructions. A strong prompt has four ingredients:
        </p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>
            <strong>Identity:</strong> What are you building? (&quot;A customer feedback
            dashboard&quot;)
          </li>
          <li>
            <strong>Audience:</strong> Who is it for? (&quot;Our internal customer success
            team&quot;)
          </li>
          <li>
            <strong>Features:</strong> What does it do specifically? (&quot;Displays NPS scores by
            segment, filterable by date&quot;)
          </li>
          <li>
            <strong>Aesthetic/Constraints:</strong> How should it look and behave? (&quot;Clean,
            minimal, uses our brand colors&quot;)
          </li>
        </ol>
        <p>
          Two additional power tips: say <strong>&quot;Let&apos;s plan first&quot;</strong> before
          building to get Claude to think through the approach, and break large tasks into smaller
          prompts—one function or feature at a time—for cleaner, more reliable output.
        </p>
      </div>
    ),
  },
  {
    id: 6,
    category: "prompting",
    question: "Should I Use Older Models for Simple Tasks to Save Money?",
    answer: (
      <div className="space-y-3">
        <p>
          The short answer is <strong>no</strong>. Each new model is more intelligent, and thus uses
          fewer tokens to respond. So use the latest model on every query—it will cost the least and
          provide the best possible result.
        </p>
        <p>
          The model builders all say that one of the benchmarks is token efficiency, meaning
          they&apos;re training the models to respond with greater depth and accuracy using less
          compute power. In short, use the latest and greatest—for Claude that is{" "}
          <strong>Sonnet 4.6</strong> (as of early March 2026).
        </p>
      </div>
    ),
  },
  {
    id: 7,
    category: "prompting",
    question: "What Is a CLAUDE.md File, and Do I Need One?",
    answer: (
      <div className="space-y-3">
        <p>
          <strong>CLAUDE.md</strong> is a markdown file that Claude automatically reads at the start
          of every session—it&apos;s essentially persistent memory for your project. Without it,
          Claude starts every conversation with zero knowledge of your preferences, project structure,
          or conventions.
        </p>
        <p>A good CLAUDE.md includes:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Project context:</strong> A one-liner about what you&apos;re building
          </li>
          <li>
            <strong>Code style preferences:</strong> How you want things structured
          </li>
          <li>
            <strong>Common commands:</strong> How to run tests, deploy, etc.
          </li>
          <li>
            <strong>Constraints:</strong> Things to avoid or rules to follow
          </li>
        </ul>
        <p>
          You can generate a starter file by running the <code>/init</code> command in your project
          directory, then customize it over time. For prosumers, this is a major time-saver—it
          eliminates repeating yourself every session.
        </p>
      </div>
    ),
  },
  {
    id: 8,
    category: "prompting",
    question: "How Do I Debug When Something Goes Wrong?",
    answer: (
      <div className="space-y-3">
        <p>
          Debugging is inevitable, but with Claude Code the process is collaborative rather than
          technical. The recommended approach:
        </p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Paste the error message directly into Claude and ask it to diagnose the issue</li>
          <li>
            Ask Claude to add logging to narrow down the problem—then paste the terminal output back
            for analysis
          </li>
          <li>
            Iterate: Keep feeding Claude the updated output until it identifies the root cause
          </li>
        </ol>
        <p>
          You don&apos;t need to understand the code yourself. Treat Claude like a mechanic: describe
          the symptom (&quot;the page loads but the data doesn&apos;t appear&quot;), and let it
          investigate.
        </p>
        <p className="text-sm text-gray-600 italic">
          One key tip from Claude Code&apos;s official best practices: explore first, then plan, then
          code—this prevents solving the wrong problem.
        </p>
      </div>
    ),
  },
  {
    id: 9,
    category: "prompting",
    question: "What Are the Limitations and Risks I Should Know About?",
    answer: (
      <div className="space-y-3">
        <p>Vibe coding is powerful but not without guardrails to be aware of:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Security vulnerabilities:</strong> Research shows ~45% of AI-generated code
            contains security flaws, including hardcoded API keys, weak authentication, and missing
            input validation.
          </li>
          <li>
            <strong>Technical debt:</strong> Vibe-coded projects can accumulate technical debt 3x
            faster than traditionally developed software.
          </li>
          <li>
            <strong>Rate limits:</strong> Claude enforces usage caps (weekly limits on Pro/Max
            plans), so heavy sessions may get throttled.
          </li>
          <li>
            <strong>AI hallucinations:</strong> The AI may suggest non-existent libraries or
            packages, which could introduce risk if installed blindly.
          </li>
        </ul>
        <p>
          The mitigation is straightforward: be thoughtful about what you build and what personal
          information you incorporate.
        </p>
      </div>
    ),
  },
  {
    id: 10,
    category: "prompting",
    question: "How Is Claude Code Different from Cursor and GitHub Copilot?",
    answer: (
      <div className="space-y-3">
        <p>These tools serve different workflows:</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-3 py-2 font-semibold text-gray-700 border-b border-gray-200">
                  Feature
                </th>
                <th className="text-left px-3 py-2 font-semibold text-indigo-700 border-b border-gray-200">
                  Claude Code
                </th>
                <th className="text-left px-3 py-2 font-semibold text-gray-700 border-b border-gray-200">
                  Cursor
                </th>
                <th className="text-left px-3 py-2 font-semibold text-gray-700 border-b border-gray-200">
                  GitHub Copilot
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-3 py-2 font-medium text-gray-600">Best for</td>
                <td className="px-3 py-2">Non-technical builders, deep reasoning tasks</td>
                <td className="px-3 py-2">Teams with complex, multi-file projects</td>
                <td className="px-3 py-2">Small teams, fast MVP development</td>
              </tr>
              <tr className="bg-gray-50/50">
                <td className="px-3 py-2 font-medium text-gray-600">Interface</td>
                <td className="px-3 py-2">Terminal-based (command line)</td>
                <td className="px-3 py-2">Full IDE (modified VS Code)</td>
                <td className="px-3 py-2">Plugs into existing IDEs</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-gray-600">Strength</td>
                <td className="px-3 py-2">Plain-language conversation, extended context</td>
                <td className="px-3 py-2">Project-aware multi-file editing</td>
                <td className="px-3 py-2">Affordable, seamless GitHub integration</td>
              </tr>
              <tr className="bg-gray-50/50">
                <td className="px-3 py-2 font-medium text-gray-600">Price</td>
                <td className="px-3 py-2">$20/mo (Pro) to $200/mo (Max)</td>
                <td className="px-3 py-2">$40+/user/mo</td>
                <td className="px-3 py-2">$10–$19/user/mo</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium text-gray-600">Limitation</td>
                <td className="px-3 py-2">Less visual IDE experience</td>
                <td className="px-3 py-2">Steeper learning curve, usage limits</td>
                <td className="px-3 py-2">Limited context for large codebases</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-gray-600">
          For a non-technical prosumer, Claude Code&apos;s conversational, plain-English interface
          makes it the most accessible starting point.
        </p>
      </div>
    ),
  },
  {
    id: 11,
    category: "prompting",
    question: "What Can I Realistically Build with Claude Code?",
    answer: (
      <div className="space-y-3">
        <p>
          As a non-technical user, you can build far more than you&apos;d expect—but it&apos;s
          important to calibrate scope. Strong use cases include:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Internal tools:</strong> Dashboards, calculators, data formatters, workflow
            automators
          </li>
          <li>
            <strong>Web applications:</strong> Landing pages, simple SaaS tools, form-based apps
          </li>
          <li>
            <strong>Prototypes and MVPs:</strong> Quickly test a product idea before investing in a
            full dev team
          </li>
          <li>
            <strong>Automations:</strong> Scripts that clean data, send emails, or integrate APIs
          </li>
        </ul>
        <p>
          The recommended approach is to <strong>start small</strong>—build a single, focused project
          (like a calculator or task tracker)—and expand from there. Vibe coding excels at getting a
          working v1 fast. For production-grade, enterprise-scale applications with complex security
          requirements, you&apos;ll still want professional developers involved for review and
          hardening.
        </p>
      </div>
    ),
  },
];

type Category = "all" | "basics" | "getting-started" | "prompting";

const categories: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "basics", label: "Basics" },
  { id: "getting-started", label: "Getting Started with Claude Code" },
  { id: "prompting", label: "Prompting & Workflow" },
];

function AccordionItem({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
        aria-expanded={open}
      >
        <span className="font-medium text-gray-900 pr-4">{item.question}</span>
        {open ? (
          <ChevronUp size={18} className="flex-shrink-0 text-indigo-500" />
        ) : (
          <ChevronDown size={18} className="flex-shrink-0 text-gray-400" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5 pt-1 text-gray-600 leading-relaxed border-t border-gray-100 bg-white">
          {item.answer}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filtered = useMemo(() => {
    return faqItems.filter((item) => {
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;
      const q = search.toLowerCase();
      const matchesSearch =
        !q ||
        item.question.toLowerCase().includes(q) ||
        (typeof item.answer === "string" && item.answer.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-50 to-white border-b border-gray-100 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Got questions? We have the short version. You&apos;re here to build, not to read documentation. We&apos;ve collected the most common curiosities from the 1stVibe community to help you clear the &ldquo;server talk&rdquo; and get back to the &ldquo;ah-ha&rdquo; moment. If you don&apos;t see what you need, just ask—the shift is here, and we&apos;re in it with you.
          </p>

          {/* Search */}
          <div className="relative max-w-xl mx-auto">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search questions…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white shadow-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
          </div>
        </div>
      </section>

      {/* Tabs + Accordion */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg font-medium mb-2">No results found</p>
            <p className="text-sm">Try a different search term or browse all categories.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((item) => (
              <AccordionItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
