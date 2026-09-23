# Afyra Digital — Home Hero Layered Parallax Upgrade

## Reference checked

Reference: `https://themexriver.com/wp/saasking/`

The live reference homepage exposes eight separate hero dashboard image assets (`h1-d-img-1` through `h1-d-img-8`) plus a dedicated hero glow asset. The Afyra implementation follows that observable layered-dashboard motion model without copying the reference brand styling or source code.

## Afyra implementation

- Replaced the previous home hero static dashboard/floating-card composition with a layered 3D dashboard composition.
- 1 central Afyra dashboard plane.
- 8 independent Afyra dashboard cards/panels at different depth values.
- 2 soft Afyra glow layers behind the dashboard.
- GSAP entrance sequencing.
- ScrollTrigger scrub parallax with different travel distances for every layer.
- Small depth-sensitive horizontal drift and rotation.
- Subtle desktop pointer tilt for the complete dashboard group.
- Mobile skips expensive scrub/pointer tilt while preserving the layered composition and entrance motion.
- Reduced-motion preference is respected.

## Content/brand preservation

The hero retains Afyra Digital colors, typography and existing dashboard content, including:

- New Inquiries
- Today's Schedule
- Qualified Inquiries
- Appointments
- Profile Views
- Local Visibility
- Google Business Profile optimized
- Campaign live — Aesthetic consultations

No SaaS King colors, branding, wording or image assets were copied into the Afyra site.

## Files changed

- `src/client/components/Hero.tsx`
- `src/client/components/HeroParallaxDashboard.tsx` (new)
- `src/client/lib/useGsapAnimations.ts`
- `public/static/sections.css`
- `public/static/home-hero-parallax-2026-09-05.js` (production compatibility layer)
- `src/index.tsx`

## Runtime compatibility

The React source contains the final implementation for fresh development/future builds. The production compatibility script upgrades the currently packaged older static client hero at runtime, so the new hero is also available before a fresh production rebuild.

## Verification

- Runtime compatibility JavaScript syntax: PASS (`node --check`).
- `sections.css` brace/integrity check: PASS.
- 8 foreground hero layers found in source.
- 2 glow layers found in source.
- `node_modules` excluded from final package.

A complete TypeScript build could not be executed in this environment because npm dependency installation timed out; global TypeScript also cannot resolve the missing local `vite/client` type package without installed dependencies.
