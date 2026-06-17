## Update About highlights + collapse default

`src/components/About.tsx`:

1. Remove `defaultValue="item-01"` on the Accordion so both items render collapsed.
2. Rewrite `highlights[0]` (Footprint):
   - **Summary:** "Active presence across UAE, KSA, Morocco, Egypt, Kenya, Nigeria, Tunisia, and South Africa, with working relationships in Europe and select partners in the US."
   - **Body:** unchanged ("Soft-landings and partnership development run through local operators, regulators, and accelerators in each market — not from a distance.")
3. Rewrite `highlights[1]` (Institutional credibility):
   - **Summary:** unchanged.
   - **Body:** "Engagements with Plug and Play, Open Startup (OST), NYU Stern, and programs backed by institutions like UM6P, OCP, the National Bank of Egypt, USAID, Digital Africa, the African Development Bank, and the EU — across venture studios, VC fund operations, and early-stage founders in fintech, biotech, IoT/AI, and energy & resource management."

Also bump the stat label "6 Core markets" → "8 Core markets" to stay consistent with the expanded market list.

Out of scope: other sections, layout, copy elsewhere.