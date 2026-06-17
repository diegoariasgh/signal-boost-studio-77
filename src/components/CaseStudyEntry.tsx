import { ReactNode } from "react";

export type CaseStudy = {
  title: string;
  client: string;
  challenges: string[];
  solutions: string[];
  results: string[];
  category: string;
  isPlaceholder?: boolean;
};

const Block = ({ label, items }: { label: string; items: string[] }) => (
  <div>
    <div className="flex items-center gap-3 mb-4">
      <span className="h-px w-6 bg-electric" />
      <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</h4>
    </div>
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground/80">
          <span className="mt-2 h-1 w-2 flex-shrink-0 bg-electric" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

interface Props {
  index: number;
  study: CaseStudy;
}

const CaseStudyEntry = ({ index, study }: Props) => {
  return (
    <article className="group signal-transition border-t border-foreground/15 py-12 md:py-20 -mx-4 px-4 md:-mx-6 md:px-6 hover:bg-foreground/[0.02]">
      <div className="grid md:grid-cols-12 gap-10 md:gap-14">
        <div className="md:col-span-5 lg:col-span-4">
          <div className="flex items-baseline gap-4 mb-6">
            <span className="font-space-grotesk text-sm text-muted-foreground tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {study.category}
            </span>
          </div>
          <h3 className="font-space-grotesk font-black uppercase tracking-tight leading-[0.95] text-foreground text-3xl md:text-4xl lg:text-5xl group-hover:text-electric signal-transition">
            {study.title}
          </h3>
          <p className="mt-6 text-electric text-sm md:text-base">{study.client}</p>
        </div>

        <div className="md:col-span-7 lg:col-span-8">
          {study.isPlaceholder ? (
            <p className="text-muted-foreground/70 text-base italic">Case study coming soon.</p>
          ) : (
            <div className="grid gap-10 md:gap-12">
              <Block label="Challenge" items={study.challenges} />
              <Block label="Approach" items={study.solutions} />
              <Block label="Results" items={study.results} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

export default CaseStudyEntry;

export const CaseStudyHero = ({
  eyebrow,
  title,
  accent,
  lead,
}: {
  eyebrow: string;
  title: ReactNode;
  accent?: string;
  lead: string;
}) => (
  <section className="pt-32 pb-16 md:pt-40 md:pb-24">
    <div className="container mx-auto px-6">
      <div className="flex items-center gap-3 mb-10 text-xs uppercase tracking-[0.22em] text-muted-foreground">
        <a href="/#services" className="hover:text-foreground signal-transition">
          ← Back to Services
        </a>
        <span className="text-foreground/30">/</span>
        <span>{eyebrow}</span>
      </div>
      <h1 className="font-space-grotesk font-black uppercase leading-[0.95] tracking-tight text-foreground text-5xl md:text-7xl lg:text-8xl max-w-5xl">
        {title}
        {accent && (
          <>
            {" "}
            <span className="editorial-underline">{accent}</span>
          </>
        )}
      </h1>
      <p className="mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground">{lead}</p>
    </div>
  </section>
);
