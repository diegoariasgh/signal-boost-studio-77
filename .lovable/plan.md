# Add Organization schema + trigger SEO scan

## What

`index.html` already has two JSON-LD blocks: a rich `ProfessionalService` and a minimal `Organization`. The minimal Organization block is what most LLMs and SEO crawlers key off, so we'll enrich it and then kick off a fresh SEO scan.

## Changes

### 1. Expand the `Organization` JSON-LD in `index.html`

Replace the current bare-bones block with a fuller record:

- `name`, `alternateName` ("Signalworks")
- `url` → `https://signalworks.xyz`
- `logo` → favicon URL already in `<head>`
- `description` → same one-liner used in the meta description
- `slogan` — "Mission-aligned advisory for venture & innovation across EMEA"
- `founder` — Diego Arias García with LinkedIn `sameAs`
- `foundingDate` — leave out unless the user confirms a year
- `areaServed` — Africa, GCC, Europe (mirrors ProfessionalService)
- `contactPoint` — `ContactPoint` with `contactType: "customer support"` pointing at the on-site contact form URL (`https://signalworks.xyz/#contact`) so LLMs answer "how do I reach them?" correctly without exposing the email we just removed
- `sameAs` — company LinkedIn + founder LinkedIn

Move both JSON-LD blocks from `<body>` into `<head>` while we're there — that's the conventional location and what most crawlers expect.

### 2. Trigger a fresh SEO scan

Call `seo--trigger_scan` after the edit. The scan needs user approval and runs ~1 minute; results show up in the SEO & AI search tab.

## Out of scope

- No changes to the `ProfessionalService` block (already detailed).
- No new routes, no per-route Helmet additions.
- No copy or layout changes.
