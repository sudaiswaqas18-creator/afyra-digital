# Social Media / Home-06 Rebuild — v20 (2026-09-07)

Route: `/solutions/social-media-community-lead-communication`
Reference mechanics: SaaSKing Home 06 / Help Desk demo.

Implemented:

1. **Hero**
   - Dedicated Home-06 hero component.
   - Afyra communication dashboard sits inside an amber/teal framed mockup with corner anchors.
   - GSAP ScrollTrigger scrub settles the mockup from a slight 3D tilt into a smaller, higher final state and reveals the healthcare audience strip.

2. **Communication System**
   - Retained Afyra Presence / Communication / Community content in the Home-06 left-copy + right-radar + three-card structure.
   - Existing GSAP reveal choreography and radar pulse/orbit are preserved.

3. **System Experience removed**
   - The previous `ExperienceVisual` section is no longer rendered on layout 06.

4. **Growth System**
   - Replaced the previous pinned feature reveal with dedicated sticky/deck cards.
   - Cards use native sticky stacking plus GSAP arrival/depth handoff.
   - Added communication-specific dashboard/calendar/rules/inquiry/team visuals without importing SaaSKing assets.

5. **Current Programs**
   - Rebuilt as a consistent 3-card dark pricing grid with highlighted Patient Growth Plan.
   - Added reference-style segmented billing control and GSAP/hover lift treatment.
   - No unsupported annual price or discount was invented. Yearly state explicitly keeps current approved monthly pricing visible.

6. **Connected Touchpoints**
   - Rebuilt as a large half-circle/dome with seven Afyra-relevant channels placed on the arc.
   - Continuous GSAP rotating conic-light band plus gentle channel orbit/drift.

Responsive behavior:
- Desktop/tablet use the sticky stack and full orbit field.
- Mobile switches the sticky stack to normal-flow cards and compresses the hero/orbit geometry to avoid pinning instability.

Files changed:
- `src/client/components/ReferenceSolutionExperience.tsx`
- `src/client/lib/useReferenceSolutionAnimations.ts`
- `public/static/saasking-reference-solutions.css`
