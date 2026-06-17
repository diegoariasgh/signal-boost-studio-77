## Remove "Book an Intro Call" CTA

In `src/components/CTA.tsx`, delete the "Book an Intro Call" `<Button>` (the zcal.co link) and its surrounding wrapper. The "Send a Message" collapsible becomes the sole CTA in the section. Also drop the now-unused `Calendar` and `ArrowRight` imports.

No other changes.