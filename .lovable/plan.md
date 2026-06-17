## Goal
Rebalance the About section by moving the "Led by — Diego Arias García" block into the left column, directly under the Signalworks description. The right column then holds only the highlights accordion, making the two columns visually closer in height.

## Changes — `src/components/About.tsx`

**Left column (lg:col-span-5):**
1. Keep the Signalworks intro paragraph at top.
2. Add the "Led by —" eyebrow + founder photo + name + bio directly underneath it.
3. Keep the stats row anchored to the bottom via `mt-auto`.

**Right column (lg:col-span-7):**
1. Remove the founder block.
2. Keep only the highlights `Accordion`.
3. Drop the `space-y-10` wrapper since it now holds a single child.

## Notes
- No copy changes.
- Founder photo stays the same size; layout (photo left, name + bio right) is preserved.
- Grid stays `lg:grid-cols-12` with `items-stretch` so both columns continue to fill the row height.
