## Sharp Rectilinear button system

Replace pill buttons site-wide with zero-radius, uppercase Sora-labeled buttons that match the editorial aesthetic.

### Changes

1. **`src/components/ui/button.tsx`** — Update shadcn button variants:
   - Remove `rounded-md` from base; set `rounded-none`.
   - Default font: `font-display font-extrabold uppercase tracking-wider text-sm`.
   - `default` (primary): `bg-electric text-white hover:bg-electric/90`, no radius.
   - `outline` (secondary): `border-2 border-white/20 text-foreground hover:border-foreground hover:bg-white/5`.
   - `ghost`, `secondary`, `link`: align radius + casing; keep behavior.
   - Sizes: bump default padding to `px-8 py-5` for hero-weight CTAs; keep `sm` for header use (`px-6 py-2 text-xs`).
   - Add `active:scale-95` micro-interaction.

2. **`src/components/Header.tsx`** — "Book a call" button: switch to outline variant, small size, remove any rounded-full overrides.

3. **`src/components/Hero.tsx`** — Confirm "Get in Touch" uses primary (with arrow icon, already present) and "Learn More" uses outline. Remove any leftover `rounded-*` classes.

4. **Audit other CTAs** in `Services.tsx`, `FeaturedProjects.tsx`, `About.tsx`, `Contact.tsx`, case study pages — strip any `rounded-full` / `rounded-md` overrides so the new sharp shape flows through.

### Out of scope

- Color palette, typography weights, or layout changes beyond the button itself.

### Verification

Screenshot hero + header at desktop to confirm sharp corners, electric-blue primary, and outline secondary render as in the chosen prototype. Spot-check Contact and a Case Study page.
