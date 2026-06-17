## Goal

Three changes:
1. Footer: 2026 copyright, remove email, keep LinkedIn.
2. Replace "Chat with us" WhatsApp button in the CTA section with a real contact form that emails submissions to you.
3. Form fields: Name, Email, Company, "I'm a..." (Fund / Investor / Institution / Accelerator / Founder / Other), Message, Timeline.

## 1. Footer edits (`src/components/Footer.tsx`)

- Remove the `diego@signalworks.xyz` list item entirely.
- Keep `signalworks.xyz` and `LinkedIn` links.
- Update `© Signalworks, 2025` → `© Signalworks, 2026`.
- Also fix the lingering MENA copy in the footer blurb to match the rest of the site: "Boutique advisory supporting funds, founders, and institutions across Africa, the GCC, and Europe."

## 2. Contact form (replaces "Chat with us")

### Backend
- Enable Lovable Cloud (required for email sending).
- Use Lovable Emails (built-in) for delivery — no external Resend account, no API key needed.
- Set up email infrastructure + scaffold the app-email send function.
- Create one Edge Function `send-contact-message`:
  - Validates input with Zod (name 1-100, email valid, company 0-150, role enum, message 1-2000, timeline 0-100).
  - Calls `send-transactional-email` to deliver the submission to `diego@signalworks.xyz`.
  - Returns 200 on success, 400 on validation, 500 on send failure.
- Two email templates in `supabase/functions/_shared/transactional-email-templates/`:
  - `contact-notification.tsx` — sent to Diego with all form fields.
  - `contact-confirmation.tsx` — sent to the submitter acknowledging receipt.

### Frontend
- New component `src/components/ContactForm.tsx` using shadcn `Form`, `Input`, `Textarea`, `Select`, `Button`, and the existing `useToast` hook.
- Same Zod schema mirrored client-side for instant feedback.
- Replace the "Chat with us" button in `src/components/CTA.tsx` with `<ContactForm />` rendered in the right column. Keep the "Book an Intro Call" button above it (`zcal` link unchanged).
- The form:
  - Stacked, dark-theme-friendly inputs matching the existing electric/navy palette (no hardcoded colors — use semantic tokens already present).
  - Submit button uses the existing `signal` variant.
  - Loading state on submit; success toast clears the form; failure toast with retry hint.

### Out of scope
- No database table for submissions (email delivery only, per the user's pick). Easy to add later.
- No phone field, no file uploads.
- WhatsApp number `+971547109660` is removed from the codebase along with the button.
- Email domain setup is required for delivery; if no domain is yet configured, the email-setup dialog will be surfaced during implementation. The form code ships regardless.

## Files touched

- `src/components/Footer.tsx` — edits
- `src/components/CTA.tsx` — swap button for form
- `src/components/ContactForm.tsx` — new
- `supabase/functions/send-contact-message/index.ts` — new
- `supabase/functions/_shared/transactional-email-templates/contact-notification.tsx` — new
- `supabase/functions/_shared/transactional-email-templates/contact-confirmation.tsx` — new
- `supabase/functions/_shared/transactional-email-templates/registry.ts` — register both templates
- Cloud + email infra enabled via tools
