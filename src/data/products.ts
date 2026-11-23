export interface ProductItem {
  id: string;
  slug: string;
  name: string;
  shortTitle: string;
  category: "invisible-grill" | "safety-net";
  tagline: string;
  badge: string;
  priceStarting: number;
  unit: string;
  warranty: string;
  heroImage: string;
  specs: {
    material: string;
    wireGauge?: string;
    loadRating?: string;
    coating?: string;
    tracks?: string;
    spacings?: string;
    meshSize?: string;
    uvResistance?: string;
  };
  keyBenefits: string[];
  applications: string[];
  idealFor: string;
  description: string;
}

export const products: ProductItem[] = [
  {
    id: "invisible-grills-balcony",
    slug: "invisible-grills",
    name: "Architectural Invisible Grills",
    shortTitle: "Invisible Grills",
    category: "invisible-grill",
    tagline: "Panoramic balcony views with engineered high-strength fall protection.",
    badge: "Architectural Safety",
    priceStarting: 190,
    unit: "sq ft",
    warranty: "Installation support on inquiry",
    heroImage: "/images/hero-balcony.webp",
    specs: {
      material: "high-strength Stainless Steel Cable System",
      wireGauge: "2.0 mm or 2.5 mm stainless steel Core",
      loadRating: "Engineered stainless steel cable matrix",
      coating: "Transparent protective coating",
      tracks: "Extruded Aluminium Framework with Powder-Coated Finish",
      spacings: "50 mm (Child/Pet Safe) or 75 mm (Expansive View)"
    },
    keyBenefits: [
      "Zero Visual Obstruction: Preserves panoramic skyline views and natural illumination",
      "Corrosion-Resistant: Stainless steel cables suited for residential balconies",
      "Child & Pet Safety: Tensioned vertical cables help prevent accidental falls",
      "Emergency Evacuation: Can be cut by rescue personnel with dedicated wire cutters during a fire emergency",
      "Low Maintenance: Washable with water spray, no routine painting needed"
    ],
    applications: [
      "High-rise apartment balconies and sky decks",
      "Large French windows and sliding glass doors",
      "Open terrace perimeters and internal staircase voids",
      "Residential villas and duplex residences"
    ],
    idealFor: "Modern homeowners and residential high-rise occupants seeking fall safety with open visual appeal.",
    description: "Invisible Safety invisible grills provide residential safety using Stainless steel cables cables enclosed in a transparent protective sheath, offering fall protection with panoramic visual openness."
  },
  {
    id: "safety-nets-balcony",
    slug: "safety-nets",
    name: "High-Density Residential Safety Nets",
    shortTitle: "Safety Nets",
    category: "safety-net",
    tagline: "Durable anti-fall and bird protection netting for residential communities.",
    badge: "Residential Standard",
    priceStarting: 25,
    unit: "sq ft",
    warranty: "Installation support on inquiry",
    heroImage: "/images/safety-net-balcony.webp",
    specs: {
      material: "High-Density Polyethylene (HDPE) Netting",
      meshSize: "25 mm to 50 mm square mesh aperture",
      loadRating: "High-load containment netting design",
      coating: "UV-Treated Outdoor Durability",
      tracks: "Perimeter Border Ropes & Stainless Steel Fasteners"
    },
    keyBenefits: [
      "Cost-Effective Balcony Containment: Comprehensive barrier for residential balconies",
      "Child & Pet Fall Prevention: Helps keep young children and pets safely contained",
      "Weather Resistant: Polymer netting suited for South Indian sunlight and seasonal monsoon conditions",
      "Clean Installation: Neat perimeter anchor fixings along balcony edges"
    ],
    applications: [
      "Apartment balcony enclosures",
      "Pigeon deterrent in utility shafts and AC ledges",
      "Internal building atrium voids and open stairwells",
      "Residential and commercial perimeter areas"
    ],
    idealFor: "Families seeking immediate, dependable, and practical balcony perimeter fall protection.",
    description: "Our high-density polyethylene safety nets are manufactured with UV stabilizers to withstand South Indian outdoor conditions, providing dependable balcony containment."
  },
  {
    id: "balcony-safety",
    slug: "balcony-safety",
    name: "Balcony Fall Protection Solutions",
    shortTitle: "Balcony Safety",
    category: "invisible-grill",
    tagline: "Engineered safety systems tailored for high-rise residential balconies.",
    badge: "High-Rise Safety",
    priceStarting: 190,
    unit: "sq ft",
    warranty: "Installation support on inquiry",
    heroImage: "/images/balcony-safety.webp",
    specs: {
      material: "Stainless Steel Cables or Durable HDPE Mesh",
      loadRating: "Engineered residential fall protection",
      spacings: "Customized to railing height and building society guidelines"
    },
    keyBenefits: [
      "Complies with residential apartment society elevation guidelines",
      "Maintains natural airflow and cross-ventilation",
      "Helps prevent accidental falls from open balcony edges",
      "Designed for outdoor weather and high-rise exposure"
    ],
    applications: [
      "Standard and wrap-around balconies",
      "Curved railings and glass balustrades",
      "Double-height sky deck openings"
    ],
    idealFor: "Residents seeking dedicated fall safety on multi-storey residential balconies.",
    description: "Balcony heights require dependable protection. Invisible Safety engineered balcony systems provide fall safety for loved ones while keeping outdoor views open and unhindered."
  },
  {
    id: "pigeon-nets",
    slug: "pigeon-nets",
    name: "Anti-Pigeon & Bird Deterrent Nets",
    shortTitle: "Pigeon Nets",
    category: "safety-net",
    tagline: "Translucent polymer mesh designed to deter pigeon roosting and nesting.",
    badge: "Clean Living",
    priceStarting: 28,
    unit: "sq ft",
    warranty: "Standard standard support",
    heroImage: "/images/pigeon-net.webp",
    specs: {
      material: "Translucent nylon netting or durable HDPE netting",
      meshSize: "25 mm to 30 mm grid aperture",
      uvResistance: "UV-Treated Outdoor Durability"
    },
    keyBenefits: [
      "Hygiene Protection: Helps prevent pigeon droppings and nesting debris on balconies",
      "Low Visual Impact: Fine translucent netting maintains daylight and airflow",
      "Humane Deterrent: Keeps birds away without trapping or harming them",
      "Protects AC outdoor units and utility ledges from corrosive roosting deposits"
    ],
    applications: [
      "Balconies, utility shafts, and window canopies",
      "AC compressor brackets and plumbing duct shafts",
      "Residential terraces and semi-open corridors"
    ],
    idealFor: "Homes battling constant bird droppings, foul odors, and pigeon nesting noise.",
    description: "Our fine translucent anti-pigeon netting seals off entry points cleanly without darkening your balcony or compromising your exterior facade."
  },
  {
    id: "child-safety-nets",
    slug: "child-safety-nets",
    name: "Child Safety Nets & Invisible Grills",
    shortTitle: "Child Safety",
    category: "invisible-grill",
    tagline: "Calibrated safety systems for toddlers and young children in high-rise residences.",
    badge: "Toddler & Child Safe",
    priceStarting: 35,
    unit: "sq ft",
    warranty: "Installation support on inquiry",
    heroImage: "/images/child-safety.webp",
    specs: {
      material: "Stainless Steel Cables with 50mm Spacing or Knotted HDPE Mesh",
      loadRating: "Designed for toddler and child fall protection"
    },
    keyBenefits: [
      "50 mm Calibrated Spacing: Helps prevent head entrapment and toddler slippage",
      "Vertical Array Design: Unlike horizontal bars, vertical cables prevent climbing leverage",
      "Smooth Polymer Casing: Encased cables help avoid abrasive friction against small hands",
      "Non-Toxic Material Coating: Designed for indoor and residential outdoor environments"
    ],
    applications: [
      "Children's bedroom windows and play area balconies",
      "Low-sill French windows and sliding glass balustrades",
      "Internal open stairwells and mezzanine perimeters"
    ],
    idealFor: "Families with infants, toddlers, and young children in multi-storey apartments.",
    description: "Child safety requires diligent design. Our child-safety invisible grills eliminate climbable footholds while helping prevent toys and objects from falling over balconies."
  },
  {
    id: "duct-safety-nets",
    slug: "duct-safety-nets",
    name: "Utility Shaft & Duct Safety Nets",
    shortTitle: "Duct Nets",
    category: "safety-net",
    tagline: "Containment netting for plumbing shafts, duct openings, and building atriums.",
    badge: "Building Safety",
    priceStarting: 22,
    unit: "sq ft",
    warranty: "Installation support on inquiry",
    heroImage: "/images/duct-net.webp",
    specs: {
      material: "UV-Treated High-Density Polyethylene",
      meshSize: "40 mm to 50 mm knotted mesh array",
      loadRating: "High-strength containment netting"
    },
    keyBenefits: [
      "Containment Barrier: Helps prevent debris accumulation and bird entry in plumbing shafts",
      "Maintenance Safety: Adds a protective containment barrier across vertical shaft openings",
      "Society Consultations: Available for full residential tower shaft coverage",
      "Stainless steel perimeter fixings ensure secure installation"
    ],
    applications: [
      "Apartment duct areas and pipe shafts",
      "Commercial building ventilation shafts",
      "Central atrium openings and internal light wells"
    ],
    idealFor: "Facility managers, resident associations, and apartment building committees.",
    description: "Open duct shafts present safety hazards and accumulate bird debris. Our heavy-ply duct safety nets enclose open vertical spans securely."
  },
  {
    id: "sports-nets",
    slug: "sports-nets",
    name: "Rooftop & Terrace Sports Nets",
    shortTitle: "Sports Nets",
    category: "safety-net",
    tagline: "High-tenacity sports practice and ball containment netting.",
    badge: "Impact Resistant",
    priceStarting: 18,
    unit: "sq ft",
    warranty: "Installation support on inquiry",
    heroImage: "/images/sports-nets.webp",
    specs: {
      material: "High-Tenacity Polyethylene Netting",
      meshSize: "20 mm to 45 mm square mesh aperture",
      loadRating: "High-velocity ball containment design",
      coating: "UV-Treated Outdoor Durability",
      tracks: "Border Ropes & Tensioned Turnbuckles"
    },
    keyBenefits: [
      "Ball Containment: Stops cricket, football, and tennis balls safely within boundary",
      "weather-resistant: Designed for exposure to South Indian sunlight and seasonal rain",
      "Custom Enclosures: Box configurations for cricket practice and terrace areas",
      "Residential & Commercial: Suited for apartment rooftops, sports clubs, and play areas"
    ],
    applications: [
      "Rooftop cricket pitches and batting cages",
      "Society multi-sport turf boundaries",
      "Playgrounds and recreational complexes",
      "Residential villa terrace play areas"
    ],
    idealFor: "Sports enthusiasts, housing societies, clubs, and schools.",
    description: "Our sports containment and cricket practice nets are woven from high-tenacity polymers engineered to withstand continuous ball impact without tearing or premature sagging."
  }
];
