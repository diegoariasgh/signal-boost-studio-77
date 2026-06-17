import { ArrowUpRight } from "lucide-react";

const services = [
  {
    n: "01",
    title: "Funds & Investors",
    description: "Fund setup, deployment strategy, and portfolio operations for emerging managers.",
    features: [
      "Fund setup, strategy, and operations",
      "Deployment strategy and LP engagement",
      "Portfolio structuring and secondaries",
    ],
    slug: "funds-and-investors",
  },
  {
    n: "02",
    title: "Institutions & Accelerators",
    description: "Programs, scouting, and partnership design for the institutions building venture capability.",
    features: [
      "Program and partnership design",
      "Startup scouting and evaluation",
      "Market entry and innovation strategy",
    ],
    slug: "institutions-and-accelerators",
  },
  {
    n: "03",
    title: "Startups & Founders",
    description: "Narrative, fundraising, and cross-border GTM for founders going regional or global.",
    features: [
      "Fundraising preparation and investor materials",
      "Go-to-market and partnership strategy",
      "Regional and cross-border expansion",
    ],
    slug: "startups-and-founders",
  },
];

const Services = () => {
  return (
    <section
      id="services"
      className="min-h-screen flex items-center py-24 md:py-32 bg-slate-light/40"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-20 max-w-5xl">
            <p className="eyebrow mb-6">What we do —</p>
            <h2 className="display-lg text-foreground">
              Tailored advisory across the{" "}
              <span className="editorial-underline">venture ecosystem</span>
            </h2>
          </div>

          {/* Stacked editorial rows */}
          <div className="border-t border-foreground/15">
            {services.map((service) => (
              <a
                key={service.n}
                href={`/case-studies/${service.slug}`}
                className="group relative block border-b border-foreground/15 py-10 md:py-14 signal-transition hover:bg-background"
              >
                {/* Left accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-0 bg-electric group-hover:w-1 signal-transition" />

                <div className="grid md:grid-cols-12 gap-8 md:gap-10 items-start md:pl-6">
                  {/* Number + title */}
                  <div className="md:col-span-5">
                    <div className="flex items-baseline gap-5 mb-4">
                      <span className="text-sm font-mono text-electric">
                        {service.n}
                      </span>
                      <h3 className="text-2xl md:text-4xl font-bold font-space-grotesk text-foreground leading-tight">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground md:text-lg leading-relaxed md:ml-12">
                      {service.description}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="md:col-span-5 space-y-3">
                    {service.features.map((f, i) => (
                      <li
                        key={i}
                        className="flex items-start text-foreground/80"
                      >
                        <span className="w-1.5 h-1.5 bg-electric rounded-full mt-2.5 mr-3 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Link */}
                  <div className="md:col-span-2 flex md:justify-end">
                    <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-foreground group-hover:text-electric signal-transition">
                      Case studies
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 signal-transition" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
