# Afyra Digital — Cross-Page Animation Polish V31
Date: 2026-09-08

## Scope
This pass addresses the four requested regressions across Website Development, Brand & Creative Communication, Digital Presence, and the homepage hero.

## 1. Website Development — Website System scroll stability
- Rebuilt the Website System sticky-card transition so there is always a valid visible card state.
- Removed the outgoing `autoAlpha: 0` + blur/brightness state that could create a blank/dark frame between cards.
- Incoming cards now begin partially visible and slide/scale into their sticky position.
- The previous card only recedes slightly (`scale`/`y`/partial opacity) while the next card becomes fully opaque.
- Added exact end-state setters for forward completion and stable reverse-scroll behavior.
- Added route-scoped CSS so visual/copy layers stay visible and no inherited filter can black out the section.

## 2. Brand & Creative Communication — Features text-to-card reveal
- Replaced the previous independent intro/card entrances with the Digital Presence story mechanic:
  1. centered intro is fully visible first,
  2. scroll hold,
  3. intro fades/scales upward,
  4. top two cards reveal,
  5. lower three cards reveal,
  6. internal card illustrations animate in after each card group.
- Desktop/tablet: one isolated GSAP ScrollTrigger pin with `pinSpacing`, scrub, and the same easing family/timing structure as the Digital Presence ecosystem story.
- Mobile: same text-first/cards-second choreography in normal document flow to avoid pinning a five-card grid taller than the viewport.
- Existing internal living motion remains after reveal.

## 3. Digital Presence — A Complete Digital Ecosystem spacing
- Added responsive top breathing room to the card grid while the story is pinned.
- Desktop, tablet, and mobile values are independently constrained so the cards no longer sit against the heading region.

## 4. Homepage — exact hero card docking
- Preserved the unified dashboard parent architecture.
- Changed the settle trigger to a shorter, tighter scrub.
- The dashboard frame is no longer clipped early at ~98.5% progress.
- At the true end of the animation, every moving module is explicitly snapped to `x:0`, `y:0`, `scale:1`, and its final resting rotation before the dashboard receives the docked/overflow-contained state.
- Added `onLeave` / `onScrubComplete` finalization and clean reverse behavior.
- Reasserted the authoritative final slot coordinates in the V31 stylesheet.

## Files changed
- `src/client/lib/useReferenceSolutionAnimations.ts`
- `src/client/lib/useServiceAnimations.ts`
- `src/client/lib/useGsapAnimations.ts`
- `src/index.tsx`
- `public/static/cross-page-animation-polish-v31.css` (new)

## Static verification performed
- Parsed all 47 TypeScript/TSX source files with the TypeScript parser: **0 syntax errors**.
- Verified the V31 stylesheet brace balance: **46 opening / 46 closing braces**.
- Verified the V31 stylesheet is linked after all prior route-specific override styles.
- Verified the requested V31 code markers exist in the three animation modules.

## Environment limitation
A full Vite/browser runtime build could not be completed in this sandbox because the project dependencies are not bundled in the ZIP and package installation did not complete in the available container session. Final visual browser/device QA should therefore be run on the development machine after `npm ci` / `npm run dev`.

## Device QA checklist
### Website Development
- Scroll Website System forward and backward repeatedly.
- Confirm no blank/black frame and no card gets stuck invisible.
- Confirm every incoming card becomes fully opaque before it owns the sticky state.

### Brand & Creative Communication
- Confirm intro is the only visible stage initially.
- Continue scrolling and verify intro exits before cards reveal.
- Verify top pair, then bottom trio, then internal visuals animate in.
- Confirm no page jump at pin entry/exit.

### Digital Presence
- Confirm card grid has visible breathing room below the ecosystem heading on desktop/tablet/mobile.

### Homepage
- Scroll the hero to the end of its assembly range.
- Confirm all nine modules land inside their designated dashboard slots.
- Reverse the scroll and confirm cards leave the dock smoothly without clipping.
