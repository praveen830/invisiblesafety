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
    id: "proj-my-home-bhooja",
    slug: "my-home-bhooja-hitec-city",
    title: "Sky Deck Invisible Grills at My Home Bhooja",
    category: "invisible-grill",
    city: "Hyderabad",
    locality: "Hitec City",
    apartmentName: "My Home Bhooja",
    sqft: 280,
    configuration: "2.5 mm SS316 Marine Grade • 50 mm Child-Safe Spacing",
    floor: "32nd Floor",
    imageBefore: "/images/projects/bhooja-before.webp",
    imageAfter: "/images/projects/bhooja-after.webp",
    highlights: [
      "Custom anodized bronze-grey tracks matching building exterior",
      "Full perimeter anchoring into M40 reinforced concrete",
      "Laser aligned with zero cable deviation"
    ],
    clientQuote: "Living on the 32nd floor with two energetic children was nerve-wracking. Invisible Safety installed SS316 grills that feel like an invisible shield. We preserved our entire Durgam Cheruvu lake view!",
    clientName: "Raghavendra S., Senior Architect"
  },
  {
    id: "proj-aparna-serene",
    slug: "aparna-serene-kondapur",
    title: "Balcony Invisible Grills & Integrated Pigeon Screen",
    category: "balcony",
    city: "Hyderabad",
    locality: "Kondapur",
    apartmentName: "Aparna Serene Park",
    sqft: 195,
    configuration: "2.0 mm SS316 Marine Grade • 50 mm Spacing + Translucent Mesh",
    floor: "18th Floor",
    imageBefore: "/images/projects/aparna-before.webp",
    imageAfter: "/images/projects/aparna-after.webp",
    highlights: [
      "Combined anti-fall protection with humane bird deterrent",
      "Installed in 4.5 hours with zero mess",
      "Seamless integration with existing glass railing"
    ],
    clientQuote: "Pigeons had ruined our balcony furniture. This dual installation solved both our toddler's safety and the pigeon menace in one go. Excellent finish.",
    clientName: "Priyanka & Vikram M."
  },
  {
    id: "proj-sea-pearl-vizag",
    slug: "sea-pearl-beach-road-vizag",
    title: "Sea-Facing Rust-Proof Marine Grills",
    category: "invisible-grill",
    city: "Visakhapatnam",
    locality: "Beach Road",
    apartmentName: "Sea Pearl Horizons",
    sqft: 225,
    configuration: "2.5 mm SS316 Marine Grade (Molybdenum 2.5%) • 75 mm Spacing",
    floor: "14th Floor",
    imageBefore: "/images/projects/vizag-before.webp",
    imageAfter: "/images/projects/vizag-after.webp",
    highlights: [
      "Guaranteed rust-proof in heavy maritime sea salt spray",
      "Preserves unbroken panoramic view of the Bay of Bengal",
      "Marine-grade 316 stainless anchors with silicone sealant"
    ],
    clientQuote: "Every metal fitting rusts in Vizag within months. Two monsoons later, Invisible Safety cables are shining like day one. Truly marine grade.",
    clientName: "Capt. K. Ramanathan (Retd.)"
  },
  {
    id: "proj-prestige-high-fields",
    slug: "prestige-high-fields-financial-district",
    title: "Double-Height French Window Invisible Grills",
    category: "high-rise",
    city: "Hyderabad",
    locality: "Financial District",
    apartmentName: "Prestige High Fields",
    sqft: 340,
    configuration: "2.5 mm SS316 • Vertical Tensioning with Stiffener Bar",
    floor: "26th Floor",
    imageBefore: "/images/projects/prestige-before.webp",
    imageAfter: "/images/projects/prestige-after.webp",
    highlights: [
      "Engineered cross-stiffener bar to prevent cable deflection over 9-foot spans",
      "Society RWA approved without objections",
      "Preserves natural cross-ventilation"
    ],
    clientQuote: "The large French windows in the master suite were dangerous for our cat. The grills look so sleek you forget they are even there.",
    clientName: "Dr. Ananya Reddy"
  },
  {
    id: "proj-fortune-vijayawada",
    slug: "fortune-heights-kanuru-vijayawada",
    title: "High-Density Child Safety Mesh & Balcony Grills",
    category: "safety-net",
    city: "Vijayawada",
    locality: "Kanuru",
    apartmentName: "Fortune Heights",
    sqft: 180,
    configuration: "Virgin UV-Treated HDPE Safety Mesh • 30 mm Grid",
    floor: "8th Floor",
    imageBefore: "/images/projects/kanuru-before.webp",
    imageAfter: "/images/projects/kanuru-after.webp",
    highlights: [
      "Zero sagging guarantee with perimeter stainless steel border wire",
      "Weather-proof in humid tropical temperatures",
      "Clean anchoring into ceiling and granite floor"
    ],
    clientQuote: "Extremely affordable and dependable. The team finished in less than 3 hours on a Sunday morning.",
    clientName: "S. Venkateswara Rao"
  }
];
