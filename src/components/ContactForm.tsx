import { useState } from "react";
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
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  company: z.string().trim().max(150).optional().default(""),
  role: z.enum(ROLES, { required_error: "Pick one" }),
  message: z.string().trim().min(1, "Required").max(2000),
  timeline: z.string().trim().max(100).optional().default(""),
});

type FormValues = z.infer<typeof schema>;

const fieldClass =
  "bg-white/5 border-white/15 text-white placeholder:text-slate-light/40 focus-visible:ring-electric focus-visible:border-electric";

const ContactForm = () => {
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: undefined as unknown as FormValues["role"],
      message: "",
      timeline: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-message", {
        body: values,
      });
      if (error) throw error;
      toast.success("Message sent. We'll be in touch shortly.");
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error("Couldn't send your message. Please try again or email us.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-slate-light/70 text-xs uppercase tracking-[0.18em]">Name</FormLabel>
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
                <FormLabel className="text-slate-light/70 text-xs uppercase tracking-[0.18em]">Email</FormLabel>
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
                <FormLabel className="text-slate-light/70 text-xs uppercase tracking-[0.18em]">Company</FormLabel>
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
                <FormLabel className="text-slate-light/70 text-xs uppercase tracking-[0.18em]">I'm a…</FormLabel>
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
              <FormLabel className="text-slate-light/70 text-xs uppercase tracking-[0.18em]">Timeline</FormLabel>
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
              <FormLabel className="text-slate-light/70 text-xs uppercase tracking-[0.18em]">Message</FormLabel>
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
