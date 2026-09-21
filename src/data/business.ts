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
    satisfactionRate: string;
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
  tagline: "Invisible Safety. Uninterrupted Views.",
  subtitle: "India's premier architectural invisible grill and certified safety net specialist for modern high-rises and luxury residences.",
  phone: "+91 83097 55398",
  phoneRaw: "+918309755398",
  whatsapp: "918309755398",
  email: "pravvenkoda4@gmail.com",
  hours: "Monday to Sunday (All Days): 8:00 AM – 9:00 PM",
  address: {
    street: "Plot 42, Silicon Valley Hub, Hitec City",
    locality: "Madhapur",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500081",
    country: "India"
  },
  cities: [
    {
      slug: "visakhapatnam",
      name: "Visakhapatnam (Vizag)",
      state: "Andhra Pradesh",
      phone: "+91 83097 55398",
      popularAreas: ["Madhurawada", "Yendada", "Rushikonda", "MVP Colony", "Seethammadhara", "Siripuram", "Beach Road", "Pedda Waltair", "Lawsons Bay Colony", "Kommadi"],
      tagline: "Marine-grade AISI 316 invisible grills & pigeon deterrence engineered for coastal sea-breeze durability."
    },
    {
      slug: "hyderabad",
      name: "Hyderabad & Secunderabad",
      state: "Telangana",
      phone: "+91 83097 55398",
      popularAreas: ["Financial District", "Gachibowli", "HITEC City", "Kokapet", "Kondapur", "Madhapur", "Nanakramguda", "Jubilee Hills", "Banjara Hills", "Tellapur"],
      tagline: "High-rise balcony safety grills & fall-containment safety nets for premium gated communities."
    },
    {
      slug: "vijayawada",
      name: "Vijayawada",
      state: "Andhra Pradesh",
      phone: "+91 83097 55398",
      popularAreas: ["Benz Circle", "Patamata", "Labbipet", "Moghalrajpuram", "Kanuru", "Poranki", "Tadigadapa", "Currency Nagar", "Ramavarappadu", "Gunadala"],
      tagline: "Laser-measured safety netting and stainless steel bird spikes for urban apartments and balconies."
    },
    {
      slug: "amaravati",
      name: "Amaravati",
      state: "Andhra Pradesh",
      phone: "+91 83097 55398",
      popularAreas: ["Tadepalli", "Mangalagiri", "Undavalli", "Penumaka", "Neerukonda", "Kuragallu", "Mandadam", "Velagapudi", "Rayapudi", "Thullur"],
      tagline: "Reinforced expansion anchoring invisible grills for villas, high-rises and government quarters in the capital region."
    }
  ],
  stats: {
    completedJobs: "12,400+",
    satisfactionRate: "99.4%",
    warrantyYears: "10 Years",
    responseMinutes: "<15 Mins"
  },
  trustPillars: [
    {
      title: "SS316 Marine Grade Cables",
      description: "Japanese imported virgin 316 stainless steel with DuPont nylon casing, rust-proof even in coastal zones.",
      badge: "Zero Corrosion"
    },
    {
      title: "400+ kg Tensile Break-Load",
      description: "Independently tested high-tensile wire system safeguarding children and pets from accidental falls.",
      badge: "High-Rise Safe"
    },
    {
      title: "Harness-Certified Technicians",
      description: "Rigorous work-at-height safety with dual-lanyard IS 3521 harnesses and laser-guided track anchors.",
      badge: "Certified Pros"
    },
    {
      title: "10-Year Warranty & Free Re-Tensioning",
      description: "Official digital certificate covering cable integrity and workmanship, with a free re-tension check within 3 months.",
      badge: "Direct Guarantee"
    }
  ]
};
