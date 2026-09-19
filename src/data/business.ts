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
  name: "InvisProtect",
  legalName: "InvisProtect Architectural Home Safety Solutions",
  tagline: "Invisible Safety. Uninterrupted Views.",
  subtitle: "India's premier architectural invisible grill and certified safety net specialist for modern high-rises and luxury residences.",
  phone: "+91 99896 45222",
  phoneRaw: "+919989645222",
  whatsapp: "919989645222",
  email: "contact@invisprotect.com",
  hours: "Monday to Sunday: 8:00 AM – 8:30 PM",
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
      slug: "hyderabad",
      name: "Hyderabad",
      state: "Telangana",
      phone: "+91 99896 45222",
      popularAreas: ["Gachibowli", "Kondapur", "Hitec City", "Kokapet", "Financial District", "Madhapur", "Jubilee Hills", "Banjara Hills", "Nallagandla", "Manikonda"],
      tagline: "High-rise balcony safety grills & pigeon solutions for premium gated communities across Hyderabad."
    },
    {
      slug: "visakhapatnam",
      name: "Visakhapatnam",
      state: "Andhra Pradesh",
      phone: "+91 99896 45222",
      popularAreas: ["Beach Road", "MVP Colony", "Madhurawada", "Yendada", "Rushikonda", "Seethammadhara", "Gajuwaka", "Waltair Uplands"],
      tagline: "Coastal corrosion-proof SS316 marine-grade invisible grills tested for sea-breeze durability in Vizag."
    },
    {
      slug: "vijayawada",
      name: "Vijayawada",
      state: "Andhra Pradesh",
      phone: "+91 99896 45222",
      popularAreas: ["Benz Circle", "Kanuru", "Poranki", "Moghalrajpuram", "Governorpet", "Gannavaram", "Tadepalli"],
      tagline: "Unobtrusive architectural safety nets and high-tensile invisible grills for apartments in Vijayawada."
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
