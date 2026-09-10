# Homepage Hero — Child Card Dock Alignment V34
Date: 2026-09-08

## User-reported issue
The homepage hero scroll assembly completed, but the child cards still looked incorrectly placed on the parent dashboard. In the finished state several cards retained the old angled / floating-card rotation instead of becoming a clean, aligned dashboard like the SaaS King reference frame.

## Root cause
`home-final-polish-v23.css` still defines legacy `--af-rest-r` values (for example -7deg, +6deg, +10deg) on the same hero card classes.

The V33 grid correctly moved the cards into their final CSS grid cells, but `useGsapAnimations.ts` read those inherited legacy rotation variables through `restRotation()` and intentionally preserved them at the end of the tween. That is why x/y docking was correct while the cards still appeared crooked / poorly seated inside the parent dashboard.

## Fix
1. `public/static/home-hero-reference-dock-v33.css` now resets `--af-rest-r: 0deg !important` on every V33 dock-grid child.
2. `src/client/lib/useGsapAnimations.ts` now hard-locks the final rest rotation to `0` for the V33 reference dock, so older CSS cannot reintroduce tilt.
3. Scatter rotations remain unchanged at the opening state because they still come from `--af-scatter-r`. Only the final dock state is flattened.
4. Existing scrolling, scrub timing, scatter positions, responsive behavior and hover lift are preserved.

## Expected final state
- All 3 KPI cards align horizontally and sit square inside the parent dashboard.
- Today's Schedule, New Inquiries and Local Visibility align vertically in the right column.
- Patient Inquiries chart sits flat in the main left content area.
- Both lower activity rows sit flat and parallel to the dashboard edges.
- No child card keeps an angled resting pose after the scroll assembly completes.

## Files changed
- `public/static/home-hero-reference-dock-v33.css`
- `src/client/lib/useGsapAnimations.ts`
- `HOMEPAGE_HERO_CHILD_CARD_DOCK_ALIGNMENT_V34_2026-09-08.md`
