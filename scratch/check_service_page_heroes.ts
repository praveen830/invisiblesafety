import fs from 'fs';

const pages = [
  'src/pages/invisible-grills.astro',
  'src/pages/balcony-safety.astro',
  'src/pages/child-safety-nets.astro',
  'src/pages/pigeon-nets.astro',
  'src/pages/sports-nets.astro',
  'src/pages/cloth-drying-hangers.astro',
  'src/pages/bird-spikes.astro'
];

for (const p of pages) {
  const content = fs.readFileSync(p, 'utf-8');
  const heroDesktop = content.match(/heroImage="([^"]*)"/)?.[1];
  const heroMobile = content.match(/heroImageMobile="([^"]*)"/)?.[1];
  console.log(`${p}:`);
  console.log(`  Desktop: ${heroDesktop}`);
  console.log(`  Mobile:  ${heroMobile}`);
}
