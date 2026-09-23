# Afyra Digital — Stability & Polish QA — 2026-09-05

## Scope

This pass addresses only the requested issues: route scroll reset, loader dismissal, shared section-label styling, detail-page CTA completeness, card image/header cleanup, Insights card completeness, About page balance/scroll behavior, Healthcare "Why Healthcare Is Different" balance, and service-specific hero animation polish.

## Implemented

### Route navigation
- Added deterministic top-of-page reset on pathname/search route changes.
- Scroll reset runs immediately, again on animation frames, and once after layout settles.
- Browser scroll restoration is forced to manual.
- Same-page hash/anchor navigation is not treated as a page route reset.
- Existing ScrollTrigger instances are cleaned before a new route lays out.

### Branded loader
- The initial boot loader has a React dismissal plus an independent HTML/CSS/JS failsafe.
- Route transition loader has a maximum visible timeout and CSS failsafe.
- `af-route-transitioning` is always removed during cleanup.

### Shared section labels
- Added `SectionLabel.tsx`, based on the homepage How-We-Work eyebrow/pill visual language.
- Applied to top-level section heads, About Founder Vision, detail-page sections/CTA, Request Consultation sections, and service-page section intros.
- Runtime compatibility conversion covers the currently packaged prebuilt client too.
- Labels receive a GSAP entrance reveal consistent with the existing site motion system.

### Detail-page CTA
- The final "Let's Grow Together"/growth-system CTA copy is present in source.
- Runtime fallback inserts heading/supporting copy if an older prebuilt route omits it.
- CSS prevents split-word GSAP states from leaving the heading/description invisible.

### Card image/header cleanup
- Removed redundant image-bottom gradient/caption overlay from generated card visuals.
- Kept semantic SVG icon badge clean and consistently positioned.
- Number badges on process/decision/terms/health cards are kept outside the image area and ordered before media.
- Card content/actions remain aligned and responsive.

### Insights
- Supporting copy is present in source for strategic-note and decision cards.
- Runtime fallback inserts approved decision-summary copy when an older bundle does not contain it.
- Card descriptions are forced visible and detail links align to the bottom without large dead zones.

### About
- "A Strategic Growth Partner" uses a deliberate two-column balance with equal comparison cards.
- "Founder’s Vision" no longer uses the jitter-prone GSAP pin on the About route.
- Desktop uses CSS sticky positioning plus per-card GSAP reveals for smoother synchronization.
- Tablet/mobile collapse cleanly.

### Healthcare
- "Why Healthcare Is Different" uses a balanced intro/content split.
- Eight needs cards form a consistent 2x4 desktop grid and collapse to 2-column/1-column responsively.
- Cards use equal internal spacing, image proportions, description area and bottom-aligned detail actions.

### Service hero animations
Each solution retains its own content-relevant hero motion:
- Brand & Creative Communication: content-system build, line/progress construction, badge/tag reveals.
- Digital Presence / Advanced Systems: connected orbit/ring and node motion.
- Patient Acquisition: inquiry conversation, typing, qualification/activity and journey flow.
- Website Development: browser/UI construction and block/progress build.
- Social/Community/Lead Communication: channel activation, conversation routing and ticket motion.
- Digital Growth Strategy: route drawing, node activation, staged labels and status progression.

## Responsive coverage
New rules include desktop, tablet, mobile and small-mobile handling at 980px, 720px and 420px breakpoints. Existing page colors/content and unrelated layout behavior were not intentionally changed.

## Validation
- Modified TS/TSX source files transpile with TypeScript syntax diagnostics: **PASS**.
- New runtime JavaScript `node --check`: **PASS**.
- New CSS brace integrity: **PASS**.
- Generated card/detail WebP assets present: **430**.
- `node_modules`: **excluded from deliverable**.

## Environment limitation
A fresh `npm ci`/production build could not complete because the sandbox could not resolve/download required npm registry tarballs (`EAI_AGAIN`). The deliverable therefore includes both the corrected React source and a final runtime compatibility CSS/JS layer referenced by the Hono HTML shell so the packaged prebuilt client receives the requested fixes as well.
