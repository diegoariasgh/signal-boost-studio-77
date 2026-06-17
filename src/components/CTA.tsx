import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import ContactForm from "@/components/ContactForm";

const CTA = () => {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-navy py-24 md:py-32"
    >
      {/* Subtle grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--electric-blue)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--electric-blue)) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div className="absolute -top-32 -right-32 w-[480px] h-[480px] signal-glow rounded-full opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          <p className="eyebrow-light mb-6">Get in touch —</p>

          <h2 className="display-lg text-white mb-8">
            We partner with mission-aligned teams to turn{" "}
            <span className="editorial-underline">intent</span> into{" "}
            <span className="text-electric">execution</span>.
          </h2>

          <p className="text-lg text-slate-light/80 leading-relaxed mb-10">
            Share a few lines on your goal, and we'll take it from there.
          </p>

          <Collapsible open={open} onOpenChange={setOpen}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="outline-light"
                  size="lg"
                  className="group justify-start w-full"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Send a Message
                  <ChevronDown
                    className={`ml-auto w-4 h-4 signal-transition ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-6">
                <ContactForm />
              </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    </section>
  );
};

export default CTA;
