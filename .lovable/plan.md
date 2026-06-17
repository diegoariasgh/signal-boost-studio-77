## Cleanup + rebrand + SEO/GEO note

### 1. Remove "Overview" from header nav
`src/components/Header.tsx` — delete the desktop `Overview` link (lines 67–72). The `/about-signalworks` page stays live (still good for SEO/GEO crawlers and the JSON-LD it carries), it just isn't surfaced in the top nav. No mobile menu entry exists, so no change there.

### 2. Replace Manta Ray Ventures → 34 Ventures
"34 Ventures" is an AI venture studio builder (https://www.34stud.io).

- `src/components/Hero.tsx` — logo strip entry: `alt` → `"34 Ventures"`. Try to fetch the 34stud.io logo into `src/assets/34-ventures-logo.png`; if the fetch fails, keep the existing `manta-logo.png` reference temporarily and flag it.
- `src/pages/AboutSignalworks.tsx`:
  - Founder FAQ (line 33): "Manta Ray Ventures" → "34 Ventures".
  - `trackRecord` entry (line 60): name "34 Ventures", note "AI venture studio builder."

### 3. Strip email + zcal from `/about-signalworks`
- FAQ "How do you start working with signalworks?" (line 41) — rewrite to point at the contact form instead of email/zcal: *"Use the contact form on the homepage to share your goal and timeline. The first conversation is a fit and scoping discussion at no cost."*
- Contact section (lines 199–230) — remove the Email and Book-a-call list items; keep LinkedIn; add a single line directing visitors to the homepage contact form (`/#contact`).

Out of scope: Footer (already has only LinkedIn), Header CTA (already points to `#contact`), Hero CTA (already points to `#contact`).

### 4. SEO + GEO impact — short answer in chat after the change

I'll address this in the reply, not as code. The honest answer:

- **SEO** — strong on-page foundations (semantic HTML, unique `<title>`/meta, sitemap, internal linking, FAQ JSON-LD) get the page *eligible* to rank, but ranking comes from domain authority, backlinks, and time. New domains typically take 3–6 months to build trust. The fastest wins: keep `/about-signalworks` indexable, publish 1–2 narrow long-tail pages per quarter (e.g. "GCC fund formation advisory", "Africa VC market entry"), and earn 3–5 inbound links from credible sources (LinkedIn articles, podcast guest spots, the institutions in the track record).
- **GEO** (Generative Engine Optimization — being cited by ChatGPT/Perplexity/Gemini) — the FAQ JSON-LD already on `/about-signalworks` is the right move; LLMs disproportionately cite structured Q&A. To strengthen: use the entity name "Signalworks" consistently, add an `Organization` schema with `sameAs` links (LinkedIn, founder profiles), and make sure factual claims (markets, sectors, partners) appear in plain prose, not just inside graphics or accordion bodies.
- **Verification** — no one can guarantee impact. The honest measures are: (a) Google Search Console once the domain is live (impressions, position, CTR per query), (b) Semrush domain tracking month-over-month, (c) periodically asking the major LLMs "what is Signalworks?" / "who advises VC funds in the GCC?" and seeing whether you appear and whether the facts are correct.

I'll offer to trigger an SEO scan after the edits land so the scanner re-checks the current state.

### Files
`src/components/Header.tsx`, `src/components/Hero.tsx`, `src/pages/AboutSignalworks.tsx` (+ optional new `src/assets/34-ventures-logo.png`).