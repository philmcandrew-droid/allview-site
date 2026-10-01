# Page Override: How it works (`/process`)

**Overrides:** AllView Healthcare Master — brand navy `#002f87`, purple `#7d1690`, cyan `#60cbe8`, Vhi `#c40d3c`. Do not use the teal MASTER palette on this page.

## Intent

Show, don’t tell. A patient should *play the visit* in under 30 seconds, then book. Pathway (Vhi / HSE / Private) personalises wait, cost and step-one copy.

## Pattern

Immersive guided tour (hero stage) → wait comparison → prepare checklist + FAQ → pathway CTA.

- Primary CTA: after the tour completes, and again in the navy band.
- Skip: “Jump to questions” for impatient users.
- Mobile fallback: same player, no scroll-pinning (pinning fights phone scroll).

## Motion

- Scene crossfade 400ms `power2.out` on step change.
- Autoplay 5s per step, **paused** by default until Play — WCAG 2.2.2.
- `prefers-reduced-motion`: no autoplay, instant scene swap, no GSAP from-opacity.
- One decorative motion layer only; never parallax body copy.

## Interaction

- Prev / Next / Play-pause ≥44px.
- Arrow keys when the stage is focused; Space toggles play.
- `aria-live="polite"` announces the step title.
- Phosphor icons only. Official Vhi/HSE marks in the CTA, not as decoration.

## Anti-patterns

- Five identical stacked cards as the main experience.
- Scroll-pinning the whole journey on mobile.
- Autoplay that cannot be paused.
- Emoji as icons. Arbitrary `z-[9999]`.
