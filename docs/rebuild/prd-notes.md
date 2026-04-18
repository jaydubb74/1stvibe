# 1stvibe Rebuild — Product Definition

> 1stvibe.ai is a paid ($39), AI-coached learning experience that takes a non-engineer professional from "I've heard of vibe coding" to "I shipped a live deployed website I built myself" in a focused 4–6 hour weekend. The product competes with hosted AI builders (Lovable, v0) on **coaching quality** rather than output quality — six specialized AI teammates walk the user through product distillation, dev ops, design, engineering, build, and go-to-market, producing a deployed website with the user's own code, on GitHub, on Vercel. Defensibility comes from a data flywheel: every conversation makes next week's teammates sharper.

**Last updated:** 2026-04-18
**Status:** pre-launch product definition; active design doc for the rebuild
**Companion doc:** [persona.md](./persona.md) — full target archetype ("Morgan the AI-Curious Pro")

---

## Contents

1. [Strategic Foundation](#1-strategic-foundation)
2. [Commercial Model](#2-commercial-model)
3. [User Journey](#3-user-journey)
4. [AI Teammate System](#4-ai-teammate-system)
5. [Curriculum System](#5-curriculum-system)
6. [Platform Integrations](#6-platform-integrations)
7. [Engagement, Gallery, and Community](#7-engagement-gallery-and-community)
8. [Telemetry, Admin, and the Data Flywheel](#8-telemetry-admin-and-the-data-flywheel)
9. [Launch Scope (v1)](#9-launch-scope-v1)
10. [Archive & Rollback Strategy](#10-archive--rollback-strategy)
11. [Parked Questions & Open Items](#11-parked-questions--open-items)

---

## 1. Strategic Foundation

### 1.1 Sacred commitments (locked)

- **Brand, colors, typography, voice: unchanged.** Burnt Orange `#D35400`, Amber accent, DM Sans + Open Sans, friendly-coach voice. All carried forward from v1.
- **Target customer.** AI-curious-but-not-AI-fluent professionals with an expense-authority job. See [persona.md](./persona.md).
- **North star metric.** Users who complete the program and ship a first vibe-coded project they can show their friends.
- **Business model ambition.** Bootstrap a meaningful side-income service. Explicitly *not* a VC-backed billion-dollar play. This shapes every scope decision toward "high-value for a small group" over "scale at all costs."

### 1.2 Differentiator vs. competitors

1stvibe competes with two adjacent categories:

- **Hosted AI builders** (Lovable, v0, Bolt, Replit Agent) optimize for the *generated artifact.* We optimize for the *human who came in with a vague idea and leaves with a shipped thing and a new skill.*
- **AI-upskilling courses** (Maven cohorts, Stanford Continuing Studies, Coursera Vibe Coding Essentials, Udemy) teach *about* tools. We put the user *through* actually building with them, coached by specialized AI teammates.

### 1.3 The uniquely-taught skill: problem distillation

Most of our target audience has never translated a real-world problem into a feature plan. That's a *product* skill, not a coding skill. The AI teammates — especially POE, the Product Teammate — exist to coach that translation. Hosted builders assume you know what you want and just need HTML. We assume you know you have a problem and help you get to a shippable spec.

### 1.4 The moat: data flywheel

Every AI teammate conversation, every artifact produced, every success and abandonment, every gallery engagement signal feeds back into making the teammates sharper for future users. The moat compounds with each user, including ones who don't complete. Operationalized via a weekly ritual ([§8.4](#84-the-weekly-ritual)).

---

## 2. Commercial Model

### 2.1 Pricing

- **Working price: under $50. Gut pick: $39.** Range to A/B test at launch: $29 / $39 / $49.
- **One-time payment, no subscription, no trials.** Matches the one-and-done business model.
- **No comp codes in v1.** Flat price for everyone. Promo / referral / influencer codes are a future lever.

**Strategic rationale — optimize for the referral funnel, not the cold funnel.** Our #1 purchase trigger is social FOMO ("coworker shared a link to their shipped project"). In a warm-referral funnel, the endorsement *is* the legitimacy signal — so price should be minimum-friction. Cold-landing premium-pricing data (Maven's 50-100% conversion lift at $950+) doesn't apply because cold-from-ads is at most our tertiary channel. Optimizing for premium positioning would slow the viral flywheel that is the actual business model.

**What sub-$50 buys us:**

- No-approval expense at virtually every US employer (well under typical $500–$1,000 manager-approval thresholds)
- No hesitation on warm referral — decision in <30 seconds
- Flywheel velocity: low price → more customers → more shipped projects → more "look what I built" posts → more referrals → more data → smarter teammates

**Tradeoffs accepted:**

- Thin per-user margins (~$30 net at $39 after LLM + processing + infra). Business works only at volume.
- Positioned closer to Udemy than to Stanford / Maven. Free Phase 1 sample ([§3.2](#32-phase-1-spark-pre-paywall-free)) must punch above the price to reset expectations.
- No headroom for premium without stratification (advanced courses, team SKUs).

**Ratchet up, not down.** Pricing is easier to raise after launch than to lower. Low price also cushions v1 rough edges — a $39 product with polish gaps generates curiosity; a $199 product with the same gaps generates resentment.

### 2.2 Expense-first positioning

"Professional skill development" — expensable as training. The expense narrative is load-bearing, not ornamental. Supported as a first-class feature:

- Explicit expense framing throughout the payment flow
- Clean, professional receipt line item
- Branded PDF receipt
- **Expense email alias** for modern expense platforms (Expensify, Ramp, Brex, Concur, Navan, Airbase — users just CC the alias)
- **Forward-to-manager button** with pre-drafted heads-up template
- **Completion summary PDF** at graduation (time invested, skills developed, deliverable) — for performance reviews, LinkedIn, secondary expense justification

### 2.3 Money-back guarantee (v1 is manual)

Promise stays in promotional copy. Refunds handled manually via Venmo or check — no built refund flow for v1. Expected volume low; manual is sustainable at launch scale. Proper refund infrastructure is v2 when volume justifies.

### 2.4 Payment flow

**Checkout surface:** embedded Stripe Checkout in the main panel (not redirect). Triggered by State 4 teammate-initiated takeover ([§4.2](#42-teammate-ux-states)) at end of Phase 1 Spark. No navigation away from 1stvibe.com.

**Payment methods (v1):**
- Apple Pay / Google Pay / Link (one-click, dominant for mobile + Chrome)
- Card (fallback, all browsers)
- Skipping ACH, BNPL, international wallets for v1

**Expense alias input — post-payment, not during checkout** (to preserve conversion momentum). Small optional field on the post-payment transition screen; autocomplete common platforms; stored on user record; editable later in Settings.

**Receipt design:**
- Subject: *"1stvibe receipt — ready to expense"*
- Line item: *"1stvibe Professional Development Course — AI-Assisted Software Development Skills — $39.00"*
- PDF attached (branded) for upload-based platforms
- Forward-to-manager button with pre-drafted template

**Post-payment UX:** no interstitial confirmation screen. Celebratory moment ("You're in. DOT's going to help you get set up."), checklist updates, Phase 2 begins.

**Edge cases:**
- Payment fails → Stripe's native error UI → POE stays present, reassures, offers retry
- Browser closed mid-payment → resume at paywall with spark spec intact
- Duplicate payment → Stripe idempotency keys prevent

**Technical:**
- One-time Stripe "price" (not subscription product)
- Webhook `checkout.session.completed` → account upgraded to paid status
- Stored on user: `paid_at`, `stripe_customer_id`, `stripe_payment_intent_id`
- Settings → Receipts page shows history

### 2.5 Future commercial levers (post-v1)

- Team SKUs for managers buying for direct reports
- Advanced courses (scope driven by graduation kit engagement signals — see [§3.10](#310-completion--graduation))
- Referral / sponsorship revenue from platform partners (Vercel, Cloudflare, GitHub, Anthropic, domain registrars — each has some partner program worth exploring)

---

## 3. User Journey

The journey is sequenced **iteratively, not waterfall**, to bring Morgan's first ah-ha moment to ~90 minutes in. A waterfall (Product → Design → Engineering → Dev Ops → Build → GTM) would defer ah-ha to ~3 hours in — Morgan paid $39 and spent two hours answering questions without seeing anything. The iterative sequence interleaves planning and building so she sees her idea working before the doubt window opens.

### 3.1 Discovery & landing

**V1 scope: cut referral infrastructure.** Focus on core learning experience first. Homepage (conversion-oriented) is the primary landing page for v1. Metadata-encoded referral links, gallery-project-elaboration landing page templates, and personalized cold-traffic landings are all deferred to v2.

### 3.2 Phase 1 Spark (pre-paywall, free)

POE (Product Teammate) runs Phase 1 free, ~15-20 min, producing `01-project-spark.md`. There is no separate "Greeter conversation" — Phase 1 Spark *is* the pre-paywall sample. Paywall fires at the end of Phase 1.

**Registration forced at start of Phase 1.** Morgan signs up with email (Auth.js magic link) before POE says anything real. Her account exists from first turn; spark spec saves to it regardless of conversion.

**Conversation arc (~15-20 min):**

- **Opening (2-3 min):** POE introduces itself. Generic opener: *"What brings you to 1stvibe — something at work driving you crazy, a side idea you've been kicking around, or just curious about this vibe coding thing?"* First motivation signal logged.
- **Discovery (5-7 min):** mostly structured choices to minimize token spend. Role pick from 6 launch roles + "other" (loads role config). Project frame via structured choices (self/team/customer, work/personal). Free-form idea intake (chat, image upload, link drop).
- **Shaping (5-7 min):** POE does heavy lifting per the collaboration model ([§4.3](#43-collaboration-model-heavy-lifting-with-user-owning-the-calls)). "One thing" anchor question, user-journey probe. POE drafts the spark spec in real-time. Morgan sees it materialize (visible artifact materialization — see engagement mechanics [§7.1](#71-engagement-mechanics)).
- **Close (2-3 min):** POE presents the finished spark spec with celebratory treatment. Warm pitch: *"This is your starting point. In the next ~5 hours, we can build this into a live site on the internet. It's $39 — your employer can almost certainly expense it. Ready?"* Stripe checkout expands. On success: Phase 2 begins.

**Cost tolerance:** Phase 1 for non-converters costs ~$0.10-$0.15 in LLM. At 10% conversion, ~$1-$1.50 per paying customer on free-tier spend. Acceptable at $39.

**Referral context deferred to v2.** Phase 1 is generic for launch. Future: encoded referral links give POE context (referring friend + gallery project clicked), possibly via cookie for non-referral visitor details.

**Non-converter path:** spark spec saves to account; engagement flow activates (24hr/3d/7d emails with spark as hook); Morgan can return, re-read/tweak spec without repaying (locked artifact, no regeneration cost); Phase 2 requires payment.

### 3.3 The paywall moment

See [§2.4 Payment flow](#24-payment-flow) for full detail. Key UX properties: embedded in the main panel (no navigation away), POE stays present during checkout, post-payment transitions straight into Phase 2 with no interstitial.

### 3.4 Phase 2: Set Up (dev ops choreography)

**~45-minute target.** The highest-execution-risk phase in the product. Marty quit at dev ops. Ashley stalled here. Real coaching sessions have gone 1-2 hours without scaffolding. The 45-min design depends on: starter template repo, deep-linking everywhere, opinionated defaults, read-only GitHub App install.

DOT runs Phase 2. BEA joins mid-phase.

**Step 1 (0:00–5:00): Welcome + preview.** DOT appears in main panel (State 1), introduces itself, shows Morgan a one-screen preview of what's ahead ("5 things, 5 checkboxes, ~45 minutes"). Reduces anxiety.

**Step 2 (5:00–10:00): GitHub account.** New users: DOT guides through GitHub signup with deep-links and pre-filled fields. Existing users: sign in, 30 seconds. DOT doesn't ask Morgan to "understand GitHub" — one-line explanation: *"this is where your code lives online."*

**Step 3 (10:00–20:00): Create repo from 1stvibe template + install GitHub App.** Template is the 1stvibe starter repo (Next.js + Tailwind + `/.1stvibe/` scaffold, our opinionated defaults). Deep-link to GitHub's "Use this template" flow with repo name pre-filled. Install the 1stvibe GitHub App on the new repo — **read-only permissions at this step** (write upgrade happens later at artifact-mirror consent). DOT's narration is 1-2 sentence bites, optional to read deeply.

**Step 4 (20:00–30:00): Install Claude Code + 1stvibe Skill pack.** Download Claude Code desktop from Anthropic. Deep-link to Claude Code auth. One CLI command: `npx 1stvibe-skills install` installs BEA's Skill pack and our MCP server into Morgan's Claude Code. BEA appears in her terminal Claude Code with an introductory message. DOT walks through each step with screenshots.

**Step 5 (30:00–40:00): Vercel connect + first deploy.** Sign in to Vercel with GitHub (inherited identity, no separate password). Import the 1stvibe template repo into a Vercel project (one click from guidance). Vercel auto-deploys the template — within 90 seconds, Morgan has a live URL with the starter page. **This is a mini-ah-ha before she's built anything of her own** — reinforces confidence.

**Step 6 (40:00–45:00): Localhost running + first preview.** Clone the repo locally (Claude Code handles via a prompt with BEA's coaching). `npm install && npm run dev`. Localhost serves the starter page. DOT and BEA together: *"You're set up. Let's go build your actual idea."* Phase 3 begins.

**Fallback paths:**

- **Corporate laptop blocks Claude Code install** → DOT detects early ("try installing, tell me if it fails") and falls back to **Claude.ai web** — reduced experience, but not blocked.
- **GitHub / Vercel auth friction** — DOT explains upfront that external tools control their own signup UX; offers screenshots and stays with Morgan if she gets lost.

**Load-bearing design decisions:**
- Starter template repo is essential. Without it, Morgan is scaffolding from scratch and Phase 2 bloats to 2+ hours.
- Read-only GitHub App at install. Write permission requested later at artifact-mirror consent — less scary initial install.
- Template pre-deploys to Vercel before Morgan writes any code. Live-URL moment at ~35 min in.
- BEA's arrival in Claude Code is the handoff into Phase 3 — Morgan meets BEA in her terminal first.

### 3.5 Phase 3: First Build (the ah-ha moment) — ~30-45 min

BEA (Build Partner) takes the lead; POE may cameo. Morgan writes her first real Claude Code prompt based on the spark spec. Something recognizable as *her idea* renders on localhost within 30-45 min.

**🎯 AH-HA MOMENT — approximately 90 min into the paid experience.** Celebratory treatment, milestone marker, checklist tick. This is the $39-doubt-window closer.

### 3.6 Phase 4: Scope — ~30-45 min

POE returns via visible handoff. Now that Morgan has *seen* something of hers work, the fuller feature breakdown is grounded in reality, not theory. Produces `02-requirements-backlog.md` and `03-mvp-scope.md`. MVP steering rules ([§4.5](#45-mvp-steering-poes-specific-job)) apply aggressively.

### 3.7 Phase 5: Design — ~60-90 min

DAX and BEA work as a pair. Morgan makes visual decisions (colors, mood, layout, persona) and BEA iterates them live with Claude Code — Morgan sees each choice render. Produces `04-design-notes.md`.

### 3.8 Phase 6: Build Out — ~60-90 min

BEA continues; ED (Engineering) consults when architecture decisions warrant. Most projects don't need ED. Features ship one by one via Claude Code. Produces optional `05-architecture-notes.md` for decisions that matter.

### 3.9 Phase 7: Ship & Share — ~30-45 min

DOT handles final Vercel deploy. GAL (GTM) drafts the launch post, LinkedIn copy, share flow. Gallery publish happens here (opt-in). Morgan hits celebration moment → wrap-up email sent → completion kit delivered.

**Total: ~4-5.5 hours. First ah-ha at ~90 min. Subsequent mini ah-ha's at Phase 5 (design renders live), Phase 6 (features ship), Phase 7 (live on the internet).**

Not all phases required for every project type. Anthony's internal tool (pure ops utility) needs no GTM phase — Phase 7 compresses to deploy-only.

### 3.10 Completion & graduation

**Completion = shipping, not curriculum.** See [§5.4](#54-completion-model-shipping-not-curriculum).

**V1 completion ritual (intentionally minimal — graduation kit deferred to v2):**

- Celebration screen / animation at graduation moment
- Pre-drafted LinkedIn post (one-click share with screenshot)
- Auto-publish to gallery (opt-in)
- Short "thanks for building with us" note
- **Wrap-up email** to Morgan: summarizes her journey (what she built, artifacts produced, time spent), links to her live URL + gallery page, delivers a curated set of pro-tips for continued building. Natural graduation-kit embryo for v1.
- **Completion summary PDF** alongside the wrap-up email (for performance reviews, LinkedIn, expense justification)

**The richer graduation kit is v2.** Strategic role: graduation kit is a *signal-collection layer for future advanced-course revenue.* What grads gravitate toward tells us which advanced courses to build. Parked items include Linear workspace auto-creation, advanced technique pointers, continued-learning resources, course upsells.

### 3.11 Engagement & re-engagement

Three distinct abandonment points, each with its own flow. Ship at launch, refine with real data.

**Abandonment A — Registered but didn't pay.** We have email + spark spec. Hottest lead we'll ever have.

- 24hr email: *"Your [project name] is ready to start. Here's where we left off: [summary]. Take another 10 minutes?"*
- 3 days: *"Another 1stviber built something close to what you described: [gallery link]."*
- 7 days: *"We're here whenever you're ready. Your brief is saved."*
- 14 days: optional polite final check, then stop.
- Every email references her specific project, never generic.

**Abandonment B — Paid but didn't finish.** We have rich state (commits, Vercel events, phase, last active).

- Silent in-product check-back on next return (per [§5.4](#54-completion-model-shipping-not-curriculum))
- 48hr phase inactivity: no nudge. Life happens.
- 7 days zero activity: state-aware email. *"Your project has [working localhost, no deploy yet]. The Vercel step is 20 minutes. Ready?"*
- 30 days: *"Your project is paused. We're here whenever."*
- Never: *"N steps left!"* pressure.

**Abandonment C — Completed but didn't share / didn't return.**

- Graduation moment: prompted share + pre-drafted LinkedIn post + Twitter text + email-to-manager template + gallery auto-publish
- 1 week: *"Your project had N views this week. See who stopped by."*
- 1 month: agent-led living-gallery interview (fast-follow v2 feature)
- 3 months: *"Ready for round 2? Here's what peers from your cohort are building next."*

**Channels:** email primary, in-product notifications on return. No push. No SMS.

**Volume discipline:** max ~1 retention email per 48hr; every email references her specific project; one-click unsubscribe; slow cadence on engagement.

---

## 4. AI Teammate System

### 4.1 Teammate roster

All-caps acronym handles — deliberately reads as "clearly AI, not a person." Avoids anthropomorphic baggage. Reinforces the AI-teammate positioning.

| Role | Name | Expansion |
|---|---|---|
| Product Teammate | **POE** | Product Optimization Expert |
| Design Teammate | **DAX** | Design And eXperience |
| Engineering Teammate | **ED** | Engineering & Development |
| Dev Ops Teammate | **DOT** | Dev Ops Tutor |
| Build Partner | **BEA** | Build Experience Associate |
| GTM Teammate | **GAL** | Growth Audience Launch |

**POE** is persistent through scope-relevant moments: greets pre-paywall (Phase 1 Spark), returns in Phase 4 (Scope), and consults during build phases when scope questions arise.

**BEA is persistent through the build phases** (3, 5, 6). Not a single-phase specialist. Coaches on Claude Code interaction — prompt-crafting, reading output, debugging, pro-tips in context. Present in the 1stvibe web UI *and* in Morgan's Claude Code via the Skill pack (same identity, same session memory in both places).

Handoff dialogue reads cleanly: *"Nice work with POE. ED's going to join you now for some architecture questions."*

### 4.2 Teammate UX states

The teammates don't take over the UI — they appear in the main panel at specific moments and otherwise live as a floating icon. The content is the lesson; the teammate is the coach who joins when it matters.

**State 1 — Lesson open.** Teammate appears *in the main panel* as a chat. Introduces themselves, asks personalization questions to adapt the lesson to Morgan's project. Morgan's attention is on the teammate.

**State 2 — Lesson body.** Teammate tells Morgan *"I'll be here — click anytime to ask me something"* and collapses to an out-of-the-way floating icon. Main panel reclaims focus for content.

**State 3 — Icon alive.** Icon pulses / animates at meaningful moments:
- Morgan returns from Claude Code / Vercel / GitHub (detected via integrations) → gentle pulse
- Idle detection → pulse after N minutes
- Contextually relevant pro-tip available (especially BEA during build phases)
- Signal from CLI / MCP / partner webhooks (Vercel build failed → DOT pulses; new commit → BEA pulses)

**State 4 — Re-insertion / expansion (two modes):**
- **User-initiated:** Morgan clicks icon → teammate expands as a floating chat bubble. Quick Q&A. Main panel stays.
- **Teammate-initiated at key moments:** teammate re-inserts into main panel (takeover). Triggers: decision points requiring input, artifact production / review, phase handoff, major milestone, error-state coaching.

**State 5 — Lesson close.** Teammate re-emerges in main panel to wrap up, present the artifact/markdown, hand off to next teammate. Checklist item ticks with celebratory treatment. Next teammate State 1 begins.

**Why this model:** solves the tension between "teammates are the differentiator" (must be present + proactive) and "content is the lesson" (can't dominate). Morgans who want self-directed building breeze through with minimal chat. Morgans who need conversation get proactive engagement at the right moments. Protects margin — napkin: ~30-50 meaningful turns per user at ~2k tokens ≈ $0.40-$0.80 API cost. Over-engaging (150+ turns) would eat meaningful margin.

### 4.3 Collaboration model: heavy lifting with user owning the calls

We explicitly reject the Khanmigo / Scrimba / Duolingo "no cheating" model. That framework is built for contexts where articulating the reasoning yourself IS the point (a student learning algebra). 1stvibe's constraints are different:

- 4-6 hour envelope can't absorb Morgan articulating product briefs, design rationales, launch copy from a blank page.
- Morgan has *judgment* (knows what she likes, can answer yes/no, pick between options) but doesn't have *vocabulary* or *structural knowledge* to draft product work from scratch.
- Our competitive position is "shipping a thing Morgan is proud of in 4-6 hours," not "Morgan mastered product management vocabulary."

**Principle: teammates do the heavy lifting; the user owns the calls.**

- Teammates **draft the artifacts** (project brief, backlog, design notes, architecture plan, launch post). In their voice. Based on Morgan's cues.
- Morgan **drives via structured input**: yes/no, pick-between-three, "more like this, less like that," uploaded images, link drops. Free-form chat always available as escape hatch.
- Her signature, not her typing. She reviews, tweaks if she wants, approves. Outcome is hers because she made the calls — not because she wrote the words. Analogy: a great consultant-client engagement.

**Where the user still does the work directly:**

- **Hands-on dev ops clicks.** DOT is especially in control — walks Morgan through every step with scaffolds and screenshots — but Morgan's fingers make the clicks. The doing *is* the confidence-building moment.
- **Prompting Claude Code.** BEA coaches on prompt-crafting, reading output, pushing back. This is the one place where Morgan articulating intent to an AI *is* the skill being taught. Learn by doing.
- **Strategic decisions throughout.** Teammates offer options; Morgan decides.

**What the teammates never do:**
- Replace Morgan's judgment or preferences.
- Push a scope Morgan doesn't want (MVP-pushing is recommended, not imposed).
- Write the actual application code (that's Claude Code's job).

**Input modalities supported:** structured choices (yes/no, multi-select, pick-between, likert), free-form chat, image upload, link drops.

### 4.4 Visible phase handoffs + invisible within-phase consultation

- **Phase transitions are visible.** Small ceremony: retiring teammate wraps with a summary and the "review of what you just did" transitional (which also doubles as generation cover for the next lesson's content). Introduces the next teammate by name and role. Hands off. Checklist item ticks with celebratory treatment.
- **Within-phase consultation is invisible.** If DAX needs to sanity-check feasibility with ED mid-conversation, that's a background tool call. Morgan sees DAX synthesize the answer, not the mechanics.

### 4.5 MVP steering: POE's specific job

The hardest coaching problem. If POE lets Morgan build everything she wants, we become yet another AI builder that shipped bloat. If we refuse too hard, we become annoying. Classic PM managing stakeholders.

**Techniques POE uses:**

1. **"Yes, and..." as default.** Never say no. Backlog is how we say "yes, later." Framed as **her v2 roadmap** — what she'll build next weekend with Claude Code on her own.
2. **The "one thing" anchor.** Early question: *"If your project did ONE thing extraordinarily well, what would it be?"* Single-sentence reference for every scope-creep moment.
3. **Time-as-currency framing.** *"This adds ~90 minutes. You've got ~4 hours of MVP budget left. Worth it, or save for v2?"*
4. **Reference-product leverage.** *"Is there a product you've used that has this? Would you ship today with just the parts you love, or the whole thing?"* Usually reveals she doesn't want the whole thing.
5. **User-journey scope filter.** *"Walk me through your user's experience. What MUST happen in that flow?"*
6. **Scope defense at phase handoffs.** Spec is locked when leaving the Product phase. Scope changes in Design require conscious return to POE.

**When to push vs. yield (the delicate rule):**

Push back when:
- She can't articulate a clear reason ("I just think it would be cool")
- She's hedging ("maybe we should...")
- Feature needs a module we're not covering in 6 hours (auth, payments, realtime)
- She's already extracted 2+ yields this session

Yield when:
- She names a specific reason it matters to her or her user
- She's definitive ("I need this")
- She's explicitly accepting the time cost
- She's gone back and forth and is still convinced — settled judgment, not indecision

**Name the yield when it happens.** *"OK — adding this means ~7 hours instead of 6. Still in?"* Preserves agency, licenses future pushback.

**Concrete session state POE maintains:**
- `one_thing` — the anchor sentence
- `mvp_features` — in-scope list (soft cap ~5-7)
- `backlog` — everything deferred, visible to Morgan as her v2 roadmap
- `time_budget_remaining` — decrements per feature added (internal to POE; no user-facing meter)
- `yields_granted` — counter triggering extra pushback above 1-2

### 4.6 Pro Tips module & in-context delivery

Dedicated ~15-min module between Phase 2 (Set Up) and Phase 3 (First Build). Delivered by BEA.

**Purpose:** vocabulary and confidence before prompting Claude Code for real. Addresses the "Claude Code learning curve → frustration → abandonment" risk directly.

**Content (seed list from Mike, expand via web research):**
- Screenshot error messages and paste them to Claude Code for debugging
- Start prompts with context
- Ask for small changes, not large ones
- Read the output before accepting
- Use git commits as checkpoints
- Ask Claude Code to explain what it's about to do before it does
- "Skeptical review" — ask Claude Code to critique its own output
- Break large tasks into smaller ones

**Two delivery surfaces:**
1. **Module** — intro lesson between Phase 2 and Phase 3. Top 8-10 pro-tips covered upfront.
2. **In-context reinforcement** — BEA drops specific pro-tips contextually. Screenshot pro-tip when Morgan hits her first error. "Ask Claude to explain first" when she seems tentative. Each delivery grounded in what just happened.

Web research on additional pro-tips to be done as a separate task once architecture round is locked.

### 4.7 Implementation: Skills + lightweight orchestration

**Primitive: each teammate is an Anthropic Skill** — a folder with `SKILL.md` (instructions, personality, behavior rules), optional helper scripts, declared tools, artifact templates. Versioned in our git repo, human-editable.

**Why Skills over alternatives:**

- **Plain prompt:** can't maintain session state reliably. Fragile, hard to version, awkward for tool use.
- **LangGraph / CrewAI / AutoGen:** overkill. Our flow is linear with occasional branches; full orchestration frameworks add complexity and lock us to abstractions.
- **Skills:** markdown-first so iteration is fast; portable across API / Claude.ai / Claude Code; tool use is first-class; each teammate is its own folder so they compose cleanly.

**Orchestration layer (we build, no framework):**
- Routes user input to the currently-active teammate Skill
- Manages phase transitions, fires visible handoff UX
- Injects session state + artifact history into active Skill's context each turn
- Updates left-panel curriculum checklist on phase completion
- Stores conversation history, session state, artifacts in our DB (canonical)
- Mirrors artifacts to user's GitHub repo via the App (see [§6.8](#68-artifact-storage--mirroring))

Size: a few hundred lines of code; no framework, testable in isolation.

**Portable BEA into Claude Code.** Because Skills are portable, BEA installs into Morgan's Claude Code during Phase 2 (one CLI: `npx 1stvibe-skills install`). From that moment, Morgan's Claude Code knows BEA is present, can read her artifacts (mirrored to her repo), can update her backlog (via our MCP server), and coaches in her terminal with the same personality and session memory she's been interacting with on the web. Seamless bridge between learn-on-web and build-in-Claude-Code — delivered by native Skill mechanics, not custom plumbing.

---

## 5. Curriculum System

### 5.1 Dynamic bespoke content generation

**Curriculum is a set of bullet points, not static lesson pages.** Some bullets are negotiable, some non-negotiable — depends on module + project type. Each lesson's content is dynamically generated per user.

**Generation inputs:**
- Our curriculum bullets (the skeleton)
- Role config + project-type config + learned signals (see [§5.3](#53-config-data-model))
- Markdown artifacts from prior teammate conversations
- History of chats between Morgan and her teammates
- User's current GitHub / Vercel / Claude Code state

**Generation cadence: Just-in-Time.** Content for each lesson is generated when the user first lands on it, using all the above state as of that moment. Not upfront (stale, divergence-blind, wasteful on abandoners). Not continuous (expensive, jarring, premature).

**UX smoothing — transitional "review of what you just did" between lessons.** Retiring teammate wraps with a warm recap — doubles as pedagogical consolidation (spaced-recap) AND generation cover (~30–60 sec the user spends reading the review is when we generate the next lesson). Marries cleanly with the visible handoff ceremony.

**Browse-ahead policy:** clicking a future lesson shows the **default, unpersonalized curriculum skeleton** with a clear indicator: *"preview — personalized version will generate when you reach this lesson."* Saves generation cost on speculative browsing; preserves the "bespoke arrives as surprise" effect.

**Completed-lesson locking:** once a user progresses past a lesson, its generated content is **locked permanently** in our DB. Revisiting serves the exact cached version. Critical for trust (notes taken against specific content), continuity, and avoiding "wait, did this change?" confusion.

**Current-lesson refresh:** lightweight "refresh this lesson" button available inside an active (not yet completed) lesson — rarely used but empowering when Morgan has done significant work since landing on the lesson. Not available post-completion.

**Session state:** Lesson content states are `generating | active | locked`. Lock transition `active → locked` when user advances past lesson (irreversible). Cache: per-session for active lessons, permanent DB for locked lessons.

### 5.2 Phase structure

Seven phases, sequenced iteratively (see [§3](#3-user-journey)):

| Phase | Duration | Teammate | Artifact |
|---|---|---|---|
| 1. Spark (pre-paywall) | ~15-20 min | POE (Greeter mode) | `01-project-spark.md` |
| 2. Set Up | ~45 min | DOT + BEA intro | (no artifact — infrastructure) |
| 3. First Build | ~30-45 min | BEA | first working localhost |
| 4. Scope | ~30-45 min | POE | `02-requirements-backlog.md`, `03-mvp-scope.md` |
| 5. Design | ~60-90 min | DAX + BEA | `04-design-notes.md` |
| 6. Build Out | ~60-90 min | BEA + ED consult | `05-architecture-notes.md` (optional) |
| 7. Ship & Share | ~30-45 min | DOT + GAL | `06-launch-notes.md` |

Not all phases required. Config drives which phases emphasize / skip / extend (see [§5.3](#53-config-data-model)).

### 5.3 Config data model

The config is the spine of personalization, teammate behavior, project steering, and the data moat. Layered structure with clean separation between human-authored baseline and machine-learned signals.

**Layer 1: Role configs** — one YAML file per role. Contains: archetype notes, motivational textures, suggested project types, teammate tuning per role (tone, things to watch for, opening question additions, emphasis areas), common fears, common questions, gallery seed project IDs.

**Fallback Layer 1: `other / unclassified` role config** with broad archetype notes and neutral teammate tuning. Covers users whose role doesn't cleanly map to a launched one.

**Layer 2: Project-type configs** — one YAML file per project pattern (landing-page, lead-capture-form, internal-tool, dashboard, culture-survey, microsite, etc.). Contains:
- Feature building blocks (required / common / optional)
- **Suggested "delight" features** — cool things easy to pull off (confetti on success, dark-mode toggle, toast notifications, smooth scroll, typewriter hero, keyboard shortcuts, link-preview meta tags). High delight-to-effort ratio.
- Curriculum phase emphasis (which phases get more/less weight for this project type)
- Time-budget hints per phase
- Scope pitfalls
- Reference exemplars

**Fallback Layer 2: `personal-project` generic config** — deliberately broad. Handles passion projects without a specific match.

**Layer 3: Role × Project-type intersections** — sparse, opt-in. Only created when the pairing warrants special guidance. Seed sparingly at launch (marketing × landing-page, ops × internal-tool, HR × culture-survey); let the rest grow from learned data.

**Layer 4: Learned signals** — database, not YAML. Fed from real user interactions.

```
learned_signals
├─ role_id
├─ project_type_id
├─ signal_type  (common_question | common_pitfall | common_rabbit_hole | high_success_pattern | drop_off_point)
├─ content
├─ weight (occurrence count)
├─ first_seen / last_seen
```

Merged at runtime when building teammate prompts.

**Storage:**
- Layers 1-3: YAML in our git repo. Human-authored, versioned, updated via PRs. Mike + Josh as editors initially.
- Layer 4: database. Updated automatically from telemetry.

**Resolved design decisions:**
- **Role resolution for hybrid users:** ask them to pick one primary role. Simpler, more transparent, no config-blending weirdness.
- **Layer 3 seeding:** sparse at launch, grow from data.
- **Config visibility to Morgan:** invisible. She doesn't see "you're on the marketing × landing-page path." Personalization feels like "the teammates just get me." Admins (Mike + Josh) see configs; Morgan doesn't.

### 5.4 Completion model: shipping, not curriculum

**Completion is defined by shipping, not by curriculum.**

The finish line: Morgan has a live URL that does what she set out to build, and she's published it to the gallery. That triggers graduation delivery, celebration, north star metric increment.

Curriculum progress is a **path**, not a **requirement**. Curriculum could be half-done or overshot and she's still graduated if she shipped. She could check every box and not be graduated if she hasn't shipped.

**Operational implications:**
- **Session state supports pause/resume indefinitely.** Walk away 3 days, rehydrate on return. No "course expires" pressure.
- **Graduation triggers on deploy event + gallery publish.** Vercel webhook + gallery publish confirmation. Not a "finish the tutorial" button.
- **No partial graduation.** Shipped or not shipped. Curriculum completion % is a coaching signal for us, not a user-facing status.
- **Re-engagement is pull, not push.** Morgan left when she left. We're here when she's ready.

**Stuck-but-not-shipped case:** proactive check-back on next visit (not push notifications): *"Welcome back — want another crack at the deploy step? Here's where we left off."* DOT re-engages warmly, not impatiently.

### 5.5 Time commitment

**Design target: 4-6 hours total.** "A focused weekend" or "two evenings," not "work on it whenever." Fragmenting across weeks kills completion. "Greatness" is explicitly out of scope for v1 — our job ends when Morgan ships her first thing. Iteration and polish are her job after graduation.

**Dev ops budget cap: ~45 min.** See [§3.4](#34-phase-2-set-up-dev-ops-choreography).

**Watch for builder-bias:** if we're ever scoping past 6 hours, flag it as "designing for ourselves, not the user."

---

## 6. Platform Integrations

### 6.1 Multi-surface continuity strategy

**Decision: web-first learning environment, Chrome extension as complementary enhancement.** The primary paid UX lives at 1stvibe.com. The extension is an optional progressive-enhancement layer for installed users.

**Federation stack:**

- **GitHub App (primary)** — first-class actor identity ("1stvibe[bot]"), fine-grained per-permission install, short-lived tokens, webhooks for push / PR / create / delete events. 2026 best practice; replaces the earlier "add agent as collaborator" idea (legacy anti-pattern).
- **Vercel webhooks + API** — subscribe to `deployment.*` and `project.*` events. Native Integrations in the Vercel marketplace for two-way integration.
- **MCP server for Claude Code** — MCP crossed 97M installs by March 2026 and is the production default for Claude-client tool use. A 1stvibe MCP server is the cleanest way for Claude Code to see project / curriculum / artifact context.
- **Deep-link OAuth from web app** — zero-install baseline for federating user state from partner tools.
- **Chrome extension (optional, fast-follow v2)** — DOM-aware overlays on GitHub / Vercel / Claude.ai for users who install. *"Your PR just merged — here's what changed."* *"Your Vercel build is failing — here's why."* Never required; a delight, not a dependency.

**Why this over "extension-as-primary":** install friction at a $39 paywall is a brutal conversion loss (industry anecdote: 30-60% drop at install gate for non-technical users). Manifest V3 + quarterly Vercel UI restructures make extension maintenance a permanent tax. Chrome-first excludes Firefox/Safari/work-laptop users. The fragility concern that originally motivated extension-as-primary has inverted — in 2026 the API/webhook/MCP stack is production-mature; the extension is now the fragile layer.

### 6.2 Recommended stack

We explicitly recommend and coach on one stack. Users can go off-road, but the money-back guarantee only applies on the recommended path.

- **Machine:** Mac (initially — Windows / Linux are graduation-era)
- **AI coding agent:** Claude Code
- **Code host:** GitHub
- **Hosting / deploy:** Vercel (Cloudflare Pages as a secondary option)
- **Domain:** TBD — pick one registrar partner based on affiliate economics

**Off-road policy:** *"Our AI coaches will do their best to help you if you use a different platform, but our 4-6 hour completion target and money-back guarantee only apply on the recommended stack. We can't promise the same experience off-path."*

**Referral / sponsorship upside:** Each recommended platform has a partner / referral program or the beginnings of one. Real incremental revenue stream for a bootstrap business — every cohort that ships has also spun up GitHub, Vercel, a domain, a Claude Code subscription at our recommendation.
- Vercel: established partner program
- Cloudflare: partner program
- GitHub: less affiliate-friendly but partnership-possible
- Anthropic: worth exploring given net-new AI-coding-curious professionals we generate
- Domain registrars: pick a Namecheap / Porkbun / etc. partner

### 6.3 GitHub App

**Permissions model:**
- Initial install at Phase 2 asks `contents: read` + `metadata: read` only (less-scary permission screen)
- Upgrade to `contents: write` requested at the moment Morgan opts into artifact mirroring, with explicit context
- Write scope limited to `/.1stvibe/` — we never touch application code files
- Webhook subscriptions: `push`, `pull_request`, `create`, `delete`

**Trust UX pattern** (following Dependabot / Graphite / Renovate norms): clear "what we read, what we write, what we never touch" preamble before install. Deep-link to install URL with target repo pre-scoped.

### 6.4 Vercel webhooks + API

Subscribe to `deployment.*` and `project.*` events. Used for: deploy-detection (north star graduation trigger), build-failure coaching cues (DOT's icon pulses), live-URL updates for gallery.

### 6.5 MCP server for Claude Code

A 1stvibe MCP server serves as the Claude Code surface for: reading curriculum state, reading user artifacts, updating the backlog, reading learned signals. Installed alongside BEA's Skill pack via `npx 1stvibe-skills install`.

### 6.6 Template repo

**The 1stvibe starter template is load-bearing for the 45-min dev ops budget.** Without it, Morgan scaffolds from scratch and Phase 2 bloats. With it, she customizes.

**Template contents:**
- Bare Next.js + Tailwind project with our opinionated defaults
- `/.1stvibe/` directory scaffolded and ready to accept artifact mirrors
- README stub with "Built with 1stvibe" credit
- Sensible `.gitignore`, `package.json`, deploy config

**V1 scope:** one canonical template for all users. Multiple templates per project type (landing-page vs. internal-tool vs. microsite) is a fast-follow if the need is clear.

### 6.7 Chrome extension (fast-follow v2)

Optional progressive-enhancement layer. DOM-aware overlays on GitHub / Vercel / Claude.ai that installed users benefit from. Out of v1.

### 6.8 Artifact storage & mirroring

Each teammate conversation produces a markdown artifact (project brief, requirements backlog, design notes, architecture decisions, GTM plan) that other teammates can reference.

**Canonical storage: 1stvibe's database.** Always. Every artifact is first-class data in our system — queryable, versioned, feeds telemetry and the data moat. We never depend on a remote source we don't control.

**Default-on mirror to the user's GitHub repo.** Via the GitHub App, written to `/.1stvibe/`. Filenames numbered + descriptive (`01-project-spark.md`, `02-requirements-backlog.md`, etc.).

**Why mirror to the repo:**
- **Claude Code native file access.** When Morgan is in Claude Code locally, artifacts are plain files on disk. `cat product-brief.md` works. Big UX win for the engineering phase.
- **Organic promotion.** Each shipped project carries visible "Made with 1stvibe" evidence in its git history. Potential README section (with consent): *"Built with 1stvibe — [Product brief](./.1stvibe/01-product-brief.md) · ..."*
- **User transparency.** She can see what the teammates have captured.

**User controls:**
- Opt-out checkbox at install time ("don't mirror to my repo")
- Settings: change subdirectory name, change target branch
- One-click "remove all 1stvibe mirrored files" emergency exit
- Mirror is a convenience; disabling doesn't break the product

---

## 7. Engagement, Gallery, and Community

### 7.1 Engagement mechanics

We explicitly reject Duolingo-style streaks / XP / leagues / gems / badges. Wrong persona (adult professionals who paid $39 read this as childish), wrong time model (4-6 hour one-time experience, not daily habit). Adults want evidence of skill, not participation trophies.

**Core engagement mechanics in v1:**

- **Visible artifact materialization.** Each teammate-produced markdown appears in the experience with a small celebratory treatment. Tangible, skill-evidence-oriented.
- **Curriculum step progression.** Left-panel checklist checks off with visual celebratory treatment on each tick. Primary visible progression mechanic.
- **Milestone celebrations** at real inflection moments: GitHub repo created, 1stvibe App installed, first Claude Code working output, first localhost preview, first Vercel deploy, site goes live, project published to gallery. Short animations, warm language.
- **Feature-shipping progress** within build phases. MVP features tick off a smaller list as built.

**Internal-only time tracking:** POE tracks time internally as scope-negotiation currency ("this adds ~90 min"). Lives in conversation, not UI chrome. No persistent time meter.

**Explicitly not shipping:** streaks, XP, leaderboards, badges, "come back tomorrow" reminders.

### 7.2 Retention flows

See [§3.11 Engagement & re-engagement](#311-engagement--re-engagement) for the three abandonment-point flows (registered-didn't-pay, paid-didn't-finish, completed-didn't-share).

### 7.3 Gallery v1 (minimalist)

- Gallery index — browse projects
- Individual project page — screenshot, AI-generated summary, live URL link, "Made with 1stvibe" credit, builder name
- Like + share (LinkedIn / Twitter / copy link)
- Basic builder profile page
- Static scrape of repo README + screenshot at publish time

### 7.4 Living gallery (fast-follow v2)

Gallery entries tied to the **live deployed URL**, evolving with zero effort from builders.

- Auto-crawler periodically pulls live site, captures visual / structural / copy changes, summarizes evolution
- Agent-led founder interviews: light-touch "what did you add? any gotchas?" — feeds gallery narrative AND data moat
- Gallery entries become living case studies, differentiator vs. any static showcase
- Feeds acquisition: evolving entries more compelling for social FOMO than static snapshots

### 7.5 Cohort-lite (fast-follow v2)

Research finding: cohort-based learning shows ~85% completion vs. 3-15% self-paced. Too large a delta to ignore. True cohorts (fixed start dates, live sessions) would kill "ship when you have a weekend" convenience. **Cohort-lite captures most of the value without the scheduling constraint.**

Users who start the same week are silently grouped into a pod. Morgan sees:
- *"You started this week with N other 1stvibers."*
- Gentle comparative progress — *"You've done X compared to them."* Not leaderboard-style.
- Aggregate activity — *"Collectively you're building 3 landing pages, 10 internal tools, 20 others."* Non-competitive, shared purpose.
- *"Check out what they're working on"* with link to in-progress gallery.

Zero forced interaction; just social visibility. Opt-in on name display.

### 7.6 Linear integration — graduation gift (v2)

Linear is not part of v1. Deferred to v2 with the rest of the graduation kit.

**Planned v2 shape:** one-click "spin up my Linear workspace" at graduation. Auto-creates a free Linear workspace pre-populated with the requirements backlog as tickets — context from artifacts, acceptance criteria inferred from user-journey walkthrough, priority inherited from scope negotiations, links back to GitHub repo and live site.

**Why v2, not v1:** adds dev ops budget; markdown backlog has enough structure for coaching and Claude Code execution; requiring another tool dilutes "minimum credible setup" positioning. Right moment is post-graduation when Morgan is thinking about iteration.

---

## 8. Telemetry, Admin, and the Data Flywheel

### 8.1 Tooling: PostHog

For a 2-person team, PostHog is the all-in-one default:
- Analytics + session replay + feature flags + A/B + SQL in one tool
- Session replay is a game-changer at our stage (watching a user stall for 4 min teaches more than 30 support tickets)
- Feature flags enable prompt-version A/B testing without separate tooling
- Open-source fallback if we ever want to self-host

Skipping Mixpanel (weaker replay) and Amplitude (enterprise overkill).

### 8.2 Event schema

**Session lifecycle:** `session.start`, `session.resume`, `session.end`, `session.idle_detected`, `session.abandon`

**Conversation quality:** `teammate.message_sent`, `teammate.response_received` (with latency), `teammate.thumbs_up`, `teammate.thumbs_down` (with text reason), `teammate.user_silent_after_response` (soft negative), `teammate.conversation_depth`, `teammate.handoff_fired`. Thumbs up/down on every response but rendered invisibly (hover to reveal) — low friction.

**Phase progression:** `phase.entered`, `phase.completed`, `phase.stuck_detected`, `phase.refreshed`

**Artifact production:** `artifact.created`, `artifact.mirrored_to_repo`, `artifact.user_edited`

**MVP steering:** `scope.feature_added_to_mvp`, `scope.feature_added_to_backlog`, `scope.yield_granted`, `scope.pushback_accepted`

**Code / deploy (via GitHub App + Vercel webhooks):** `repo.commit_pushed`, `localhost.first_preview`, `vercel.first_deploy`, `vercel.deploy_failed`

**Gallery & community:** `gallery.published` (north star!), `gallery.viewed_by_other`, `gallery.liked`, `gallery.commented`, `share.linkedin_clicked`, `share.copied_link`

**Cost & performance:** `llm.tokens_consumed`, `llm.cost_usd` (per user per day — cost-per-active-user guardrail)

### 8.3 Admin dashboard (PostHog-based v1)

V1 = raw PostHog dashboards + session replay + SQL. No custom admin UI. Four views:

- **Funnel health.** Landing → Spark → Paywall → Set Up → First Build → Scope → Design → Build Out → Ship & Share → Gallery publish. Conversion between steps, trend lines.
- **Stall map.** Where users drop, segmented by role and project type. Highlights config-signal candidates.
- **Conversation quality.** Thumbs-down list with reasons (the prompt-iteration queue). Silent-user moments. Worst-performing prompt by version.
- **Cost per active user.** Daily + per-cohort. LLM spend guardrail.

Custom admin UI is v2 once we know which views actually matter.

### 8.4 The weekly ritual

**Data flywheel made real.** Weekly (day TBD for Mike + Josh):

1. Open PostHog admin. Review the learned-signals candidate list (auto-generated from repeated patterns in the week's sessions).
2. Each candidate: signal description, user examples (anonymized), weight, AI-suggested config update.
3. Accept / reject / edit. Accepted signals become PRs to the Layer 1-3 YAMLs.
4. PRs reviewed, merged, shipped. Next week's users get sharper configs.

30-60 min/week at steady state. This is where the moat is literally operated.

### 8.5 Surface the moat as in-product coaching (v2)

Not in v1. Once we have enough aggregate data, surface it back to users at decision moments as social proof and gentle loss-aversion:

- At program start: *"Builders who finished spent 4-6 hours across one or two focused sittings. Builders who spread it across weeks at 30 minutes a pop dropped out 3× more often."*
- At known stall points: *"87% of builders who got past this point did X. Here's what DOT recommends."*
- At share / gallery moments: *"Projects with a short founder note and a screenshot get 4× more clicks."*

Closes the loop — the moat improves the agents AND the human decisions in real time.

---

## 9. Launch Scope (v1)

Core thesis: ship the core learning experience cleanly; defer growth and polish infrastructure to post-launch. Prove the experience works for a small number of real Morgans. Everything else waits.

### 9.1 Ships in v1

**Auth & account:**
- Auth.js (NextAuth v5) magic-link login via Resend
- User accounts (stored in our DB: email, profile, session state, artifacts)

**Learning experience:**
- Phase 1 Spark pre-paywall free sample with POE
- Paid learning environment (2-panel UI: curriculum checklist left, primary content right; ambient teammate container per [§4.2](#42-teammate-ux-states))
- All six teammates: POE, DAX, ED, DOT, BEA, GAL
- Visible phase handoffs + "review of what you just did" transitional + checklist binding
- Dynamic curriculum generation (just-in-time, lock-on-completion, unpersonalized browse-ahead)
- Teammate Skills + lightweight orchestration
- POE session state tracking (`one_thing`, `mvp_features`, `backlog`, `time_budget_remaining`, `yields_granted`)
- Artifact production (6-7 markdowns per user) + canonical DB storage + GitHub repo mirror
- Pro Tips module between Phase 2 and Phase 3

**Integrations:**
- GitHub App (first-class identity, install flow, read permissions, optional write for artifact mirror)
- Vercel webhooks + deploy detection
- 1stvibe MCP server for Claude Code
- Claude Code Skill pack install (`npx 1stvibe-skills install`)
- 1stvibe starter template repo

**Payments:**
- Stripe + Apple Pay / Link one-click checkout
- One-time $39, no subscription, no comp codes
- Expense-first UX (expense alias, forwardable receipts, completion PDF)
- Money-back promise in copy only; refunds manual (Venmo / check)

**Config system at launch:**
- Layer 1 YAML configs for **6 roles**: Marketing, Operations, HR, Product Management, Customer Support, Product Design
- Fallback Layer 1: `other / unclassified` role
- Layer 2 YAML configs for common project types: landing-page, lead-capture-form, internal-tool, dashboard, culture-survey, microsite
- Fallback Layer 2: `personal-project` generic
- Layer 3 sparse intersections (marketing × landing-page, ops × internal-tool, HR × culture-survey)
- Layer 4 learned_signals schema in place, empty at launch

**Gallery (minimalist):**
- Gallery index, individual project page (screenshot + AI summary + live URL + credit + builder name)
- Like + share (LinkedIn / Twitter / copy link)
- Basic builder profile page
- Static scrape of repo README + screenshot at publish time

**Completion ritual (minimal):**
- Celebration screen / animation at graduation
- Pre-drafted LinkedIn post (one-click share)
- Auto-publish to gallery (opt-in)
- "Thanks for building with us" note
- Wrap-up email (journey summary + pro-tips)
- Completion summary PDF

**Telemetry:**
- PostHog instrumentation with event schema from [§8.2](#82-event-schema)
- Admin "dashboard" = raw PostHog views + session replay + SQL (no custom admin UI)

**Engagement / retention flows (ship at launch, refine with data):**
- Registered-didn't-pay email sequence (24h / 3d / 7d / 14d referencing spark spec)
- Paid-didn't-finish state-aware check-back on return + 7d email with specific state
- Completed-didn't-share prompted share at graduation + 1-week gallery-views nudge
- Email primary, in-product notifications on return. No push, no SMS.

### 9.2 Deferred to fast-follow / v2

**Growth & promotion infrastructure:**
- Generic landing pages beyond the homepage
- Referral landing page templates
- Referral link metadata encoding / personalized-by-referrer landing
- Cookie-based visitor context for POE

**Community & social:**
- Cohort-lite pods
- Gallery comments
- Follow / subscribe / notifications on gallery items
- In-product aggregate coaching ("87% of builders who got past this...")

**Living gallery:**
- Auto-crawler for live-URL changes
- AI-summary regeneration on project evolution
- Agent-led periodic founder interviews
- Gallery entries as living case studies

**Graduation kit (full design):**
- Linear workspace auto-creation
- Linear setup guide
- "How to keep building with Claude Code" advanced resources
- Advanced technique pointers (configurable by role / project type)
- Continued-learning resources
- **Strategic role:** graduation kit is a signal-collection layer for future advanced-course revenue.

**Role coverage:**
- Remaining 3 roles: Sales, Finance, Account Management
- Deeper Layer 3 intersections as data justifies

**Dev ops refinement:**
- Pre-provisioning GitHub / Vercel accounts on the user's behalf
- Chrome extension overlays on GitHub / Vercel / Claude.ai
- Multiple project-type templates

**UX polish:**
- "Refresh this lesson" button
- Thumbs-up on every response (v1 ships thumbs-down only)
- Custom admin dashboard beyond PostHog

**Commercial expansion:**
- Team SKUs
- Advanced courses (scope from graduation-kit engagement)
- Money-back guarantee as a built flow
- Comp / referral / promo codes

---

## 10. Archive & Rollback Strategy

Doing the rebuild inside the existing git repo using tags + branches. No zip files, no parallel repos.

1. Tag current state: `git tag -a v1-final -m "Final v1 before rebuild"` (already executed 2026-04-17)
2. Archive branch: `archive/v1` from main (already executed)
3. `main` continues deploying the live v1 site via Vercel — users see no change during rebuild
4. Rebuild lives on `v2-rebuild` branch (current), deployed to a Vercel preview URL for in-public testing
5. Cutover = merge `v2-rebuild` → `main` when ready
6. Rollback (only if catastrophic) = `git reset --hard v1-final && git push --force origin main`. Tagged snapshot is the insurance policy.

---

## 11. Parked Questions & Open Items

**Still unresolved, genuinely open:**

- **Exact price within sub-$50 range.** A/B test $29 / $39 / $49 at launch; let the market pick.
- **Day of week for the weekly ritual.** Mike + Josh pick what fits.
- **Domain registrar partner.** Pick one based on affiliate economics.
- **Launch date / readiness criteria.** When do we cut over `v2-rebuild` → `main`?
- **Pro-tips content expansion.** Web research pending to expand the seed list.

**Design follow-ups (not blocking, address during implementation):**

- **Teammate avatar / icon design** — they need a visual identity that reinforces "clearly AI, not anthropomorphized."
- **Celebration animation library** — microcopy + motion design for milestone moments.
- **Email template copywriting** — every retention email copy needs final pass.
- **Receipt + completion PDF design** — branded, professional, expense-ready.
- **1stvibe starter template repo content** — specific Next.js + Tailwind defaults, README stub, `.gitignore`.
- **MCP server API surface** — what specific tools does Claude Code get access to via our MCP server?

**Strategic items to revisit with real data:**

- **Team SKU demand.** Watch for multi-seat requests or managers asking about bulk.
- **Advanced course demand.** Watch graduation-kit engagement + return-visitor patterns.
- **Cohort-lite timing.** Ship after we have real completion baseline data.
- **Gallery engagement features.** Ship comments / follow / etc. when organic demand signals justify.
