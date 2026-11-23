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

// EngineeringSection.astro
replaceInFile('src/components/EngineeringSection.astro', [
  [/49 micro-strands of virgin 316 marine-grade steel tightly wound to achieve 400\+ kgf tensile capacity while preserving smooth flexural handling\./g, 'Multi-strand high-tensile stainless steel wire tightly wound for reliable containment capacity while preserving smooth flexural handling.'],
  [/49 micro-strands of virgin 316 marine-grade steel[^\.]*\./g, 'Multi-strand high-tensile stainless steel wire tightly wound for reliable containment capacity while preserving smooth flexural handling.']
]);

// ProcessSection.astro
replaceInFile('src/components/ProcessSection.astro', [
  [/Harness-Certified Install/g, 'Professional On-Site Installation'],
  [/Trained technicians equipped with IS 3521 full-body harnesses install heavy-duty track frames and tension each cable to[^\.]*\./g, 'Trained installation technicians equipped with proper safety harnesses install structural track frames and align each cable securely.'],
  [/You inspect and approve the tension\. We issue your digital 10-year warranty certificate with a free 3-month complimentary[^\.]*\./g, 'You inspect and approve the finished installation. We issue your written documentation and warranty guarantee with scheduled follow-up support.']
]);

// CostEstimator.tsx
replaceInFile('src/components/react/CostEstimator.tsx', [
  [/Certified technicians with IS 3521 safety harness gear/g, 'Experienced technicians with dedicated safety gear']
]);

// VisualizerIsland.tsx
replaceInFile('src/components/react/VisualizerIsland.tsx', [
  [/Synthesizing SS316 marine cables & specular reflection model\.\.\./g, 'Synthesizing stainless steel cables & perspective model...'],
  [/url\(#ss316-gradient\)/g, 'url(#cable-gradient)'],
  [/Realistic perspective alignment & physical SS316 tension cable simulation/g, 'Realistic perspective alignment & physical tension cable simulation'],
  [/SS316 Marine Cables/g, 'Stainless Steel Cables'],
  [/SS316 Marine/g, 'Stainless Steel'],
  [/SVG Vector Perspective Layer: SS316 Invisible Grills & Nets/g, 'SVG Vector Perspective Layer: Invisible Grills & Nets'],
  [/Natural SS316 Marine Multi-Stop Gradient/g, 'Natural Stainless Multi-Stop Gradient'],
  [/id="ss316-gradient"/g, 'id="cable-gradient"'],
  [/SS316 Vertical Invisible Grills/g, 'Vertical Invisible Grills'],
  [/High-Tension Stainless Steel \(Breaking Load &gt; 400kg\)/g, 'High-Tension Stainless Steel Cables']
]);

// SolutionsAccordion.astro
replaceInFile('src/components/SolutionsAccordion.astro', [
  [/Virgin Japanese Stainless Steel corrosion-resistant Stainless Steel/g, 'Multi-strand stainless steel with protective polymer sleeve'],
  [/SS304 Marine Spikes on UV Polycarbonate Base/g, 'Stainless steel spikes on UV-treated polycarbonate base'],
  [/SS304 Polycarbonate Bird Spikes/g, 'Polycarbonate Bird Spikes'],
  [/150\+ kgf Impact Resistance per Mesh Unit/g, 'Impact containment barrier per mesh unit'],
  [/IS 3521 \/ Industrial Safety Harness Anchoring/g, 'Safety harness anchoring and secure rigging protocols']
]);

// SubPageLayout.astro
replaceInFile('src/layouts/SubPageLayout.astro', [
  [/Virgin SS316 2mm cables preserving unobstructed 180° penthouse view in crisp daylight\./g, 'Multi-strand 2mm cables preserving unobstructed 180° penthouse view in crisp daylight.'],
  [/0\.7mm monofilament mesh and SS304 spikes on AC ledges for complete bird exclusion\./g, '0.7mm monofilament mesh and stainless steel spikes on AC ledges for bird exclusion.'],
  [/Schedule Doorstep Laser Measurement/g, 'Schedule On-Site Balcony Measurement'],
  [/Our certified architectural surveyor will inspect your structure, measure cable lengths with high-precision lasers, present physical material samples, and provide an accurate written quote with zero sales pressure\./g, 'Our experienced surveyor will inspect your structure, measure balcony openings, present physical material samples, and provide a transparent, upfront written quotation.']
]);
