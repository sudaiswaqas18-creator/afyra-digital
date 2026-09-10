# Afyra Digital — Brand Community Final Features + How It Works Pin Lock

## Scope
This pass changes only the Brand & Creative Communication page scroll-story behavior for:

1. Features
2. How It Works

## Features behavior
- The trigger begins only when the Features section itself reaches the viewport pin point.
- The feature wrapper is pinned with GSAP ScrollTrigger (`pin` + `pinSpacing`).
- Scroll momentum on first entry is clamped so the animation cannot arrive already half-complete.
- The intro is visible first.
- The intro exits on scroll.
- Feature cards reveal sequentially, one after another.
- The final fully-revealed state is held before the pin releases.
- `scrub: true` is used so the visual timeline cannot lag behind the scroll position when the section releases.
- `fastScrollEnd` is disabled so a fast wheel/touch gesture cannot force the story animation to its end prematurely.
- Scroll distance scales by viewport width but the locking logic is the same on desktop, tablet, and mobile.

## How It Works behavior
- Step 01 is the initial state before the section activates.
- The How It Works pinned wrapper now contains both its heading and card panel, so the complete section remains visually locked.
- Scroll drives the sequence 01 → 02 → 03 → 04.
- A final hold is included after step 04 before release.
- `scrub: true`, `pinSpacing: true`, and `fastScrollEnd: false` are used for strict lock-until-complete behavior.
- Reverse scrolling drives the timeline backward naturally.
- On leaving upward, the section resets to step 01.

## Validation
- TS/TSX parse check completed with the system TypeScript compiler. No syntax parse errors were reported in the edited files; unresolved dependency/type errors are expected because this ZIP intentionally excludes `node_modules`.
- A full Vite production build could not be completed in this sandbox because dependency installation timed out.
