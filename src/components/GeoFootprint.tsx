import { useEffect, useMemo, useState } from "react";
import { geoOrthographic, geoPath, geoGraticule10, geoInterpolate, geoDistance } from "d3-geo";
import { feature, mesh } from "topojson-client";
import countries110 from "world-atlas/countries-110m.json";
import { places, flows, type Place } from "@/data/geoFootprint";

const W = 1000;
const H = 560;
const R = 620; // globe radius
const CX = W / 2;
const CY = H + R * 0.45; // centre below the fold, so only the cap shows

const GeoFootprint = () => {
  const [lon, setLon] = useState(-10);
  const [active, setActive] = useState<Place | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      // gentle sway between the Americas and the GCC
      setLon(-10 + Math.sin((now - start) / 9000) * 28);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const topo = countries110 as any;
  const { land, borders } = useMemo(() => {
    const all = feature(topo, topo.objects.countries) as any; // eslint-disable-line @typescript-eslint/no-explicit-any
    return {
      land: { type: "FeatureCollection", features: all.features.filter((f: any) => f.properties?.name !== "Antarctica") }, // eslint-disable-line @typescript-eslint/no-explicit-any
      borders: mesh(topo, topo.objects.countries, (a: unknown, b: unknown) => a !== b),
    };
  }, [topo]);

  const rotate: [number, number] = [-lon, -28];
  const projection = geoOrthographic().scale(R).translate([CX, CY]).rotate(rotate).clipAngle(90);
  const path = geoPath(projection);
  const centre: [number, number] = [lon, 28];
  const visible = (c: [number, number]) => geoDistance(c, centre) < Math.PI / 2 - 0.05;

  const byId = Object.fromEntries(places.map((p) => [p.id, p]));
  const hubs = places.filter((p) => (p.deals?.length ?? 0) > 0 || p.office || flows.some((f) => f.from === p.id || f.to === p.id));

  const liftedArc = (a: [number, number], b: [number, number]) => {
    const interp = geoInterpolate(a, b);
    const dist = geoDistance(a, b);
    const pts: string[] = [];
    for (let i = 0; i <= 40; i++) {
      const t = i / 40;
      const ll = interp(t) as [number, number];
      if (!visible(ll)) { pts.push(""); continue; }
      const [x, y] = projection(ll) as [number, number];
      const h = 1 + Math.sin(Math.PI * t) * dist * 0.12;
      pts.push(`${CX + (x - CX) * h},${CY + (y - CY) * h}`);
    }
    // split into visible runs
    return pts.join(" ").split(/\s{2,}/).filter((s) => s.trim().includes(" ")).map((s) => "M" + s.trim().replace(/ /g, " L"));
  };

  return (
    <section id="footprint" className="min-h-screen bg-navy text-slate-light pt-24 flex flex-col overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        <p className="eyebrow-light eyebrow-light-dash mb-6">Footprint</p>
        <h2 className="display-lg">
          Where we've <span className="editorial-underline">worked</span>
        </h2>
      </div>

      <div className="relative flex-1 flex items-end">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto block" role="img" aria-label="Globe showing markets where signalworks has worked">
          <defs>
            <radialGradient id="atmo" cx="50%" cy="50%" r="50%">
              <stop offset="88%" stopColor="hsl(var(--electric-blue))" stopOpacity="0" />
              <stop offset="94%" stopColor="hsl(var(--electric-blue-light))" stopOpacity="0.55" />
              <stop offset="100%" stopColor="hsl(var(--electric-blue))" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="ocean" cx="50%" cy="20%" r="70%">
              <stop offset="0%" stopColor="hsl(var(--electric-blue) / 0.45)" />
              <stop offset="60%" stopColor="hsl(var(--navy-lighter))" />
              <stop offset="100%" stopColor="hsl(var(--navy-deep))" />
            </radialGradient>
            <radialGradient id="glow">
              <stop offset="0%" stopColor="hsl(var(--slate-light))" stopOpacity="1" />
              <stop offset="30%" stopColor="hsl(var(--electric-blue-light))" stopOpacity="0.7" />
              <stop offset="100%" stopColor="hsl(var(--electric-blue))" stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx={CX} cy={CY} r={R * 1.09} fill="url(#atmo)" />
          <circle cx={CX} cy={CY} r={R} fill="url(#ocean)" />
          <path d={path(geoGraticule10()) ?? ""} fill="none" stroke="hsl(var(--electric-blue-light) / 0.08)" strokeWidth={0.6} />
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <path d={path(land as any) ?? ""} fill="hsl(var(--electric-blue) / 0.18)" stroke="hsl(var(--electric-blue-light) / 0.7)" strokeWidth={0.7} />
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <path d={path(borders as any) ?? ""} fill="none" stroke="hsl(var(--electric-blue-light) / 0.25)" strokeWidth={0.4} />

          {flows.map((f) => {
            const a = byId[f.from], b = byId[f.to];
            if (!a || !b) return null;
            return liftedArc(a.coords, b.coords).map((d, i) => (
              <path key={f.label + i} d={d} fill="none" stroke="hsl(var(--electric-blue-light))" strokeOpacity={0.6} strokeWidth={1} className="footprint-flow" />
            ));
          })}

          {hubs.filter((p) => visible(p.coords)).map((p) => {
            const [x, y] = projection(p.coords) as [number, number];
            const big = (p.deals?.length ?? 0) >= 2 || !!p.office;
            return (
              <g key={p.id} transform={`translate(${x},${y})`} className="cursor-pointer"
                onMouseEnter={() => setActive(p)} onMouseLeave={() => setActive(null)} onClick={() => setActive(p)}>
                <circle r={big ? 16 : 10} fill="url(#glow)" className="footprint-pulse" />
                <circle r={big ? 2.6 : 1.8} fill="hsl(var(--slate-light))" />
                <title>{p.name}</title>
              </g>
            );
          })}
        </svg>

        {active && (
          <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-8 bg-navy/90 border border-electric/40 px-4 py-2 text-sm text-center">
            <span className="font-display font-bold">{active.name}</span>
            <span className="text-slate-light/70">
              {active.deals ? ` · ${active.deals.length} investment${active.deals.length > 1 ? "s" : ""}` : ""}
              {active.office ? " · office launched" : ""}
              {!active.deals && !active.office && active.note ? ` · ${active.note}` : ""}
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default GeoFootprint;
