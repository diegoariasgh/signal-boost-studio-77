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
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Left: quote */}
          <div>
            <p className="eyebrow-light mb-6">Get in touch —</p>

            <h2 className="display-lg text-white mb-8">
              We partner with mission-aligned teams to turn{" "}
              <span className="editorial-underline">intent</span> into{" "}
              <span className="text-electric">execution</span>.
            </h2>

            <p className="lead-light">
              Share a few lines on your goal, and we'll take it from there.
            </p>
          </div>

          {/* Right: contact form */}
          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
