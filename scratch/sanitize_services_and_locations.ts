import fs from 'fs';
import path from 'path';

const filesToClean = [
  // Group 4: 7 primary service pages
  'src/pages/invisible-grills.astro',
  'src/pages/balcony-safety.astro',
  'src/pages/child-safety-nets.astro',
  'src/pages/pigeon-nets.astro',
  'src/pages/sports-nets.astro',
  'src/pages/cloth-drying-hangers.astro',
  'src/pages/bird-spikes.astro',

  // Group 5: Specialized service pages
  'src/pages/balcony-invisible-grills.astro',
  'src/pages/window-invisible-grills.astro',
  'src/pages/child-safety-invisible-grills.astro',
  'src/pages/staircase-invisible-grills.astro',
  'src/pages/invisible-grill-cost.astro',
  'src/pages/safety-nets.astro',
  'src/pages/staircase-safety-nets.astro',
  'src/pages/balconies.astro',
  'src/pages/bird-protection.astro',
  'src/pages/animals-birds-safety-nets.astro',
  'src/pages/mosquito-safety-nets.astro',
  'src/pages/monkey-safety-nets.astro',
  'src/pages/swimming-pool-nets.astro',
  'src/pages/building-safety-nets.astro',
  'src/pages/construction-safety.astro',
  'src/pages/construction-safety-nets.astro',
  'src/pages/car-parking-safety-nets.astro',
  'src/pages/duct-safety-nets.astro',
  'src/pages/industrial-safety-nets.astro',

  // Group 6: Location pages
  'src/pages/locations/index.astro',
  'src/pages/locations/hyderabad.astro',
  'src/pages/locations/visakhapatnam.astro',
  'src/pages/locations/vijayawada.astro',
  'src/pages/locations/amaravati.astro'
];

const REPLACEMENTS: [RegExp, string][] = [
  // SS316 / Marine claims
  [/Virgin Japanese SS316 Marine Grade/gi, 'Multi-Strand Stainless Steel'],
  [/Virgin Japanese AISI 316 Marine Stainless Steel/gi, 'Multi-Strand Stainless Steel'],
  [/Virgin Japanese SS316/gi, 'Multi-Strand Stainless Steel'],
  [/Virgin SS316 Marine Grade/gi, 'High-Tensile Stainless Steel'],
  [/Virgin SS316 Marine/gi, 'Stainless Steel'],
  [/Virgin SS316/gi, 'High-Tensile Stainless Steel'],
  [/AISI 316 Marine Grade/gi, 'Stainless Steel'],
  [/AISI 316 Marine/gi, 'Stainless Steel'],
  [/AISI 316/gi, 'Stainless Steel'],
  [/SS316 Marine Grade/gi, 'High-Tensile Stainless Steel'],
  [/SS316 Marine Alloy/gi, 'Stainless Steel Cable System'],
  [/SS316 Marine Cables/gi, 'Stainless Steel Cables'],
  [/SS316 Marine/gi, 'Stainless Steel'],
  [/SS316 Stainless Steel/gi, 'Stainless Steel'],
  [/SS316/g, 'Stainless Steel'],
  [/SS304/g, 'Stainless Steel'],
  [/marine-grade/gi, 'corrosion-resistant'],
  [/marine grade/gi, 'corrosion-resistant'],

  // Material brand & composition
  [/DuPont Transparent UV-Resistant Nylon Membrane/gi, 'Transparent UV-Resistant Polymer Sleeve'],
  [/DuPont nylon casing/gi, 'protective polymer sleeve'],
  [/DuPont Pure Nylon Encapsulation/gi, 'Protective Polymer Encapsulation'],
  [/DuPont/gi, 'protective polymer'],
  [/Garware HDPE/gi, 'High-Density Polyethylene'],
  [/Garware/gi, 'high-density polymer'],
  [/2\.5% Molybdenum/gi, 'weather-resistant alloy'],
  [/Molybdenum/gi, 'alloy'],

  // Tensile / load claims
  [/400\+ kgf Breaking Load per Cable/gi, 'High-Tensile Cable Matrix'],
  [/400\+ kgf Breaking Load/gi, 'Engineered Fall Protection'],
  [/400\+ kg breaking load/gi, 'engineered fall protection'],
  [/400\+ kgf tested tensile resistance/gi, 'multi-strand high-tensile resistance'],
  [/400\+ kgf/gi, 'high-tensile'],
  [/400\+ kg/gi, 'high-tensile'],
  [/150\+ kgf Impact Resistance/gi, 'High-load impact resistance'],
  [/150\+ kgf/gi, 'high-load'],
  [/tensile breaking load/gi, 'engineered containment strength'],

  // Warranties
  [/10-Year Structural Written Guarantee/gi, 'Direct Workmanship Guarantee'],
  [/10-Year Direct Written Guarantee/gi, 'Direct Workmanship Guarantee'],
  [/10-Year Direct Guarantee/gi, 'Direct Workmanship Guarantee'],
  [/10-Year Warranty/gi, 'Direct Workmanship Guarantee'],
  [/10-year warranty/gi, 'workmanship guarantee'],
  [/15-Year Rust-Free Warranty/gi, 'Workmanship Guarantee'],
  [/15-Year Certificate/gi, 'Direct Workmanship Guarantee'],
  [/15-Year/gi, 'Workmanship'],
  [/5-Year Warranty/gi, 'Quality Guarantee'],
  [/3-Year Industrial Guarantee/gi, 'Service Guarantee'],
  [/2 Years Anti-Sag Warranty/gi, 'Quality Workmanship Guarantee'],

  // Laser measurement claims
  [/doorstep laser site measurement/gi, 'on-site measurement and consultation'],
  [/doorstep laser measurement/gi, 'on-site balcony measurement'],
  [/optical laser distance meters/gi, 'precision measurement tools'],
  [/laser measurement tools/gi, 'precision measurement tools'],
  [/laser measurement/gi, 'on-site measurement'],
  [/laser survey/gi, 'on-site survey'],
  [/laser sizing/gi, 'custom sizing'],
  [/laser-measured/gi, 'custom-measured'],
  [/laser-aligned/gi, 'precision-aligned'],
  [/laser alignment/gi, 'precision alignment'],

  // Certifications & Safety
  [/Harness-Certified Technicians/gi, 'Experienced Rigging Technicians'],
  [/certified in-house technicians/gi, 'experienced installation technicians'],
  [/certified in-house technician fleets/gi, 'experienced installation teams'],
  [/harness-equipped certified technicians/gi, 'experienced installation technicians'],
  [/IS 3521-certified full-body harness/gi, 'dedicated safety harness equipment'],
  [/IS 3521/gi, 'safety protocols'],
  [/100% Safe for Kids & Pets/gi, 'Residential Fall Protection'],
  [/100% Safe/gi, 'Designed for Safety'],
  [/100% Anti-Rust Guarantee/gi, 'Corrosion-Resistant Performance'],
  [/100% Gated Society RWA Approved/gi, 'Society Elevation Compliant'],
  [/100% Approved/gi, 'Society Elevation Compliant'],
  [/RWA Society Approved/gi, 'Society Elevation Compliant'],

  // Installation counts
  [/15,000\+ South Indian Families/gi, 'Residential Communities Across South India'],
  [/15,000\+/gi, 'High-Rise'],
  [/12,400\+/gi, 'Residential']
];

for (const relPath of filesToClean) {
  const fullPath = path.join(process.cwd(), relPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`Skipping missing file: ${relPath}`);
    continue;
  }
  let content = fs.readFileSync(fullPath, 'utf-8');
  let original = content;

  for (const [pattern, replacement] of REPLACEMENTS) {
    content = content.replace(pattern, replacement);
  }

  if (content !== original) {
    fs.writeFileSync(fullPath, content, 'utf-8');
    console.log(`Sanitized: ${relPath}`);
  } else {
    console.log(`No changes needed in: ${relPath}`);
  }
}
