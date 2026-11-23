import fs from 'fs';

console.log('--- locations/index.astro line 15:');
const loc = fs.readFileSync('src/pages/locations/index.astro', 'utf-8').split('\n')[14];
console.log(loc);

console.log('--- staircase-safety-nets.astro line 103:');
const stair = fs.readFileSync('src/pages/staircase-safety-nets.astro', 'utf-8').split('\n')[102];
console.log(stair);

console.log('--- warranty.astro line 275:');
const warr = fs.readFileSync('src/pages/warranty.astro', 'utf-8').split('\n')[274];
console.log(warr);
