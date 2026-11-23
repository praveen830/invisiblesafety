export interface BusinessConfig {
  name: string;
  legalName: string;
  tagline: string;
  subtitle: string;
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  email: string;
  hours: string;
  address: {
    street: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  cities: {
    slug: string;
    name: string;
    state: string;
    phone: string;
    popularAreas: string[];
    tagline: string;
  }[];
  stats: {
    completedJobs: string;
    supportCommitment: string;
    warrantyYears: string;
    responseMinutes: string;
  };
  trustPillars: {
    title: string;
    description: string;
    badge: string;
  }[];
}

export const business: BusinessConfig = {
  name: "Invisible Safety",
  legalName: "Invisible Safety Architectural Home Safety Solutions",
  tagline: "Safety. Style. Peace of Mind.",
  subtitle: "Architectural invisible grills, balcony safety nets, and bird exclusion systems across Andhra Pradesh and Telangana.",
  phone: "+91 83097 55398",
  phoneRaw: "+918309755398",
  whatsapp: "918309755398",
  email: "invisiblesafety4@gmail.com",
  hours: "Monday to Sunday: 8:00 AM – 9:00 PM",
  address: {
    street: "Regional Service Coverage",
    locality: "Hyderabad & Amaravati Corridors",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500001",
    country: "India"
  },
  cities: [
    {
      slug: "visakhapatnam",
      name: "Visakhapatnam (Vizag)",
      state: "Andhra Pradesh",
      phone: "+91 83097 55398",
      popularAreas: ["Madhurawada", "Yendada", "Rushikonda", "MVP Colony", "Seethammadhara", "Siripuram", "Beach Road", "Pedda Waltair", "Lawsons Bay Colony", "Kommadi"],
      tagline: "Stainless steel invisible grills and pigeon deterrence netting suited for coastal residential balconies."
    },
    {
      slug: "hyderabad",
      name: "Hyderabad & Secunderabad",
      state: "Telangana",
      phone: "+91 83097 55398",
      popularAreas: ["Financial District", "Gachibowli", "HITEC City", "Kokapet", "Kondapur", "Madhapur", "Nanakramguda", "Jubilee Hills", "Banjara Hills", "Tellapur"],
      tagline: "Balcony invisible grills and fall-protection safety nets for residential high-rise communities."
    },
    {
      slug: "vijayawada",
      name: "Vijayawada",
      state: "Andhra Pradesh",
      phone: "+91 83097 55398",
      popularAreas: ["Benz Circle", "Patamata", "Labbipet", "Moghalrajpuram", "Kanuru", "Poranki", "Tadigadapa", "Currency Nagar", "Ramavarappadu", "Gunadala"],
      tagline: "Custom-measured safety netting and stainless steel bird spikes for residential apartments and balconies."
    },
    {
      slug: "amaravati",
      name: "Amaravati",
      state: "Andhra Pradesh",
      phone: "+91 83097 55398",
      popularAreas: ["Tadepalli", "Mangalagiri", "Undavalli", "Penumaka", "Neerukonda", "Kuragallu", "Mandadam", "Velagapudi", "Rayapudi", "Thullur"],
      tagline: "Balcony safety systems and invisible grills for residences across the capital region."
    }
  ],
  stats: {
    completedJobs: "Residential",
    supportCommitment: "Dedicated Support",
    warrantyYears: "Standard Support",
    responseMinutes: "Prompt Support"
  },
  trustPillars: [
    {
      title: "Stainless Steel Cable Systems",
      description: "Stainless steel cables with transparent protective coating, designed for outdoor balconies.",
      badge: "Weather Resistant"
    },
    {
      title: "Residential Fall Protection",
      description: "durable wire system designed to help safeguard children and household pets on balconies.",
      badge: "High-Rise Safety"
    },
    {
      title: "Professional Installation",
      description: "Trained on-site technicians equipped with proper safety gear and precision alignment tools.",
      badge: "Professional Fit"
    },
    {
      title: "Direct Workmanship Assurance",
      description: "Transparent quotation with quality check upon installation and scheduled support.",
      badge: "Clear Terms"
    }
  ]
};
