## Typography & color cleanup across sections

The site has 5+ ad-hoc tracking values, 5 different foreground opacities, three different h3 sizings, and inconsistent number/index treatments. Goal: lock a small, repeatable system and apply it everywhere — no visual redesign, just consistency.

### The system (define once in `src/index.css`)

Add four utilities alongside the existing `eyebrow` / `display-lg`:

| Class           | Purpose                          | Spec                                                                                                  |
| --------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `eyebrow`       | (exists) all small caps labels   | tracking-[0.2em] — **enforce this single value, kill 0.15 / 0.18 / 0.22 / 0.25 variants**             |
| `eyebrow-light` | (exists) same on dark bg         | same tracking 0.2em                                                                                   |
| `card-title`    | row/card h3 (Services, Featured) | `font-space-grotesk font-bold text-2xl md:text-3xl leading-tight`                                     |
| `sub-title`    | smaller h3 (About founder/highlights) | `font-space-grotesk font-semibold text-xl md:text-2xl leading-tight`                              |
| `lead`          | section lead paragraph           | `text-lg md:text-xl text-foreground/80 leading-relaxed` (light variant uses `text-slate-light/80`)    |
| `body-muted`    | secondary body                   | `text-base text-muted-foreground leading-relaxed`                                                     |
| `index-num`     | inline mono index (01, 02)       | `text-sm font-mono text-electric`                                                                     |

Color rules:
- Body text uses **only** `text-foreground`, `text-foreground/80`, or `text-muted-foreground` — remove `/60`, `/75`, `/85` variants.
- On dark sections, use `text-white`, `text-slate-light/80`, `text-slate-light/60` — same three-tier rhythm.
- Accent `text-electric` reserved for: editorial underline, index numbers, link hover, the single accented word in display headings, and stat values. No `text-electric/30` / `/60` decorative variants in body areas.

Tracking rules: every uppercase label uses 0.2em via `eyebrow` / `eyebrow-light`. Stop hand-rolling `tracking-[0.15em]` / `[0.18em]` / `[0.22em]` / `[0.25em]`.

### Sweep per file

- **`Services.tsx`** — drop oversized inline number (`text-3xl md:text-4xl` mono) → use `index-num`. Title → `card-title`. Deliverables → `text-lg text-foreground/80` (down from `/85`). "Case studies" link uses `eyebrow` not raw `tracking-[0.2em]`.
- **`FeaturedProjects.tsx`** — title → `card-title` (was `text-3xl md:text-4xl`). Meta row tracking `[0.18em]` → `eyebrow`. Stat label `[0.15em]` → `eyebrow`. Body `text-foreground/75` → `text-foreground/80`. "View case study" → `eyebrow`.
- **`About.tsx`** — founder name → `sub-title`. Accordion title → `sub-title`. Stat label `[0.18em]` → `eyebrow`. Body lead → `lead`, founder bio → `body-muted`, accordion body → `text-foreground/80` (drop `md:text-lg` jump). Stat number stays `font-space-grotesk text-5xl text-electric` (kept as featured stat).
- **`Testimonials.tsx`** — drop massive `text-electric/30` decorative quote mark OR shrink to a single `text-6xl text-electric/40` to fit system; quote body → `lead`; author name → keep `font-semibold text-foreground`; role/company → `body-muted` (kill the `text-sm text-electric` role color — too many accent moments).
- **`CaseStudyEntry.tsx`** — meta tracking `[0.22em]` → `eyebrow`; date label `[0.22em]` → `eyebrow`; sub-section labels → `eyebrow`. Card title → `card-title` (drops to `text-2xl md:text-3xl`, was `text-3xl md:text-4xl lg:text-5xl`); page H1 stays as is (it's the hero of that page).
- **`Hero.tsx`** — scroll cue tracking `[0.25em]` → `eyebrow-light`. Body → `lead` (light variant).
- **`CTA.tsx`** — body → `lead` (light variant). No other changes.
- **`Footer.tsx`** — already on `eyebrow`. Bottom bar `tracking-[0.2em]` → `eyebrow`.
- **`ContactForm.tsx`** — labels `[0.18em]` → `eyebrow-light`.

### Files touched

`src/index.css`, `src/components/Services.tsx`, `FeaturedProjects.tsx`, `About.tsx`, `Testimonials.tsx`, `CaseStudyEntry.tsx`, `Hero.tsx`, `CTA.tsx`, `Footer.tsx`, `ContactForm.tsx`.

Out of scope: section structure, copy, layout grids, color palette (only opacity discipline), font choices (Space Grotesk display + sans body stays).