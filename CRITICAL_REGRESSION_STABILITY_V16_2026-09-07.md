# Afyra Digital — Critical Regression & Scroll Stability V16

Scope is deliberately limited to the regressions requested on the homepage, Patient Acquisition & Lead Generation, and Brand & Creative Communication. No package/pricing/content redesign was introduced.

## Restored — Patient Acquisition & Lead Generation
- Preserved the previously approved homepage-style Process / How We Work replacement for System Experience, with Patient Acquisition-specific four-step content.
- Restored GSAP `ScrollTrigger` pricing-card fan/tilt → straight alignment animation.
- Removed the responsive CSS rule that disabled pricing-card transforms, and added contained tablet/mobile tilt start states so the animation remains visible without horizontal overflow.

## Stabilized — Brand & Creative Communication
- Features now uses one pinned visual frame with intro and bento cards grid-stacked in the same viewport; cards begin appearing while the intro recedes so no blank pin phase occurs.
- How It Works keeps every step card in one centered stage and divides the pinned scroll into four synchronized phases; tab state follows the visible card for steps 1–4.
- Integrations uses a normal-flow scrubbed SVG line-draw + sequential icon/hub reveal instead of a redundant third pin, removing a major page-jump source while keeping the requested entrance mechanic.
- Removed the competing infinite `y` tween that fought the integration entrance animation.
- Reduced ScrollTrigger refreshes and prevented layout recalculation after the user has already begun scrolling; resize refresh is width-change/orientation-only.

## Stabilized — Homepage
- Replaced the two competing hero assembly ScrollTriggers with one timeline/ScrollTrigger that owns both pinning and the scrubbed tilt/assembly motion.
- Prevented delayed global refreshes from recalculating pin positions after scrolling has started.
- Added compositor/backface stability rules for the animated hero assembly.

## Validation performed
- TS/TSX syntax/transpile validation passed for the modified hooks/components and entry files.
- Final CSS override is loaded last in both client entry/render paths.
- ZIP integrity is checked after packaging.

A full Vite browser build cannot be run in this sandbox because the supplied local dependency tree does not include the Vite executable. Runtime device/browser QA should still be performed in the normal project environment after extraction.
