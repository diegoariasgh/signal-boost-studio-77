import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CaseStudyEntry, { CaseStudyHero, type CaseStudy } from "@/components/CaseStudyEntry";

const caseStudies: CaseStudy[] = [
  {
    title: "Fund II Launch & Investment",
    client: "$30M early-stage VC fund",
    challenges: [
      "Required structured investment processes across sourcing, diligence, and IC preparation",
      "Needed to strengthen LP engagement, reporting, and compliance as the fund expanded its activities",
    ],
    solutions: [
      "Led end-to-end execution for early-stage investments across fintech, B2B SaaS, and energy",
      "Built portfolio monitoring tools for runway, deployment pacing, and liquidity planning",
      "Developed impact and governance reporting framework for institutional LPs",
    ],
    results: [
      "Completed multiple inaugural Fund II investments and strengthened the investment process",
      "Improved LP communication through structured reports and data-driven portfolio insights",
      "Used low-code tools to build an AI-native system to streamline dealflow management, automate reporting, and prioritize outreach, resulting in faster turnaround on evaluations and increased pipeline conversion",
    ],
    category: "Fund Launch & Investment",
  },
  {
    title: "Regional Expansion & Investment Activity",
    client: "International investor and accelerator",
    challenges: [
      "No established footprint in North Africa",
      "Needed to demonstrate early-stage investment activity to attract partners",
    ],
    solutions: [
      "Launched operations in new markets and signed institutional partnerships",
      "Built sourcing engine across ecosystems and led due diligence on startups",
      "Delivered founder support through accelerator programming",
    ],
    results: [
      "18+ investments deployed at pre-seed and seed",
      "Recognized as one of the most active investors in the region",
      "Established trusted reputation with public and private stakeholders",
    ],
    category: "Market Expansion & Portfolio Building",
  },
];

const CaseStudiesFunds = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      <CaseStudyHero
        eyebrow="Funds & Investors"
        title="Building investment"
        accent="discipline."
        lead="Selected engagements supporting funds and investors across launch, deployment, and portfolio strategy in MENA."
      />
      <section className="pb-24 md:pb-32">
        <div className="container mx-auto px-6">
          {caseStudies.map((study, i) => (
            <CaseStudyEntry key={i} index={i} study={study} />
          ))}
        </div>
      </section>
    </main>
    <Footer />
  </div>
);

export default CaseStudiesFunds;
