import { execSync } from 'child_process';
import fs from 'fs';

const liveHtml = fs.readFileSync('scratch/live_homepage.html', 'utf-8');

// Let's test a few specific strings that differ between commits
console.log('=== CHECKING WHICH COMMIT MATCHES LIVE SITE ===');

const markers = [
  'CCbUji4Y', // CSS hash from 93f6908c / 2c0b0359
  'B_9KzgJc', // CSS hash from 627d2f31
  '6Jh0j1sZ', // CSS hash from 3dd7a4b5
  'CqhAcbPJ', // Local dist CSS hash
  'services-header-row', // Introduced in uncommitted index.astro
  'service-card-media',  // Introduced in uncommitted index.astro
  'Flagship Safety',    // tag on invisible grills
  '400+ kg',
  'AISI 316',
  'DuPont'
];

for (const m of markers) {
  console.log(`Marker "${m}": Live = ${liveHtml.includes(m)}, Local dist = ${fs.readFileSync('dist/index.html', 'utf-8').includes(m)}`);
}
