import fs from 'fs';
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
  laser: /\blaser\b/i,
  guarantee: /\b(guarantee|guarantees|guaranteed)\b/i,
  warranty: /\bwarranty\b/i,
  on_site: /\b(on-site\s+consultation|on-site\s+measurement|doorstep\s+measurement|free\s+inspection|site\s+assessment)\b/i,
  technical_specs: /\b(multi-strand|polymer\s+sleeve|monofilament|tensile|kinetic\s+impact|breaking\s+strength|tensile\s+strength)\b/i,
  commitments: /\b(quality\s+commitments|commitments)\b/i,
  turnaround_experience: /\b(same-day|24\/7|15,000\+|decade\s+of\s+experience|experienced\s+installation\s+team)\b/i
};

const allFiles = getAllFiles(SRC_DIR);
const results: Record<string, { file: string; line: number; text: string; match: string }[]> = {};

for (const cat of Object.keys(patterns)) {
  results[cat] = [];
}

for (const file of allFiles) {
  const relPath = path.relative(process.cwd(), file).replace(/\\/g, '/');
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  lines.forEach((lineText, idx) => {
    for (const [cat, regex] of Object.entries(patterns)) {
      const m = lineText.match(regex);
      if (m) {
        results[cat].push({
          file: relPath,
          line: idx + 1,
          text: lineText.trim(),
          match: m[0]
        });
      }
    }
  });
}

for (const [cat, items] of Object.entries(results)) {
  console.log(`=== CATEGORY: ${cat} (${items.length} occurrences) ===`);
  const fileSet = new Set(items.map(i => i.file));
  console.log(`   Files affected (${fileSet.size}):`, Array.from(fileSet).slice(0, 10));
}

fs.writeFileSync('scratch/all_claim_matches.json', JSON.stringify(results, null, 2));
