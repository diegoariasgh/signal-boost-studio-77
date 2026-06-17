## 1. Geography order — standardize to "Africa, the GCC, and Europe"

Two off-pattern mentions in `src/components/About.tsx`:

- Line 45 (H2): `— GCC, Africa & Europe.` → `— Africa, the GCC & Europe.`
- Line 55 (lead): `building across the GCC, Africa, and Europe` → `building across Africa, the GCC, and Europe`

All other mentions (Hero, Footer, AboutSignalworks page) already follow the correct order. No changes needed there.

## 2. Copy repetition cleanup

The same "Boutique advisory for funds, founders, and the institutions backing them — across Africa, the GCC, and Europe" sentence appears three times: Hero subhead, Footer, and (paraphrased) About lead. Plus "mission-aligned" appears in Hero H1, CTA H2, and Footer tagline.

Proposed differentiation:

- **Hero** (keep — it's the primary statement): `Boutique advisory for funds, founders, and the institutions backing them — across Africa, the GCC, and Europe.`
- **About lead** (rewrite to add substance, drop the repeated formula):
  > `We sit at the intersection of early-stage investing, fund operations, and go-to-market — translating regional context across Africa, the GCC, and Europe into decisions that move.`
- **Footer** (shorten to a tagline, no repetition):
  > `Senior-led venture & innovation advisory. Africa · GCC · Europe.`
- **Footer bottom tagline** (`Mission-aligned. Outcome-driven.`) — leave as is; it's the one place the phrase functions as a sign-off.

## 3. Refine "Led by" content

Current bio is generic ("Operator-investor with a background in global VC platforms…"). Tighten and add one concrete credibility anchor without duplicating the highlights accordion.

Proposed:

> **Diego Arias García** — Founder  
> `Operator-investor focused on early-stage venture across Africa, the GCC, and Europe. Previously led investment and programs at global VC platforms (Plug and Play) and boutique funds; now advises funds, accelerators, and founders on strategy, operations, GTM, and market entry.`

Also add a "Founder" role line under the name, so the block reads with the same hierarchy as the testimonials (name / role / body).

## 4. Mobile layout pass — `src/components/About.tsx`

Issues at <640px after the recent column merge:

- Stats row uses `grid-cols-3` with `gap-6` and `text-4xl` numbers — three columns crowd at 360–390px. Change to `grid-cols-3 gap-3 sm:gap-6` and step values down to `text-3xl md:text-5xl`.
- Founder block uses `gap-6` between photo and text — tight on mobile. Use `gap-4 md:gap-6`.
- Left column has `mt-10` between intro and Led by, and `mt-auto pt-8` to stats. On mobile (single column) the stats no longer need to be pushed to bottom — `mt-auto` becomes irrelevant on stacked layout, which is fine. Confirm spacing reads as `intro → Led by → stats` with breathing room: change `mt-10` → `mt-10 md:mt-12` for slightly tighter mobile.

No other components show obvious mobile breakage from a quick read of Hero / Services / FeaturedProjects / Testimonials / CTA, but I'll spot-check with a mobile screenshot after the edits.

## 5. Leftover improvements (suggestions, will implement if approved)

- **Hero H1** says "across EMEA" while the subhead says "Africa, the GCC, and Europe." EMEA technically includes the Middle East beyond the GCC. Either replace `EMEA` in the H1 with a tighter token (e.g. keep `EMEA` since it scans well visually, or switch to `three regions`), or drop the redundancy by changing the subhead to lead with a different angle (e.g. `Senior-led. Regionally embedded. Outcome-driven.`). Recommend: keep `EMEA` in H1, change subhead opening to remove redundancy.
- **Services intro** ("Tailored advisory across the venture ecosystem") + **About header** ("Experience across borders") + **Hero** ("advisory… across EMEA") all use "across" + a scope. Consider varying one of these — e.g. Services H2 → `Three practices. One operator-led team.`
- **Footer "Connect / Navigate"** — two columns of 2–3 links feels sparse. Could collapse into a single `Navigate` column with all links to free up footer space, or add an email link under Connect.
- `**Mission-aligned. Outcome-driven.**` footer sign-off is fine but reads close to Hero's "Mission-aligned advisory" headline. Could swap to something like `Senior-led. Regionally embedded.` to avoid the echo.

## Files touched

- `src/components/About.tsx` — geography order, lead rewrite, Led by refinement, mobile spacing
- `src/components/Footer.tsx` — short tagline replacement
- (optional, pending approval of §5) `src/components/Hero.tsx`, `src/components/Services.tsx`

## Verification

- Re-screenshot About section at desktop and at 390×844 mobile after edits.
- Grep for `GCC|Africa|Europe` once more to confirm consistent ordering.