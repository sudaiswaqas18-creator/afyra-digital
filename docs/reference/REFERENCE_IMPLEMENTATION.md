# Afyra Digital Service Pages — Reference Implementation Map

This implementation keeps the existing Afyra homepage component tree unchanged and uses the SaaS King Home 02–07 demos only as structural/interaction references. Theme copy, claims, ratings, testimonials, statistics, and pricing were not copied.

## Route ↔ reference mapping

| Afyra route | SaaS King reference | Implemented structural/interaction treatment |
|---|---|---|
| `/solutions/brand-creative-communication` | Home 02 — AI Copywriting | Layered copywriting-style hero cards; specialization strip; bento feature grid; connected touchpoints; communication showcase; 4-step process; current Afyra program cards; verified-proof placeholder; FAQ; final CTA. |
| `/solutions/digital-presence-advanced-systems` | Home 03 — Blockchain/Web3 | Centered hero; animated orbital system; specialization strip; feature system; connected touchpoints/integration field; healthcare-use-case showcase; process; programs; proof placeholder; FAQ; final CTA. |
| `/solutions/patient-acquisition-lead-generation` | Home 04 — AI Chatbot | Chat/inquiry-flow hero; specialization strip; inquiry-journey showcase; differentiator/features; programs; integrations/touchpoints; 4-step acquisition flow; FAQ; proof placeholder; final CTA. |
| `/solutions/website-development` | Home 05 — App Builder | Browser/builder hero; specialization strip; large website-value features; 4-step process; website-objective showcase; programs shown explicitly as marketing-program context, not website pricing; connected SEO/usability touchpoints; proof placeholder; non-fabricated Insights slot; FAQ; final CTA. |
| `/solutions/social-media-community-lead-communication` | Home 06 — Help Desk | Support-dashboard hero; specialization strip; outcome/advantage cards; large social/communication features; programs; multi-channel integration field; proof placeholder; FAQ; final CTA. |
| `/solutions/digital-growth-marketing-strategy` | Home 07 — FinTech | Growth-path hero; specialization strip; strategy feature bento; setup-to-scale cards; 4-step strategy path; programs; proof slot; connected-system integrations; FAQ; final CTA. |

## Animation system

All six pages use GSAP + ScrollTrigger inside a React effect scoped by `gsap.context()` and cleaned with `ctx.revert()` on route unmount. This prevents one route from destroying another route's ScrollTriggers.

Shared interactions:
- Word-by-word heading reveals with reverse-on-scroll behavior.
- Directional section reveals and staggered card entrances.
- Scroll-linked parallax glows and hero-art movement.
- Button, card, link, pricing-card and integration-pill hover motion.
- Hero entrance sequence on mount.
- `prefers-reduced-motion` support.

Variant interactions:
- Home 02: floating creative cards, pulsing writing lines and scroll-linked showcase drift.
- Home 03: continuous orbital node motion.
- Home 04: staggered chat-bubble entry and inquiry-flow connector reveal.
- Home 05: continuously floating browser layers plus clipped article-slot reveals.
- Home 06: floating channel badges and alternating scroll-linked feature movement.
- Home 07: animated SVG growth-line draw and process-card perspective reveals.

## Content integrity

All factual Afyra content is grounded in the supplied Master Knowledge Base or existing homepage data derived from it. Unsupported reference-demo claims were not reused.

Two source gaps remain intentionally visible:
1. **Advanced Digital Systems** — no founder-approved technical/software capabilities are defined, so the page uses the phrase only for connected digital-growth systems.
2. **Website Development** — no approved standalone deliverables, stack, timeline, hosting, maintenance, revisions, or pricing are defined. The page preserves the reference layout while marking these details as `PENDING FOUNDER INPUT` rather than inventing them.
