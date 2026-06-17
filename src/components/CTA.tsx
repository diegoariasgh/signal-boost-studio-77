import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const CTA = () => {
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
        <div className="max-w-7xl mx-auto">
          <p className="eyebrow-light mb-6">Get in touch —</p>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-6">
              <h2 className="display-lg text-white mb-8">
                We partner with mission-aligned teams to turn{" "}
                <span className="editorial-underline">intent</span> into{" "}
                <span className="text-electric">execution</span>.
              </h2>

              <p className="text-lg text-slate-light/80 leading-relaxed mb-8 max-w-md">
                Share a few lines on your goal, and we'll take it from there.
              </p>

              <Button
                variant="outline-light"
                size="lg"
                className="group justify-start"
                asChild
              >
                <a
                  href="https://zcal.co/diegoarias/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book an Intro Call
                  <ArrowRight className="ml-auto w-4 h-4 group-hover:translate-x-1 signal-transition" />
                </a>
              </Button>
            </div>

            <div className="lg:col-span-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
