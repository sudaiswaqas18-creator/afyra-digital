# Afyra Digital — Homepage Hero Response Corner Fix V38

## Requested correction
The V37 Response Rate image was inserted into the top row, which changed the existing dashboard layout. V38 corrects that without touching the already-working scroll assembly.

## Final behavior
- Restores the original V33/V36 hero dashboard layout exactly:
  - Qualified Inquiries
  - Appointments
  - Profile Views
  - Today's Schedule
  - Patient Inquiries chart
  - New Inquiries
  - Local Visibility
  - Google Business Profile optimized
  - Campaign live
- No original card is replaced, resized, or moved by the new card.
- The generated Response Rate card is placed only in the previously empty bottom-right corner below Local Visibility.
- The new slot spans the two 38px activity rows plus their gap, giving it almost exactly the same height as the 84px top-row cards.
- The generated PNG was only tightly cropped from the existing V37 asset (no new image generation) to remove transparent padding and the visible nested-card effect.
- The Response Rate wrapper keeps `data-af-hero-assemble-part="response-rate"`, so it participates in the exact same existing GSAP scatter → scroll dock → hover lifecycle as every other hero child card.
- Brand Communication `How it works` centering from V37 remains unchanged.

## Files
- `src/client/components/HeroParallaxDashboard.tsx`
- `public/static/generated/hero/response-rate-card-corner.png`
- `public/static/home-hero-response-corner-fix-v38.css`
- `src/renderer.tsx`
- `src/index.tsx`
