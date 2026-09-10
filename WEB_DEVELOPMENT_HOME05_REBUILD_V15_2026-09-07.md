# Web Development — Home-05 Rebuild V15

Applied the requested App Builder/Home-05-inspired rebuild to the Web Development solution page while retaining Afyra Digital branding, approved content, header/footer, and current program pricing.

## Implemented
1. Hero mockup now uses a browser/editor-style frame with Afyra website visual, corner anchor points, and GSAP perspective tilt-to-flat scroll motion.
2. Website System rebuilt as four image-based sticky stacking cards, followed by a category pill row and 2x2 website preview gallery.
3. How It Works rebuilt on a dark section with a large glowing dome/half-circle and active-card highlight motion.
4. System Experience replaced with a two-column accordion layout and GSAP open/close transitions.
5. Current Programs rebuilt as a dark hero-style visual panel with current Afyra program names/prices, two CTAs, positioning line, visual callouts, and healthcare audience row.
6. Connected Touchpoints removed from the Web Development page.
7. Trust & Proof rebuilt as alternating image/text rows with continuous teal/amber GSAP border-light tracing.

## Added assets
- public/static/ref-solutions/web-dev/01-credibility.svg
- public/static/ref-solutions/web-dev/02-positioning.svg
- public/static/ref-solutions/web-dev/03-audience.svg
- public/static/ref-solutions/web-dev/04-proof.svg
- public/static/ref-solutions/web-dev/template-clinic.svg
- public/static/ref-solutions/web-dev/template-practice.svg
- public/static/ref-solutions/web-dev/template-brand.svg
- public/static/ref-solutions/web-dev/template-multilocation.svg

## Main files changed
- src/client/components/ReferenceSolutionExperience.tsx
- src/client/lib/useReferenceSolutionAnimations.ts
- public/static/saasking-reference-solutions.css

## Validation
- Modified TS/TSX files passed TypeScript syntax transpilation checks.
- Connected Touchpoints is no longer rendered for layout 05.
- Website standalone scope/timelines/pricing remain explicitly marked as pending rather than invented.
