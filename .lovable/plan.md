## Copy refresh — Services + About highlights

Two surgical edits to remove repetition and tighten the editorial voice.

### 1. Services ("What we do")

**Problem:** Each row has a description and three feature bullets that restate the same thing in different words (e.g. "Fund setup, deployment strategy, and portfolio operations" → bullets: "Fund setup, strategy, and operations" / "Deployment strategy and LP engagement" / "Portfolio structuring and secondaries").

**Fix:** Drop the feature bullet list entirely. Replace with one richer description paragraph + a single line of concrete deliverables/outcomes underneath (no bullets, comma-separated). The grid becomes simpler: title + description on the left, deliverables list on the right, "Case studies →" link.

Proposed copy:

- **01 Funds & Investors**
  - *Description:* "Fund setup, deployment strategy, and portfolio operations for emerging managers building in new markets."
  - *Deliverables:* Fund formation & ops · LP engagement · Portfolio value creation
- **02 Institutions & Accelerators**
  - *Description:* "Program design, scouting, and partnerships for the institutions building venture capability."
  - *Deliverables:* Program & cohort design · Scouting & diligence · Innovation strategy
- **03 Startups & Founders**
  - *Description:* "Narrative, fundraising, and cross-border GTM for founders going regional or global."
  - *Deliverables:* Pitch & investor materials · Fundraising strategy · Market entry & partnerships

Structural change: remove `<ul>` bullet markup; render the deliverables as a single line with `·` separators in a smaller, muted style. Keeps the editorial rhythm without parroting the description.

### 2. About highlights

**Problem:** "Regional Depth" and "Cross-Border Execution" both describe geography/local networks; the differentiation is fuzzy. "Proven Track Record" is the only non-geography item.

**Fix:** Collapse from 3 cards to **2 expandable accordion items**, with the third merged in. Default state: titles + one-line summaries visible; click to expand the full body. Uses existing shadcn `Accordion` (already in the project at `src/components/ui/accordion.tsx`).

Proposed highlights:

- **01 Cross-border execution** *(merges old Regional Depth + Cross-Border Execution)*
  - *Summary:* "Soft-landings, market entry, and partnerships across GCC, North Africa, Europe, the US, and Japan."
  - *Expanded:* "Active in UAE, KSA, Morocco, and Egypt with on-the-ground networks. Recent work includes US ↔ GCC market entry with soft-landings via top accelerators, grant and accelerator placements, and partnership development for multi-country expansion."
- **02 Proven track record**
  - *Summary:* "Engagements with global VC platforms, accelerators, and DFIs."
  - *Expanded:* "Strategy and workshops with Plug and Play, Open Startup (OST), NYU Stern, and programs backed by the African Development Bank. Recent work spans venture studios, VC fund operations, and early-stage founders in fintech, biotech, IoT/AI, and HR tech."

### Files

- `src/components/Services.tsx` — copy + bullet markup removal
- `src/components/About.tsx` — rewrite `highlights`, swap the manual list for shadcn `<Accordion type="single" collapsible>`, keep the numbered "01 / 02" + electric accent styling on triggers

### Out of scope

- Hero, CTA, Header copy
- Layout or typography changes beyond what the accordion swap requires
