# Afyra Digital — Homepage Hero Scroll Assembly QA

## Objective

Replace the previous hero dashboard motion with a true scroll-linked scattered-to-assembled dashboard interaction inspired by the mechanics visible on the Saasking homepage reference.

Reference inspected: https://themexriver.com/wp/saasking/

The reference homepage exposes multiple individual hero dashboard image layers plus separate glow imagery. The Afyra implementation uses the same interaction idea — independent dashboard pieces begin scattered and converge into one complete dashboard as the user scrolls — while retaining Afyra's own colors, content, icons and branding.

## Source implementation

### Hero dashboard

`src/client/components/HeroParallaxDashboard.tsx`

- One dashboard shell.
- Exactly one instance of each animated content piece:
  1. Qualified Inquiries
  2. Appointments
  3. Profile Views
  4. Today's Schedule
  5. Patient Inquiries chart
  6. New Inquiries
  7. Local Visibility
  8. Google Business Profile optimized
  9. Campaign live — Aesthetic consultations
- No cloned/duplicated card content.
- Final CSS positions are the real assembled dashboard positions.
- Desktop initial transforms are outward scatter offsets stored in CSS custom properties.

### GSAP assembly

`src/client/lib/useGsapAnimations.ts`

Desktop behavior:

- `gsap.timeline()` + `ScrollTrigger`.
- `trigger: heroSection`.
- `start: 'top top'`.
- Scroll-linked end distance is viewport-aware (`max(680px, 82vh)`).
- `scrub: 1.15`.
- Each part animates independently from its scattered transform to `x: 0`, `y: 0`, `rotation: 0`, `scale: 1`.
- Slightly varied timing preserves layered motion while all parts finish fully docked.
- Dashboard shell moves the least and settles behind the floating pieces.
- Two glow layers also converge independently for depth.

Responsive behavior:

- Desktop: full scroll-linked assembly.
- Tablet: assembled composition with a lightweight entrance reveal, no heavy scroll scrub.
- Mobile: single-column safe composition, no absolute-position collision risk.
- Reduced motion: all parts render directly in the assembled state.

## Runtime compatibility

`public/static/home-hero-parallax-2026-09-05.js`

The compatibility script upgrades the currently packaged static client without cloning any cards:

- Existing nodes are moved/reclassified in place.
- Existing Patient Inquiries chart is moved out of the old core dashboard and becomes an independent assembly piece.
- Previous hero-only ScrollTriggers are killed before the new assembly timeline is created.
- Fresh source builds are detected and left to the React GSAP hook so animation is never double-bound.

## Validation

- Hero component TSX transpilation: PASS
- GSAP hook TS transpilation: PASS
- Runtime compatibility JavaScript syntax: PASS
- CSS brace/integrity check: PASS
- Hero label count: each required dashboard content item appears exactly once in source.
- Static geometry simulation at 0%, 25%, 50%, 75% and 100% assembly progress found zero axis-aligned card intersections for the primary desktop layout.
- Mobile fallback removes scattered absolute transforms.
