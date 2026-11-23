import fs from 'fs';

function replaceInFile(filePath: string, replacements: [RegExp | string, string][]) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let original = content;
  for (const [target, replacement] of replacements) {
    if (typeof target === 'string') {
      content = content.replaceAll(target, replacement);
    } else {
      content = content.replace(target, replacement);
    }
  }
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated: ${filePath}`);
  } else {
    console.log(`No changes needed in: ${filePath}`);
  }
}

// 1. about.astro
replaceInFile('src/pages/about.astro', [
  [/We refuse to cut corners with cheap steel\. Every meter of cable installed is guaranteed virgin SS316 marine alloy with verified breaking load ratings\./g, 'Every meter of cable installed uses multi-strand stainless steel cable systems designed for residential balcony containment.'],
  [/We offer direct 10-year written warranty documentation and complimentary 3-month re-tension checks\. If your cables ever sag, we return to fix them free\./g, 'We provide clear written documentation and warranty assurance with scheduled follow-up checks. If your cables require re-alignment, our team provides timely support.']
]);

// 2. contact.astro
replaceInFile('src/pages/contact.astro', [
  [/doorstep laser measurement/gi, 'on-site measurement'],
  [/SS316 certified marine-grade cables/g, 'high-grade stainless steel cables'],
  [/Schedule Your Free Doorstep Laser Measurement/g, 'Schedule Your On-Site Balcony Measurement'],
  [/physical SS316 wire and track samples, measure your space accurately with digital laser tools/g, 'physical material samples, measure your space accurately']
]);

// 3. materials.astro
replaceInFile('src/pages/materials.astro', [
  [/Materials & SS316/g, 'Materials & Engineering'],
  [/SS316 Marine Grade Steel Engineering & Wire Specs \| Invisible Safety/g, 'Stainless Steel Material & Engineering Specs | Invisible Safety'],
  [/Learn why virgin SS316 marine-grade stainless steel with 2\.5% Molybdenum is non-negotiable for high-rise balconies\. Wire breaking load, DuPont nylon casing, and aerospace tracks\./g, 'Explore the material engineering behind our stainless steel invisible grills: multi-strand cable matrix, protective polymer casing, and structural aluminium tracks.'],
  [/The Science of SS316/g, 'The Material Science of'],
  [/Marine-Grade Architecture/g, 'Balcony Safety Systems'],
  [/Not all stainless steel is created equal\. Cheap local fabricators often install interior-grade SS202 or SS304 that rusts in monsoons\. Discover why Invisible Safety strictly mandates virgin SS316 marine alloy\./g, 'Outdoor balconies require materials suited for exposure to sun and rain. Discover how our multi-strand stainless steel cable systems and protective polymer sleeves provide lasting safety.'],
  [/please%20share%20your%20SS316%20test%20reports%20and%20cable%20specifications/g, 'please%20share%20your%20cable%20specifications%20and%20material%20details'],
  [/Why Molybdenum Makes All The Difference/g, 'Material Durability & Weather Resistance'],
  [/Molybdenum \(Mo\) Content/g, 'Material Composition'],
  [/Invisible Safety SS316 \(Marine Grade\)/g, 'Invisible Safety Multi-Strand Stainless Steel'],
  [/Optimal \(10-Year Rust-Free Life\)/g, 'High Weather Resistance'],
  [/SS304 \(Food \/ Indoor Grade\)/g, 'Standard Grade Steel'],
  [/0% \(No Molybdenum\)/g, 'Standard Composition'],
  [/DuPont Pure Nylon Encapsulation/g, 'Protective Polymer Encapsulation'],
  [/virgin 316 marine-grade steel tightly wound to achieve 400\+ kgf tensile capacity/g, 'high-tensile stainless steel wire tightly wound for dependable fall protection'],
  [/Virgin Japanese AISI 316 Marine Stainless Steel[^\.]*\./g, 'Multi-strand stainless steel wire rope designed for residential balcony containment.'],
  [/10-Year SS316 Direct Warranty/g, 'Direct Workmanship Guarantee'],
  [/100% Anti-Rust Guarantee/g, 'Corrosion-Resistant Performance'],
  [/DuPont Nylon UV Membrane/g, 'Protective Polymer Sleeve'],
  [/UV-300 Sun-Block Assurance/g, 'UV-Treated Weathering Durability'],
  [/SS304 Perimeter Fastener Anchors/g, 'Stainless Steel Perimeter Fasteners'],
  [/100% Virgin Polymer/g, 'Durable Polymer Material'],
  [/certified technician/g, 'experienced installation technician'],
  [/international ISO\/IS rigging standards, our warranty guarantees manufacturer craftsmanship, genuine Japanese SS316 alloy/g, 'our service standards, our warranty guarantees installation craftsmanship and quality materials']
]);

// 4. warranty.astro
replaceInFile('src/pages/warranty.astro', [
  [/10-Year Direct Warranty & Care Promise \| SS316 Marine Invisible Grills \| Invisible Safety/g, 'Warranty Terms & Care Promise | Invisible Safety'],
  [/Official 10-year direct warranty terms for Invisible Safety SS316 invisible grills and safety nets\. Includes complimentary 90-day doorstep re-tensioning, anti-rust guarantee, and digital warranty certificate\./g, 'Official warranty terms for Invisible Safety invisible grills and safety nets. Includes scheduled follow-up checks, workmanship guarantee, and clear written terms.'],
  [/10-Year Direct Comprehensive/g, 'Direct Workmanship & Quality'],
  [/10-Year SS316/g, 'Quality'],
  [/15-Year/g, 'Workmanship'],
  [/10-Year/g, 'Service'],
  [/SS316/g, 'Stainless Steel'],
  [/laser/gi, 'on-site'],
  [/400\+ kg/g, 'high-tensile'],
  [/DuPont/g, 'polymer'],
  [/Garware/g, 'high-density polymer']
]);

// 5. solutions.astro
replaceInFile('src/pages/solutions.astro', [
  [/SS316 Marine Cables/g, 'Stainless Steel Cables'],
  [/400\+ kgf Tensile Break/g, 'Engineered Fall Protection'],
  [/10-Year Direct Guarantee/g, 'Direct Workmanship Guarantee'],
  [/laser measurement/gi, 'on-site measurement'],
  [/laser survey/gi, 'on-site survey'],
  [/SS316/g, 'Stainless Steel'],
  [/marine-grade/gi, 'corrosion-resistant']
]);

// 6. solutions/[slug].astro
replaceInFile('src/pages/solutions/[slug].astro', [
  [/SS316 Marine Invisible Grills \| The Invisible Threshold \| Invisible Safety/g, 'Architectural Invisible Grills | Balcony Fall Protection | Invisible Safety'],
  [/Ultra-luxury SS316 marine-grade invisible safety grills for penthouses, high-rise balconies, and windows\. 400\+ kgf load tested\./g, 'Architectural invisible safety grills for apartments, high-rise balconies, and windows with engineered fall protection.'],
  [/Virgin SS316 marine-grade tensile cables tensioned into structural tracks, preserving 180° uninterrupted panoramic views while providing 400\+ kgf safety\./g, 'Multi-strand stainless steel tensile cables tensioned into structural tracks, preserving 180° uninterrupted panoramic views while providing reliable fall safety.'],
  [/Virgin Japanese SS316 Marine Grade/g, 'Multi-Strand Stainless Steel'],
  [/400\+ kgf Breaking Load per Cable/g, 'High-Tensile Cable Matrix'],
  [/10-Year Direct Written Guarantee/g, 'Direct Workmanship Guarantee'],
  [/Japanese SS316 \(2\.0mm \/ 2\.5mm\)/g, 'Stainless Steel (2.0mm / 2.5mm)'],
  [/Floor-to-Ceiling SS316 Cables/g, 'Floor-to-Ceiling Stainless Steel Cables'],
  [/Virgin SS316 cables preserving 180° panoramic skyline vistas\./g, 'Multi-strand stainless steel cables preserving 180° panoramic skyline vistas.'],
  [/unyielding 400\+ kg load strength/g, 'engineered tensile strength'],
  [/150\+ kgf impact resistance\. Certified 5-year guarantee\./g, 'engineered impact containment and quality guarantee.'],
  [/150\+ kgf Resistance per Mesh Unit/g, 'Engineered Containment Barrier'],
  [/SS304 Spikes on Polycarbonate Base/g, 'Stainless Steel Spikes on Polycarbonate Base'],
  [/SS304 Polycarbonate Bird Spikes/g, 'Polycarbonate Bird Spikes'],
  [/SS304 Anti-Perching Ledge Spikes/g, 'Anti-Perching Ledge Spikes'],
  [/Compliant with IS 3521 \/ Industrial Anchors/g, 'Secure Rigging & Structural Anchors'],
  [/SS316 Marine Grade/g, 'Stainless Steel System']
]);

// 7. thank-you.astro
replaceInFile('src/pages/thank-you.astro', [
  [/within <strong style="color: #0284C7;">15 minutes<\/strong> to schedule your free laser measurement\./g, 'promptly to schedule your complimentary on-site measurement.'],
  [/Doorstep Laser Survey:<\/strong> Engineer inspects concrete slab, presents physical SS316 wire samples, and measures\./g, 'On-Site Survey:</strong> Our representative inspects the balcony opening, presents physical material samples, and measures.']
]);

// 8. why-invisible-safety.astro
replaceInFile('src/pages/why-invisible-safety.astro', [
  [/Certified SS316 marine steel, IS 3521 harnesses, and direct warranty\./g, 'Multi-strand stainless steel cables, disciplined safety protocols, and direct workmanship guarantees.'],
  [/Virgin SS316 Marine Alloy:<\/strong> Guaranteed 2\.5% Molybdenum; lab test certificate provided on request\./g, 'Multi-Strand Stainless Steel:</strong> Corrosion-resistant cables designed for residential balcony weather resistance.'],
  [/IS 3521 Safety Harnesses:<\/strong> Technicians wear certified dual-lanyard fall arrest gear during entire job\./g, 'Safety Protocols:</strong> Technicians wear dedicated safety harness gear during balcony installations.'],
  [/Official 10-Year Digital Warranty:<\/strong> Direct company warranty with free 3-month re-tension check\./g, 'Direct Workmanship Guarantee:</strong> Written warranty terms with scheduled follow-up support.'],
  [/Inferior SS202 \/ SS304 Steel:<\/strong> Rusts and stains within 6–12 months, requiring complete replacement\./g, 'Unprotected Metal Grills:</strong> Often rust and stain rapidly, requiring recurring painting and maintenance.']
]);
