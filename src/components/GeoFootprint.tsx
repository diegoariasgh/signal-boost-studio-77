import { useMemo, useState } from "react";
import { geoConicEquidistant, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import countries110 from "world-atlas/countries-110m.json";
import { places, flows, type Place } from "@/data/geoFootprint";

const W = 1000;
const H = 560;

const GeoFootprint = () => {
  const [active, setActive] = useState<Place | null>(null);

  const { landPath, project } = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const all = feature(countries110 as any, (countries110 as any).objects.countries) as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const clipped = { type: "FeatureCollection", features: all.features.filter((f: any) => f.properties?.name !== "Antarctica") };
    const projection = geoConicEquidistant()
      .parallels([0, 45])
      .rotate([-5, 0])
      .center([0, 12])
      .scale(175)
      .translate([W / 2, H * 0.45]);
    const path = geoPath(projection);
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      landPath: path(clipped as any) ?? "",
      project: (c: [number, number]) => projection(c) as [number, number],
    };
  }, []);

  const byId = useMemo(() => Object.fromEntries(places.map((p) => [p.id, p])), []);
  const hubs = places.filter((p) => (p.deals?.length ?? 0) > 0 || p.office || flows.some((f) => f.from === p.id || f.to === p.id));

  const arc = (a: [number, number], b: [number, number]) => {
    const [x1, y1] = a, [x2, y2] = b;
    const d = Math.hypot(x2 - x1, y2 - y1);
    return `M${x1},${y1} Q${(x1 + x2) / 2},${(y1 + y2) / 2 - d * 0.3} ${x2},${y2}`;
  };

  return (
    <section id="footprint" className="min-h-screen bg-navy text-slate-light py-24 flex flex-col justify-center overflow-hidden">
      <div className="container mx-auto px-6">
        <p className="eyebrow-light eyebrow-light-dash mb-6">Footprint</p>
        <h2 className="display-lg mb-12">
          Where we've <span className="editorial-underline">worked</span>
        </h2>

        <div className="relative">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" role="img" aria-label="Map of markets where signalworks has worked">
            <defs>
              <linearGradient id="landFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--navy-lighter))" />
                <stop offset="100%" stopColor="hsl(var(--electric-blue) / 0.35)" />
              </linearGradient>
              <filter id="landShadow" x="-10%" y="-10%" width="120%" height="140%">
                <feDropShadow dx="0" dy="14" stdDeviation="12" floodColor="hsl(var(--electric-blue))" floodOpacity="0.18" />
              </filter>
              <radialGradient id="glow">
                <stop offset="0%" stopColor="hsl(var(--electric-blue-light))" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(var(--electric-blue))" stopOpacity="0" />
              </radialGradient>
            </defs>

            <path d={landPath} fill="url(#landFill)" stroke="hsl(var(--electric-blue) / 0.35)" strokeWidth={0.3} filter="url(#landShadow)" />

            {flows.map((f) => {
              const a = byId[f.from], b = byId[f.to];
              if (!a || !b) return null;
              return (
                <path key={f.label} d={arc(project(a.coords), project(b.coords))} fill="none"
                  stroke="hsl(var(--electric-blue-light))" strokeWidth={1} strokeOpacity={0.55} className="footprint-flow" />
              );
            })}

            {hubs.map((p) => {
              const [x, y] = project(p.coords);
              const big = (p.deals?.length ?? 0) >= 2 || !!p.office;
              return (
                <g key={p.id} transform={`translate(${x},${y})`} className="cursor-pointer"
                  onMouseEnter={() => setActive(p)} onMouseLeave={() => setActive(null)}
                  onClick={() => setActive(p)} tabIndex={0} onFocus={() => setActive(p)} onBlur={() => setActive(null)}>
                  <circle r={big ? 14 : 9} fill="url(#glow)" className="footprint-pulse" />
                  {/* pin */}
                  <path d="M0,0 C-5,-7 -7,-10 -7,-14 A7,7 0 1 1 7,-14 C7,-10 5,-7 0,0 Z"
                    fill="hsl(var(--electric-blue))" transform={big ? "scale(1.2)" : "scale(0.85)"} />
                  <circle cy={big ? -16.8 : -11.9} r={big ? 3 : 2.2} fill="hsl(var(--slate-light))" />
                  <title>{p.name}</title>
                </g>
              );
            })}
          </svg>

          {active && (
            <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-2 bg-navy/90 border border-electric/40 px-4 py-2 text-sm text-center">
              <span className="font-display font-bold">{active.name}</span>
              <span className="text-slate-light/70">
                {active.deals ? ` · ${active.deals.length} investment${active.deals.length > 1 ? "s" : ""}` : ""}
                {active.office ? " · office launched" : ""}
                {!active.deals && !active.office && active.note ? ` · ${active.note}` : ""}
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GeoFootprint;
