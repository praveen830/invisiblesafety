import fs from 'fs';

const results = JSON.parse(fs.readFileSync('scratch/all_claim_matches.json', 'utf8'));

// Re-run scan to get fresh matches
import path from 'path';

const SRC_DIR = path.resolve('src');
function getAllFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else if (/\.(astro|ts|tsx|js|jsx|json)$/.test(file)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const patterns: Record<string, RegExp> = {
  certified: /\b(certified|certification|certifications)\b/i,
  guarantee: /\b(guarantee|guarantees|guaranteed)\b/i,
  on_site: /\b(on-site\s+consultation|on-site\s+measurement|doorstep\s+measurement|free\s+inspection|site\s+assessment)\b/i,
  turnaround_experience: /\b(same-day|24\/7|15,000\+|decade\s+of\s+experience|experienced\s+installation\s+team)\b/i,
  technical_specs: /\b(multi-strand|polymer\s+sleeve|monofilament|tensile|kinetic\s+impact|breaking\s+strength|tensile\s+strength)\b/i
};

const allFiles = getAllFiles(SRC_DIR);
const fresh: Record<string, any[]> = {};
for (const cat of Object.keys(patterns)) fresh[cat] = [];

for (const file of allFiles) {
  const relPath = path.relative(process.cwd(), file).replace(/\\/g, '/');
  if (relPath.includes('tests/')) continue;
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  lines.forEach((lineText, idx) => {
    for (const [cat, regex] of Object.entries(patterns)) {
      const m = lineText.match(regex);
      if (m) {
        fresh[cat].push({
          file: relPath,
          line: idx + 1,
          text: lineText.trim(),
          match: m[0]
        });
      }
    }
  });
}

console.log("=== CERTIFIED MATCHES ===");
fresh.certified.forEach(m => console.log(`  ${m.file}:${m.line} -> ${m.text}`));

console.log("\n=== ON-SITE MATCHES ===");
fresh.on_site.forEach(m => console.log(`  ${m.file}:${m.line} -> ${m.text}`));

console.log("\n=== TURNAROUND / EXPERIENCE MATCHES ===");
fresh.turnaround_experience.forEach(m => console.log(`  ${m.file}:${m.line} -> ${m.text}`));

console.log("\n=== SAMPLE GUARANTEE MATCHES ===");
fresh.guarantee.slice(0, 15).forEach(m => console.log(`  ${m.file}:${m.line} -> ${m.text}`));

console.log("\n=== SAMPLE TECHNICAL SPECS MATCHES ===");
fresh.technical_specs.slice(0, 15).forEach(m => console.log(`  ${m.file}:${m.line} -> ${m.text}`));
