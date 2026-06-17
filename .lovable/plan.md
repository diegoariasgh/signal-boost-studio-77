## Balance the About two-column layout

The right column (founder card + accordion) is much taller than the left (intro + stats), and the left is `sticky`, which makes the imbalance obvious.

Change in `src/components/About.tsx`:

- Switch the grid from `items-start` to `items-stretch` so both columns fill the same row height.
- Remove `lg:sticky lg:top-32` from the left column.
- Make the left column a flex column (`flex flex-col h-full`) with the intro at top and stats pushed to the bottom (`mt-auto`), so its top and bottom edges align with the right column's founder card and last accordion item.

Result: equal-height columns, intro aligned with the founder card at the top, stats aligned with the bottom of the accordion. No copy or styling changes beyond layout.