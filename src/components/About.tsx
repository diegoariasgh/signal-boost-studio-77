import founderProfile from "@/assets/founder-profile.png";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const highlights = [
  {
    n: "01",
    title: "Footprint & on-the-ground network",
    summary:
      "Active presence across UAE, KSA, Morocco, and Egypt, with working relationships in Europe, the US, and Japan.",
    body:
      "Soft-landings and partnership development run through local operators, regulators, and accelerators in each market — not from a distance.",
  },
  {
    n: "02",
    title: "Institutional credibility",
    summary:
      "Work alongside global VC platforms, accelerators, and development finance institutions.",
    body:
      "Engagements with Plug and Play, Open Startup (OST), NYU Stern, and programs backed by the African Development Bank — across venture studios, VC fund operations, and early-stage founders in fintech, biotech, IoT/AI, and HR tech.",
  },
];

const stats = [
  { value: "7+", label: "Years" },
  { value: "6", label: "Core markets" },
  { value: "4", label: "Sectors of depth" },
];

const About = () => {
  return (
    <section id="about" className="min-h-screen flex items-center py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-20 max-w-5xl">
            <p className="eyebrow mb-6">About —</p>
            <h2 className="display-lg text-foreground">
              Experience{" "}
              <span className="editorial-underline">across borders</span>
              {" "}— GCC, Africa &amp; Europe.
            </h2>
          </div>

          {/* Asymmetric two-column: 5 / 7 */}
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-start">
            {/* Left: tight narrative + stats */}
            <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-32">
              <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                Signalworks is a boutique advisory for the funds, founders, and
                institutions building across the GCC, Africa, and Europe. We
                sit at the intersection of early-stage investing, fund
                operations, and go-to-market — translating regional context
                into decisions that move.
              </p>

              <div className="pt-8 border-t border-border grid grid-cols-3 gap-6">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-space-grotesk text-4xl md:text-5xl font-bold text-electric leading-none mb-3">
                      {s.value}
                    </p>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: founder card + accordion */}
            <div className="lg:col-span-7 space-y-10">
              <div>
                <p className="eyebrow mb-6">Led by —</p>
                <div className="flex items-start gap-6">
                  <img
                    src={founderProfile}
                    alt="Diego Arias García"
                    width="112"
                    height="112"
                    loading="lazy"
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold font-space-grotesk text-foreground mb-2">
                      Diego Arias García
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Operator-investor with a background in global VC
                      platforms and boutique funds. Built fund ops in new
                      markets, ran LP engagement, and supported VC-backed
                      founders on fundraising and GTM.
                    </p>
                  </div>
                </div>
              </div>

              <Accordion
                type="single"
                collapsible
                defaultValue="item-01"
                className="border-t border-border"
              >
                {highlights.map((h) => (
                  <AccordionItem
                    key={h.n}
                    value={`item-${h.n}`}
                    className="border-b border-border"
                  >
                    <AccordionTrigger className="py-8 hover:no-underline group">
                      <div className="grid grid-cols-[auto_1fr] gap-6 md:gap-10 text-left flex-1">
                        <span className="text-sm font-mono text-electric pt-1">
                          {h.n}
                        </span>
                        <div>
                          <h3 className="text-xl md:text-2xl font-semibold font-space-grotesk text-foreground group-hover:text-electric signal-transition mb-2">
                            {h.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed font-normal">
                            {h.summary}
                          </p>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-8">
                      <div className="grid grid-cols-[auto_1fr] gap-6 md:gap-10">
                        <span className="text-sm font-mono text-transparent select-none">
                          {h.n}
                        </span>
                        <p className="text-foreground/80 leading-relaxed md:text-lg">
                          {h.body}
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
