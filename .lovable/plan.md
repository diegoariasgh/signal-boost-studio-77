## Collapse the contact form

In `src/components/CTA.tsx`, replace the always-open `<ContactForm />` in the right column with a collapsible wrapper using shadcn `Collapsible`. Default state: closed. Trigger: an `outline-light` button labeled "Send a Message" with a `Mail` icon and a chevron that rotates on open. When opened, the form renders in place below the trigger.

Both CTAs (Book a Call + Send a Message) sit stacked in the left column under the headline — the right column becomes empty on large screens, so collapse the grid back to a single centered column (`max-w-2xl`) for a cleaner balance once the form is hidden by default.

### Layout after change

```text
Get in touch —
"We partner with mission-aligned teams…"
Share a few lines on your goal…

[ 📅 Book an Intro Call → ]
[ ✉ Send a Message      ⌄ ]   ← click expands ContactForm inline
```

### Files
- `src/components/CTA.tsx` — wrap ContactForm in Collapsible, add trigger button, restructure grid to single column.

Out of scope: ContactForm internals, edge function, styling tokens.