export interface FAQItem {
  question: string;
  answer: string;
  category: "invisible-grill" | "safety-net" | "installation" | "warranty" | "pricing";
}

export const faqs: FAQItem[] = [
  {
    question: "What exactly are invisible grills, and how do they work?",
    answer: "Invisible grills are durable safety systems manufactured from stainless steel wire cables (typically 2.0mm or 2.5mm thick) encased in a transparent protective polymer sheath. The cables are anchored under tension into structural aluminium track frames along the perimeter of balconies or windows, spaced 50mm or 75mm apart. They provide reliable fall protection while preserving panoramic outdoor views.",
    category: "invisible-grill"
  },
  {
    question: "Are invisible grills strong enough to prevent a child or adult from falling?",
    answer: "Yes. Each individual stainless steel wire is engineered for durable strength. When properly tensioned and anchored into reinforced perimeter slabs with expansion fasteners, the tensioned cable array forms an effective barrier against accidental falls.",
    category: "invisible-grill"
  },
  {
    question: "How do invisible grills compare with traditional iron or steel grills?",
    answer: "Traditional MS or cast-iron grills are heavy, block natural light, obscure outdoor views, and require periodic repainting against rust. In contrast, invisible grills preserve panoramic views, use corrosion-resistant stainless steel cables, allow unrestricted airflow, comply with high-rise society elevation rules, and can be cut by rescue personnel with dedicated wire cutters during a fire emergency.",
    category: "invisible-grill"
  },
  {
    question: "Can invisible grills be cut easily by burglars or intruders?",
    answer: "Invisible grills are designed primarily as architectural fall-protection for high-rise balconies and windows (typically 3rd floor and above). While they cannot be cut with domestic scissors or kitchen knives, in a fire emergency rescue personnel can sever individual wires using wire cutters.",
    category: "invisible-grill"
  },
  {
    question: "What is the difference between 50mm and 75mm wire spacing?",
    answer: "50mm (approx. 2 inches) is our recommended child and pet safety standard, helping prevent small hands, toddler heads, and toys from slipping through. 75mm (approx. 3 inches) provides maximum visual transparency and is popular for expansive view balconies.",
    category: "invisible-grill"
  },
  {
    question: "Will the wires rust or discolour over time?",
    answer: "Our invisible grills use stainless steel cables encased in a protective coating designed for outdoor residential balconies and weathering resistance. The outer casing additionally shields the stainless steel core against airborne dust and moisture.",
    category: "warranty"
  },
  {
    question: "What warranty do you offer on invisible grills and safety nets?",
    answer: "We focus on proper installation and secure anchoring for all invisible grills and safety nets. Detailed service information and care guidelines are provided with your quotation.",
    category: "warranty"
  },
  {
    question: "How long does installation take, and what is the process?",
    answer: "A standard residential balcony takes approximately 3 to 5 hours to install. Our 4-step workflow: 1) Complimentary site measurement and sample demonstration, 2) Upfront transparent quotation, 3) Precision installation by an experienced rigging team equipped with proper safety gear, 4) Final alignment check and client sign-off.",
    category: "installation"
  },
  {
    question: "What safety equipment do your technicians use during high-rise installations?",
    answer: "Our on-site technicians follow established work-at-height safety practices. Each technician uses safety harnesses attached to secure anchor points, safety helmets, and tethered tools to ensure secure, accident-free installations.",
    category: "installation"
  },
  {
    question: "How is the price calculated for invisible grills and safety nets?",
    answer: "Balcony dimensions, railing design, and anchoring requirements vary by property. We provide customized price estimates based on your dimensions and specifications.",
    category: "pricing"
  },
  {
    question: "How do anti-pigeon nets work without blocking the view?",
    answer: "Our anti-pigeon nets are manufactured from fine, high-strength translucent polymer or HDPE netting with a 25mm to 30mm square grid. From a short distance, the mesh is nearly imperceptible, allowing breeze and light while humanely barring pigeons from roosting on balconies and AC ledges.",
    category: "safety-net"
  }
];
