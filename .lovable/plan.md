# Geographic footprint map

A new full-height section, "Where we've worked", placed after About on the homepage. Dark navy night-map look inspired by your reference: dotted continents, glowing points, thin arcs. Electric blue replaces the gold so it matches the site.

## What it shows
- **Investment dots** in the 9 African markets, sized by number of deals: Morocco 6, Egypt 5, Côte d'Ivoire 2, Nigeria 2, Tunisia 1, Senegal 1, Cameroon 1, Kenya 1, South Africa 1.
- **Office launches**: Morocco and Egypt, marked with a ring.
- **Animated arrows showing provenance** (origin to destination):
  - InVivo / Pinecone: US to Qatar and Saudi Arabia (market entry, clinical trials, funding)
  - Plug and Play: Silicon Valley to the UAE and KSA offices (where you worked), and to the Egypt and Morocco offices you launched
  - Plug and Play deals: Morocco, Egypt, Kenya, Nigeria, Cameroon, South Africa
  - Incorporation research: African operating markets to holding jurisdictions (UK, Delaware, EU)
  - Further flows from your slides and CV (e.g. Spain, Qatar) once you confirm them
- **Filter chips**: All · Investments · Market entry · Research · Offices.
- **Hover or tap** a country or arrow: small card with the market, role and named deals (e.g. "Morocco · 6 investments: Chari, WafR, Jobop...").
- **Side panel** with the regional breakdown (North / West & Central / East & Southern Africa, GCC, Europe, US).
- On phones, the map stays simplified and the breakdown becomes a list below.

## Technical details
- New `GeoFootprint.tsx` with an inline SVG world map (dotted landmass via `react-simple-maps` + world-atlas TopoJSON), no tile provider or key.
- Data in a `geoFootprint.ts` file (markets, deals, flows) so updates are copy edits.
- Arcs as curved SVG paths with an animated stroke-dash "travel" effect and arrowheads; respects reduced motion.
- Colors from existing tokens (navy deep, electric blue); add a nav link and an anchor `#footprint`.
- No em dashes in copy; geography order "Africa, the GCC, and Europe".

## To confirm
- Plug and Play: offices in Egypt and Morocco (launched), plus work in the UAE, KSA and Silicon Valley offices. Deals in Morocco, Egypt, Kenya, Nigeria, Cameroon, South Africa. Any other flows from your slides.
