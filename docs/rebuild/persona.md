# 1stvibe Target Persona — "Morgan the AI-Curious Pro"

> The archetypal 1stvibe customer, synthesized from ~8 real coaching subjects and validated against 2025-2026 market data. This is v1 — expect to iterate as we get real customer signal. Companion doc: [PRD Notes](./prd-notes.md).

**Last updated:** 2026-04-17

---

## TL;DR

Morgan is a 35-42 year old manager or director in marketing, sales, operations, finance, or HR. They've been using ChatGPT daily at work for a year or two — for writing, analysis, summarization. They've watched a coworker or friend recently *build and ship software* with AI, and it's rattled them. They're AI-fluent in text, but have never made a running thing. They want to close that gap fast — both to solve a real problem they're sick of doing manually *and* because they're scared of being the person on their team who didn't keep up.

At $39 and one focused weekend, Morgan says "yeah, let me try this" before finishing the coworker's LinkedIn post. The barrier isn't money or approval — it's confidence, and a vague fear they'll break something or look dumb.

---

## Who Morgan Is

### Role and seniority
- **Functions:** marketing, sales, operations, finance, or HR (including L&D, people ops, talent)
- **Seniority sweet spot:** individual contributor (senior) through director — roughly 6-15 years into their career
- **Not our target:** junior ICs with no expense authority, C-suite who delegate build work, or engineers of any stripe
- **Real examples from coaching:** heads of payer relations, learning & development, finance; product managers; product designers; clinical directors. (See [prd-notes.md](./prd-notes.md) for the coaching roster.)

### Demographics
- **Age:** 35-42 is the bullseye; 30-48 is the comfortable range. Average marketing manager age in US data is ~40.
- **Income:** $120K-$200K. Not a pricing constraint.
- **Geography:** US-based initially, English-first. Remote-friendly cities over-indexed (SF, NY, Austin, Seattle, Boston, Raleigh, Denver).
- **Gender:** mixed. Marketing functions skew slightly female (~55%), ops/finance slightly male. No single skew.
- **Education:** almost always college-educated. Many took 1-2 CS courses in college and remember enough to know they *could* learn it if they had time.

### Company context
- **Tech companies (any size):** easier ground. Almost any role from IC to VP can expense a $39 professional-development line item without friction. Culture rewards people who experiment with new tools.
- **Non-tech companies (especially healthcare, professional services, financial services, manufacturing):** harder but winnable. Forward-thinking managers and directors can still expense $39 without raising eyebrows. The "don't get left behind" pressure is actually *stronger* in these orgs because the AI-adoption baseline is lower.
- **Employer stipend:** median US professional development stipend is ~$1K/year, range $500-$2,500. A $39 purchase is a rounding error against that budget.

---

## Morgan's Current Reality (the AI-fluency starting point)

**This is the most important reframe in the persona.** Morgan is *not* an AI newbie.

- **Daily ChatGPT user for 1-2 years.** Uses it for: rewriting emails, summarizing meeting notes, drafting performance reviews, pulling bullet points out of a PDF, analyzing a spreadsheet, generating outlines, exploring ideas.
- **May also use:** Claude for long-form analysis, Perplexity for research, maybe Notion AI or Grammarly. If they're in marketing they've touched midjourney or DALL-E at least once.
- **AI is not exotic to them — it's Tuesday.** They have opinions on which model writes better.
- **The gap we sell into:** they have never used AI to *make a running thing.* They've never typed a prompt and watched code appear, or deployed anything, or seen their words become an actual piece of software that another person could use. They know AI can *write* — they don't yet know it can *ship*.
- **Cognitive unlock positioning:** not "AI is powerful" (old news). It's **"AI can do engineering, not just writing."** That's the specific, fresh insight we deliver.

---

## What Morgan Wants

### Primary jobs to be done (in rough priority)

1. **"Show I'm keeping up."** Make something concrete they can point to that proves they've made the leap from "AI user" to "AI builder." This is partly professional signaling, partly self-reassurance.
2. **"Solve a real problem I'm tired of doing manually."** Many Morgans have a specific pain point — a recurring manual process, a report they dread building, a data workflow held together with spreadsheets. They want to kill it.
3. **"Scratch a personal itch."** A meaningful minority of Morgans (Lauren's bread-baking guide, Adeel's passport-photo app) show up with a personal passion project rather than a work problem. Same person, different axis.
4. **"Build team capability."** Managers and directors (Anthony, Dr. Genualdi) often build first for themselves but have their team in mind — "if I figure this out, I can teach my people."

### Success criteria (concrete, in their words)
- **"A live URL I can send to someone."** Not a GitHub repo. Not a video walkthrough. A real thing, on the real internet, that does a real thing.
- **"A story I can tell."** A 2-paragraph LinkedIn post about what they built and what they learned. Screenshot-friendly.
- **"A new skill on my internal résumé."** They want to feel, truly, that they know how to do this now — at least enough to do it again.
- **"Proof that I'm not behind."** The private version of the above. They want to walk back into Monday having closed a gap that felt scary Friday afternoon.

---

## What Scares Morgan

This is where product design earns its keep. Morgan's anxieties are specific and repeatable.

### Fears we must address directly
1. **"I'll break something."** Specifically: the Ashley-at-PPH "press 2" problem — terror at giving Claude Code permission to run without oversight. Feels like handing over the car keys to a stranger. Requires explicit, calm coaching: what the AI can and can't do, what the undo story is, why trust is safe here.
2. **"I'll waste my weekend and not finish."** Time is their scarcest resource. Starting and not finishing is worse than not starting — it's evidence they couldn't keep up. The money-back guarantee addresses the financial risk; the 4-6 hour promise and the focused-session design must address the time risk.
3. **"I'll look dumb."** They don't want to ask a basic question and feel stupid. They'd rather quit silently. The AI teammates must be psychologically safe — no judgment, no "actually everyone knows that" energy.
4. **"The dev ops stuff will eat me alive."** They've heard of GitHub. They don't really know what it is. The terminal is intimidating. They've seen colleagues get stuck on environment setup and noped out. They're right to be scared — it's the #1 ah-ha-delayer in every coaching session we've run.
5. **"I'll end up with something embarrassing."** The current one-shot demo has primed them to expect generic AI output. They're afraid they'll pay $39, spend a weekend, and produce something that looks like a 2007 template. The free Product Teammate conversation must immediately raise the floor of what they think is possible.

### Second-order anxieties (quieter, but real)
- "My company's IT will block something." (We design around this — personal accounts only.)
- "I'll buy into the hype and it won't actually work." (The free sample matters here.)
- "If I succeed, I'll be expected to do this all the time now." (Less important, but real for some.)

---

## The Purchase Moment

### Two distinct buyer archetypes, same person

**Path A — Impulse Referral (dominant, probably 60-75% of conversions)**

- Morgan sees a coworker's LinkedIn post or gets a Slack DM: *"you have to see what I built with this."*
- Clicks the link. Sees the friend's live URL in our gallery, sees the "Made with 1stvibe" credit.
- Lands on our homepage. Does the 5-10 minute free Product Teammate conversation.
- Price: $39. Decision happens in under a minute. "Yeah, sure."
- **Key design implication:** everything from friend's-link-click to purchase-complete must be under 10 minutes and totally frictionless. One-click checkout. Apple Pay / Link. No forced account creation before the sample.

**Path B — Deliberate Shopper (secondary, probably 25-40%)**

- Morgan has heard "vibe coding" enough times that it's on their list. They search "learn vibe coding" or "claude code for beginners" and land on our site among 5-10 options.
- Compares us to: Stanford Continuing Studies ($800+), Maven cohorts ($500-$1,500), Coursera Vibe Coding Essentials, Udemy courses ($10-$100), creator cohorts like VibeCodingForMarketers.com.
- For this buyer, $39 reads as "is this even legitimate?" They need quick trust signals: founder story, gallery of real shipped things, testimonials, the free teammate sample.
- **Key design implication:** the landing page must work for both cold-deliberate and warm-impulse buyers. The free Product Teammate sample does double duty — it's the legitimacy-proof for the shopper AND the conversion accelerant for the impulse buyer.

### Purchase triggers (ranked and validated)

1. **Social FOMO** — a coworker or friend shared "look what I built." Dominant trigger. Every shipped project is a potential acquisition asset; the share-flow at completion is our #1 growth feature.
2. **Search intent** — "getting started with vibe coding," "learn claude code," "how to build with AI for non-engineers." Inbound SEO from educational content, gallery entries, and founder content.
3. **LinkedIn ads / content** — AI-upskilling CTAs. Works, but at LinkedIn's $30-$60 CPMs this is the tertiary channel. Best as a reinforcement layer, not a primary acquisition engine.
4. **Word of mouth outside social platforms** — Slack groups, Discord communities, newsletters. Harder to measure, probably meaningful in tech-company pockets.

---

## The Program Experience Morgan Expects

- **Time commitment:** 4-6 hours, ideally one focused weekend or two weeknight evenings. "A Saturday project." Fragmenting across weeks = high drop-off.
- **Coaching style:** conversational AI teammates, not video lectures. Morgan doesn't want to watch a 12-hour Udemy course. They want a knowledgeable friend-on-call who asks them sharp questions and unblocks them.
- **Handholding level:** high on dev ops (just get me through it), medium on product (ask me questions I can answer), low on technical detail (I don't need to understand how git works to use it). The teammates must dynamically calibrate.
- **Output:** a deployed website at their own URL, their own GitHub repo, their own Vercel project. Owned by them. Credit line to 1stvibe.
- **Moment of ah-ha:** when the first working prototype loads on localhost and shows *their idea.* This must happen early, ideally within the first 60-90 minutes of the paid program. Every design decision should accelerate this moment.

---

## What Morgan Does Next (post-completion)

- **Shares the win.** LinkedIn post with screenshot + URL. Text to the coworker who sent them the referral. Mentions it on the next team call.
- **Maybe iterates, often doesn't.** ~50% (gut estimate) of Morgans will keep tinkering on their own. ~50% will ship v1 and move on with pride. Both are success outcomes.
- **Becomes a referral engine (the ones who iterate).** The Katherine-style evangelists are rare but high-leverage. A single evangelist can produce 5-10 referrals over 6 months.
- **Graduates to their own learning.** We hand them a graduation kit: "here's how to keep building on your own with Claude Code, here's what to try next." The end of 1stvibe is the start of their independent building. Our north star is that exit being *celebratory*, not abandonment.

---

## Motivation Variants (same persona, different axis)

Morgan is a single persona, but their *motivation* lands on one of two vectors. Product design should accommodate both without forcing a branching choice upfront.

| Variant | Who they are | What they build | Examples from coaching |
|---|---|---|---|
| **Professional Problem Solver** | Dominant variant. Shows up with professional context: either a specific workflow pain they're tired of (pain-driven) or a general "I need to develop this skill before I'm left behind" (skill-driven). Often both at once. Includes managers/directors building for their teams, not just themselves. | Internal tool, dashboard, automation, tracking system, simple utility tied to their role | Anthony's transition-of-care tool; Dr. Genualdi's nurse-practitioner helpers; a marketing manager shipping a landing page to prove they can |
| **Passion Project Builder** | Shows up with a personal itch, not a work problem. Still professional-grade in life stage, income, and expense context — just decided to scratch a non-work itch first. | Hobby app, recipe tool, family utility, personal site, creative portfolio | Lauren's bread-baking guide; Adeel's passport-photo app |

### Two motivational textures inside "Professional Problem Solver"

The variant bundles two textures that sometimes arrive pure and sometimes mixed:

- **Pain-driven:** comes in with a specific, concrete manual process they want to kill. Anthony's 2-3 hour morning data-normalization routine is the archetype. Product Teammate's opening conversation is *"Tell me about the problem."*
- **Skill-driven:** comes in with FOMO and no specific project yet. Knows they want to vibe-code, doesn't know what to build. Product Teammate's opening conversation is *"Let's find you a problem — what's something at work that feels tedious or clunky?"*

These textures often converge — skill-driven Morgans usually discover a workflow pain once they start looking, because every professional has one. The product shouldn't force the choice; it should ask the right opening question and follow wherever the conversation leads.

### Product Teammate opening

A single catch-all opener handles both variants and both textures: *"What brings you in today — a problem you're tired of dealing with, something you've been wanting to build, or just curious to see what this is like?"* This surfaces the motivation organically without forcing Morgan to self-classify.

### Post-completion outcome worth naming separately

A small subset of Morgans — regardless of which variant they started in — become evangelists after completion. Katherine is the archetype: a product designer who already thought in systems and UX, found the cognitive unlock especially potent, and turned into a cult-leader-style referrer at her company. Evangelists aren't a *starting* variant; they're an *outcome.* Probably 5-15% of completed Morgans become meaningful referrers. They're the highest-leverage users in the business model — a single evangelist can produce 5-10 referrals over 6 months at near-zero CAC.

---

## Illustrative First Projects (by role)

Useful for landing page examples, gallery seeding, and Product Teammate prompt templates.

- **Marketing:** campaign landing page with lead-capture form; simple CRM-free contact intake; one-page microsite for an event or launch; content-calendar dashboard.
- **Sales:** competitive-comparison one-pager tuned by prospect type; proposal generator that fills a template from inputs; follow-up tracker; simple ROI calculator for buyers.
- **Operations:** internal KPI dashboard; data-normalization tool (Anthony's archetype); simple process-tracking app; SOP microsite for a specific team.
- **Finance:** reporting helper that reshapes data into a deliverable; expense-categorization tool; simple utility apps (Adeel's passport-photo generator).
- **HR / People / L&D:** culture-survey tool that collects and aggregates responses without a SurveyMonkey license; interview-feedback collection form that rolls up structured input from interviewers; performance-review aggregator that pulls 360 inputs into a single view; all-hands agenda / question-collection app; onboarding checklist microsite; internal-skills-inventory directory.
- **Personal (any role):** recipe organizer; weekend-plan optimizer; family scheduler; hobby tracker (reading list, garden, watch collection); creative portfolio.

---

## Media Diet (where Morgan lives)

- **LinkedIn** — the primary professional feed. They read it daily, especially on mobile. They're more likely to buy from a post than an ad.
- **Industry newsletters** — Lenny's Newsletter (PMs), Every / Stratechery / Sacra (cross-functional), marketing-specific ones like Morning Brew's B2B editions.
- **Podcasts** — consumed during commutes and workouts. AI-adjacent business podcasts (Lenny's, Acquired, a16z) over deeply technical ones.
- **YouTube** — reactive, not habitual. They go when they need to learn something specific.
- **Twitter/X** — some, but decreasingly. More common in tech-company Morgans than elsewhere.
- **Slack / Discord communities** — role-specific professional communities. High-trust environments where "look what I built" shares carry real weight.

---

## Anti-Personas (who Morgan is NOT)

- **The "Marty" — no professional context.** A friend who manages rental properties and wants to build something for their tenants. No employer, no expense lane, no peer social proof, weaker motivation math. Will quit at dev ops. The money-back guarantee may catch some, but don't build for them.
- **The "George" — already AI-fluent executive.** A C-suite leader who uses AI constantly but delegates all execution. The cognitive unlock isn't novel to them, and the craft-pull ("I made this myself") doesn't land for someone whose job is to direct others. Even when they look like they should convert, they won't.
- **The working engineer.** Already has Claude Code, has a GitHub, has shipped things. Not our market. If they buy, they'll churn with a shrug. Messaging and copy should quietly steer them away.
- **The true total beginner.** Someone who has genuinely never used ChatGPT, doesn't have an email they remember, can't install software. The product's coaching pace assumes baseline professional digital literacy — we'd frustrate them.
- **The academic.** Looking for a structured curriculum, certificates, credentials, a syllabus. Not us. Stanford Continuing Studies is their play.

---

## Pull Quotes (things real Morgans say — or would say)

> "My coworker just built an internal tool in a weekend and I thought — wait, I could do that?"

> "I've been using ChatGPT for everything at work, but I've never actually *made* anything with it."

> "I'm afraid I'll break something if I let it run without watching."

> "I don't want to bother engineering with something this small."

> "I feel like there's this thing everyone's talking about and I'm pretending I know more than I do."

> "I can give it a weekend. If I'm not shipping by Sunday night, I'm out."

> "I don't want a course — I want to build something real."

> "I'm not trying to become a developer. I just want to be able to say I did this."

---

## Implications for Product Design (carry forward)

If the product doesn't deliver on each of these, Morgan bounces:

1. **A 10-minute free sample that immediately punches above $39.** The Product Teammate conversation must leave them genuinely surprised by the quality of coaching. This is the single most important conversion surface.
2. **A dev ops path that takes under 45 minutes.** Pre-provisioned where legally possible. Opinionated defaults. Dev Ops Teammate unblocks faster than it explains.
3. **First working localhost view within 90 minutes of starting the paid program.** The ah-ha moment must come early.
4. **A graduation moment that feels like a celebration.** Deployed URL, clean share-flow, pre-drafted LinkedIn post template, gallery listing, graduation kit for what to try next.
5. **Psychological safety throughout.** Teammates never make Morgan feel dumb. "Press 2" fears explicitly addressed. Undo and reset always visible.
6. **A gallery that proves what's possible.** Seeded with real Morgan-style projects — not stock templates — so the deliberate-shopper variant can pre-validate the quality ceiling.

---

## What we still don't know (v2 research)

This persona is a composite of ~8 coaching subjects + market research. We'll sharpen as real customers come in. Specifically unknown:

- **Repeat-build rate.** What percentage of completed Morgans ship a second project within 6 months?
- **Referral coefficient.** How many new customers does each completed Morgan generate on average?
- **Time-to-purchase from first exposure.** Is the impulse buy really <1 minute, or are there lurkers who spend weeks deliberating?
- **Geographic and company-size distribution.** Does our hypothesis about tech vs. non-tech hold in practice?
- **Which role (marketing, sales, ops, finance, HR) converts best?** We have a hypothesis (probably marketing + ops + HR), no data.
- **How price-sensitive the impulse path actually is.** Does $29 materially outperform $39? Does $49? Needs A/B.
