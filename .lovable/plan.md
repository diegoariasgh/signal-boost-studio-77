## Typography refresh: Sora (display) + Manrope (body)

Replace Space Grotesk across the site with a true two-font system, and fix the synthetic-weight bug on display headlines.

### Changes

1. **`index.html`** — Replace Google Fonts `<link>` with Sora (400, 500, 600, 700, 800) + Manrope (300, 400, 500, 600, 700). Drop Space Grotesk import.

2. **`tailwind.config.ts`** — Update font families:
   - `display: ['Sora', 'sans-serif']`
   - `sans: ['Manrope', 'sans-serif']` (body default)
   - Keep `mono` as-is for now.

3. **`src/index.css`** — Audit display utilities (`.display-lg`, `.display-md`, eyebrow, etc.):
   - Change `font-black` (900) usages to `font-extrabold` (800) so we use a real loaded weight (no synthetic faux-bold blur).
   - Body inherits Manrope automatically; no per-component edits needed.
   - Leave `.editorial-underline` thickness/offset untouched (already tuned).

4. **No component edits required** — all headings/body use the semantic font tokens, so the swap flows through Hero, About, Services, FeaturedProjects, Case Study pages, and the header automatically.

### Out of scope

- Monospace font upgrade (numeric labels stay on system mono — can be a follow-up).
- Any copy or layout changes.

### Verification

Reload preview, spot-check Hero H1, About H2, Services cards, and a Case Study page for: (a) no blurry faux-bold, (b) consistent body rendering in Manrope, (c) editorial underline still sits correctly under the new display font.
