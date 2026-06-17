## Footer "Connect" cleanup

Drop the redundant `signalworks.xyz` link from the Connect column in `src/components/Footer.tsx`. Replace with options that actually drive off-site/contact engagement:

**Proposed Connect list:**
- LinkedIn (existing)
- Contact (anchor to `#contact`, scrolls to the new contact form)

Then to keep the three-column footer balanced, collapse the redundant "Contact" entry out of the Navigate column (since it now lives under Connect, which is the more natural home for it).

Result:
- **Connect —** LinkedIn · Contact
- **Navigate —** About · Services · Testimonials

No other footer changes. Only `src/components/Footer.tsx` is touched.

Want me to go with this, or would you prefer Connect to show something else entirely (e.g. an email address, booking link, or just LinkedIn on its own)?