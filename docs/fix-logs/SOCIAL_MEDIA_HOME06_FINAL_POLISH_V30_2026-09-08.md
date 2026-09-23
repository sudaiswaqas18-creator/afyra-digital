# Social Media / Home-06 Final Polish — v30 (2026-09-08)

Route: `/solutions/social-media-community-lead-communication`
Reference mechanics: SaaSKing Home-06 / Help Desk visual behavior supplied by the user.

## Implemented

### 1. Hero mockup — one-pass tilt-to-straight settle
- Shortened the ScrollTrigger travel so the mockup completes its straighten/settle transition in one normal scroll pass.
- Reduced scrub latency for a faster, tighter response.
- Explicitly settles `rotateX`, `rotateY`, `rotateZ`, skew and x-offset to zero while preserving the intended final scale/y position.
- Trust strip reveal remains synchronized with the card settle.
- Existing central dashboard visual and hero copy were not changed.

### 2. Communication System — rebuilt right-side animated system visual
Replaced the old static/pulsing radar with a dedicated Home-06-style communication system visual containing:
- central glowing communication disc,
- vertical amber/teal light beam,
- stacked cylinder/ring elements above the core,
- two dashed elliptical connector paths,
- six content-relevant icon nodes around the orbit,
- continuously moving dashed connector strokes,
- continuous orbit rotation with counter-rotating icon glyphs,
- core pulse, beam pulse and cylinder float loops,
- section entrance animation.

Afyra-relevant node concepts: Presence, Messenger, WhatsApp, Content, Community and Insights.

### 3. Growth System — removed sticky/deck implementation and rebuilt mixed grid
The previous sticky stacking/depth handoff has been completely removed.

New structure:
- top row: 2 cards,
- center row: 1 full-width feature card,
- bottom row: 2 cards,
- numbered badges 01–05 in the top-right,
- heading + description + embedded visual inside every card.

Existing Afyra content remains:
- Social Presence
- Content Direction
- Community Management
- Messenger Auto-Replies
- WhatsApp Business

Internal entrance choreography:
- Calendar card: cells scale up sequentially.
- Rules card: channel rules slide in sequentially.
- Center dashboard: image settles from a soft zoom.
- Inquiry queue: rows slide in sequentially.
- Team/channel visual: core and surrounding nodes scale in independently.

No sticky positioning, pinning, stack handoff or scroll-depth dimming remains in this section.

### 4. Connected Touchpoints — full fixed radial arc with continuous moving glow
- Rebuilt the dome larger and deeper to read as a complete half-circle system.
- Seven existing channel icons remain fixed in their radial positions:
  - Facebook
  - Instagram
  - TikTok
  - YouTube
  - WhatsApp
  - Messenger
  - Google Business Profile
- Removed the previous ring drift/orbit movement from the icon layer.
- Added two continuously rotating conic-light layers beneath the fixed icons for a broader, smoother traveling teal/amber glow.
- Afyra mark remains centered at the bottom of the dome.
- Entrance animation only affects initial icon appearance; icons stay spatially locked after reveal.

## Responsive behavior
- Desktop: full communication orbit, 2/1/2 growth-card grid and large radial touchpoint dome.
- Tablet: communication visual stacks below copy, mixed grid remains intact with reduced dimensions.
- Mobile: growth cards become a single-column normal-flow layout; communication orbit is compressed but remains animated; touchpoint dome and nodes scale down without sticky/pinning behavior.

## Files changed
- `src/client/components/ReferenceSolutionExperience.tsx`
- `src/client/lib/useReferenceSolutionAnimations.ts`
- `public/static/saasking-reference-solutions.css`

## Static verification completed
- TypeScript/TSX syntax parsed successfully using TypeScript `transpileModule` with zero syntax diagnostics for both modified TS/TSX files.
- CSS brace balance verified: opening/closing blocks match.
- Confirmed old social sticky selectors/data attributes are no longer present.
- Confirmed new growth-grid, communication-orbit and dual touchpoint glow selectors are wired between markup, GSAP and CSS.

## Environment limitation
A full Vite/browser runtime build could not be executed in this sandbox because project dependencies are not installed and the npm cache is incomplete for offline installation. Final visual/browser QA should therefore be run on the development machine with the project dependencies installed. The source-level implementation and syntax checks are complete.
