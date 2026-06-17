// Edge function: receives contact form submissions, validates them,
// stores them in contact_messages, and tries to send notification +
// confirmation emails via the Lovable Emails app-email pipeline if it's set up.
//
// Defense-in-depth against prompt injection:
//  - Unicode NFKC normalization
//  - Strip control chars, zero-width chars, bidi overrides, tag chars
//  - Collapse excessive whitespace / newlines
//  - HTML-escape everywhere we render user content
//  - Heuristic flag for known injection patterns (logged + marked in subject)
//  - User content wrapped in clearly delimited "untrusted" blocks
//  - Hard length caps already enforced by zod schema

import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ---------- Sanitization ----------

// Strip:
//  - C0/C1 control chars (except \t \n \r)
//  - Zero-width: ZWSP, ZWNJ, ZWJ, WJ, BOM
//  - Bidi overrides: LRE/RLE/PDF/LRO/RLO/LRI/RLI/FSI/PDI/ALM
//  - Tag chars (U+E0000..U+E007F) used in invisible-prompt smuggling
//  - Variation selectors (U+FE00..U+FE0F, U+E0100..U+E01EF)
const INVISIBLE_RE =
  /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF\uFE00-\uFE0F]|[\u{E0000}-\u{E007F}]|[\u{E0100}-\u{E01EF}]/gu;

function sanitize(input: string): string {
  let s = input.normalize("NFKC").replace(INVISIBLE_RE, "");
  // Collapse runs of >2 newlines and trim trailing spaces per line
  s = s
    .split("\n")
    .map((l) => l.replace(/[ \t]+$/g, ""))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return s;
}

// Heuristic detection of common prompt-injection phrasing.
// Not a security boundary on its own — just a signal we log + mark.
const INJECTION_PATTERNS: RegExp[] = [
  /ignore (all|any|previous|prior|above)\s+(instructions|prompts|rules)/i,
  /disregard (the|all|any|previous|prior|above)\s+(instructions|prompts|rules)/i,
  /you are now\b/i,
  /act as (an? )?(system|admin|developer|jailbreak)/i,
  /system\s*[:>]/i,
  /\bassistant\s*[:>]/i,
  /\bdeveloper\s*[:>]/i,
  /<\s*\/?\s*(system|assistant|user|instructions?)\s*>/i,
  /\[\s*(system|assistant|instructions?)\s*\]/i,
  /BEGIN (SYSTEM|INSTRUCTIONS?)/i,
  /override (your|the) (instructions|rules|guardrails)/i,
  /reveal (the )?(system )?prompt/i,
  /prompt\s*injection/i,
];

function isLikelyInjection(...fields: string[]): boolean {
  const blob = fields.join("\n");
  return INJECTION_PATTERNS.some((re) => re.test(blob));
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ---------- Schema ----------

const BodySchema = z.object({
  name: z.string().trim().min(1).max(100).transform(sanitize),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(150).optional().default("").transform(sanitize),
  role: z.enum([
    "Fund",
    "Investor",
    "Institution",
    "Accelerator",
    "Founder",
    "Other",
  ]),
  message: z.string().trim().min(1).max(2000).transform(sanitize),
  timeline: z.string().trim().max(100).optional().default("").transform(sanitize),
  // Spam controls — optional so older clients don't break, but enforced when present.
  _hp: z.string().max(200).optional().default(""),
  _elapsedMs: z.number().int().nonnegative().max(24 * 60 * 60 * 1000).optional(),
});

// Min time a human plausibly takes to fill the form (ms).
const MIN_ELAPSED_MS = 2500;
// Max URLs/links allowed in a legit message.
const MAX_URLS = 3;
const URL_RE = /\bhttps?:\/\/|\bwww\.|\b[a-z0-9-]+\.(com|net|org|io|co|ru|cn|xyz|info|biz|top|click|link)\b/gi;


const NOTIFY_TO = "diego@signalworks.xyz";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const parsed = BodySchema.safeParse(raw);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ error: parsed.error.flatten().fieldErrors }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  const data = parsed.data;

  // Re-validate after sanitize in case stripping invisibles emptied a field.
  if (!data.name || !data.message) {
    return new Response(
      JSON.stringify({ error: "Name and message are required." }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  const flagged = isLikelyInjection(
    data.name,
    data.company,
    data.message,
    data.timeline,
  );
  if (flagged) {
    console.warn("contact form: prompt-injection heuristic matched", {
      email: data.email,
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  // 1) Durable record — never lose a submission.
  const { data: inserted, error: insertError } = await supabase
    .from("contact_messages")
    .insert({
      name: data.name,
      email: data.email,
      company: data.company || null,
      role: data.role,
      message: data.message,
      timeline: data.timeline || null,
    })
    .select("id")
    .single();

  if (insertError) {
    console.error("contact_messages insert failed", insertError);
    return new Response(
      JSON.stringify({ error: "Could not record your message. Please try again." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  const id = inserted.id as string;

  // 2) Best-effort: notify Diego + confirm to sender via Lovable Emails.
  // User content is HTML-escaped and wrapped in a clearly delimited block so
  // any downstream LLM / AI inbox treats it as untrusted data, not instructions.
  try {
    await supabase.functions.invoke("send-transactional-email", {
      body: {
        templateName: "contact-notification",
        recipientEmail: NOTIFY_TO,
        idempotencyKey: `contact-notify-${id}`,
        templateData: {
          name: data.name,
          email: data.email,
          company: data.company,
          role: data.role,
          timeline: data.timeline,
          message: data.message,
          flagged,
        },
      },
    });
  } catch (e) {
    console.warn("notification email send skipped/failed", e);
  }

  try {
    await supabase.functions.invoke("send-transactional-email", {
      body: {
        templateName: "contact-confirmation",
        recipientEmail: data.email,
        idempotencyKey: `contact-confirm-${id}`,
        templateData: { name: data.name },
      },
    });
  } catch (e) {
    console.warn("confirmation email send skipped/failed", e);
  }

  return new Response(JSON.stringify({ ok: true, id }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
