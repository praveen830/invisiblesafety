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
    breakingLoad?: string;
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
    tagline: "Uncompromised panoramic balcony view with 400+ kg tensile fall safety.",
    badge: "Bestseller (70% Choice)",
    priceStarting: 190,
    unit: "sq ft",
    warranty: "10 Years Workmanship & Cable Guarantee",
    heroImage: "/images/hero-balcony.webp",
    specs: {
      material: "Virgin SS316 Marine Grade Stainless Steel",
      wireGauge: "2.0 mm or 2.5 mm High Tensile Core",
      breakingLoad: "400 kgf+ tested tensile resistance",
      coating: "DuPont Transparent UV-Resistant Nylon Membrane",
      tracks: "6063-T6 Aerospace-Grade Extruded Aluminium with Anodized Finish",
      spacings: "50 mm (Child/Pet Safe) or 75 mm (Expansive View)"
    },
    keyBenefits: [
      "Zero Visual Obstruction: Preserves skyline & natural illumination",
      "Corrosion & Rust Proof: Marine-grade SS316 will not rust even in humid coastal air",
      "Child & Pet Secure: Cannot be spread or climbed like traditional bars",
      "Emergency Evacuation: Can be cut by rescue personnel in seconds with dedicated wire cutters during a fire emergency (unlike fixed iron grills)",
      "Zero Maintenance: Washable with simple water spray, no yearly painting needed"
    ],
    applications: [
      "High-rise apartment balconies (10th to 50th+ floors)",
      "Large French windows and sliding glass doors",
      "Open terrace perimeters and staircase voids",
      "Luxury villas with cantilevered decks"
    ],
    idealFor: "Modern homeowners and luxury high-rise residents seeking clean aesthetics without prison-like iron bars.",
    description: "InvisProtect invisible grills redefine residential safety. Constructed with 316-grade marine stainless steel cables enclosed in a transparent protective sheath, they offer maximum protection with 98% visual openness."
  },
  {
    id: "safety-nets-balcony",
    slug: "safety-nets",
    name: "Certified High-Density Safety Nets",
    shortTitle: "Safety Nets",
    category: "safety-net",
    tagline: "Industrial-grade anti-fall and bird protection mesh for residential communities.",
    badge: "Reliable & High Volume",
    priceStarting: 25,
    unit: "sq ft",
    warranty: "2 to 3 Years Warranty",
    heroImage: "/images/safety-net-balcony.webp",
    specs: {
      material: "High-Density Polyethylene (HDPE) & Nylon Monofilament",
      meshSize: "25 mm to 50 mm squared diamond aperture",
      breakingLoad: "150 kg per square meter impact tolerance",
      coating: "Double UV Stabilized (Prevents sun embrittlement)",
      tracks: "SS304 Anchor Hooks & Border Cords"
    },
    keyBenefits: [
      "Cost-Effective Whole-Balcony Security: Ideal for rental homes and society bulk jobs",
      "Child & Toy Fall Prevention: Keeps curious toddlers and pets completely enclosed",
      "Weather Resistant: Tolerates extreme sun, torrential monsoon, and heavy winds",
      "Fast 2-Hour Installation: Minimal intrusion, clean perimeter anchor points"
    ],
    applications: [
      "Apartment balcony enclosures",
      "Pigeon deterrent in utility shafts and AC ledges",
      "Internal building atrium voids and open stairwells",
      "Commercial ducts and school playgrounds"
    ],
    idealFor: "Families with young children or pets seeking immediate, dependable, and budget-friendly balcony enclosure.",
    description: "Our certified HDPE safety nets are manufactured from virgin polymer with UV inhibitors to withstand tropical Indian heat and relentless sun without sagging or rotting."
  },
  {
    id: "balcony-safety",
    slug: "balcony-safety",
    name: "Balcony Fall Protection Solutions",
    shortTitle: "Balcony Safety",
    category: "invisible-grill",
    tagline: "Engineered safety systems tailored for high-rise residential balconies.",
    badge: "Essential for 5+ Floors",
    priceStarting: 190,
    unit: "sq ft",
    warranty: "Up to 10 Years",
    heroImage: "/images/balcony-safety.webp",
    specs: {
      material: "SS316 Stainless Steel Cable or Heavy-Duty HDPE Mesh",
      breakingLoad: "400 kgf+ cable strength",
      spacings: "Customized to railing height and building society guidelines"
    },
    keyBenefits: [
      "Complies with Apartment Society & RWA elevation guidelines",
      "Maintains natural airflow and cross-ventilation",
      "Prevents fatal accidental slips and balcony toy drops",
      "Tested for high-altitude wind gust dynamics"
    ],
    applications: [
      "Standard and wrap-around balconies",
      "Curved railings and glass balustrades",
      "Double-height sky deck openings"
    ],
    idealFor: "Residents living on the 4th floor and above in high-rise towers.",
    description: "Balcony heights present severe fall hazards. InvisProtect engineered balcony systems provide impenetrable safety for loved ones while keeping the skyline views pure and unhindered."
  },
  {
    id: "pigeon-nets",
    slug: "pigeon-nets",
    name: "Anti-Pigeon & Bird Deterrent Nets",
    shortTitle: "Pigeon Nets",
    category: "safety-net",
    tagline: "Hygienic, invisible 0.7mm nylon and HDPE mesh to stop pigeon nesting and droppings.",
    badge: "Health & Hygiene",
    priceStarting: 28,
    unit: "sq ft",
    warranty: "2 Years Anti-Sag Warranty",
    heroImage: "/images/pigeon-net.webp",
    specs: {
      material: "0.7mm - 1.0mm Translucent Nylon Monofilament or Garware HDPE",
      meshSize: "25 mm to 30 mm (Pigeon & myna proof)",
      uvResistance: "100% UV Stabilized"
    },
    keyBenefits: [
      "Eliminates Respiratory Hazards: Prevents pigeon droppings, allergens, and mites",
      "Virtually Invisible: 0.7mm translucent thread is imperceptible from 15 feet",
      "Humane: Keeps birds away without trapping or harming them",
      "Protects AC Outdoor Units & utility ledges from corrosive guano"
    ],
    applications: [
      "Balconies, flower beds, and window canopies",
      "AC compressor brackets and utility duct shafts",
      "Warehouse ceiling purlins and open terraces"
    ],
    idealFor: "Homes battling constant bird droppings, foul odors, and pigeon nesting noise.",
    description: "Pigeons harbor over 60 transferable pathogens. Our transparent anti-pigeon netting seals off entry points cleanly without darkening your balcony or spoiling your home exterior."
  },
  {
    id: "child-safety-nets",
    slug: "child-safety-nets",
    name: "Child Safety Nets & High-Rise Grills",
    shortTitle: "Child Safety",
    category: "invisible-grill",
    tagline: "Zero-gap safety for toddlers and energetic children in high-rise towers.",
    badge: "Parent's Peace of Mind",
    priceStarting: 35,
    unit: "sq ft",
    warranty: "5 to 10 Years",
    heroImage: "/images/child-safety.webp",
    specs: {
      material: "Reinforced SS316 with 50mm Gap or 3mm Heavy Knotted HDPE",
      breakingLoad: "Tested for energetic toddler impact & pull force"
    },
    keyBenefits: [
      "50 mm Narrow Spacing: Prevents head entrapment and limb squeeze",
      "No Horizontal Steps: Unlike horizontal MS grills, children cannot climb them like a ladder",
      "Smooth Nylon Casing: Zero sharp edges or burrs that could scrape delicate hands",
      "Non-Toxic Materials: Certified safe for curious chewers and pets"
    ],
    applications: [
      "Nursery & children's bedroom windows",
      "Play area balconies and low-sill French openings",
      "Open internal staircases and mezzanine edges"
    ],
    idealFor: "Parents with infants, toddlers, and active young kids in multi-storey apartments.",
    description: "Child safety requires zero compromise. Our child-safety invisible grills eliminate footholds, eliminating the ladder effect of traditional grills while stopping small objects and toys from tumbling down."
  },
  {
    id: "duct-safety-nets",
    slug: "duct-safety-nets",
    name: "Utility Shaft & Duct Safety Nets",
    shortTitle: "Duct Nets",
    category: "safety-net",
    tagline: "Industrial-grade protection for plumbing shafts, duct openings, and building atriums.",
    badge: "RWA & Commercial Choice",
    priceStarting: 22,
    unit: "sq ft",
    warranty: "3 Years Industrial Guarantee",
    heroImage: "/images/duct-net.webp",
    specs: {
      material: "UV-Treated Virgin High Density Polyethylene",
      meshSize: "40 mm to 50 mm thick-ply knotting",
      breakingLoad: "200 kg+ load bearing"
    },
    keyBenefits: [
      "Stops Debris & Bird Infiltration in plumbing air shafts",
      "Prevents Technician Falls during plumbing or AC maintenance",
      "Society Bulk Discounts available for whole-tower shaft covering",
      "Heavy-duty stainless steel anchor hardware prevents detachment"
    ],
    applications: [
      "Apartment duct areas and pipe shafts",
      "Commercial building ventilation shafts",
      "Lift shafts and central atrium skywells"
    ],
    idealFor: "RWA associations, facility managers, and gated society committees.",
    description: "Open duct areas are notorious for accumulated garbage, bird roosting, and severe safety risks for maintenance crews. Our heavy-ply duct nets seal open vertical spans permanently."
  },
  {
    id: "sports-nets",
    slug: "sports-nets",
    name: "Rooftop & Terrace Sports Nets",
    shortTitle: "Sports Nets",
    category: "safety-net",
    tagline: "Heavy-duty UV-stabilized cricket practice and ball containment netting.",
    badge: "Active & Durable",
    priceStarting: 18,
    unit: "sq ft",
    warranty: "3 to 5 Years Warranty",
    heroImage: "/images/sports-nets.webp",
    specs: {
      material: "High-Tenacity Polyethylene / Braided Nylon Monofilament",
      meshSize: "20 mm to 45 mm square aperture (cricket & football proof)",
      breakingLoad: "180 kg+ high-velocity ball impact tolerance",
      coating: "100% UV Stabilized Anti-Sun Degradation",
      tracks: "Galvanized Steel Wire Ropes & Turnbuckles"
    },
    keyBenefits: [
      "High-Impact Ball Containment: Stops fast leather and tennis balls safely",
      "All-Weather UV Stabilized: Resistant to heavy sunlight and tropical rain",
      "Custom Enclosures: Box cages for cricket pitches and terrace boundaries",
      "Commercial & Residential: Ideal for clubhouses, schools, and rooftops"
    ],
    applications: [
      "Rooftop cricket pitches and batting cages",
      "Society multi-sport turf boundaries",
      "School playgrounds and sports complexes",
      "Residential villa terrace play areas"
    ],
    idealFor: "Gated communities, sports clubs, schools, and cricket enthusiasts.",
    description: "Our certified sports and cricket practice nets are woven from high-tenacity polymers engineered to withstand continuous high-velocity impact without fraying, tearing, or sagging."
  }
];

