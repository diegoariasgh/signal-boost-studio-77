import founderProfile from "@/assets/founder-profile.png";

const highlights = [
  {
    n: "01",
    title: "Regional Depth",
    body: "Active across UAE, KSA, Morocco, Egypt and beyond. Cross-border diligence, market entry, and transaction support with local networks and context.",
  },
  {
    n: "02",
    title: "Proven Track Record",
    body: "Strategy support and workshops for founders and teams; engagements with Plug and Play, Open Startup (OST), NYU Stern, and programs backed by the African Development Bank.",
  },
  {
    n: "03",
    title: "Cross-Border Execution",
    body: "Soft-landings, partnerships, and grant or accelerator placements across the GCC, North Africa, the US, and Japan — built on local networks and on-the-ground context.",
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

            {/* Right: numbered editorial list */}
            <div className="lg:sticky lg:top-32">
              <div className="border-t border-border">
                {highlights.map((h) => (
                  <div
                    key={h.n}
                    className="group grid grid-cols-[auto_1fr] gap-6 md:gap-10 py-8 border-b border-border signal-transition hover:bg-muted/40 -mx-4 px-4 rounded-sm"
                  >
                    <span className="text-sm font-mono text-electric pt-1">
                      {h.n}
                    </span>
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold font-space-grotesk mb-3">
                        {h.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {h.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
