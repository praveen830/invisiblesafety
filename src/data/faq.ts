export interface FAQItem {
  question: string;
  answer: string;
  category: "invisible-grill" | "safety-net" | "installation" | "warranty" | "pricing";
}

export const faqs: FAQItem[] = [
  {
    question: "What exactly are invisible grills, and how do they work?",
    answer: "Invisible grills are high-tensile safety systems manufactured from marine-grade 316 stainless steel wire ropes (2.0mm or 2.5mm thick) encased in a transparent protective nylon sheath. The cables are anchored under high tension into aircraft-grade aluminium track frames along the perimeter of balconies or windows, spaced 50mm or 75mm apart. They provide 400+ kg impact resistance while remaining virtually invisible from a short distance.",
    category: "invisible-grill"
  },
  {
    question: "Are invisible grills strong enough to prevent a child or adult from falling?",
    answer: "Yes. Each individual InvisProtect SS316 wire is engineered and laboratory-tested to withstand up to 400 kgf (kilogram-force) of tensile breaking load. When properly tensioned and anchored into reinforced concrete with stainless steel expansion bolts, the system cannot be prised apart by hand and easily withstands high-impact accidental falls.",
    category: "invisible-grill"
  },
  {
    question: "How do invisible grills compare with traditional iron or steel grills?",
    answer: "Traditional MS or cast-iron grills are heavy, block natural light, obscure outdoor views, require periodic repainting against rust, and create a prison-like feel. In contrast, invisible grills preserve 98% of your panoramic view, never rust (using SS316), allow unrestricted airflow, comply with high-rise society elevation rules, and can be cut by firemen with wire cutters in an emergency.",
    category: "invisible-grill"
  },
  {
    question: "Can invisible grills be cut easily by burglars or intruders?",
    answer: "Invisible grills are designed primarily as architectural fall-protection for high-rise balconies and windows (typically 3rd floor and above). While they cannot be cut with scissors or domestic knives, in a fire emergency rescue personnel can sever individual wires using high-leverage industrial cable cutters. For low-ground residential anti-theft, optional alarm-triggering smart sensors can be integrated.",
    category: "invisible-grill"
  },
  {
    question: "What is the difference between 50mm and 75mm wire spacing?",
    answer: "50mm (approx. 2 inches) is our child and pet safety standard, preventing small hands, toddler heads, and toys from slipping through. 75mm (approx. 3 inches) provides maximum visual transparency and is popular for sky-villas and adult-only panoramic balconies.",
    category: "invisible-grill"
  },
  {
    question: "Will the wires rust or discolour over time?",
    answer: "No. InvisProtect uses virgin SS316 marine-grade steel containing molybdenum, which prevents corrosion even in humid coastal areas like Visakhapatnam. The outer transparent nylon coating additionally shields against dust, UV rays, and moisture.",
    category: "warranty"
  },
  {
    question: "What warranty do you offer on invisible grills and safety nets?",
    answer: "We provide a comprehensive up to 10-year warranty on SS316 invisible grill cables and track integrity, and a 2 to 3-year anti-sag and UV degradation warranty on high-density HDPE safety nets. Additionally, we provide one complimentary re-tensioning inspection within the first 3 months.",
    category: "warranty"
  },
  {
    question: "How long does installation take, and what is the process?",
    answer: "A standard apartment balcony (up to 150-250 sq ft) takes approximately 3 to 5 hours to install. Our 4-step workflow: 1) Free site laser measurement and sample demonstration, 2) Same-day transparent quote, 3) Precision installation by harness-equipped technicians, 4) Digital tension verification, client sign-off, and warranty certificate issuance.",
    category: "installation"
  },
  {
    question: "What safety equipment do your technicians use during high-rise installations?",
    answer: "Our technicians strictly follow Indian Work-At-Height safety regulations. Every technician wears an IS 3521-certified full-body harness secured by a dual-lanyard lifeline system anchored to structural load points, along with safety helmets, non-slip footwear, and tool tethers to prevent dropped objects.",
    category: "installation"
  },
  {
    question: "How is the price calculated for invisible grills and safety nets?",
    answer: "Pricing is calculated based on total billable square footage (Width in ft × Height in ft) multiplied by the selected product specification rate (e.g., ₹190–₹225/sq ft for invisible grills, ₹25–₹35/sq ft for safety nets). A minimum billable area of 30 sq ft applies for single openings. Bulk society orders (5+ flats) receive attractive volume discounts.",
    category: "pricing"
  },
  {
    question: "How do anti-pigeon nets work without blocking the view?",
    answer: "Our anti-pigeon nets are manufactured from ultra-fine 0.7mm to 1.0mm high-strength monofilament nylon or HDPE mesh with a 25mm to 30mm square grid. From 10-15 feet away, the mesh is nearly imperceptible, allowing breeze and light while humanely barring pigeons from roosting and depositing corrosive droppings.",
    category: "safety-net"
  }
];
