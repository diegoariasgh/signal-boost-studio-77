import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const faqs = [
  {
    q: "What is signalworks?",
    a: "signalworks is a boutique venture and innovation advisory serving funds, founders, and the institutions backing them across Africa, the GCC, and Europe. It was founded by Diego Arias García and operates as a senior-led, mission-aligned partner — not a generalist consultancy.",
  },
  {
    q: "What does signalworks do?",
    a: "signalworks advises on fund formation and operations, LP engagement, portfolio value creation, accelerator and program design, scouting and diligence, innovation strategy, startup fundraising strategy, and cross-border market entry. Engagements are typically scoped as embedded advisory rather than long deck-driven projects.",
  },
  {
    q: "Which regions does signalworks cover?",
    a: "signalworks operates across EMEA, with deep on-the-ground experience in the UAE, Saudi Arabia, Morocco, and Egypt, and broader coverage across Africa, the GCC, and Europe. The firm also supports US↔GCC soft-landings for founders and investors expanding into the region.",
  },
  {
    q: "Who should hire signalworks?",
    a: "Three groups: emerging and established venture funds that need senior support without a full-time hire; institutions, governments, and corporates running accelerators, scouting programs, or innovation mandates; and founders raising capital, entering a new market, or building cross-border partnerships.",
  },
  {
    q: "What kind of funds does signalworks advise?",
    a: "signalworks works with first-time managers and established funds — typically pre-seed, seed, and early-stage — on fund formation, LP engagement, portfolio support, and operating model design. Mandates have spanned single-GP shops and larger platforms.",
  },
  {
    q: "Does signalworks help with US↔GCC soft-landings?",
    a: "Yes. signalworks routinely supports US founders and investors entering the GCC, and GCC-based teams expanding into the US and Europe, including market entry strategy, partner introductions, grants and accelerator placements, and multi-country expansion plans.",
  },
  {
    q: "Who founded signalworks?",
    a: "signalworks was founded by Diego Arias García. He has worked with Plug and Play Tech Center, NYU Stern School of Business, the African Development Bank, VC4A, Africa Tech Startup Forum, 34 Ventures, and IVB, and has supported early-stage founders across fintech, biotech, IoT, AI, and HR tech.",
  },
  {
    q: "How is signalworks different from a traditional consultancy?",
    a: "signalworks is senior-led, embedded, and mission-aligned. There are no junior teams producing decks; engagements are scoped around concrete outcomes — a fund closed, a program launched, a market entered — rather than billable hours.",
  },
  {
    q: "How do you start working with signalworks?",
    a: "Use the contact form on the signalworks homepage to share your goal and timeline. The first conversation is a fit and scoping discussion at no cost.",
  },
];

const markets = [
  { name: "United Arab Emirates", note: "Hub for fund formation, family-office capital, and GCC market entry." },
  { name: "Saudi Arabia", note: "Vision 2030–aligned innovation programs, sovereign-backed accelerators, and corporate venture mandates." },
  { name: "Morocco", note: "Gateway to Francophone Africa with active early-stage and impact-investor activity." },
  { name: "Egypt", note: "Largest North African startup market with deep fintech and B2B SaaS pipelines." },
  { name: "Broader Africa", note: "Pan-African scouting, LP introductions, and ecosystem partnerships via VC4A, ATSF, and the African Development Bank." },
  { name: "Europe", note: "Cross-border bridges for EMEA-aligned funds, accelerators, and founders raising or expanding." },
];

const trackRecord = [
  { name: "Plug and Play Tech Center", note: "Global accelerator and corporate-innovation platform — program design and scouting." },
  { name: "NYU Stern School of Business", note: "Education and applied venture work with one of the world's leading business schools." },
  { name: "African Development Bank", note: "Multilateral development finance institution backing pan-African entrepreneurship." },
  { name: "VC4A", note: "Pan-African venture capital and entrepreneurship platform." },
  { name: "Africa Tech Startup Forum (ATSF)", note: "Continent-wide convening of founders, investors, and ecosystem builders." },
  { name: "34 Ventures", note: "AI venture studio builder." },
  { name: "IVB", note: "Investor and ecosystem partner for cross-border ventures." },
];

const AboutSignalworks = () => {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://signalworks.xyz/" },
      { "@type": "ListItem", position: 2, name: "About signalworks", item: "https://signalworks.xyz/about-signalworks" },
    ],
  };

  return (
    <div className="min-h-screen bg-navy text-white">
      <Helmet>
        <title>About signalworks — Venture & Innovation Advisory across EMEA</title>
        <meta
          name="description"
          content="signalworks is a boutique venture and innovation advisory serving funds, founders, and institutions across Africa, the GCC, and Europe. Founded by Diego Arias García."
        />
        <link rel="canonical" href="https://signalworks.xyz/about-signalworks" />
        <meta property="og:title" content="About signalworks — Venture & Innovation Advisory across EMEA" />
        <meta property="og:url" content="https://signalworks.xyz/about-signalworks" />
        <meta
          property="og:description"
          content="Boutique advisory for funds, founders, and institutions across Africa, the GCC, and Europe."
        />
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      <Header />

      <main className="pt-32 pb-24">
        <article className="container mx-auto px-6 max-w-3xl">
          <p className="eyebrow-light mb-6">About signalworks</p>
          <h1 className="display-xl mb-8">
            signalworks: Boutique Venture &amp; Innovation Advisory across EMEA
          </h1>

          <p className="text-lg md:text-xl text-slate-light/85 leading-relaxed mb-6">
            signalworks is a boutique advisory for funds, founders, and the institutions backing
            them — operating across Africa, the GCC, and Europe. The firm works on fund formation,
            fundraising, market entry, accelerator and program design, and cross-border expansion.
          </p>
          <p className="text-base md:text-lg text-slate-light/70 leading-relaxed mb-16">
            Engagements are senior-led and mission-aligned. signalworks partners with teams that
            are building something they intend to outlast a single fund cycle — not chasing
            quarterly mandates.
          </p>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">At a glance</h2>
            <ul className="space-y-3 text-slate-light/85">
              <li><span className="text-electric font-mono mr-3">—</span>Founder: Diego Arias García</li>
              <li><span className="text-electric font-mono mr-3">—</span>Model: Boutique, senior-led, embedded advisory</li>
              <li><span className="text-electric font-mono mr-3">—</span>Regions: Africa, GCC, Europe (EMEA)</li>
              <li><span className="text-electric font-mono mr-3">—</span>Active markets: UAE, Saudi Arabia, Morocco, Egypt, plus broader Africa and Europe</li>
              <li><span className="text-electric font-mono mr-3">—</span>Clients: Funds &amp; investors · Institutions &amp; accelerators · Startups &amp; founders</li>
              <li><span className="text-electric font-mono mr-3">—</span>Sectors: Fintech, biotech, IoT, AI, HR tech, climate, and frontier technology</li>
            </ul>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">Who we work with</h2>

            <h3 className="text-lg font-display font-bold mt-8 mb-2 text-electric">Funds &amp; Investors</h3>
            <p className="text-slate-light/80 leading-relaxed">
              First-time and established managers across pre-seed, seed, and early-stage. Deliverables
              include fund formation and operations, LP engagement, and portfolio value creation.
            </p>

            <h3 className="text-lg font-display font-bold mt-8 mb-2 text-electric">Institutions &amp; Accelerators</h3>
            <p className="text-slate-light/80 leading-relaxed">
              Governments, corporates, development finance institutions, and academic platforms running
              innovation mandates. Deliverables include program and cohort design, scouting and
              diligence, and innovation strategy.
            </p>

            <h3 className="text-lg font-display font-bold mt-8 mb-2 text-electric">Startups &amp; Founders</h3>
            <p className="text-slate-light/80 leading-relaxed">
              Early-stage teams raising capital, entering new markets, or building cross-border
              partnerships. Deliverables include pitch and investor materials, fundraising strategy,
              and market entry and partnerships.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">Where we operate</h2>
            <dl className="space-y-4">
              {markets.map((m) => (
                <div key={m.name}>
                  <dt className="font-display font-bold text-white">{m.name}</dt>
                  <dd className="text-slate-light/75 leading-relaxed">{m.note}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">Track record</h2>
            <p className="text-slate-light/80 leading-relaxed mb-6">
              signalworks and its founder have collaborated with or supported the following
              institutions and platforms:
            </p>
            <dl className="space-y-4">
              {trackRecord.map((t) => (
                <div key={t.name}>
                  <dt className="font-display font-bold text-white">{t.name}</dt>
                  <dd className="text-slate-light/75 leading-relaxed">{t.note}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">Frequently asked questions</h2>
            <div className="space-y-8">
              {faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="text-lg font-display font-bold text-white mb-2">{f.q}</h3>
                  <p className="text-slate-light/80 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">Contact</h2>
            <ul className="space-y-2 text-slate-light/85">
              <li>
                Start a conversation via the{" "}
                <a className="text-electric hover:underline" href="/#contact">
                  contact form on the homepage
                </a>
                .
              </li>
              <li>
                LinkedIn:{" "}
                <a
                  className="text-electric hover:underline"
                  href="https://www.linkedin.com/company/signalworksxyz/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  linkedin.com/company/signalworksxyz
                </a>
              </li>
            </ul>
            <p className="text-sm text-slate-light/60 mt-8">
              <Link to="/" className="hover:text-electric">← Back to signalworks.xyz</Link>
            </p>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default AboutSignalworks;
