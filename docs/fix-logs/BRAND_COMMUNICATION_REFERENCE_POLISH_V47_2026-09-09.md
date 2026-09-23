# Brand & Creative Communication — Reference Polish V47

Scope: `/solutions/brand-creative-communication` only. No image generation was used.

## Implemented

- Hero rebuilt as a centered reference-style composition while preserving the existing rotating communication-focus text animation.
- Removed the floating hero side cards and converted the dashboard to a single two-sided card.
- Replaced the automatic dashboard flip with a GSAP ScrollTrigger scrub: the front face changes to the back face only as the user scrolls through the hero.
- Reworked the thin strip under the hero into a reference-style framed band with top/bottom rules, four corner points and muted communication-system items. No fabricated client count or review claim is used.
- The old service-detail editorial section remains removed from the Brand Communication route.
- Feature intro rebuilt as a clean centered white panel inside a large light stage; the old feature sticky/blank runway is overridden.
- Feature display rebuilt into the 2-top / 3-bottom reference bento composition. All five displays use HTML/CSS UI graphics, not generated images.
- Added GSAP reveal, orbit spin, hub pulse, node drift, meter movement, timeline-pointer movement and hover lift to the five display cards.
- Added a framed click-to-play video section with four corner points and full-width horizontal rules. It uses the existing Afyra dashboard as the poster and a CC0 MDN-hosted video as a temporary placeholder.
- Added the large strategic-solution arc. It begins as a white line and gains green/Afyra-compatible light/glow only when scrolled into view.
- Preserved the existing How It Works 01→02→03→04 scroll logic; only the layout/proportions/background were changed toward the supplied reference.
- Pricing rebuilt with the large `Pricing Plan` watermark, a framed card area, four corner points and the approved Afyra program prices/inclusions.
- FAQ rebuilt toward the supplied two-column reference: compact left copy/contact block and right accordion panel.
- Responsive rules added for tablet/mobile and reduced-motion fallbacks.

## Source files changed

- `src/client/pages/ServicePage.tsx`
- `src/client/lib/useServiceAnimations.ts`
- `src/renderer.tsx`
- `public/static/brand-communication-reference-v47.css` (new, final cascade)

## Validation in this sandbox

- TypeScript parser pass: no TS syntax errors detected in the modified TS/TSX files. Dependency-resolution errors remain expected because this export does not contain `node_modules`.
- CSS parsed with `tinycss2`: 210 rules, 0 parse errors.
- CSS brace balance: PASS.
- No image-generation asset was added.
