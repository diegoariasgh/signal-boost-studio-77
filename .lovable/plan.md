## Goal

Refresh the landing page to feel more editorial, cinematic, and visually striking — inspired by sendemo.org — while keeping the existing Signal Works color palette (deep navy, electric blue, slate/cream neutrals) and all current copy, sections, and links.

## What's "clunky" today

- Every section uses the same recipe: centered icon chip → centered H2 → tiny gradient underline → centered subhead → card grid. Visual monotony.
- Heavy reliance on bordered white cards with soft shadows — feels SaaS-template, not boutique.
- Hero typography is large but conventional; no editorial moment.
- No anchoring imagery or texture; the page reads as a stack of equal-weight blocks.

## Design direction (sendemo-inspired, not sendemo-cloned)

**Editorial, cinematic, confident.** Borrow these moves:

1. **Oversized uppercase display type** as the primary visual element — headlines that span the viewport, tight tracking, underline accents on key phrases (sendemo's signature move).
2. **Tiny lowercase eyebrow labels** ("signalworks is", "what we do", "trusted by") in place of icon chips + centered H2s.
3. **Full-bleed hero** with a cinematic navy-gradient background and a scroll cue in the corner. Drop the floating icon chip row — it competes with the headline.
4. **Asymmetric editorial layouts** instead of centered card grids: left-aligned headlines, two-column splits where one column is type and the other is content, generous negative space.
5. **Flat, borderless content blocks** with hairline dividers (1px navy/10%) instead of shadowed cards. Cards reserved only for testimonials.
6. **Minimal top nav** — wordmark left, sparse text links right, single subtle CTA. Replace the hamburger-only header on desktop with inline links (keep hamburger on mobile).
7. **Sticky section index** on the side (optional, desktop only) showing About / Services / Testimonials / Contact as scroll progresses.

Palette stays exactly: `--navy-deep`, `--electric-blue`, `--slate-light`, plus existing gradients/shadows tokens. No new colors. Typography stays Space Grotesk (already distinctive enough when sized editorially).

## Section-by-section changes

**Header**
- Desktop: wordmark + inline nav links (About / Services / Testimonials / Contact) + "Book a call" button. Hamburger only below `md`.
- Transparent over hero, solid navy-on-scroll.

**Hero**
- Remove the 4-icon chip row.
- Eyebrow: `signalworks is —` (small, lowercase, slate).
- Headline: oversized uppercase, two-to-three lines, with underline accent under one key phrase ("MISSION-ALIGNED ADVISORY FOR VENTURE & INNOVATION ACROSS MENA"). Electric-blue underline strokes mimic sendemo's underline rhythm.
- Subhead unchanged, left-aligned under headline.
- CTAs left-aligned, not centered.
- "Scroll" cue bottom-right.
- "Previous projects" logo strip stays, but moves to its own slim band with a hairline divider above — not crammed into the hero.

**About**
- Drop the icon chip + centered H2. Use eyebrow `about —` and a left-aligned oversized headline.
- Two-column editorial split: left = narrative + founder bio (flat, no card), right = the three highlights as a numbered list (01 Regional Depth / 02 Proven Track Record / 03 Speaking & Mentoring) with hairline dividers between rows, not boxed.
- Founder portrait larger, treated as an editorial image not a tiny avatar.

**Services**
- Eyebrow `what we do —`, oversized left-aligned headline.
- Replace the 3-card grid with three full-width stacked rows. Each row: large numeral (01/02/03) + service title + description on the left, bullet features on the right, "View case studies →" as a text link not a button. Hairline divider between rows. Hovering a row reveals an electric-blue accent bar on the left.

**Testimonials**
- Eyebrow `testimonials —`, oversized headline.
- Feature the two real quotes large and editorial — full-width quote with massive opening quote mark in electric blue, attribution underneath in small caps. Stack vertically (or 2-up on desktop) instead of 3-card grid.
- "More quotes coming soon" rendered as a minimal text row, not a card.

**CTA**
- Keep navy background but go full-bleed editorial: oversized headline left-aligned, supporting copy + buttons in a right column. Drop the glow blobs (feels generic) — replace with a single large electric-blue underline stroke or a subtle grid texture in navy.

**Footer**
- Unchanged structurally, just align typography to the new system (smaller eyebrow-style labels, hairline divider).

## Technical notes

- All changes are presentation-only: edit `src/components/Header.tsx`, `Hero.tsx`, `About.tsx`, `Services.tsx`, `Testimonials.tsx`, `CTA.tsx`, `Footer.tsx`.
- No new colors, no new fonts, no new dependencies. Reuse existing tokens in `index.css` (`--electric-blue`, `--navy-deep`, `--gradient-signal`, `signal-transition`).
- Add 1–2 small utility classes in `index.css` if needed (e.g. `.eyebrow`, `.display-xl`) rather than repeating long Tailwind chains.
- Keep all copy, links, routes, and case-study placeholders exactly as they are.
- Keep the existing logo carousel and the two new logos (Manta, IVB).
- Mobile: collapse oversized type gracefully; keep hamburger nav.

## Out of scope

- No new color palette, no new fonts, no new imagery generation, no new sections, no copy rewrites, no backend/data changes, no changes to the case-study sub-pages.

## Suggested follow-up (after this redesign lands)

Once the structure feels right, we can optionally add one cinematic hero image or a subtle animated background (e.g. a slow signal-wave SVG) — but I'd recommend landing the typographic refresh first and judging from there.