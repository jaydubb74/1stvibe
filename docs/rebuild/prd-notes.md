# 1stvibe Rebuild — PRD Notes

> Running decisions, tradeoffs, and strategic insights captured during the rebuild discussion. This is a living doc — append as new decisions get made. The target archetype persona lives in `./persona.md`.

**Last updated:** 2026-04-17

---

## Strategic commitments (locked)

- **Brand, colors, typography, voice: unchanged.** Burnt Orange `#D35400`, Amber accent, DM Sans + Open Sans, friendly-coach voice. All carried forward.
- **Target:** AI-curious-but-not-AI-fluent professionals with an expense-authority job. See `./persona.md`.
- **Business model ambition:** bootstrap a meaningful side-income service. Explicitly *not* a VC-backed billion-dollar play. This shapes every scope decision toward "high-value for a small group" rather than "scale at all costs."
- **North star metric:** users who complete the program and ship a first vibe-coded project they can show their friends. Same as today's site — sharpened.
- **Differentiator vs. Lovable / v0:** we compete on **coaching quality**, not output quality. They optimize for the generated artifact; we optimize for the human who came in with a vague idea and leaves with a shipped thing and a new skill.
- **Defensibility / moat:** a data flywheel from conversational AI-teammate engagements. Every build journey (successful or not), every community interaction, every gallery item feeds back into making the teammates sharper. The moat compounds with every user.

---

## Product direction (emerging)

- **From linear tutorial → conversational, AI-coached product development.** The current 19-step tutorial is a fixed pipeline. The rebuild is a guided experience where AI teammates engage the user throughout.
- **AI teammate roster (initial):**
  - Product Teammate — problem distillation, scoping, spec-writing
  - Product Design Teammate — UX flow, layout, workflow design
  - Engineering Teammate — architecture, stack, code-level guidance
  - Dev Ops Teammate — GitHub, Vercel, local dev, deployment
  - Marketing / GTM Teammate — landing page copy, positioning, launch
  - Finance Teammate — scope / cost / expense reasoning
- **Output:** a first vibe (1stvibe) project the user can show friends. One deployed thing, with their code, on their domain-or-subdomain, by them.
- **Scope:** one-and-done primary. Advanced courses are an optional future, not core.

### Problem distillation is the uniquely-taught skill
Most of our target audience has never translated a real-world problem into a feature plan. That's a *product* skill, not a coding skill. The AI teammates — especially Product — exist to coach that translation. This is what the hosted builders (Lovable, v0) don't do: they assume you know what you want and just need HTML. We assume you know you have a problem and help you get to a shippable spec.

---

## Pricing & commercial model

- **Working price: under $50. Gut pick: $39.** Range to test: $29 / $39 / $49.
- **Strategic rationale — optimize for the referral funnel, not the cold funnel.** Our #1 purchase trigger is social FOMO ("coworker shared a link to their shipped project"). In a warm-referral funnel, the endorsement *is* the legitimacy signal — so price can (and should) be minimum-friction. Cold-landing-page premium-pricing data (Maven etc.) doesn't apply here because cold-from-ads is at most our tertiary channel. Optimizing for premium positioning would slow the viral flywheel that is the actual business model.
- **What this buys us:**
  - Sub-$50 = no-approval expense at virtually every US employer (well under typical $500–$1,000 manager-approval thresholds)
  - No hesitation on warm referral — decision happens in <30 seconds
  - Flywheel velocity: low price → more customers → more shipped projects → more "look what I built" posts → more referrals → more data → smarter teammates
- **What this costs us (tradeoffs accepted):**
  - Thin per-user margins (~$30 net at $39 after LLM + processing + infra). Business works only at volume.
  - Positioned closer to Udemy ($10–$100 courses) than Stanford / Maven cohorts ($500–$1,500). Free Product Teammate sample must punch above the price to reset expectations before purchase.
  - No headroom for a premium tier without adding clear stratification (advanced courses, team SKUs, etc.)
- **Discovery approach:** A/B test $29 / $39 / $49 on the landing page once live. Let the market pick the exact number. Don't commit without data.
- **Low price cushions an MVP with rough edges.** We want to ship quickly with fewer features. Low price right-sizes expectations — a $39 product with some polish gaps generates curiosity; a $199 product with the same gaps generates resentment and refund requests. The price signals "lean product, early days" and gives us cover to iterate.
- **Ratchet up, not down.** Pricing is easier to raise after launch than to lower. If $39 clearly undersells once the product is mature, we raise it with new feature announcements ("now includes [X], price moves to $59"). Starting low keeps the option open.
- **Future pricing levers (not v1):** team SKUs for managers buying for direct reports, advanced-course add-ons, sponsorship/referral revenue from the stack partners.
- **Positioning:** "professional skill development" — expensable as training.
- **Support the expense flow as a first-class feature:**
  - Clean, branded receipt on purchase
  - Pre-written email to manager / finance justifying the expense
  - Optional reimbursement reminder nudges
  - Short "what I learned" summary at completion they can forward
- **Money-back completion guarantee:** if you complete the program and don't ship, we refund. Aligns our incentives with theirs (completion *is* our north star), reduces purchase anxiety, and refund exposure is limited to users who dropped out — who still generated data.

---

## Funnel & access gates

- **No-auth browsing:** gallery and community viewable without registration (SEO, social proof).
- **Forced registration at:** saving a project, starting a teammate conversation — *not* arbitrary click counts.
- **Paywall at:** full curriculum, multi-teammate access, deployment flow.
- **Free hook:** REPLACE the current one-shot HTML site builder. Output quality is too weak and it samples the wrong thing (commodity HTML generation — Lovable / v0 do it better). NEW hook: 5–10 min free conversation with the Product Teammate → outputs a clean project brief. This samples the **coaching**, which is our actual differentiator.

### Purchase trigger ranking (validated with user)

1. **Social FOMO** — a friend or coworker shares "look what I built" with a link. This is the dominant driver. Every shipped 1stvibe project becomes a potential acquisition asset.
2. **Search intent** — "getting started vibe coding," "how to start vibe coding," etc. Educational top-of-funnel content.
3. **LinkedIn ads** — AI career development / skill development / don't-get-left-behind CTAs. LinkedIn engagement on AI-upskilling content is high right now.

---

## Design principles & constraints

- **Insulate beginners from corporate infrastructure.** Personal GitHub, personal Vercel, personal everything. Corporate integration is a graduation topic, not a starter. (Ashley at PPH got trapped in corporate access controls; don't replicate.)
- **Dev ops must dramatically shrink.** It's the single biggest ah-ha-delayer in every coaching session to date. Marty quit here. Every hour spent on dev ops is an hour not spent on the thrill of seeing your idea come alive.
- **AI teammates must address control / permission anxiety.** Ashley's "press 2" problem — some users are terrified of letting the AI act without supervision. The coaching must normalize this: what can/can't go wrong, how to undo, why trust is safe here.
- **Accelerate the ah-ha moment.** The cognitive unlock — "my English words became a real thing" — is the drug. But it has to land on something *they* care about, not generic stock output. The free Product Teammate conversation is meant to plant the hook on *their* idea.
- **Preserve the "I built this" feeling.** It must feel like their project, not a template they filled in. Ownership is emotional, not just legal.

---

## The recommended stack (opinionated by default)

We explicitly recommend and coach on one stack. Users can go off-road, but the money-back guarantee only applies on the recommended path.

- **Machine:** Mac (initially — Windows / Linux are graduation-era).
- **AI coding agent:** Claude Code.
- **Code host:** GitHub.
- **Hosting / deploy:** Vercel (Cloudflare Pages as a secondary option if Vercel doesn't fit).
- **Domain:** TBD — pick one registrar partner based on affiliate economics.

### Off-road policy
*"Our AI coaches will do their best to help you if you use a different platform, but our 4–6 hour completion target and money-back guarantee only apply on the recommended stack. We can't promise the same experience off-path."*

### Referral / sponsorship upside
Each of the recommended platforms has a partner / referral / affiliate program or the beginnings of one. This is a real incremental revenue stream for a bootstrap business — every cohort that ships has also spun up GitHub, Vercel, domain, and potentially a Claude Code subscription at our recommendation.

- **Vercel** — has an established partner program
- **Cloudflare** — has a partner program
- **GitHub** — less affiliate-friendly but partnership-possible given a steady flow of net-new accounts
- **Anthropic (Claude Code)** — worth exploring a partnership given we're generating meaningful net-new AI-coding-curious professionals
- **Domain registrars** — Namecheap, Porkbun, others run affiliate programs; pick one partner to default recommend

Revenue from referrals compounds with user volume. At meaningful scale this could be a second revenue leg alongside tuition.

---

## Data strategy (the moat)

Store and learn from:
- Every teammate conversation (prompts, questions raised, user responses, dead-ends, breakthroughs)
- Build journey metadata (what they tried to build, where they got stuck, what unstuck them)
- Community engagement signals (what gallery items get shared, commented, starred)
- Success / failure signals (who completed, who dropped out, at what point)
- **Post-graduation evolution** — via the living gallery (below), we keep learning long after the user leaves

This data refines every teammate over time. Common sticking points in dev-ops coaching become proactive checks. Frequent product-scoping traps become questions the Product Teammate raises upfront. The teammates get smarter per-user, not per-release.

### Surface the moat as in-product coaching

The data doesn't just improve the teammates silently — it gets *shown* to users at decision moments as social proof and gentle loss-aversion:

- At program start: *"Builders who finished spent 4–6 hours across one or two focused sittings. Builders who spread it across weeks at 30 minutes a pop dropped out 3× more often."*
- At known stall points: *"87% of builders who got past this point did X. Here's what the Dev Ops Teammate recommends."*
- At share / gallery moments: *"Projects with a short founder note and a screenshot get 4× more clicks from the gallery."*

Every aggregate signal is pulled from the moat and returned to users as coaching. This closes the loop — the moat improves the agents *and* improves the human decisions in real time.

---

## The living gallery

Gallery entries are tied to the **live deployed URL** of the user's project, not a static one-time snapshot. This means:

- **Zero-effort evolution.** As the builder iterates on their site post-graduation, the gallery entry stays current with zero work from them (or us).
- **Automated observation.** A crawler periodically pulls the live site, captures visual / structural / copy changes, and summarizes what's evolved ("added a pricing page," "swapped hero copy," "shipped a new feature").
- **Agent-led founder interviews.** Periodically, an AI agent reaches out to the builder with a light-touch interview: "What did you add this week? Any gotchas? What's next?" Responses feed the gallery narrative *and* the data moat. The builder gets the dignity of being asked; we get the richest possible dataset about post-graduation iteration patterns.
- **Gallery entries become living case studies.** Not frozen portfolio items — evolving product stories. This is a meaningful differentiator vs. any static "built with X" showcase.
- **Feeds acquisition.** Evolving gallery entries are more compelling for the #1 trigger (social FOMO) than static ones. Current builders see what's *possible*, not just what was *once shipped*.

---

## Anti-personas & dropout modes

- **No-employer-expense-lane (the "Marty" mode):** weak motivation math, juice-not-worth-squeeze response when dev ops hurdles show up. Not our core customer, but a money-back guarantee may still pull a meaningful slice.
- **Already-AI-fluent (the "George" mode):** the cognitive unlock isn't novel, and executives who delegate build work don't feel the craft-pull. Even when they look like they should be the customer, they won't convert. Filter out of targeting.
- **Delegation-oriented leaders:** directors and execs who instinctively want to hand off execution. The builder's thrill requires hands-on time.

---

## Time commitment (decided)

- **Design target: 4–6 hours total** from purchase to shipped project.
- **Positioning:** "a focused weekend" or "two evenings." Not "work on it whenever." Fragmenting across weeks kills completion.
- **"Greatness" is explicitly out of scope for v1.** Our job ends when the user ships their first thing. Iteration and polish are *their* job after they graduate. We send them off with a graduation kit ("how to keep building with Claude Code on your own"), not an expectation that v1 is perfect.
- **Dev ops budget cap: ~45 min.** Current coaching sessions spend 1–2 hours on dev ops. To hit 6-hour total, dev ops has to collapse dramatically. That means: pre-provisioned accounts where possible, aggressively opinionated defaults (no GitHub-or-GitLab choice — it's GitHub), Dev Ops Teammate unblocks faster than it explains.
- **Watch for builder-bias:** if we're ever scoping past 6 hours, flag it as "designing for ourselves, not the user." Anthony-the-user needs 6 hours; Mike-the-product-person would happily spend 60.

---

## Archive & rollback strategy (decided)

Doing the rebuild inside the existing git repo using tags + branches. No zip files, no parallel repos.

1. Tag current state: `git tag -a v1-final -m "Final v1 before rebuild" && git push origin v1-final`
2. Create archive branch: `git branch archive/v1 main && git push -u origin archive/v1`
3. `main` continues deploying the live v1 site via Vercel — users see no change during rebuild.
4. Rebuild lives on `v2-rebuild` branch, deployed to a Vercel preview URL for in-public testing.
5. Cutover = merge `v2-rebuild` → `main` when ready.
6. Rollback (only if catastrophic) = `git reset --hard v1-final && git push --force origin main`. Tagged snapshot is the insurance policy.

---

## Parked questions (revisit in order)

1. **Project types per persona.** Once persona is locked, brainstorm realistic projects per archetype/role (marketing lead → landing page + lead capture; ops manager → BI dashboard; personal → passion projects like Lauren's bread-baking guide or Adeel's passport-photo tool).
2. **Exact price.** Use landing-page price discovery across $49–$99 range.
3. **Dev ops pre-provisioning.** What accounts can we create on the user's behalf to shave the 45-min budget? GitHub org invite flow? Vercel team add? Domain sub-allocation?
4. **Gallery feature set.** Browse, filter, rate, comment, share? What's in v1?
5. **Community feature set.** Forum? Discord? Inline comments? What's in v1?
6. **Advanced courses.** Scope only if organic demand appears.
7. **Receipt / reimbursement tooling.** Shape of the expense-support package.
8. **Curriculum shape.** Fully linear, fully adaptive, or a guided-but-branching hybrid.
9. **Graduation kit.** What we hand the user at completion so iteration feels empowering, not abandonment.

---

## Open strategic questions (need more signal)

- Does the free Product Teammate conversation do enough heavy lifting to carry the upfront purchase decision on its own, or do we need additional trust signals (testimonial gallery, founder story, money-back badge) at the purchase wall?
- What's the right time horizon on the money-back guarantee? (30 days? 60 days? Until program completion regardless of calendar?)
- Do we need a separate "team" SKU for managers who want to put 3–5 employees through it? Or keep it pure individual for v1?
