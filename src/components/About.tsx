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
      "Active presence across UAE, KSA, Morocco, Egypt, Kenya, Nigeria, Tunisia, and South Africa, with working relationships in Europe and select partners in the US.",
    body:
      "Soft-landings and partnership development run through local operators, regulators, and accelerators in each market — not from a distance.",
  },
  {
    n: "02",
    title: "Institutional credibility",
    summary:
      "Work alongside global VC platforms, accelerators, and development finance institutions.",
    body:
      "Engagements with Plug and Play, Open Startup (OST), NYU Stern, and programs backed by institutions like UM6P, OCP, the National Bank of Egypt, USAID, Digital Africa, the African Development Bank, and the EU — across venture studios, VC fund operations, and early-stage founders in fintech, biotech, IoT/AI, and energy & resource management.",
  },
  {
    n: "03",
    title: "Transaction experience",
    summary:
      "20+ early-stage deals led across African markets, from sourcing and diligence to IC materials and investor syndication.",
    body:
      "Hands-on investment work across Morocco, Egypt, Nigeria, Kenya, Côte d'Ivoire, Cameroon, Senegal, Tunisia, and South Africa — connecting founder strategy, commercial milestones, and capital conversations across local and international investor networks.",
  },
];

const stats = [
  { value: "20+", label: "Deals led" },
  { value: "9", label: "African markets" },
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
            <h2 className="display-lg text-foreground uppercase">
              Experience <span className="editorial-underline">across borders and strategies</span> — VC, accelerators &amp; catalytic capital.
            </h2>

          </div>

          {/* Asymmetric two-column: 5 / 7 */}
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-16 items-stretch">
            {/* Left: tight narrative + founder accordion + stats */}
            <div className="lg:col-span-6 flex flex-col h-full border-t border-b border-border py-8">
              <p className="lead">
                We sit at the intersection of early-stage investing, fund
                operations, and go-to-market — translating regional context
                across Africa, the GCC, and Europe into decisions that move.
              </p>

              <Accordion
                type="single"
                collapsible
                className="mt-8 border-t border-border"
              >
                <AccordionItem value="founder" className="border-b border-border">
                  <AccordionTrigger className="py-8 hover:no-underline group">
                    <div className="flex items-center gap-4 text-left flex-1">
                      <img
                        src={founderProfile}
                        alt="Diego Arias García"
                        width="56"
                        height="56"
                        loading="lazy"
                        className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                      />
                      <div>
                        <p className="eyebrow mb-1">Led by —</p>
                        <h3 className="sub-title leading-tight group-hover:text-electric signal-transition">
                          Diego Arias García
                        </h3>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-8">
                    <p className="text-foreground/80 leading-relaxed">
                      Operator-investor focused on early-stage venture across
                      Africa, the GCC, and Europe. Led 20+ investments at Plug
                      and Play and Outlierz Ventures across fintech, healthtech,
                      energy, and B2B platforms in Morocco, Egypt, Nigeria,
                      Kenya, Côte d'Ivoire, Cameroon, Senegal, Tunisia, and
                      South Africa — with direct introductions to investors
                      including Visa, BPI France, Digital Africa, Africinvest,
                      Launch Africa, and Algebra Ventures. Now advises funds,
                      accelerators, and founders on strategy, operations, GTM,
                      and market entry.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-auto pt-8 border-t border-border grid grid-cols-3 gap-3 sm:gap-6">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="font-space-grotesk text-3xl md:text-5xl font-bold text-electric leading-none mb-3">
                      {s.value}
                    </p>
                    <p className="eyebrow">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

            </div>


            {/* Right: highlights accordion */}
            <div className="lg:col-span-6">
              <Accordion
                type="single"
                collapsible
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
                        <span className="index-num pt-1">
                          {h.n}
                        </span>
                        <div>
                          <h3 className="sub-title group-hover:text-electric signal-transition mb-2">
                            {h.title}
                          </h3>
                          <p className="body-muted font-normal">
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
                        <p className="text-foreground/80 leading-relaxed">
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
