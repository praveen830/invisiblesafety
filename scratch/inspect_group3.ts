import fs from 'fs';

const files = [
  'src/pages/about.astro',
  'src/pages/contact.astro',
  'src/pages/materials.astro',
  'src/pages/warranty.astro',
  'src/pages/solutions.astro',
  'src/pages/solutions/[slug].astro',
  'src/pages/thank-you.astro',
  'src/pages/why-invisible-safety.astro'
];

const PROHIBITED = [
  /SS316|AISI\s*316|316-grade|grade\s*316/i,
  /SS304|304-grade/i,
  /marine[\s-]?grade/i,
  /dupont|garware/i,
  /400\+?\s*kgf?|150\+?\s*kgf?|breaking\s*load/i,
  /10[\s-]year|15[\s-]year|written\s*warranty/i,
  /15,?000\+|12,?400\+|10,?000\+/i,
  /100%\s*safe|100%\s*approved|guaranteed\s*protection/i,
  /laser[\s-]?measure|laser[\s-]?survey|laser[\s-]?sizing/i,
  /certified\s*(in-house\s*)?technician|harness-certified|IS\s*3521/i,
  /molybdenum|virgin\s*japanese/i,
  /99\.4%|satisfaction\s*rate/i
];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');
  console.log(`\n=== ${file} ===`);
  lines.forEach((l, i) => {
    for (const p of PROHIBITED) {
      if (p.test(l)) {
        console.log(`  Line ${i+1}: ${l.trim()}`);
      }
    }
  });
}
