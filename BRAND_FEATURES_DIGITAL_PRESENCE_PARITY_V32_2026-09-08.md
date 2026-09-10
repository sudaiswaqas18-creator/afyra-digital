# Afyra Digital — Brand Features / Digital Presence Story Parity V32
Date: 2026-09-08

## Requested scope
Apply the Digital Presence **“A Complete Digital Ecosystem”** text-first → cards-reveal scroll mechanic to the **Brand & Creative Communication → Features** section without changing that page's approved copy or feature-card content.

## Implementation
### Brand & Creative Communication — Features
The Features story now uses the same reference timing grammar as Digital Presence on desktop/tablet:

1. Intro-only hold: `0.75`
2. Badge/heading/description exit: `0.46`, `power2.inOut`, `y:-30`, `scale:.985`
3. First card row reveal: `0.72`, `stagger:.09`, `power3.out`, from `y:46 / scale:.97 / rotateX:-3`
4. Inter-row hold: `0.22`
5. Second card row reveal: `0.72`, `stagger:.09`, `power3.out`
6. Settled hold: `0.62`

Desktop/tablet ScrollTrigger parity:
- trigger/pin surface: the Brand Features pin wrapper
- start: `top top+=68`
- scroll distance: `Math.max(650, innerHeight) * 2.9`
- scrub: `.52`
- `pinSpacing:true`
- `anticipatePin:1`
- `invalidateOnRefresh:true`

The intro fully exits before the feature-card reveal begins, so the intro and revealed cards do not visually coexist.

### Responsive behavior
Touch/mobile now mirrors the Digital Presence compact ScrollTrigger configuration as well:
- start: `top top+=54`
- scroll distance: `Math.max(650, innerHeight) * 3.35`
- `pin:true` on the same story wrapper
- `pinSpacing:true`
- scrub: `.52`
- `anticipatePin:1`

The Brand cards retain their responsive natural-height layout inside the pinned wrapper, then continue in normal document flow after the compact pin range ends.

### Existing page-specific visual choreography retained
The internal card visuals (rings, connected nodes, educational communication bars, short-form-video sheet, creative-assets library) still animate only after their parent card begins its reveal. Their continuous subtle motion remains unchanged.

## Stability fix
Removed the `transform:none!important` lock from the Brand Features pin wrapper in the V31 route-specific stylesheet so GSAP/ScrollTrigger can own the pin transform when the browser chooses transform-based pinning.

## Files changed
- `src/client/lib/useServiceAnimations.ts`
- `public/static/cross-page-animation-polish-v31.css`

## Static QA
- Parsed all 47 TypeScript/TSX source files with the TypeScript parser: **0 parse diagnostics**.
- CSS brace balance remains valid: **46 opening / 46 closing braces**.
- Verified the Brand desktop/tablet story now uses the Digital Presence timing values, start offset, scrub value, and distance formula.

## Runtime QA checklist
After `npm ci` and `npm run dev`:
1. Open `/solutions/brand-creative-communication`.
2. Confirm only the Features badge/heading/description are visible when the story starts.
3. Scroll: intro holds, then fades/scales upward completely.
4. Confirm top two feature cards reveal only after the intro exits.
5. Confirm lower three reveal next, with no overlap/flicker.
6. Reverse-scroll and confirm the sequence cleanly reconstructs the intro-first state.
7. Repeat on desktop, tablet, and mobile widths; confirm no pin jump, layout shift, or hidden lower cards.
