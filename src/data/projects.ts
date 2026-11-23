export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: "invisible-grill" | "safety-net" | "high-rise" | "balcony" | "pigeon-net";
  city: string;
  locality: string;
  apartmentName: string;
  sqft: number;
  configuration: string;
  floor: string;
  imageBefore: string;
  imageAfter: string;
  highlights: string[];
  clientQuote: string;
  clientName: string;
}

export const projects: ProjectItem[] = [
  {
    id: "proj-residential-skydeck",
    slug: "residential-skydeck-invisible-grills",
    title: "High-Rise Balcony Invisible Grills",
    category: "invisible-grill",
    city: "Telangana",
    locality: "High-Rise Corridor",
    apartmentName: "Residential High-Rise Tower",
    sqft: 280,
    configuration: "2.5 mm Stainless Steel Cables • 50 mm Spacing",
    floor: "Upper Floor Sky Deck",
    imageBefore: "/images/projects/bhooja-before.webp",
    imageAfter: "/images/projects/bhooja-after.webp",
    highlights: [
      "Custom anodized framework matching building elevation standards",
      "Perimeter anchoring into reinforced concrete slab",
      "Precision alignment maintaining unobstructed panoramic views"
    ],
    clientQuote: "Installed for residential balcony fall protection while preserving open panoramic views.",
    clientName: "Residential Installation"
  },
  {
    id: "proj-balcony-integrated-mesh",
    slug: "balcony-integrated-safety-screen",
    title: "Balcony Invisible Grills & Bird Screen",
    category: "balcony",
    city: "Telangana",
    locality: "Residential Corridor",
    apartmentName: "Apartment Balcony Installation",
    sqft: 195,
    configuration: "2.0 mm Stainless Steel Cables • 50 mm Spacing + Polymer Mesh",
    floor: "Mid-Rise Balcony",
    imageBefore: "/images/projects/aparna-before.webp",
    imageAfter: "/images/projects/aparna-after.webp",
    highlights: [
      "Combines fall protection with humane bird deterrent netting",
      "Neat on-site installation with zero debris left behind",
      "Clean integration alongside existing balustrade framework"
    ],
    clientQuote: "Dual installation providing child fall protection and effective pigeon deterrence.",
    clientName: "Apartment Resident"
  },
  {
    id: "proj-coastal-balcony-grills",
    slug: "coastal-balcony-invisible-grills",
    title: "Coastal Balcony Invisible Grills",
    category: "invisible-grill",
    city: "Andhra Pradesh",
    locality: "Coastal Region",
    apartmentName: "Coastal Residential Apartment",
    sqft: 225,
    configuration: "2.5 mm Stainless Steel Cables • 75 mm Spacing",
    floor: "Sea-Facing Balcony",
    imageBefore: "/images/projects/vizag-before.webp",
    imageAfter: "/images/projects/vizag-after.webp",
    highlights: [
      "Corrosion-resistant stainless steel cables suited for humid conditions",
      "Preserves unbroken panoramic coastal horizons",
      "Stainless steel expansion fasteners with weather-resistant track covers"
    ],
    clientQuote: "Designed for open balcony safety in humid coastal weather conditions.",
    clientName: "Coastal Resident"
  },
  {
    id: "proj-double-height-windows",
    slug: "double-height-window-invisible-grills",
    title: "Double-Height Window Invisible Grills",
    category: "high-rise",
    city: "Telangana",
    locality: "Urban Residential Tower",
    apartmentName: "High-Rise Apartment Complex",
    sqft: 340,
    configuration: "2.5 mm Stainless Steel Cables • Vertical Tensioning System",
    floor: "High-Rise Window Opening",
    imageBefore: "/images/projects/prestige-before.webp",
    imageAfter: "/images/projects/prestige-after.webp",
    highlights: [
      "Vertical tensioning framework preventing cable deflection across tall spans",
      "Compatible with residential society architectural elevation guidelines",
      "Maintains natural daylight and airflow"
    ],
    clientQuote: "Frameless safety installation for large sliding glass windows.",
    clientName: "High-Rise Resident"
  },
  {
    id: "proj-anti-bird-balcony",
    slug: "anti-bird-balcony-netting-installation",
    title: "Apartment Balcony Bird Safety Netting",
    category: "safety-net",
    city: "Andhra Pradesh",
    locality: "Urban Residential District",
    apartmentName: "Multi-Storey Apartment Tower",
    sqft: 180,
    configuration: "High-Density Polyethylene Mesh (25 mm) • Perimeter Anchoring",
    floor: "Apartment Balcony",
    imageBefore: "/images/projects/kanuru-before.webp",
    imageAfter: "/images/projects/kanuru-after.webp",
    highlights: [
      "Fine translucent netting offering high visual permeability",
      "Protects utility balconies and AC compressors from pigeon roosting",
      "Secure perimeter rigging preventing edge sag"
    ],
    clientQuote: "Clean anti-pigeon netting installation preventing roosting without blocking breeze.",
    clientName: "Apartment Resident"
  }
];
