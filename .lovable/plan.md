## Goal
Bring the three case study pages (`CaseStudiesFunds`, `CaseStudiesInstitutions`, `CaseStudiesStartups`) in line with the editorial dark aesthetic established on the landing page — oversized Space Grotesk display type, electric-blue accents, generous negative space, hairline dividers instead of card chrome, and the `editorial-underline` treatment.

## Changes per page

**Hero section**
- Drop the slate-tinted hero block and rounded icon badge.
- Replace with a full-bleed dark intro: small uppercase eyebrow ("Case Studies — Funds & Investors"), oversized display headline using the same `display-xl` / Space Grotesk Black treatment as the home hero, with one accent word wrapped in `editorial-underline`.
- Lead paragraph in muted foreground, max-w-2xl.
- Replace the `Button variant="ghost"` back link with a subtle inline arrow link ("← Back to Services") in the eyebrow row.

**Case study list**
- Remove `Card`/`CardHeader`/`CardContent` chrome and the rounded-pill category tag.
- Each study becomes a full-width editorial entry separated by hairline `border-t border-foreground/15` dividers (matching Services/FeaturedProjects).
- Two-column layout per study on desktop: left column = index number (01, 02…), category label (uppercase tracked), title (display type), client line in electric blue. Right column = the three Challenge / Solution / Results blocks stacked, each with an uppercase tracked label, thin top rule, and bullet items using a small electric-blue square or dash instead of the dot.
- On hover, the row gets a faint background tint and the title shifts to electric blue (reuse `signal-transition`).

**Typography & tokens**
- Use only semantic tokens (`text-foreground`, `text-muted-foreground`, `text-electric`, `border-foreground/15`). No `bg-slate-light`, no `bg-card/50 backdrop-blur`.
- Headings: `font-space-grotesk font-black uppercase tracking-tight`.
- Body: existing body font, `text-muted-foreground`.

**Shared section structure**
- Wrap content in `min-h-screen` sections consistent with the Core memory rule.
- Keep `Header` and `Footer` unchanged.

## Technical notes
- All three files share the same structure, so factor the repeated markup into a small local component inside each page (or a shared `CaseStudyEntry` component in `src/components/`) to avoid duplication.
- Preserve all existing case study content verbatim (titles, clients, challenges, solutions, results, categories) — only presentation changes.
- No routing, data, or business-logic changes.

## Files touched
- `src/pages/CaseStudiesFunds.tsx`
- `src/pages/CaseStudiesInstitutions.tsx`
- `src/pages/CaseStudiesStartups.tsx`
- (new) `src/components/CaseStudyEntry.tsx` — shared editorial row component
