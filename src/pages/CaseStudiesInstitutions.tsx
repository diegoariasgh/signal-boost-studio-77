import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CaseStudyEntry, { CaseStudyHero, type CaseStudy } from "@/components/CaseStudyEntry";

const caseStudies: CaseStudy[] = [
  {
    title: "Capacity Building & Mentorship Programs",
    client: "International development organizations, accelerators, and universities",
    challenges: [
      "Entrepreneurs lacked structured guidance on storytelling, fundraising, and investor engagement",
      "Programs needed curated experts to bridge founder capabilities with investor expectations",
    ],
    solutions: [
      "Delivered workshops on VC fundamentals, storytelling, pitch development, and term-sheet negotiation",
      "Designed curricula for accelerators and academic programs to strengthen investor readiness",
      "Provided one-on-one mentoring to startups across MENA",
      "Supported founder preparation for investment conversations through narrative, KPIs, and pitch refinement",
    ],
    results: [
      "Improved investor-readiness and pitch quality for 100+ founders",
      "Strong feedback and recurring invitations from NYU Stern, Plug and Play, OST, VC4A, and others",
    ],
    category: "Founder Readiness & Program Delivery",
  },
  {
    title: "Corporate Innovation in Fintech",
    client: "Leading government and financial institutions",
    challenges: [
      "Corporates lacked structured ways to engage fintech startups",
      "Needed mechanisms for piloting and partnerships",
    ],
    solutions: [
      "Designed and delivered multi-stakeholder programs",
      "Curated startup cohorts and organized dealflow sessions",
      "Structured pilots and facilitated co-investment discussions",
    ],
    results: [
      "Pilots launched with fintech startups",
      "Corporates engaged systematically with innovation",
      "New co-investment opportunities and expanded fintech access",
    ],
    category: "Program Design & Delivery",
  },
];

const CaseStudiesInstitutions = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main>
      <CaseStudyHero
        eyebrow="Institutions & Accelerators"
        title="Designing programs that"
        accent="move ecosystems."
        lead="Selected engagements with institutions, accelerators, and corporates building venture capability across MENA."
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

export default CaseStudiesInstitutions;
