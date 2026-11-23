import fs from 'fs';

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

const lines = fs.readFileSync('src/pages/index.astro', 'utf-8').split('\n');
let hits = 0;
lines.forEach((l, i) => {
  for (const p of PROHIBITED) {
    if (p.test(l)) {
      console.log(`Line ${i+1}: ${l.trim()}`);
      hits++;
    }
  }
});
console.log(`Total remaining hits on index.astro: ${hits}`);
