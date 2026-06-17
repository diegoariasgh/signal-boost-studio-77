import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Send, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";

const ROLES = [
  "Fund",
  "Investor",
  "Institution",
  "Accelerator",
  "Founder",
  "Other",
] as const;

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name (2+ characters)")
    .max(100, "Name must be under 100 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address")
    .max(255, "Email must be under 255 characters"),
  company: z
    .string()
    .trim()
    .max(150, "Company must be under 150 characters")
    .optional()
    .default(""),
  role: z.enum(ROLES, {
    required_error: "Please select an option",
    invalid_type_error: "Please select an option",
  }),
  message: z
    .string()
    .trim()
    .min(10, "Please share at least a sentence (10+ characters)")
    .max(2000, "Message must be under 2000 characters"),
  timeline: z
    .string()
    .trim()
    .max(100, "Timeline must be under 100 characters")
    .optional()
    .default(""),
});


type FormValues = z.infer<typeof schema>;

const fieldClass =
  "bg-white/5 border-white/15 text-white placeholder:text-slate-light/40 focus-visible:ring-electric focus-visible:border-electric";

const DRAFT_KEY = "signalworks.contact-form.draft";

const emptyDraft: FormValues = {
  name: "",
  email: "",
  company: "",
  role: undefined as unknown as FormValues["role"],
  message: "",
  timeline: "",
};

const ContactForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const hydrated = useRef(false);
  const startedAt = useRef<number>(Date.now());
  const honeypot = useRef<HTMLInputElement>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: emptyDraft,
    mode: "onTouched",
    reValidateMode: "onChange",
  });



  // Hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        form.reset({ ...emptyDraft, ...parsed });
      }
    } catch {
      // ignore
    } finally {
      hydrated.current = true;
    }
  }, [form]);

  // Persist draft on change (debounced via rAF)
  useEffect(() => {
    const sub = form.watch((values) => {
      if (!hydrated.current) return;
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
      } catch {
        // ignore
      }
    });
    return () => sub.unsubscribe();
  }, [form]);

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-message", {
        body: {
          ...values,
          // Spam controls
          _hp: honeypot.current?.value ?? "",
          _elapsedMs: Date.now() - startedAt.current,
        },
      });
      if (error) throw error;
      toast.success("Message sent. We'll be in touch shortly.");
      form.reset(emptyDraft);
      startedAt.current = Date.now();
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch {
        // ignore
      }
    } catch (err) {
      console.error(err);
      toast.error("Couldn't send your message. Please try again or email us.");
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, () => {
          toast.error("Please fix the highlighted fields before sending.");
        })}
        noValidate
        className="space-y-4"
      >

        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="eyebrow-light">Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" className={fieldClass} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="eyebrow-light">Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@company.com" className={fieldClass} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="eyebrow-light">Company</FormLabel>
                <FormControl>
                  <Input placeholder="Optional" className={fieldClass} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="eyebrow-light">I'm a…</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className={fieldClass}>
                      <SelectValue placeholder="Select one" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ROLES.map((r) => (
                      <SelectItem key={r} value={r}>{r}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="timeline"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="eyebrow-light">Timeline</FormLabel>
              <FormControl>
                <Input placeholder="e.g. ASAP, next quarter, exploring" className={fieldClass} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="eyebrow-light">Message</FormLabel>
              <FormControl>
                <Textarea
                  rows={5}
                  placeholder="A few lines on what you're working on."
                  className={fieldClass}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="signal"
          size="lg"
          disabled={submitting}
          className="group bg-electric hover:bg-electric-light text-white justify-start w-full"
        >
          <Send className="w-5 h-5 mr-2" />
          {submitting ? "Sending…" : "Send message"}
          <ArrowRight className="ml-auto w-4 h-4 group-hover:translate-x-1 signal-transition" />
        </Button>
      </form>
    </Form>
  );
};

export default ContactForm;
