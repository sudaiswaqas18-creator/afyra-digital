# Afyra Digital — Reference Solution Experiences / GSAP QA

Date: 2026-09-06
Status: SOURCE IMPLEMENTATION COMPLETE / PRODUCTION REBUILD REQUIRED

## Scope completed

The five requested Afyra solution pages now use dedicated reference-mapped visual experiences instead of the previous shared generic service-page treatment.

| Afyra solution | Layout | Motion/layout reference |
| --- | --- | --- |
| Digital Presence / Advanced Digital Systems | 03 | SaaSKing Blockchain / Web3 (Home 03) |
| Patient Acquisition & Lead Generation | 04 | SaaSKing AI Chatbot (Home 04) |
| Website Development | 05 | SaaSKing App Builder (Home 05) |
| Social Media, Community & Lead Communication | 06 | SaaSKing Help Desk (Home 06) |
| Digital Growth & Marketing Strategy | 07 | SaaSKing FinTech (Home 07) |

Header and footer component structure were intentionally preserved. Layout 02 / Brand & Creative Communication keeps its existing implementation and GSAP boundary.

## New implementation files

- `src/client/components/ReferenceSolutionExperience.tsx`
- `src/client/lib/useReferenceSolutionAnimations.ts`
- `public/static/saasking-reference-solutions.css`

## Modified integration files

- `src/client/pages/ServicePage.tsx`
- `src/client/lib/useServiceAnimations.ts`
- `src/index.tsx`
- `src/renderer.tsx`

## Original Afyra visual assets

All replacement visuals are original Afyra-specific assets using the approved palette rather than copied SaaSKing artwork.

- `/static/ref-solutions/digital-presence-hub.webp`
- `/static/ref-solutions/patient-acquisition-hub.webp`
- `/static/ref-solutions/website-development-hub.webp`
- `/static/ref-solutions/social-communication-hub.webp`
- `/static/ref-solutions/growth-strategy-hub.webp`
- `/static/ref-solutions/digital-presence-flow.mp4`

The supplied Home-03 hero video was recolored into the Afyra palette and compressed to a web-ready H.264 MP4. Generated images were optimized to WebP.

## GSAP / interaction coverage

The new reference experience includes:

- staged hero entrance timelines
- hero scroll parallax
- forward/reverse rotating halo systems
- continuously floating UI chips and ambient elements
- pointer-driven 3D hero depth/tilt on capable devices
- deterministic pinned storytelling sections using ScrollTrigger scrub
- first-statement hold, exit and progressive content-card reveal
- feature-card signal animation
- GSAP card hover lift, scale, glow and icon response
- visual-theater clip-path reveal and scroll parallax
- animated visual hotspots
- SVG integration path draw
- integration icon reveal, float and hover response
- process-line draw and process-card reveal
- layout-04 inquiry/conversation staged reveal
- layout-05 alternating website-module slide/rotate reveals
- layout-06 radar rings, core pulse and communication metrics
- layout-07 S-curve strategy roadmap path scrub and node reveals
- pricing-card entrance and hover choreography
- trust/FAQ/CTA scroll reveals
- reduced-motion handling
- mobile/compact breakpoint behavior
- ScrollTrigger cleanup and refresh handling

## Content and brand safeguards

- Afyra remains positioned as an agency and strategic growth partner.
- The core positioning line remains: “We Don’t Run Ads. We Bring Leads.”
- Current approved marketing programs/pricing are used without modification.
- No fake results, testimonials, awards or guarantees were added.
- Website Development does not invent standalone project pricing/scope where founder-approved information is missing.
- The Afyra palette is used throughout: `#DEF1F0`, `#00BBA0`, `#00443E`, `#FF960D`.
- Reference sites informed layout/motion language only; SaaSKing logos, copy and imagery were not reused.

## Performance safeguards

- Generated hero/support images are WebP.
- Non-hero system imagery uses lazy loading and async decoding.
- Hero video is compressed, muted, looped and uses metadata preload.
- Reduced-motion users are respected.
- GSAP behavior is page-scoped so the existing Layout 02 animation system does not compete with Layouts 03–07.

## Static QA performed in this workspace

PASS:

- TypeScript/TSX syntax transpilation check for the new component, new GSAP hook and modified service files.
- New image/video asset references match files present under `public/static/ref-solutions`.
- Header/footer rendering path remains the existing shared `Header` / `Footer` components.
- Legacy `useServiceAnimations` now exits for layouts other than `02`, preventing animation conflicts.
- New CSS is linked in both client and SSR renderer entry points.
- No visible SaaSKing brand copy was introduced into the new reference components.

## Required developer-side production check

A full Vite production build could not be executed in this sandbox because project dependencies are not installed and outbound package installation is unavailable here. The existing compiled files under `public/static/client*.js` therefore remain the previous build output.

Before deployment, run from `webapp` on the developer machine:

```bash
npm install
npm run build
```

Then perform browser QA at desktop/tablet/mobile sizes and verify:

1. no console errors;
2. all five solution routes resolve correctly;
3. pinned sections release correctly after their final state;
4. no content overlap when quickly scrolling in either direction;
5. hover interactions only run on pointer-capable devices;
6. mobile sections never create horizontal overflow;
7. Home-03 recolored video starts smoothly and remains muted;
8. header and footer remain unchanged across all five pages;
9. reduced-motion mode removes nonessential motion;
10. final built bundle contains the new `ReferenceSolutionExperience` source changes.

## Final implementation assessment

The source implementation is ready for the production rebuild/browser pass. It recreates the requested reference motion language with original Afyra visuals, page-relevant content, GSAP ScrollTrigger storytelling and isolated animation boundaries while preserving the existing global header/footer.
