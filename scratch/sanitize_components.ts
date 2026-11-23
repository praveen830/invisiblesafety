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

// 1. Hero.astro
replaceInFile('src/components/Hero.astro', [
  [/SS316 marine-grade/g, 'stainless steel'],
  [/SS316 Grade/g, 'High-Tensile'],
  [/SS316 Marine/g, 'Stainless Steel'],
  [/Marine-grade cables/g, 'Multi-strand cables'],
  [/Doorstep laser sizing/g, 'Custom on-site sizing']
]);

// 2. Header.astro
replaceInFile('src/components/Header.astro', [
  [/SS316 Balcony Invisible Grills/g, 'Balcony Invisible Grills'],
  [/2\.0mm & 2\.5mm marine-grade high-tensile cables/g, '2.0mm & 2.5mm high-tensile stainless steel cables'],
  [/Complimentary Doorstep Laser Survey/g, 'Complimentary On-Site Survey'],
  [/doorstep laser measurement/g, 'doorstep measurement'],
  [/SS316 Metallurgy Specs/g, 'Material Metallurgy Specs'],
  [/15-Year Warranty Terms/g, 'Warranty & Guarantee Terms']
]);

// 3. Footer.astro
replaceInFile('src/components/Footer.astro', [
  [/SS316 invisible grill and certified safety net specialist/g, 'invisible grill and residential safety net specialist'],
  [/SS316 Balcony Invisible Grills/g, 'Balcony Invisible Grills'],
  [/Virgin SS316 Metallurgy Specs/g, 'Material Metallurgy Specs'],
  [/15-Year Warranty Terms/g, 'Warranty & Guarantee Terms'],
  [/15-Year Warranty/g, 'Warranty Terms'],
  [/doorstep laser measurement across all gated societies \(Aparna, My Home, Prestige &amp; Sobha\)/g, 'doorstep measurement and consultation across residential communities']
]);

// 4. SubPageLayout.astro
replaceInFile('src/layouts/SubPageLayout.astro', [
  [/Virgin SS316 Marine Grade/g, 'High-Tensile Stainless Steel'],
  [/400\+ kgf Breaking Load/g, 'Engineered Fall Protection'],
  [/15-Year Certificate/g, 'Direct Workmanship Guarantee'],
  [/RWA Society Approved/g, 'Society Elevation Compliant'],
  [/SS316 Marine Grade Invisible Grills/g, 'Architectural Invisible Grills'],
  [/SS316 Marine/g, 'Stainless Steel'],
  [/laser-measured/g, 'custom-measured'],
  [/laser measurement/g, 'on-site measurement']
]);

// 5. TrustSection.astro
replaceInFile('src/components/TrustSection.astro', [
  [/SS316 Marine Grade Cables/g, 'Stainless Steel Cable Systems'],
  [/Japanese imported virgin 316 stainless steel with DuPont nylon casing, rust-proof even in coastal zones\./g, 'Multi-strand stainless steel cables with transparent protective coating, designed for outdoor balconies.'],
  [/400\+ kg Tensile Break-Load/g, 'Residential Fall Protection'],
  [/Independently tested high-tensile wire system safeguarding children and pets from accidental falls\./g, 'High-tensile wire system designed to help safeguard children and household pets on balconies.'],
  [/Harness-Certified Technicians/g, 'Experienced Installation Team'],
  [/Rigorous work-at-height safety with dual-lanyard IS 3521 harnesses and laser-guided track anchors\./g, 'Trained on-site technicians equipped with proper safety gear and precision alignment tools.'],
  [/10-Year Warranty & Free Re-Tensioning/g, 'Direct Workmanship Assurance'],
  [/Official digital certificate covering cable integrity and workmanship, with a free re-tension check within 3 months\./g, 'Transparent quotation with quality check upon installation and scheduled support.']
]);

// 6. SolutionsAccordion.astro
replaceInFile('src/components/SolutionsAccordion.astro', [
  [/SS316/g, 'Stainless Steel'],
  [/marine-grade/gi, 'corrosion-resistant'],
  [/400\+ kg/g, 'high-tensile'],
  [/laser/gi, 'custom']
]);

// 7. LocationLinks.astro
replaceInFile('src/components/LocationLinks.astro', [
  [/marine-grade invisible grills/g, 'stainless steel invisible grills'],
  [/UV-stabilized DuPont coating/g, 'UV-stabilized protective coating'],
  [/Marine-grade AISI 316 invisible grills/g, 'Stainless steel invisible grills'],
  [/strict AISI 316 austenitic stainless steel core/g, 'multi-strand stainless steel cable core'],
  [/laser-measured safety netting/g, 'custom-measured safety netting'],
  [/Coastal saline-grade SS316 rust-proof installations/g, 'Corrosion-resistant stainless steel installations'],
  [/laser measurement tools and full work-at-height safety gear/g, 'measurement tools and full on-site safety gear']
]);

// 8. ComparisonTable.astro
replaceInFile('src/components/ComparisonTable.astro', [
  [/modern architectural SS316 invisible grills/g, 'modern architectural invisible grills'],
  [/Invisible Safety SS316 Invisible Grills/g, 'Invisible Safety Invisible Grills'],
  [/✓ SS316 Marine Grade \(100% rust-proof\)/g, '✓ High-Grade Stainless Steel (corrosion-resistant)']
]);

// 9. EngineeringSection.astro
replaceInFile('src/components/EngineeringSection.astro', [
  [/ANATOMY OF SS316 CABLE/g, 'ANATOMY OF SAFETY CABLE'],
  [/DuPont Pure Nylon Encapsulation/g, 'High-Grade Polymer Encapsulation'],
  [/49 micro-strands of virgin 316 marine-grade steel tightly wound to achieve 400\+ kgf tensile capacity while preserving smooth flexural handling\./g, 'Multi-strand high-tensile stainless steel wire tightly wound for reliable containment capacity while preserving smooth flexural handling.'],
  [/AISI 316 Marine/g, 'Stainless Steel Core'],
  [/Contains 2\.5% Molybdenum specifically formulated to resist chloride attack and pitting\./g, 'Multi-strand braided alloy core engineered for outdoor residential weather resistance.'],
  [/400\+ kg Breaking Load/g, 'Engineered Fall Safety'],
  [/Each cable is individually calibrated to withstand 400\+ kgf tensile impact, preventing child or pet fall accidents\./g, 'Each cable array is tensioned to provide reliable containment barrier protection for balconies.']
]);

// 10. ProcessSection.astro
replaceInFile('src/components/ProcessSection.astro', [
  [/optical laser distance meters and real physical SS316/g, 'precision measurement tools and physical stainless steel'],
  [/laser/gi, 'precision'],
  [/SS316/g, 'stainless steel'],
  [/harness-equipped certified technicians/g, 'experienced installation technicians']
]);

// 11. ProductCard.astro
replaceInFile('src/components/ProductCard.astro', [
  [/SS316/g, 'Stainless Steel'],
  [/400\+ kg/g, 'High-Tensile']
]);

// 12. VisualizerIsland.tsx
replaceInFile('src/components/react/VisualizerIsland.tsx', [
  [/SS316 Marine Grade/g, 'Stainless Steel'],
  [/Virgin Japanese SS316 Marine Grade/g, 'Multi-Strand Stainless Steel'],
  [/400\+ kg/g, 'High-Tensile'],
  [/10-Year Warranty/g, 'Direct Guarantee'],
  [/15-Year Rust-Free Warranty/g, 'Quality Workmanship Guarantee'],
  [/Laser/gi, 'Custom']
]);

// 13. CostEstimator.tsx
replaceInFile('src/components/react/CostEstimator.tsx', [
  [/SS316/g, 'Stainless Steel'],
  [/Virgin SS316/g, 'High-Tensile Stainless Steel'],
  [/marine-grade/gi, 'corrosion-resistant'],
  [/400\+ kg/g, 'High-Tensile'],
  [/laser/gi, 'custom']
]);

// 14. GalleryFilter.tsx
replaceInFile('src/components/react/GalleryFilter.tsx', [
  [/SS316/g, 'Stainless Steel'],
  [/Marine Grade/g, 'Stainless Steel']
]);
