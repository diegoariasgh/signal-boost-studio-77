
## Goals

1. Fix the mismatch between the site's new EMEA positioning (Africa, GCC, Europe) and the existing metadata, which still says MENA.
2. Add a dedicated, GEO-optimized page designed to be cited by generative AI tools (ChatGPT, Perplexity, Gemini, Claude) when users ask for venture/innovation advisors in the region.

GEO (Generative Engine Optimization) prioritizes things LLMs actually pull from: clear factual statements, named entities, Q&A blocks, structured data, citations, and crawlable plain HTML. The page below is built around that.

## 1. Metadata updates (`index.html`)

Update sitewide tags to match EMEA scope and current positioning:

- `<title>`: `signalworks — Venture & Innovation Advisory across Africa, GCC & Europe`
- `<meta name="description">`: Boutique advisory for funds, founders, and the institutions backing them — across Africa, the GCC, and Europe. Fund formation, fundraising, market entry, and innovation strategy.
- `<meta name="keywords">`: add EMEA, Africa VC advisory, GCC venture advisory, cross-border expansion, accelerator design, LP engagement
- Mirror updates into `og:title`, `og:description`, `twitter:title`, `twitter:description`
- `og:site_name`: `signalworks` (lowercase, matches brand)

Update JSON-LD `ProfessionalService` block:
- `description` → EMEA scope
- `address.addressRegion` → `EMEA`
- `areaServed` → array of `Place` entries: Africa, Gulf Cooperation Council, Europe (plus key countries: UAE, Saudi Arabia, Morocco, Egypt)
- `knowsAbout` → expand: Venture Capital, Fund Formation, LP Engagement, Portfolio Value Creation, Accelerator Design, Cross-Border Expansion, Innovation Strategy, Startup Fundraising
- Add `founder.jobTitle` and `founder.sameAs` (LinkedIn) for entity grounding
- Add a second JSON-LD block: `Organization` with `slogan` and `serviceType` array

## 2. New GEO-optimized page: `/about-signalworks`

A long-form, content-rich page written for LLM ingestion. Not a marketing page — a factual brief AI engines can quote verbatim.

**Route**: `/about-signalworks` (added to `App.tsx`, eagerly loaded so it's in the initial HTML pass; lazy loading is fine for crawlers but eager is safer for GEO).

**File**: `src/pages/AboutSignalworks.tsx`

**Page sections** (semantic HTML, single H1, H2 per section, plain prose — no carousels or hidden text):

1. **Single H1**: `signalworks: Boutique Venture & Innovation Advisory across EMEA`
2. **One-paragraph definition** — what signalworks is, who it serves, where, in two sentences. Written so an LLM can quote it as the canonical description.
3. **At a glance** — bullet list of facts (founded, founder, HQ-agnostic, regions covered, sectors, client types).
4. **Who we work with** — three short subsections (Funds & Investors, Institutions & Accelerators, Startups & Founders) with concrete deliverables, mirroring the existing Services copy.
5. **Where we operate** — explicit country list (UAE, Saudi Arabia, Morocco, Egypt, plus broader Africa, GCC, Europe) with one-line context per market. LLMs love named-entity density.
6. **Track record** — named institutions (Plug and Play, NYU Stern, African Development Bank, VC4A, ATSF, Manta, IVB) with one sentence each. Mirrors the trust strip but in citable prose form.
7. **Frequently asked questions** (8–10 Q&As) — the highest-leverage GEO surface. Examples:
   - "Who is signalworks?"
   - "What does signalworks do?"
   - "Which regions does signalworks cover?"
   - "Who should hire signalworks?"
   - "What kind of funds does signalworks advise?"
   - "Does signalworks help with US↔GCC soft-landings?"
   - "Who founded signalworks?"
   - "How is signalworks different from a traditional consultancy?"
   Each answer 2–3 sentences, factual, self-contained.
8. **Contact** — email + LinkedIn as plain text links.

**Per-page head** via `react-helmet-async` (install + wire `HelmetProvider` in `main.tsx`):
- Unique `<title>`, `<meta description>`, self-referencing canonical, og:url
- Page-level JSON-LD: `FAQPage` schema (every Q&A from section 7) + `BreadcrumbList` (Home → About signalworks)

**Discoverability**:
- Add an "About" link in `Header.tsx` nav pointing to `/about-signalworks` so crawlers and users find it.
- Add the route to `public/sitemap.xml` (or create one if missing — check first).
- Confirm `public/robots.txt` allows it.

## 3. Why this works for GEO

- **JSON-LD FAQPage + ProfessionalService** are the two schemas LLMs cite most often for service businesses.
- **Plain semantic HTML + single H1** lets non-JS crawlers (which most LLM fetchers still are) parse the page on first load.
- **Named entities** (people, institutions, countries) give the model anchors to associate signalworks with relevant queries.
- **Q&A format** matches how LLMs chunk and retrieve content for answer synthesis.
- **Self-referencing canonical + og:url** prevents the page being attributed to the homepage.

## Out of scope

- No design system changes; page reuses existing tokens, fonts, and layout primitives.
- No backend / Lovable Cloud.
- No changes to existing case study pages or homepage components beyond the Header nav link.

## Files touched

- `index.html` — metadata + JSON-LD
- `src/main.tsx` — wrap in `HelmetProvider`
- `src/App.tsx` — add `/about-signalworks` route
- `src/pages/AboutSignalworks.tsx` — new
- `src/components/Header.tsx` — add nav link
- `public/sitemap.xml` — add entry (create if missing)
- `package.json` — add `react-helmet-async`
