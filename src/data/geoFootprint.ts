export type Category = "investments" | "market-entry" | "research" | "offices";

export type Place = {
  id: string;
  name: string;
  coords: [number, number]; // [lng, lat]
  region: string;
  deals?: string[];
  office?: string;
  note?: string;
};

export const places: Place[] = [
  { id: "ma", name: "Morocco", coords: [-7.6, 33.6], region: "North Africa", office: "Plug and Play office launched", deals: ["Chari", "WafR", "Jobop", "Smartprof", "Deepecho", "Paytic"] },
  { id: "eg", name: "Egypt", coords: [31.2, 30.0], region: "North Africa", office: "Plug and Play office launched", deals: ["PharmacyMarts", "NowPay", "Subsbase", "Kashat", "Merky"] },
  { id: "tn", name: "Tunisia", coords: [10.2, 36.8], region: "North Africa", deals: ["Wattnow"] },
  { id: "ci", name: "Côte d'Ivoire", coords: [-4.0, 5.35], region: "West & Central Africa", deals: ["Susu", "Waspito"] },
  { id: "ng", name: "Nigeria", coords: [3.4, 6.5], region: "West & Central Africa", deals: ["YouVerify", "Spleet"] },
  { id: "sn", name: "Senegal", coords: [-17.4, 14.7], region: "West & Central Africa", deals: ["Socium"] },
  { id: "cm", name: "Cameroon", coords: [9.7, 4.05], region: "West & Central Africa", deals: ["Infiuss"] },
  { id: "ke", name: "Kenya", coords: [36.8, -1.3], region: "East & Southern Africa", deals: ["ImaliPay"] },
  { id: "za", name: "South Africa", coords: [18.4, -33.9], region: "East & Southern Africa", deals: ["De Novo Dairy"] },
  { id: "ae", name: "UAE", coords: [55.3, 25.2], region: "GCC", note: "Plug and Play office" },
  { id: "sa", name: "Saudi Arabia", coords: [46.7, 24.7], region: "GCC", note: "Plug and Play office · InVivo market entry" },
  { id: "qa", name: "Qatar", coords: [51.5, 25.3], region: "GCC", note: "InVivo: QIA × Deerfield CURE cohort" },
  { id: "sv", name: "Silicon Valley", coords: [-122.1, 37.4], region: "United States", note: "Plug and Play headquarters" },
  { id: "us", name: "US East Coast", coords: [-75.5, 39.7], region: "United States", note: "InVivo Biosystems · Delaware holding research" },
  { id: "uk", name: "United Kingdom", coords: [-0.1, 51.5], region: "Europe", note: "Holding-company research" },
  { id: "eu", name: "EU Inc", coords: [4.4, 50.8], region: "Europe", note: "Proposed EU Inc edition" },
  { id: "es", name: "Spain", coords: [-3.7, 40.4], region: "Europe", note: "Base of operations" },
];

export type Flow = { from: string; to: string; category: Category; label: string };

export const flows: Flow[] = [
  { from: "us", to: "qa", category: "market-entry", label: "InVivo: US to Qatar" },
  { from: "us", to: "sa", category: "market-entry", label: "InVivo: US to Saudi Arabia" },
  { from: "sv", to: "ae", category: "offices", label: "Plug and Play: Silicon Valley to UAE" },
  { from: "sv", to: "sa", category: "offices", label: "Plug and Play: Silicon Valley to KSA" },
  { from: "sv", to: "ma", category: "offices", label: "Plug and Play: Morocco office launch" },
  { from: "sv", to: "eg", category: "offices", label: "Plug and Play: Egypt office launch" },
  { from: "ng", to: "us", category: "research", label: "Nigeria to Delaware structuring" },
  { from: "ci", to: "us", category: "research", label: "Côte d'Ivoire subsidiary, Delaware parent" },
  { from: "ke", to: "uk", category: "research", label: "UK parent research" },
  { from: "ng", to: "eu", category: "research", label: "EU Inc edition" },
];

export const categoryLabels: Record<Category | "all", string> = {
  all: "All",
  investments: "Investments",
  "market-entry": "Market entry",
  research: "Research",
  offices: "Offices",
};
