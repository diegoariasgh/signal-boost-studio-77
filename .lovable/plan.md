## Goal

Tighten the "What we do" rows so number → title → deliverables read as one clean hierarchy with fewer competing type sizes.

## Changes to `src/components/Services.tsx`

1. **Remove the left-column description paragraph** entirely (the `<p>` under each title). Drop the `description` field from each service entry — it's no longer used.

2. **Make the number pop**: bump `01 / 02 / 03` from `text-sm` to `text-3xl md:text-4xl` (still mono, still electric), keep it baseline-aligned with the title. The number now reads as a counterweight to the title rather than a label.

3. **Restore deliverables as a bullet list** at a larger size:
   - Replace the joined `·`-separated paragraph with a `<ul>` of three items.
   - Each item: `text-lg md:text-xl`, foreground color, with a small electric `—` (or `·`) marker on the left.
   - Drop the "Deliverables" eyebrow above the list — the list speaks for itself and removes one more type size.
   - Stack items with `space-y-3`.

4. **Tighten the grid**: with the description gone, give the title column slightly less width and the deliverables more breathing room. Adjust to `md:col-span-5` title / `md:col-span-5` deliverables / `md:col-span-2` link (unchanged ratio), but remove `md:ml-12` indents that were tied to the now-deleted paragraph.

5. **Keep**: hover accent bar, "Case studies" arrow link, row borders, section wrapper, ids, slugs.

Result: each row has three clear sizes only — big number, big title, medium bullets — instead of five.

## Out of scope

- No changes to section header ("What we do" / display heading).
- No color, font, or token changes.
- No motion changes.
- Other sections untouched.
