import { useMemo, useState } from "react";
import { geoNaturalEarth1, geoPath, geoGraticule10 } from "d3-geo";
import { feature } from "topojson-client";
import land110 from "world-atlas/land-110m.json";
import { places, flows, categoryLabels, type Category, type Place } from "@/data/geoFootprint";

const W = 960;
const H = 520;

const filters: (Category | "all")[] = ["all", "investments", "market-entry", "research", "offices"];

const GeoFootprint = () => {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [active, setActive] = useState<Place | null>(null);

  const { landPath, project, gratPath } = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const land = feature(land110 as any, (land110 as any).objects.land);
    const projection = geoNaturalEarth1().center([15, 22]).scale(330).translate([W / 2, H / 2]);
    const path = geoPath(projection);
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      landPath: path(land as any) ?? "",
      gratPath: path(geoGraticule10()) ?? "",
      project: (c: [number, number]) => projection(c) as [number, number],
    };
  }, []);

  const byId = useMemo(() => Object.fromEntries(places.map((p) => [p.id, p])), []);

  const visibleFlows = flows.filter((f) => filter === "all" || f.category === filter);
  const showDeals = filter === "all" || filter === "investments";
  const showOffices = filter === "all" || filter === "offices";

  const arc = (a: [number, number], b: [number, number]) => {
    const [x1, y1] = a, [x2, y2] = b;
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    const d = Math.hypot(x2 - x1, y2 - y1);
    return `M${x1},${y1} Q${mx},${my - d * 0.35} ${x2},${y2}`;
  };

  const regions = useMemo(() => {
    const m = new Map<string, number>();
    places.forEach((p) => m.set(p.region, (m.get(p.region) ?? 0) + (p.deals?.length ?? 0)));
    return [...m.entries()];
  }, []);

  return (
    <section id="footprint" className="min-h-screen bg-navy text-slate-light py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <p className="eyebrow-light eyebrow-light-dash mb-6">Footprint</p>
        <h2 className="display-lg mb-6">
          Where we've <span className="editorial-underline">worked</span>
        </h2>
        <p className="lead-light max-w-3xl mb-10">
          20+ investments across 9 African markets, offices launched in Morocco and Egypt, and market entry
          and structuring work connecting Africa, the GCC, and Europe with the US.
        </p>

        <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label="Filter map">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`px-4 py-1.5 text-xs uppercase tracking-[0.15em] border signal-transition ${
                filter === f
                  ? "bg-electric border-electric text-secondary-foreground"
                  : "border-slate-light/20 text-slate-light/70 hover:border-electric hover:text-slate-light"
              }`}
            >
              {categoryLabels[f]}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
          <div className="relative border border-slate-light/10 bg-navy-lighter/40">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" role="img" aria-label="Map of signalworks experience">
              <defs>
                <pattern id="dots" width="5" height="5" patternUnits="userSpaceOnUse">
                  <circle cx="2.5" cy="2.5" r="1" fill="hsl(var(--electric-blue-light) / 0.35)" />
                </pattern>
                <radialGradient id="glow">
                  <stop offset="0%" stopColor="hsl(var(--electric-blue-light))" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="hsl(var(--electric-blue))" stopOpacity="0" />
                </radialGradient>
                <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M0,0 L10,5 L0,10 z" fill="hsl(var(--electric-blue-light))" />
                </marker>
              </defs>
              <path d={gratPath} fill="none" stroke="hsl(var(--slate-light) / 0.05)" />
              <path d={landPath} fill="url(#dots)" stroke="hsl(var(--electric-blue) / 0.25)" strokeWidth={0.5} />

              {visibleFlows.map((f) => {
                const a = byId[f.from], b = byId[f.to];
                if (!a || !b) return null;
                return (
                  <path
                    key={f.label}
                    d={arc(project(a.coords), project(b.coords))}
                    fill="none"
                    stroke="hsl(var(--electric-blue-light))"
                    strokeWidth={1.3}
                    strokeOpacity={0.8}
                    markerEnd="url(#arrow)"
                    className="footprint-flow"
                  >
                    <title>{f.label}</title>
                  </path>
                );
              })}

              {places.map((p) => {
                const [x, y] = project(p.coords);
                const n = p.deals?.length ?? 0;
                const isDeal = n > 0 && showDeals;
                const isOffice = !!p.office && showOffices;
                const inFlow = visibleFlows.some((f) => f.from === p.id || f.to === p.id);
                if (!isDeal && !isOffice && !inFlow) return null;
                const r = isDeal ? 3 + n * 1.2 : 3;
                return (
                  <g
                    key={p.id}
                    transform={`translate(${x},${y})`}
                    className="cursor-pointer"
                    onMouseEnter={() => setActive(p)}
                    onClick={() => setActive(p)}
                    tabIndex={0}
                    onFocus={() => setActive(p)}
                  >
                    <circle r={r * 3} fill="url(#glow)" className="footprint-pulse" />
                    <circle r={r} fill="hsl(var(--electric-blue-light))" />
                    {isOffice && <circle r={r + 5} fill="none" stroke="hsl(var(--slate-light))" strokeWidth={1} />}
                    <title>{p.name}</title>
                  </g>
                );
              })}
            </svg>

            {active && (
              <div className="absolute left-4 bottom-4 max-w-xs bg-navy/95 border border-electric/40 p-4 text-sm">
                <p className="index-num mb-1">{active.region}</p>
                <p className="font-display font-bold text-base mb-1">{active.name}</p>
                {active.deals && (
                  <p className="text-slate-light/80">
                    {active.deals.length} investment{active.deals.length > 1 ? "s" : ""}: {active.deals.join(", ")}
                  </p>
                )}
                {active.office && <p className="text-slate-light/80 mt-1">{active.office}</p>}
                {active.note && <p className="text-slate-light/80 mt-1">{active.note}</p>}
              </div>
            )}
          </div>

          <aside className="space-y-6">
            <div>
              <p className="eyebrow-light mb-3">Investments by region</p>
              <ul className="divide-y divide-slate-light/10">
                {regions.filter(([, n]) => n > 0).map(([r, n]) => (
                  <li key={r} className="flex justify-between py-2">
                    <span className="text-slate-light/80">{r}</span>
                    <span className="font-mono text-electric">{n}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="eyebrow-light mb-3">Flows</p>
              <ul className="space-y-2 text-sm text-slate-light/75">
                {visibleFlows.map((f) => (
                  <li key={f.label}>— {f.label}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default GeoFootprint;
