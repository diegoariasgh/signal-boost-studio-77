## Replace zcal and mailto CTAs with anchor links to the contact form

Two leftovers point users away from the new contact form:

1. **`src/components/Header.tsx`** — desktop nav (line ~79) and mobile menu (line ~122) both have a "Book a call" / "Book a Call" button linking to `https://zcal.co/diegoarias/30min`. Change both to in-page anchor `#contact` and rename to **"Get in touch"**. Drop `target="_blank"` / `rel="noopener noreferrer"`.

2. **`src/components/Hero.tsx`** — primary CTA (line ~61-66) has `<a href="mailto:diego@signalworks.xyz">Get in Touch</a>`. Change to `href="#contact"` and keep the same label "Get in Touch".

Both now scroll users to the `#contact` section, which contains the collapsible contact form.

No other changes. Files: `src/components/Header.tsx`, `src/components/Hero.tsx`.