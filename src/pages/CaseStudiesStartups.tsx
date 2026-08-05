import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CaseStudyEntry, { CaseStudyHero, type CaseStudy } from "@/components/CaseStudyEntry";

const caseStudies: CaseStudy[] = [
  {
    title: "Market Entry Exploration",
    client: "US-based biotech",
    challenges: [
      "Lack of local knowledge for Middle East expansion",
      "Needed materials to communicate value to regional stakeholders",
    ],
    solutions: [
      "Built a strong, locally relevant narrative",
      "Developed a tailored pitch for regional audiences",
      "Reworked market sizing for the Middle East",
      "Built a new go-to-market motion for clinical trials",
    ],
    results: [
      "Company accelerated into the inaugural Deerfield ($15bn AUM) × QIA CURE Middle East accelerator cohort",
      "Clinical trial sites identified with discussions underway",
      "Secured angel investor commitment to bolster regional expansion ahead of Series A",
    ],
    category: "Market Expansion Strategy",
  },
  {
    title: "Fundraising Preparation",
    client: "Early-stage VC-backed tech company",
    challenges: [
      "Needed compelling investor materials for a $4M seed round",
      "Growth story not yet positioned for investors",
    ],
    solutions: [
      "Refined narrative highlighting user growth and adoption",
      "Created investor-facing deck and financial materials",
      "Positioned company as a category-defining platform",
    ],
    results: [
      "$4M seed round successfully closed",
      "Investor materials showcased traction and monetization potential",
      "Strengthened credibility with global investors",
    ],
    category: "Seed Round Support",
  },
];

const CaseStudiesStartups = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      <CaseStudyHero
        eyebrow="Startups & Founders"
        title="Sharpening the story"
        accent="that raises."
        lead="Selected engagements supporting founders on market entry, narrative, and fundraising readiness."
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

export default CaseStudiesStartups;
