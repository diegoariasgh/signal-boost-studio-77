## Rebalance the About section

The section is left-heavy (two paragraphs + founder block) and the right-column accordion ("Cross-border execution" / "Proven track record") repeats the same cross-border + recent-work language that already appears on the left. Goal: lighter, more evenly weighted layout with non-redundant copy.

### New layout

```text
┌──────────────────────────── header (full width) ───────────────────────────┐
│  About — "Experience across borders — GCC, Africa & Europe."               │
└─────────────────────────────────────────────────────────────────────────────┘
┌──────────────── LEFT (5/12) ────────────────┐  ┌─────── RIGHT (7/12) ───────┐
│  One tight narrative paragraph              │  │  Founder card (compact,    │
│  (positioning only, no "recent work" list)  │  │  horizontal: photo + name  │
│                                             │  │  + 2-line bio)             │
│  ── divider ──                              │  │                            │
│  Stat strip (3 items, mono numerals):       │  │  ── divider ──             │
│    7+ yrs · 6 markets · 4 sectors           │  │  Accordion (2 items,       │
│                                             │  │  rewritten — see below)    │
└─────────────────────────────────────────────┘  └────────────────────────────┘
```

Changes vs. today:
- Left drops the second paragraph (the "recent work spans…" block that overlaps the right column).
- Founder block moves to the **top of the right column** as a compact card, freeing the left side.
- A 3-item stat strip replaces the visual weight the founder block used to carry on the left.
- Right column keeps the accordion below the founder card.

### Copy rewrites

Left paragraph (single, tighter):
> Signalworks is a boutique advisory for the funds, founders, and institutions building across the GCC, Africa, and Europe. We sit at the intersection of early-stage investing, fund operations, and go-to-market — translating regional context into decisions that move.

Stat strip: `7+ Years` · `6 Core markets` · `4 Sectors of depth`

Founder card (right, condensed two-liner):
> Diego Arias García — operator-investor with a background in global VC platforms and boutique funds. Built fund ops in new markets, ran LP engagement, and supported VC-backed founders on fundraising and GTM.

Accordion items (rewritten to remove overlap with the left narrative, each takes a distinct angle):

1. **01 — Footprint & on-the-ground network**
   Summary: Active presence across UAE, KSA, Morocco, and Egypt, with working relationships in Europe, the US, and Japan.
   Body: Soft-landings and partnership development run through local operators, regulators, and accelerators in each market — not from a distance.

2. **02 — Institutional credibility**
   Summary: Work alongside global VC platforms, accelerators, and development finance institutions.
   Body: Engagements with Plug and Play, Open Startup (OST), NYU Stern, and programs backed by the African Development Bank — across venture studios, VC fund operations, and early-stage founders in fintech, biotech, IoT/AI, and HR tech.

(Removes the previous "Cross-border execution" / "Proven track record" items whose bodies duplicated the left-column copy.)

### Files

- `src/components/About.tsx` — restructure grid (5/7 split), move founder to right column top, add stat strip on left, swap accordion content.

Out of scope: header copy, founder photo, surrounding sections, design tokens.