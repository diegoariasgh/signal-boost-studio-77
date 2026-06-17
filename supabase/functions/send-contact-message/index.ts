// Edge function: receives contact form submissions, validates them,
// stores them in contact_messages, and tries to send notification +
// confirmation emails via the Lovable Emails app-email pipeline if it's set up.

import { createClient } from "npm:@supabase/supabase-js@2";
import { z } from "npm:zod@3.23.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const BodySchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(150).optional().default(""),
  role: z.enum([
    "Fund",
    "Investor",
    "Institution",
    "Accelerator",
    "Founder",
    "Other",
  ]),
  message: z.string().trim().min(1).max(2000),
  timeline: z.string().trim().max(100).optional().default(""),
});

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
  // If the email infra/templates aren't deployed yet, swallow the error —
  // the message is already stored.
  const notifyHtml = `
    <h2>New contact form submission</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(data.company || "—")}</p>
    <p><strong>Role:</strong> ${escapeHtml(data.role)}</p>
    <p><strong>Timeline:</strong> ${escapeHtml(data.timeline || "—")}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(data.message).replace(/\n/g, "<br/>")}</p>
  `;

  try {
    await supabase.functions.invoke("send-transactional-email", {
      body: {
        templateName: "raw-html",
        recipientEmail: NOTIFY_TO,
        idempotencyKey: `contact-notify-${id}`,
        templateData: {
          subject: `New inquiry from ${data.name}${data.company ? ` (${data.company})` : ""}`,
          html: notifyHtml,
          replyTo: data.email,
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

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
