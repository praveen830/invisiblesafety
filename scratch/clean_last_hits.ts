import fs from 'fs';
import path from 'path';

function updateFile(relPath: string, updater: (content: string) => string): void {
  const fullPath = path.resolve(relPath);
  const original = fs.readFileSync(fullPath, 'utf8');
  const updated = updater(original);
  if (original !== updated) {
    fs.writeFileSync(fullPath, updated, 'utf8');
    console.log(`Updated: ${relPath}`);
  }
}

// 1. balcony-safety.astro
updateFile('src/pages/balcony-safety.astro', c => {
  return c.replace(/\{ label: "Compliance Guarantee", value: "Society Elevation Compliant"/g,
    '{ label: "Society Compliance", value: "Apartment Elevation Compliant"');
});

// 2. child-safety-nets.astro
updateFile('src/pages/child-safety-nets.astro', c => {
  return c
    .replace(/with 5-year replacement guarantee\./g, 'with standard installation support.')
    .replace(/\{ label: "Impact Capacity", value: "high-load Breaking Strength per Mesh"/g,
      '{ label: "Safety Feature", value: "High-Containment Balcony Barrier"');
});

// 3. construction-safety.astro
updateFile('src/pages/construction-safety.astro', c => {
  return c.replace(/tension test certificates and written structural anchorage guarantees\./g,
    'site specifications and structural anchoring verification.');
});

// 4. index.astro
updateFile('src/pages/index.astro', c => {
  return c
    .replace(/5-Year Weatherproof Guarantee against rotting &amp; UV degradation/g,
      'Weather-resistant materials designed for long-term outdoor exposure')
    .replace(/0\.7mm to 1\.2mm stainless steel braided monofilament &amp; co-polymer/g,
      'Durable outdoor netting and stainless steel cables');
});

// 5. invisible-grills.astro
updateFile('src/pages/invisible-grills.astro', c => {
  return c
    .replace(/<!-- Trust Certification -->/g, '<!-- Trust Indicators -->')
    .replace(/Child &amp; pet anti-spread guarantee/g, 'Child &amp; pet fall prevention design');
});

// 6. safety-nets.astro
updateFile('src/pages/safety-nets.astro', c => {
  return c
    .replace(/100% humane, zero-sag guarantee, Stainless Steel anchors\./g,
      'Humane bird deterrent and secure perimeter anchors.')
    .replace(/\{ label: "Polymer Standard", value: "Virgin UV-Stabilized Monofilament"/g,
      '{ label: "Netting Material", value: "High-Density Polymer Mesh"')
    .replace(/durable MONOFILAMENT DYNAMICS/g, 'DURABLE NETTING DYNAMICS')
    .replace(/Ultra-smooth monofilament joints/g, 'Ultra-smooth netting mesh joints');
});

// 7. terrace-safety-nets.astro
updateFile('src/pages/terrace-safety-nets.astro', c => {
  return c
    .replace(/<h3 class="terrace-card-title">Pet Anti-Jump Guarantee<\/h3>/g,
      '<h3 class="terrace-card-title">Pet Anti-Jump Protection</h3>')
    .replace(/\{ label: "Polymer Quality", value: "Virgin UV-Stabilized Monofilament"/g,
      '{ label: "Netting Material", value: "High-Density Polymer Mesh"');
});

// 8. bird-protection.astro
updateFile('src/pages/bird-protection.astro', c => {
  return c.replace(/\{ label: "Mesh Diameter", value: "0\.7mm Translucent UV Monofilament"/g,
    '{ label: "Netting Type", value: "Translucent Bird Netting"');
});

// 9. pigeon-nets.astro
updateFile('src/pages/pigeon-nets.astro', c => {
  return c.replace(/\{ label: "Mesh Diameter", value: "0\.7mm Translucent UV Monofilament"/g,
    '{ label: "Netting Type", value: "Translucent Bird Netting"');
});

// 10. solutions/[slug].astro
updateFile('src/pages/solutions/[slug].astro', c => {
  return c
    .replace(/\{ label: "Mesh Diameter", value: "0\.7mm Translucent UV Monofilament"/g,
      '{ label: "Netting Type", value: "Translucent Bird Netting"')
    .replace(/\{ label: "Polymer Standard", value: "Virgin UV-Stabilized Monofilament"/g,
      '{ label: "Netting Material", value: "High-Density Polymer Mesh"');
});
