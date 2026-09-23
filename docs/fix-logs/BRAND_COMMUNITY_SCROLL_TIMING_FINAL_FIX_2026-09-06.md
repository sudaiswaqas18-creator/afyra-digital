# Brand Community — Final GSAP Scroll Timing Fix

This pass only targets the two remaining timing issues on the Brand & Creative Communication page.

## Features section
- The intro remains the initial state before the section reaches its scroll start.
- Feature cards are reset to hidden whenever the user is above the section.
- The animation starts only when the Features story reaches its actual trigger point.
- Scrolling back above the section restores the intro and hides the cards again.
- Responsive resize/orientation changes now refresh ScrollTrigger positions so laptop/tablet/mobile trigger timing is recalculated.

## How It Works section
- Step 01 is forced as the initial state while the user is above the How It Works scroll range.
- Card progression is only calculated while the How It Works trigger is active.
- Progression thresholds are intentionally staged: 01 -> 02 -> 03 -> 04.
- The section keeps a longer responsive scroll runway so users must scroll through the card sequence before naturally reaching the next section.
- Scrolling back above the section restores Step 01.
- ScrollTrigger is refreshed after responsive resize/orientation changes.

## Important
No pricing, integrations, hero content, program pricing, or unrelated website content was changed in this pass.
