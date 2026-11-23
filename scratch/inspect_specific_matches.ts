import fs from 'fs';

const results = JSON.parse(fs.readFileSync('scratch/all_claim_matches.json', 'utf8'));

console.log("=== LASER MATCHES ===");
console.log(JSON.stringify(results.laser, null, 2));

console.log("=== COMMITMENTS MATCHES ===");
console.log(JSON.stringify(results.commitments, null, 2));

console.log("=== ON-SITE MATCHES ===");
console.log(JSON.stringify(results.on_site, null, 2));

console.log("=== SAMPLE GUARANTEE MATCHES ===");
console.log(JSON.stringify(results.guarantee.slice(0, 10), null, 2));

console.log("=== SAMPLE CERTIFIED MATCHES ===");
console.log(JSON.stringify(results.certified.slice(0, 10), null, 2));
