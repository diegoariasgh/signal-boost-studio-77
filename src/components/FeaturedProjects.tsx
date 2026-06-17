import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    n: "01",
    tags: ["Whitepaper · 2025", "Featured in Oxford Africa Venture Finance Program"],
    title: "Rethinking Africa VC",
    subtitle: "Collaborative research on adapting the venture capital model for Africa.",
    blurb:
      "A whitepaper synthesizing insights from 15 investment professionals, a survey of 50+ investors deploying across Africa, and in-depth interviews with operators running alternative fund models — evergreen funds, venture studios, ESO-linked funds, and CVCs.",
    stats: [
      { value: "15", label: "Professionals" },
      { value: "50+", label: "Investors surveyed" },
      { value: "1.5K+", label: "Visits / 90 days" },
    ],
    cta: "Read the whitepaper",
    href: "https://rethinkingafricavc.lovable.app/",
  },
  {
    n: "02",
    tags: ["Interactive tool · 2025", "Powered by Africa: The Big Deal database"],
    title: "Africa Venture Insights",
    subtitle: "Interactive benchmarking tool for African founders and investors.",
    blurb:
      "Benchmark planned rounds against real African funding data, compare valuations and round sizes by stage, explore funding trends by country and sector, and understand what it takes to return a VC fund.",
    stats: [
      { value: "4,300+", label: "Funding rounds" },
      { value: "2019–25", label: "Date range" },
      { value: "Country · Sector · Stage", label: "Filters" },
    ],
    cta: "Open the calculator",
    href: "https://insights.signalworks.xyz/",
  },
];

const FeaturedProjects = () => {
  return (
    <section
      id="work"
      className="min-h-screen flex items-center py-24 md:py-32 bg-background"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-20 max-w-5xl">
            <p className="eyebrow mb-6">Featured projects —</p>
            <h2 className="display-lg text-foreground">
              Research &amp; tools shaping{" "}
              <span className="editorial-underline">African venture</span>
            </h2>
          </div>

          {/* Cards */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
            {projects.map((p) => (
              <a
                key={p.n}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col border border-foreground/15 p-8 md:p-10 signal-transition hover:border-electric/60 hover:bg-muted/40"
              >
                {/* Top accent on hover */}
                <div className="absolute left-0 top-0 h-1 w-0 bg-electric group-hover:w-full signal-transition" />

                {/* Number + arrow */}
                <div className="flex items-start justify-between mb-8">
                  <span className="text-sm font-mono text-electric">{p.n}</span>
                  <ArrowUpRight className="w-6 h-6 text-foreground/60 group-hover:text-electric group-hover:translate-x-1 group-hover:-translate-y-1 signal-transition" />
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-x-3 gap-y-2 mb-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {p.tags.map((t, i) => (
                    <span key={i} className="flex items-center gap-3">
                      {i > 0 && <span className="text-electric/60">·</span>}
                      {t}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-3xl md:text-4xl font-bold font-space-grotesk text-foreground leading-tight mb-4">
                  {p.title}
                </h3>
                <p className="text-lg text-foreground/75 leading-relaxed mb-5">
                  {p.subtitle}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8 flex-grow">
                  {p.blurb}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border mb-8">
                  {p.stats.map((s, i) => (
                    <div key={i}>
                      <p className="text-lg md:text-xl font-bold font-space-grotesk text-foreground leading-tight">
                        {s.value}
                      </p>
                      <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mt-1">
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <span className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-foreground group-hover:text-electric signal-transition">
                  {p.cta}
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
