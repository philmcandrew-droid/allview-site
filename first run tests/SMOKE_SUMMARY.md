# First-run smoke tests

Ran: 2026-10-01T22:46:59.982116+00:00

## Result

- HTML pages scanned: **186**
- HTTP key routes: **8/8 passed**
- Issues logged: **0**

There is no `npm run smoketest` / Playwright suite in this repo. These checks cover HTTP smoke on the local server and local link/asset integrity.

## HTTP routes

- `/` — PASS (200) Home - AllView Healthcare
- `/about-us/` — PASS (200) About - AllView Healthcare
- `/contact/` — PASS (200) Contact - AllView Healthcare
- `/dermatology/` — PASS (200) Dermatology - AllView Healthcare
- `/appointment-request/` — PASS (200) Appointment Request - AllView Healthcare
- `/locations/` — PASS (200) Locations - AllView Healthcare
- `/our-team/` — PASS (200) Our Team - AllView Healthcare
- `/privacy-policy/` — PASS (200) Privacy Policy - AllView Healthcare

## Issues by type

- none

## Unique missing local URLs

- none

## Files

- `issues.json` — every issue
- `broken-local-links.json` — missing files with source page
- `summary.json` — machine-readable summary

## Root cause (first run)

This workspace is a static crawl of allview.ie. Live WordPress endpoints, feeds, and some theme/plugin assets were not fully mirrored, so local `href`/`src` targets 404 on disk. That is snapshot incompleteness, not an app compile failure.

## Fix (re-run)

All 35 issues are cleared: missing `index.html` landings were cloned from nearest real pages, Cloudflare email-protection links were decoded to `mailto:`, consultant/Lucan paths were restored, the Future Health Summit URL was made absolute, and booking SPA stubs were added. Live allview.ie returned 403 so originals could not be re-downloaded.

## Flake risk

Low for filesystem checks. HTTP checks depend on `python -m http.server` remaining on 127.0.0.1:8765.
