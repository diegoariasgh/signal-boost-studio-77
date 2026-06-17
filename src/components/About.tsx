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
    title: "Cross-border execution",
    summary:
      "Soft-landings, market entry, and partnerships across GCC, North Africa, Europe, the US, and Japan.",
    body:
      "Active in UAE, KSA, Morocco, and Egypt with on-the-ground networks. Recent work includes US ↔ GCC market entry with soft-landings via top accelerators, grant and accelerator placements, and partnership development for multi-country expansion.",
  },
  {
    n: "02",
    title: "Proven track record",
    summary:
      "Engagements with global VC platforms, accelerators, and DFIs.",
    body:
      "Strategy and workshops with Plug and Play, Open Startup (OST), NYU Stern, and programs backed by the African Development Bank. Recent work spans venture studios, VC fund operations, and early-stage founders in fintech, biotech, IoT/AI, and HR tech.",
  },
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

          {/* Editorial two-column */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Left: narrative + founder */}
            <div className="space-y-12">
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-foreground/80 leading-relaxed">
                  Signalworks is a boutique advisory for funds, founders, and
                  the institutions backing them. With 7+ years across the GCC,
                  North Africa, and Europe, we combine early-stage investing,
                  fund operations, and GTM strategy to deliver clear,
                  actionable plans.
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Recent work spans fund deployment strategy and operations
                  for VCs, portfolio value-creation frameworks for venture
                  studios, cross-border market entry (US ↔ GCC, with
                  soft-landings via top accelerators), and fundraising &amp;
                  GTM for early-stage founders in fintech, biotech, IoT/AI,
                  and HR tech — plus selected innovation programs with
                  corporates and institutions.
                </p>
              </div>

              <div className="pt-8 border-t border-border">
                <p className="eyebrow mb-6">Led by —</p>
                <div className="flex items-start gap-6">
                  <img
                    src={founderProfile}
                    alt="Diego Arias García"
                    width="112"
                    height="112"
                    loading="lazy"
                    className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold font-space-grotesk text-foreground mb-3">
                      Diego Arias García
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Background with global VC platforms and accelerators and
                      boutique funds, operating across the GCC &amp; North
                      Africa. Built fund ops from the ground up in new markets,
                      managed LP engagement, and supported VC-backed startups on
                      fundraising and GTM.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: expandable editorial list */}
            <div className="lg:sticky lg:top-32">
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
