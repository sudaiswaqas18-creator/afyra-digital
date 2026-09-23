# Afyra Digital — Hero Response Card + Brand How It Works Center V37

## Scope
Two requested changes only.

### Task 1 — Homepage hero missing child card
- Added the generated **Response rate — 89% — +12%** PNG as a real hero child card asset.
- Asset path: `webapp/public/static/generated/hero/response-rate-card.png`.
- The card wrapper uses `data-af-hero-assemble-part="response-rate"`, so the existing homepage GSAP assembly automatically includes it in the same scatter → dock → hover lifecycle as the other hero cards.
- Expanded the final dock from 3 KPI slots + utility column to **4 KPI slots + utility column**.
- Final top row order: Qualified Inquiries → Appointments → Profile Views → Response Rate → Today's Schedule.
- Main chart/activity rows now span the four KPI columns; right-side utility cards remain in the utility column.
- Existing scroll timing/scrub logic was not changed.

### Task 2 — Brand Communication / How It Works centering
- Preserved V36 sticky runway and 01→02→03→04 scroll sequence.
- Centered the entire How It Works composition in a viewport-wide centering context.
- Centered heading, sticky frame, scroll stage and inner shell.
- No How It Works GSAP timing or card-transition logic was changed.

## New final override
`webapp/public/static/home-hero-response-card-howitworks-center-v37.css`

This stylesheet is loaded after V36 so older route-level width/grid rules cannot override the requested final state.
