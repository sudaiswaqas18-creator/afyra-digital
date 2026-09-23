# Patient Acquisition Connected Touchpoints Ring Fix — V67

## Fixed
- Removed the mixed positioning model that allowed integration badges to collide.
- Added one explicit coordinate per integration item in `ReferenceSolutionExperience.tsx`.
- LinkedIn and Google Business now have distinct coordinates.
- Added a final CSS override in `patient-acquisition-v67-ring-fix.css` so legacy nth-child rules cannot reassign the same effective position.
- Used CSS `translate` for centering so GSAP `rotation` can counter-rotate labels without overwriting placement.
- Tablet keeps the same unique coordinate system with a smaller ring.
- Mobile switches to a static 2-column grid and disables orbit rotation so labels remain readable.

## QA
- 8 integration items.
- 8 unique coordinates.
- Minimum desktop center-to-center spacing at 820px ring: ~162px.
- Minimum tablet center-to-center spacing at 680px ring: ~134px.
- QA render: `QA/patient-connected-touchpoints-qa.png`.
