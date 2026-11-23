import fs from 'fs';

const content = fs.readFileSync('src/pages/index.astro', 'utf8');
const lines = content.split('\n');

const imgMatches: { line: number; text: string }[] = [];
lines.forEach((l, idx) => {
  if (/src=|srcset=|image:|mobileImage:|\.webp|\.jpg|\.png/i.test(l)) {
    imgMatches.push({ line: idx + 1, text: l.trim() });
  }
});

console.log(`Found ${imgMatches.length} image references in src/pages/index.astro:`);
imgMatches.forEach(m => console.log(`  L${m.line} -> ${m.text}`));
