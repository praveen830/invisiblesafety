import fs from 'fs';

function replaceInFile(filePath: string, replacements: [RegExp | string, string][]) {
  if (!fs.existsSync(filePath)) return;
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
  }
}

// 1. VisualizerIsland.tsx
replaceInFile('src/components/react/VisualizerIsland.tsx', [
  [/'SS316 Horizontal Invisible Grills'/g, "'Horizontal Invisible Grills'"]
]);

// 2. TrustSection.astro
replaceInFile('src/components/TrustSection.astro', [
  [/ss316-pill/g, 'steel-pill']
]);

// 3. SubPageLayout.astro
replaceInFile('src/layouts/SubPageLayout.astro', [
  [/Our certified architectural surveyor will inspect your structure, measure cable lengths with high-precision lasers, pres[^\.]*\./g, 'Our experienced surveyor will inspect your structure, measure balcony openings, present physical material samples, and provide a transparent written quotation.']
]);

// 4. bird-spikes.astro
replaceInFile('src/pages/bird-spikes.astro', [
  [/AISI 304 Marine Stainless Steel/g, 'Stainless Steel'],
  [/Grade AISI 304 Stainless Steel/g, 'Stainless Steel Spikes']
]);

// 5. building-safety-nets.astro
replaceInFile('src/pages/building-safety-nets.astro', [
  [/Marine Anchoring/g, 'Balcony Anchoring'],
  [/AISI 304 Stainless Steel Rigging/g, 'Stainless Steel Rigging'],
  [/AISI 304 marine expansion fasteners/g, 'stainless steel expansion fasteners']
]);

// 6. child-safety-nets.astro
replaceInFile('src/pages/child-safety-nets.astro', [
  [/150\+ kg load tested/g, 'engineered fall safety']
]);

// 7. index.astro
replaceInFile('src/pages/index.astro', [
  [/<span class="eng-spec-label">Tensile Breaking Strength:<\/span>/g, '<span class="eng-spec-label">Cable Tensile Strength:</span>'],
  [/<td class="feature-name">Tensile Breaking Strength<\/td>/g, '<td class="feature-name">Cable Tensile Strength</td>']
]);

// 8. invisible-grills.astro
replaceInFile('src/pages/invisible-grills.astro', [
  [/350 kgf tensile breaking strength/g, 'high-tensile multi-strand cable strength'],
  [/high-tensile maximum tensile breaking strength/g, 'high-tensile multi-strand cable matrix']
]);

// 9. locations/index.astro
replaceInFile('src/pages/locations/index.astro', [
  [/certified on-site balcony measurement/g, 'on-site balcony measurement']
]);

// 10. safety-nets.astro
replaceInFile('src/pages/safety-nets.astro', [
  [/AISI 304 marine stainless steel eye-bolts/g, 'stainless steel eye-bolts']
]);

// 11. solutions/[slug].astro
replaceInFile('src/pages/solutions/[slug].astro', [
  [/SS304 spikes/g, 'stainless steel spikes']
]);

// 12. staircase-safety-nets.astro
replaceInFile('src/pages/staircase-safety-nets.astro', [
  [/High-Tenacity Virgin Nylon \/ HDPE/g, 'High-Tenacity Polymer / HDPE'],
  [/150\+ kg load tested/g, 'engineered fall safety']
]);

// 13. swimming-pool-nets.astro
replaceInFile('src/pages/swimming-pool-nets.astro', [
  [/Holds 150\+ kg Child \/ Adult Weight/g, 'High-Strength Fall Barrier']
]);

// 14. warranty.astro
replaceInFile('src/pages/warranty.astro', [
  [/Virgin Japanese AISI 316 Marine Stainless Steel \(316 Alloy with 2\.5% Molybdenum\)[^<]*/g, 'Multi-strand stainless steel cables designed for residential balcony containment.'],
  [/SS304 Perimeter Fastener Anchors/g, 'Stainless Steel Perimeter Fasteners'],
  [/100% Virgin Polymer/g, 'Durable Polymer Netting'],
  [/certified technician/g, 'installation technician']
]);

// 15. why-invisible-safety.astro
replaceInFile('src/pages/why-invisible-safety.astro', [
  [/Written warranty terms with scheduled follow-up support\./g, 'Documentation terms with scheduled follow-up support.']
]);

// Also update products.ts to rename breakingLoad to loadRating if needed
replaceInFile('src/data/products.ts', [
  [/breakingLoad/g, 'loadRating']
]);
replaceInFile('src/components/ProductCard.astro', [
  [/breakingLoad/g, 'loadRating']
]);
