## Make the nav "Get in touch" button pop in highlight blue

Swap the `Button` variant for the desktop nav CTA in `src/components/Header.tsx` (line 67–75) from `outline-light` to a filled electric-blue style. Use the existing `electric` token (`bg-electric text-white hover:bg-electric/90`) so it matches the brand highlight blue already used elsewhere (active nav link, accents).

Leave the mobile menu version (line ~112) as-is unless you'd like it changed too — it lives inside a popover where the outline reads better. If you want the mobile one matched as well, say so and I'll do both.

No other changes.