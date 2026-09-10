# Brand Community — Final GSAP Pin / Scrub Fix

## Root cause fixed
The Brand Community page had two separate animation systems targeting the same Features and How It Works elements. The later legacy layout-02 block created additional ScrollTriggers, so card state could advance before the user actually reached the section and mobile/desktop behavior could diverge.

## Features
- One authoritative GSAP timeline only.
- Neutral `data-brand-feature-pin` wrapper is pinned with `pin: true` and `pinSpacing: true`.
- Intro starts visible.
- Continued scroll while pinned fades the intro and reveals every feature card sequentially.
- The section cannot release until the complete reveal timeline reaches its end.
- Reverse scrolling reverses the same scrubbed timeline.
- Same pin logic runs at all viewport sizes; only scroll distance changes.

## How It Works
- One authoritative GSAP ScrollTrigger only.
- Neutral `data-brand-step-pin` wrapper is pinned with `pin: true` and `pinSpacing: true`.
- Step 01 is explicitly initialized before entry.
- While the pin is active, scroll progress changes 01 → 02 → 03 → 04.
- The next section cannot be reached until the pinned range is completed.
- Re-entering from below starts from step 04 and reverses correctly; leaving above resets to step 01.
- Same pin logic applies to desktop, tablet, and mobile.

## CSS conflict prevention
Historical CSS used `position: sticky !important` on the inner panels. New neutral pin wrappers were added so GSAP can own pinning without fighting those historical styles. The inner panels are forced to normal relative positioning while the wrapper is pinned.

## Validation
- Confirmed exactly 1 Features pin trigger.
- Confirmed exactly 1 How It Works pin trigger.
- Confirmed exactly 2 `pin: true` occurrences for these two sections.
- Removed the duplicate legacy Features / How It Works ScrollTrigger logic from the later layout-02 animation block.
- TS/TSX syntax parse completed without syntax errors; dependency-resolution errors remain because the supplied local `node_modules` is incomplete.
