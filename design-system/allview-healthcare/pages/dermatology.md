# Page Override: Dermatology (`/dermatology`)

**Overrides:** Brand navy `#002f87`, purple `#7d1690`, cyan `#60cbe8`, Vhi `#c40d3c`. Ignore teal MASTER tokens.

## Intent

Clinical service for the general public. People arrive anxious. Show who it is for, what happens, and the next link — in everyday English.

## Pattern

Trust & Authority + Conversion: Hero → Start-here pathways → What we treat → How a visit works → Stories → CTA.

## Accessibility

- One h1. Sequential headings. Skip link already in the header.
- Body 16px+, contrast ≥4.5:1 (`text-muted` on paper).
- Subnav and cards ≥44px. Visible focus (cyan ring).
- `aria-current="page"` on the section you are in.
- No autoplay. No opacity-from GSAP on copy.

## Suggested links (apply on every page)

1. Book — `/book` (path query when known)
2. How the visit works — `/process`
3. Find a clinic — `/locations`
4. Vhi members — `/dermatology/process-vhi`
5. GP / HSE — `/dermatology/gp-referral`
6. Private price — `/dermatology/process`
7. Prepare — `/patient-information/teledermatology`
8. Stories — `/dermatology/case-studies`
9. Call — `tel:+35312248100` or Vhi `tel:+35312248111`

## Anti-patterns

- Wall of WordPress HTML.
- Medical jargon without a plain sentence first.
- Links that go nowhere useful.
