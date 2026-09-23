# Afyra Digital — Website System + Sitewide Card Routing / GSAP V40

Date: 2026-09-08

## Requested changes

### 1. Website Development → Website System
- Reworked the four-card desktop stack so each incoming card settles directly above the previous card.
- Removed the old fast-scroll snap / blackout behavior.
- Kept every card visible during the handoff and used scrubbed transforms for smoother motion.
- Added a compact final release so the fourth card leaves the sticky stack cleanly and the next section can continue without a long dead scroll gap.
- Mobile keeps a normal staggered reveal instead of forcing the desktop sticky stack.

### 2. Remove “System Experience”
- Removed the Website Development `WebsiteSystemExperience` component and its source data from the page implementation.
- V40 CSS/runtime also suppress the legacy prebuilt section so the production compatibility bundle matches the rebuilt source.

### 3. Sitewide card details + navigation
- Added a global `CardRouteEnhancer` inside the React router.
- Existing relevant card/detail routes are preserved and preferred.
- Cards with an existing registered Afyra detail record resolve to that detail page.
- Cards without a dedicated registered record receive a safe context detail route based only on the card title, visible card summary and source-page context.
- Context details explicitly avoid inventing results, guarantees, deliverables, case studies or technical claims.
- Card bodies route to the resolved destination while nested buttons/links keep their own behavior.
- Dynamic/lazy-rendered cards are covered through a `MutationObserver`.
- Hero dashboard UI cards, FAQs and form controls are intentionally excluded because they are interface/decorative controls rather than content-navigation cards.

### 4. GSAP title hover
- Every enhanced route-bearing card title receives a GSAP underline reveal.
- The underline uses Afyra teal → amber → teal (`#00BBA0`, `#FF960D`).
- The title itself animates to Afyra teal during hover/focus and restores on leave/blur.
- Keyboard focus is supported for generated title links.

## Production compatibility
The project already contains prebuilt production chunks. Source changes are implemented normally, and `card-route-webstack-runtime-v40.js` bridges the existing prebuilt preview so V40 behavior is available without requiring the unavailable package reinstall/build step in this environment.

## QA
- V40 runtime JavaScript syntax: PASS
- Changed TS/TSX transpile syntax: PASS
- Website System Experience removed from Website Development source render: PASS
- V40 CSS loaded after earlier overrides: PASS
- Global card enhancer mounted inside BrowserRouter: PASS
- Context detail fallback + safe unknown-route redirect: PASS
- MutationObserver coverage for lazy/dynamic cards: PASS
- Static QA report: `QA/website-system-card-routing-v40.json`

A full `npm ci` / Vite rebuild could not be completed in this execution environment because external npm registry access is unavailable. The existing production bundle is therefore preserved and supplemented by the production compatibility runtime above.
