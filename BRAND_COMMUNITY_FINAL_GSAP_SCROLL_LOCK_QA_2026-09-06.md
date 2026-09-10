# Afyra Digital — Brand Community Final GSAP Scroll-Lock QA
Date: 2026-09-06

## Scope
Only the Brand & Creative Communication page's two pinned scroll stories were reworked in this pass:
- Features
- How It Works

## Root cause addressed
The previous triggers were anchored to the whole section rather than the actual visual pin target. Because each section includes top spacing/padding, ScrollTrigger could begin accumulating progress before the visual panel itself had reached the intended pinned position. This could make the Features story appear partly advanced, or make How It Works appear on step 02/03 before the user had actually entered the visual panel.

The previous implementation also refreshed ScrollTrigger on mobile height-only viewport changes. Mobile browser chrome can change viewport height while scrolling, which can cause pinned trigger positions to refresh in the middle of a scroll interaction.

## Final implementation
### Features
- `trigger` and `pin` are the same element: `[data-brand-feature-pin]`.
- `pin: true` behavior is implemented by pinning that element directly.
- `pinSpacing: true` owns the runway; no manual blank runway is added.
- `pinType: 'fixed'` keeps the visual shell stationary while scroll drives the internal timeline.
- Numeric scrub smooths the transition.
- Sequence:
  1. centered Features statement is held,
  2. statement fades out,
  3. first two feature cards reveal,
  4. remaining three feature cards reveal,
  5. all cards are held fully visible,
  6. pin releases to the Integrations section.
- The same ScrollTrigger logic is used at desktop, tablet and mobile widths.
- On smaller screens the same 2-card/3-card reference composition is scaled to fit instead of changing to an unrelated mobile animation.

### How It Works
- `trigger` and `pin` are the same element: `[data-brand-step-pin]`.
- The pinned composition includes the section heading, tabs and active step card.
- Step 01 is the initial state before the trigger becomes active.
- Sequence is deterministic and reversible: 01 → 02 → 03 → 04.
- Card 04 is held before release.
- `pinSpacing: true` prevents the next section from entering until the pinned animation range is complete.
- `pinType: 'fixed'` prevents the outer panel from translating with scroll.
- Reverse scrolling naturally drives 04 → 03 → 02 → 01.

## Responsive timing fix
- ScrollTrigger is no longer refreshed for mobile height-only resize events caused by browser address-bar collapse/expand.
- It still refreshes when viewport width changes, orientation changes, fonts finish loading, and after initial page load.
- Trigger order is sorted before refresh so the upstream Features pin spacing is accounted for before the downstream How It Works trigger is calculated.

## Files changed
- `src/client/lib/useServiceAnimations.ts`
- `src/index.tsx`
- `src/renderer.tsx`
- `public/static/brand-home2-gsap-lock-final.css` (new, loaded last)

## Source-level checks
- TypeScript/TSX transpile syntax check: PASS
- Final CSS brace check: PASS

## Runtime note
A full Vite production build could not be run inside this environment because project dependencies are not bundled in the supplied ZIP and package installation is unavailable/too slow in this sandbox. The source implementation and stylesheet are included for the project's normal `npm install` / `npm run dev` workflow.
