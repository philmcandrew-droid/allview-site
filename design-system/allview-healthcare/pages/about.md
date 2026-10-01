# Page Override: About (`/about`)

**Overrides:** Brand navy `#002f87`, purple `#7d1690`, cyan `#60cbe8`, Vhi `#c40d3c`. Ignore teal MASTER tokens.

## Intent

Professional trust page that stays interactive. A visitor should *choose* a chapter (wait / method / partners / proof), not scroll a brochure.

## Pattern

Trust & Authority: Hero (mission) → Interactive story chapters → Client proof (Vhi/HSE) → Awards by year → Certs / governance → CTA.

## Interaction

- Chapter tabs `aria-pressed`, ≥44px.
- Award year filter; colour is not the only selected cue.
- Official Vhi/HSE SVGs only. Phosphor icons. No emoji.
- No `gsap.from` opacity (Strict Mode can leave copy invisible).

## Anti-patterns

- Wall of company copy with no controls.
- Recoloured unofficial logos.
- Auto-playing award carousels.
