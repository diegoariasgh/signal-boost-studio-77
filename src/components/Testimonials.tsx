const testimonials = [
  {
    name: "Yaya Mbaoua",
    role: "Founder & CEO",
    company: "Zencey",
    content:
      "Diego's support has been instrumental in advancing our fundraising strategy. His proactive approach, from facilitating high-value investor introductions to providing diligent follow-ups, ensured we maintained strong momentum throughout the process. His meticulous attention to detail and creative negotiation insights consistently elevated the quality of our discussions and outcomes.",
  },
  {
    name: "Hania Tarek",
    role: "Senior Program & Operations Manager",
    company: "Plug and Play Tech Center",
    content:
      "Diego is one of the best people I know to ever give feedback to our founders; constructive and insightful. He also has an eye for detail that is unmatched. We've received the best feedback from startups about his level of knowledge in various sectors and regions, his ability to bring in an investor's perspective while also connecting founders to the right people.",
  },
];

const Testimonials = () => {
  return (
    <section
      id="testimonials"
      className="min-h-screen flex items-center py-24 md:py-32 bg-background"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-20 max-w-5xl">
            <p className="eyebrow mb-6">Testimonials —</p>
            <h2 className="display-lg text-foreground">
              Trusted by founders &amp;{" "}
              <span className="editorial-underline">operators</span>
            </h2>
          </div>

          {/* Editorial quote grid */}
          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="relative flex flex-col"
              >
                <span
                  aria-hidden
                  className="font-space-grotesk text-electric/40 leading-none select-none"
                  style={{ fontSize: "clamp(4rem, 7vw, 6rem)" }}
                >
                  &ldquo;
                </span>
                <blockquote className="-mt-6 md:-mt-8 lead font-light">
                  {t.content}
                </blockquote>
                <figcaption className="mt-8 pt-6 border-t border-border">
                  <p className="font-semibold text-foreground">{t.name}</p>
                  <p className="body-muted text-sm mt-1">{t.role} · {t.company}</p>
                </figcaption>
              </figure>
            ))}
          </div>

          {/* Coming soon hairline row */}
          <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
            <p className="eyebrow">More quotes coming soon</p>
            <span className="index-num">+</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
