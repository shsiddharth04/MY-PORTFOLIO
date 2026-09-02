# Portfolio Site — Build Instructions

## 0. Read this first

This is a spec for extending an **existing** portfolio project, not building from scratch. Before writing any code:

1. Locate the existing portfolio repo/project in this environment and confirm its current structure (folders, existing components, existing routing) before adding anything.
2. **Do not assume missing information.** If something in this doc is unclear, incomplete, contradicts what you find in the existing codebase, or you need a decision only Sidd can make (wording, emphasis, what to cut, visual direction, etc.) — **stop and ask him directly.** Don't guess or fill gaps with plausible-sounding content.
3. Some details below may be stale (older links, old stats, a project's status may have changed since this was written). Flag anything that looks like it might be outdated and confirm before shipping it.

---

## 1. Goal

Extend the existing portfolio site to include a condensed personal bio and a projects section covering three flagship projects plus the other, smaller projects already referenced in the existing portfolio content. This is a content and (optionally) visual update on top of an existing, working site — not a rebuild.

---

## 2. Tech stack (already established — keep using it)

- React + TypeScript + Vite + Tailwind CSS
- Three.js (existing 3D neural-network background — see Section 6 on whether to keep it)
- GSAP + ScrollTrigger
- Framer Motion
- Lucide icons

Do not introduce a different framework or rebuild the site on a new stack.

---

## 3. Scope — what this update includes

- **About / bio**: one condensed narrative bio (not separate "Education" / "Work Experience" resume sections). See Section 5.
- **Flagship projects (3)**: PostG8, Blue Lotus Value Tradelink, Gig Culture India — full treatment, these are the primary showcase. See Section 7.
- **Other projects**: the smaller/earlier projects already listed in the existing portfolio content (Omnibiz Africa, Funding Pips, Nurture Nest, carpooling research, wellness blog) — lighter treatment, secondary to the 3 flagships. See Section 8.

**Explicitly out of scope for this pass:**
- No "Download PDF" feature. This is a web portfolio; a PDF export doesn't belong on it.
- No deployment work. This spec covers local development only — get it running and looking right locally. Deployment (hosting, domain) is being handled separately and is not part of this task.

---

## 4. Contact / identity details

- Name: Siddharth Sharma
- Location: Gurugram, India
- Email: sh.siddharthsharma04@gmail.com
- Phone: +91-8077504664
- LinkedIn: linkedin.com/in/siddharthsharm04
- Currently: PGP in Technology & Business Management, Young Leaders Cohort, Masters' Union, Gurugram (2025–2027)

Confirm with Sidd whether all four of these (email, phone, LinkedIn, education line) should be visible on the live site, or if any should be omitted/reduced (e.g. phone number visibility is a personal call, don't assume).

---

## 5. About / bio section

Write **one condensed narrative bio** — not a bulleted resume. It should read as a founder/builder story, not a CV dump.

Rough trajectory to draw from (confirm tone/angle with Sidd before finalizing copy — do not treat the following as final copy):
- Background in finance and business analytics (B.Com Honors, Jain School of Commerce, Bengaluru)
- Traded forex professionally (funded account, Funding Pips) before moving into growth and product
- Growth marketing experience at scale (Omnibiz Africa — retention/reactivation across ~170,000 B2B customers)
- Now: founder and solo builder, co-founded Blue Lotus, built PostG8 solo, previously built Gig Culture India
- Currently studying Technology & Business Management at Masters' Union

Ask Sidd directly: what's the one-line positioning he wants leading the bio (the last version used "I build AI systems that replace busywork" — confirm if that's still accurate/desired, or if the broader trading→growth→building arc should lead instead now that the page covers more than just the AI-builder angle).

---

## 6. Design direction — open to redesign

Sidd has said visual redesign is on the table — **do not assume the existing design must be preserved as-is.**

For reference only (not a requirement to keep), the current design direction on both the live portfolio and a separate one-off version built elsewhere uses:
- Dark ink background (`#0A0B0D`), off-white text, per-section accent colors
- Space Grotesk (display) + Inter (body) + JetBrains Mono (labels/tags/data)
- A Three.js "second brain" neural-network visual in the hero
- Restrained motion — one orchestrated hero moment rather than scroll-triggered fades on every element

Treat this as optional inspiration, not a spec. Propose a design direction (color/type/layout tokens) and confirm with Sidd before building it out, per standard practice for any distinctive visual work — don't default to generic SaaS-template patterns (rounded card grids, terracotta-on-cream, all-caps eyebrow labels, etc.).

---

## 7. Flagship projects (primary showcase)

### 7.1 PostG8 — current focus, active

Links: postg8.com (landing), app.postg8.com (app)

An AI-powered LinkedIn growth platform, built solo end to end.

**What's built:**
- **Content generation**: Quick Post (tone/type/goal controls, Free/Pro generation limits), a 4-step Content Strategy pipeline (business profile → ideas → execution directions → post), Series mode, Carousel Studio (7 layout types, PDF export, direct LinkedIn posting), Trending Topics (Google Search–grounded)
- **Business Profile**: multi-profile support, AI extraction from URL/PDF/notes
- **LinkedIn publishing**: native UGC API (single account) + Unipile (multi-account, Pro), image + PDF carousel posting, scheduled posts
- **Engagement/outreach**: Apify-powered scraping to find relevant posts/profiles, AI relevance scoring against ICP, AI-generated comment variants and connection notes, an automation engine that runs outreach actions on a schedule within safe daily limits, and a pipeline tracker following contacts from first connect through booked call
- **Payments**: Razorpay subscription billing (Free/Pro/Growth tiers), HMAC-verified webhooks
- **Landing page**: separate repo, dark hero, 5-step pipeline visual, 3-tier pricing (Free / Pro ₹999 / Growth ₹12k+ roadmapped)

Tech: React + Vite frontend, Supabase (Postgres + Edge Functions/Deno), Vertex AI (Gemini 2.5 Flash), Razorpay, LinkedIn OAuth + Unipile, Apify.

**Framing note:** keep copy outcome-focused (what it does, that it was built solo) rather than leading with internal implementation details (exact function counts, cron intervals, pipeline stage counts) — save deep technical specifics for tags/stack labels, not headline copy.

### 7.2 Blue Lotus Value Tradelink — active, co-founded

Link: bluelotusvalue.com

A B2B marketplace where manufacturers list **surplus raw material inventory**, and buyers procure it in **flexible quantities, below typical minimum order size (sub-MOQ)**. Co-founded and directed by Sidd.

**Key facts:**
- ₹10L raised in early-stage funding, pitched pre-revenue
- MVP shipped within 2 months of defining the problem
- 15 manufacturing companies secured for onboarding, validated directly with CXOs
- Sidd led product design, tech strategy, and business development

### 7.3 Gig Culture India — PAST project, no longer involved

**Important — get this framing right:** Sidd built this and was involved, but **he is no longer part of the company.** Gig Culture India as a company is still running, independently of him. This must read as something he **built and contributed to in the past**, not as current or ongoing work. Do not use present-tense "building" language or imply active involvement. Confirm exact phrasing with Sidd before finalizing — this is a sensitive framing detail, not a copy-polish detail.

Links (confirm with Sidd whether these should still be linked at all, given he's no longer involved): academy.gigcultureindia.com, marketplace.gigcultureindia.com

**What was built (while he was involved):**
- **Academy**: DJ education — masterclass slot booking, curriculum, instructor/studio info, admin portal (course/masterclass/curriculum editors, scheduling, cohort tagging, student management, resources, announcements), a student LMS with magic-link (enrollment-gated) auth — dashboard, class schedule, resources, announcements
- **Marketplace**: two-sided artist/host booking platform, AI vibe-matching concept, Genre Wheel taste-mapping UI, artist/host onboarding — AI matching engine and booking payments were not completed while he was involved

Tech: React + Tailwind, Supabase, Resend (email), Vercel.

---

## 8. Other projects (secondary — lighter treatment than the 3 flagships)

These come from the existing portfolio and should be included at a lighter weight (shorter entries, less visual real estate) than the three flagships above.

- **Omnibiz Africa** — Growth Marketing Intern, Mar–Jun 2026 (remote). Owned retention/reactivation for ~170,000 B2B retailer customers; built trigger-based in-app campaigns and multi-channel (push/WhatsApp/SMS) lifecycle journeys; generated ₹30L in tracked campaign revenue in one week.
- **Funding Pips** — Funded Forex Trader, Jan 2024–Jan 2025. Managed a $5,000 funded account (60% profit-share model), passed a 2-stage evaluation (8% and 5% returns), earned 2 profit payouts and an advanced trading certificate.
- **Nurture Nest** — Co-founded dropshipping/D2C store, Jul–Sep 2025. Ran sourcing, marketing, and fulfillment; generated ₹25,000 revenue in 2 months.
- **Carpooling app research** — Market research project (2022–2023) on feasibility and adoption of carpooling apps across major Indian cities; designed surveys/interviews.
- **Wellness blog** — "Fitness Delusion" (2020). Evidence-based health content debunking nutrition myths; grew organic traffic via SEO/content strategy.

Confirm with Sidd how much detail he wants here — full mini-cards, or a compact list.

---

## 9. Before you ship

Checklist to confirm with Sidd, not to decide unilaterally:
- [ ] Final one-line positioning/headline for the bio
- [ ] Whether phone number should be publicly visible
- [ ] Whether Gig Culture India links should be included at all, and exact past-tense framing
- [ ] Visual direction (if redesigning) — get sign-off on a design plan before building it out
- [ ] How much space/detail the "other projects" section gets relative to the 3 flagships
