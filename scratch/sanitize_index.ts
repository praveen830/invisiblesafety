import fs from 'fs';

let content = fs.readFileSync('src/pages/index.astro', 'utf-8');

// Title & Description
content = content.replace(
  'title="Invisible Safety | Architectural SS316 Invisible Grills &amp; Safety Nets"',
  'title="Invisible Safety | Architectural Invisible Grills &amp; Safety Nets"'
);
content = content.replace(
  'title="Invisible Safety | Architectural SS316 Invisible Grills & Safety Nets"',
  'title="Invisible Safety | Architectural Invisible Grills & Safety Nets"'
);
content = content.replace(
  'description="South India\'s premier specialist in architectural SS316 marine-grade invisible grills, certified Garware safety nets, and smart ceiling cloth drying hangers."',
  'description="South India\'s premier specialist in architectural invisible grills, residential balcony safety nets, and smart ceiling cloth drying hangers."'
);

// FAQ Schema
content = content.replace(
  'Our invisible grills are constructed from virgin Japanese SS316 marine-grade stainless steel cables with 2.5% Molybdenum and a transparent protective DuPont nylon coating, mounted into 6063-T6 powder-coated structural aluminium tracks.',
  'Our invisible grills are constructed from multi-strand stainless steel cables with a transparent protective polymer sleeve, mounted into structural powder-coated aluminium tracks.'
);
content = content.replace(
  'Doorstep laser site measurement takes 30-45 minutes. Once confirmed, standard balcony installation is completed in 3 to 5 hours by our certified in-house technicians.',
  'On-site measurement and consultation takes 30-45 minutes. Once confirmed, standard balcony installation is completed in 3 to 5 hours by our experienced installation team.'
);

// Metro Cities
content = content.replace('tag: "Marine Grade SS316"', 'tag: "Coastal Resilient"');
content = content.replace('tag: "Laser Survey"', 'tag: "Custom Survey"');
content = content.replace('tag: "Same-Day Survey"', 'tag: "On-Site Survey"');
content = content.replace(
  'desc: "Elevation-compliant SS316 invisible grills and child safety nets for western IT corridor high-rise towers."',
  'desc: "Elevation-compliant invisible grills and child safety nets for high-rise residential towers."'
);
content = content.replace(
  'desc: "Molybdenum-enriched AISI 316 invisible grills engineered to withstand coastal salt spray and high humidity."',
  'desc: "Stainless steel invisible grills and safety nets engineered for coastal residential balconies."'
);
content = content.replace(
  'desc: "Certified invisible grills and anti-bird barriers for high-rise towers across Prestige, Sobha, and Godrej societies."',
  'desc: "Architectural invisible grills and anti-bird netting for high-rise residential communities."'
);
content = content.replace(
  'desc: "Corrosion-proof SS316 invisible grills and pigeon netting built for high tropical heat and maritime monsoon corridors."',
  'desc: "Corrosion-resistant invisible grills and pigeon netting built for tropical heat and coastal weather."'
);
content = content.replace(
  'desc: "Certified SS316 balcony invisible grills and child safety nets for emerging capital high-rise corridors."',
  'desc: "Balcony invisible grills and child safety nets for residential high-rise corridors."'
);

// Why choose pillars
content = content.replace('title: "SS316 Marine Grade Steel"', 'title: "Stainless Steel Cable Matrix"');
content = content.replace('subtitle: "2.0mm & 2.5mm Virgin Japanese Steel with 2.5% Molybdenum"', 'subtitle: "2.0mm & 2.5mm high-tensile multi-strand stainless steel cables"');
content = content.replace('title: "15-Year Rust-Free Warranty"', 'title: "Direct Workmanship Assurance"');
content = content.replace('subtitle: "Direct written certificate against rust, corrosion and cable sag"', 'subtitle: "Written documentation and clear warranty on materials and installation alignment"');
content = content.replace('title: "100% Safe for Kids & Pets"', 'title: "Residential Fall Protection"');
content = content.replace('subtitle: "400+ kg tensile breaking load per cable with calibrated 50mm pitch"', 'subtitle: "High-tensile multi-strand wire system with calibrated 50mm child-safe pitch"');
content = content.replace('title: "Expert RWA-Compliant Team"', 'title: "Elevation-Compliant Design"');
content = content.replace('subtitle: "Pre-approved in Prestige, Sobha, My Home, Aparna & Godrej"', 'subtitle: "Designed to conform with standard residential gated community elevation rules"');

// Recent installations
content = content.replace('title: "My Home Bhooja"', 'title: "High-Rise Sky Deck"');
content = content.replace('type: "SS316 Balcony Invisible Grills"', 'type: "Balcony Invisible Grills"');
content = content.replace('alt: "SS316 invisible grills installed at My Home Bhooja high-rise penthouse"', 'alt: "Invisible grills installed on high-rise balcony"');
content = content.replace('title: "Prestige High Fields"', 'title: "Double-Height Window Suite"');
content = content.replace('alt: "Double height French window invisible safety grills at Prestige High Fields"', 'alt: "Double height French window invisible safety grills"');
content = content.replace('title: "Aparna Serene Park"', 'title: "Balcony Safety & Bird Screen"');
content = content.replace('alt: "Balcony safety nets and invisible grills installed at Aparna Serene Park"', 'alt: "Balcony safety nets and invisible grills installation"');
content = content.replace('title: "Sea Pearl Horizons"', 'title: "Coastal Balcony Grills"');
content = content.replace('type: "Coastal SS316 Marine Grills"', 'type: "Coastal Invisible Grills"');
content = content.replace('alt: "Coastal SS316 marine-grade rust-proof balcony grills at Sea Pearl Vizag"', 'alt: "Coastal corrosion-resistant balcony grills"');

// Verified reviews / Quality commitments
content = content.replace(
  /const verifiedReviews = \[[\s\S]*?\];/m,
  `const verifiedReviews = [
  {
    author: "Perimeter Safety",
    role: "Balcony Architecture",
    society: "High-Rise Residential Standard",
    quote: "Our tensioned stainless steel cables form a secure perimeter barrier for high-rise balconies, helping safeguard toddlers and pets without obstructing open views.",
    rating: 5,
    tag: "Fall Safety"
  },
  {
    author: "Material Quality",
    role: "Outdoor Engineering",
    society: "Weather Resistance",
    quote: "Engineered using corrosion-resistant multi-strand cables and UV-treated polymer netting designed to withstand tropical monsoon and coastal conditions.",
    rating: 5,
    tag: "Weather Durability"
  },
  {
    author: "Architectural Integration",
    role: "Facade Compliance",
    society: "Elevation Standards",
    quote: "Slim, transparent profile preserves natural daylight and airflow while fully conforming to modern residential gated community elevation bylaws.",
    rating: 5,
    tag: "Elevation Harmony"
  }
];`
);

content = content.replace(
  'Trusted by 15,000+ South Indian Families',
  'Dedicated Quality & Installation Standards'
);
content = content.replace(
  'Read verified feedback from architects, doctors, and residents living in South India\'s high-rise communities.',
  'Our core engineering principles and quality standards across South Indian residential communities.'
);

// General replaces on index.astro
content = content.replace(/laser measurement/gi, 'on-site measurement');
content = content.replace(/laser survey/gi, 'on-site survey');
content = content.replace(/laser sizing/gi, 'on-site sizing');
content = content.replace(/SS316/g, 'Stainless Steel');
content = content.replace(/AISI 316/g, 'Stainless Steel');
content = content.replace(/marine-grade/gi, 'corrosion-resistant');
content = content.replace(/400\+?\s*kgf?/gi, 'high-tensile');
content = content.replace(/15-Year Rust-Free Warranty/g, 'Workmanship Guarantee');
content = content.replace(/10-Year Warranty/g, 'Direct Workmanship Guarantee');
content = content.replace(/DuPont/gi, 'polymer');
content = content.replace(/Garware/gi, 'high-density polymer');

fs.writeFileSync('src/pages/index.astro', content, 'utf-8');
console.log('Successfully sanitized src/pages/index.astro');
