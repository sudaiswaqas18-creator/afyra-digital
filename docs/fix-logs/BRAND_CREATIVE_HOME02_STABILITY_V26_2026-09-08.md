# Afyra Digital — Brand Creative Communication Home-02 Stability V26

Date: 2026-09-08
Baseline: Homepage Hero Unified V25
Scope: Brand Creative Communication solution page only (`sv-layout-02`) plus the shared stylesheet registration required to load the new isolated override.

## Task 1 — Features section

- Reworked the Features intro into a centered, stable, normal-flow presentation modeled on the supplied Home-02 composition.
- Removed the former transform/pin dependency from this area so the intro no longer creates page-level pin spacing or transform jumps.
- Rebuilt the five feature cards as a 2-card top row + 3-card lower row on desktop, with responsive single-column behavior on narrow screens.
- Added card-by-card GSAP reveal choreography instead of revealing the complete block at once.
- Added separate inner-visual motion for the ring visual, connected idea pills, educational highlight bars, short-form-video visual and creative-assets library visual.
- Entrance animation is ScrollTrigger-driven without pinning; continuing decorative motion is lightweight and isolated from document flow.

## Task 2 — Integrations section

- Removed the Afyra hub/logo element that was colliding visually with the WhatsApp node.
- Repositioned WhatsApp as its own clean node on the bottom-center portion of the curved connector.
- Rebalanced all nine integration nodes across one U-shaped path.
- Split the connector into a stable base path plus a dedicated tracer path.
- Added continuous GSAP tracer movement along the connector while the section is in view; no layout-affecting transforms are used on the section wrapper.
- Kept the section responsive with scaled nodes/path rather than switching to a broken free-floating arrangement.

## Task 3 — How It Works

- Rebuilt the section around four tab controls:
  1. Choose Service
  2. Add Positioning & Guidelines
  3. Generate Assets
  4. Refine & Publish
- Added one guide line per tab and synchronized active-line/tab state with the scroll progress.
- Reworked the cards into the Home-02-style numbered step card with icon, large faded number, title, description and supporting detail.
- Removed GSAP transform pinning from the section. The viewport hold now uses CSS `position: sticky`; ScrollTrigger only scrubs the card state. This avoids pin-spacer/transform conflicts that caused the page to shake or jump.
- Implemented the complete 01 → 02 → 03 → 04 cross-fade/slide sequence with one continuous scrubbed timeline.
- Added click-to-step behavior on the four tabs while preserving the scroll-driven sequence.
- Added mobile safeguards so all cards remain renderable and GSAP opacity controls are not defeated by legacy `display:none` rules.

## Stability / responsive implementation

- New isolated stylesheet: `webapp/public/static/brand-creative-stability-v26.css`
- Loaded last in both SSR and client HTML so the V26 fixes override legacy Home-02 patch layers without changing unrelated page layouts.
- Features and Integrations use normal document flow; the How It Works hold uses CSS sticky rather than a transform pin.
- Existing mid-scroll refresh protection remains intact.
- No horizontal document overflow was found in static layout QA at 1440px, 820px or 390px widths.

## Files changed from V25

- `webapp/src/client/pages/ServicePage.tsx`
- `webapp/src/client/lib/useServiceAnimations.ts`
- `webapp/src/index.tsx`
- `webapp/src/renderer.tsx`
- Added `webapp/public/static/brand-creative-stability-v26.css`

## QA completed

- TypeScript/TSX syntax transpilation diagnostics: PASS for the changed page/animation sources and both HTML render entry points.
- CSS parsing: PASS, zero parse errors.
- Static responsive layout checks: PASS at 1440px desktop, 820px tablet and 390px mobile; no horizontal overflow detected.
- Features intro now spans the intended available desktop container width rather than inheriting the old 760px cap.
- How It Works card sizing/positioning was hardened against older `!important` width rules and against legacy mobile `display:none` behavior.
- Integrations has no Afyra hub beside WhatsApp after the source change.

## Build-environment note

A full Vite production build could not be executed in the supplied project snapshot because the local dependency tree does not contain the Vite binary (`npm run build:client` returns `vite: not found`). Source-level syntax checks, CSS parsing and browser-based static responsive layout QA were completed instead. This is an environment/dependency limitation of the supplied snapshot, not a source syntax failure found in the V26 changes.
