import fs from 'fs';
import path from 'path';

const SRC_DIR = path.join(process.cwd(), 'src');

const PROHIBITED_PATTERNS = [
  { name: 'SS316 / AISI 316', regex: /SS316|AISI\s*316|316-grade|grade\s*316/i },
  { name: 'SS304', regex: /SS304|AISI\s*304|304-grade/i },
  { name: 'Marine Grade', regex: /marine[\s-]?grade/i },
  { name: 'DuPont / Garware', regex: /dupont|garware/i },
  { name: 'Load / Tensile claim', regex: /400\+?\s*kgf?|150\+?\s*kgf?|tensile\s*break|breaking\s*load/i },
  { name: 'Unverified Warranty', regex: /10[\s-]year\s*warranty|15[\s-]year\s*warranty|15-year\s*certificate|written\s*warranty/i },
  { name: 'Installation count claim', regex: /15,?000\+|12,?400\+|10,?000\+/i },
  { name: '100% Safety / Approval guarantee', regex: /100%\s*safe|100%\s*approved|guaranteed\s*protection/i },
  { name: 'Laser measurement claim', regex: /laser[\s-]?measure|laser[\s-]?survey|laser[\s-]?sizing/i },
  { name: 'Certified technician / ISO / IS 3521', regex: /certified\s*(in-house\s*)?technician|harness-certified|IS\s*3521|ISO[\s-]?\d+/i },
  { name: 'Molybdenum / Virgin Japanese', regex: /molybdenum|virgin\s*japanese|virgin\s*nylon/i },
  { name: 'Customer Satisfaction claim', regex: /99\.4%|satisfaction\s*rate/i }
];

function scanDir(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const fullPath = path.join(dir, f);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath, fileList);
    } else if (/\.(astro|ts|js|json|tsx|jsx)$/.test(f)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const allFiles = scanDir(SRC_DIR);
console.log(`Scanning ${allFiles.length} files in src/...`);

const findings: { file: string; line: number; pattern: string; text: string }[] = [];

for (const file of allFiles) {
  // We can skip src/data/geo and src/components/geo since they were audited, but let's scan everything to be sure!
  const content = fs.readFileSync(file, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((lineText, idx) => {
    for (const pat of PROHIBITED_PATTERNS) {
      if (pat.regex.test(lineText)) {
        const relPath = path.relative(process.cwd(), file);
        findings.push({
          file: relPath,
          line: idx + 1,
          pattern: pat.name,
          text: lineText.trim()
        });
      }
    }
  });
}

console.log(`\n=== FOUND ${findings.length} OCCURRENCES ===\n`);

const byFile = new Map<string, typeof findings>();
for (const f of findings) {
  if (!byFile.has(f.file)) byFile.set(f.file, []);
  byFile.get(f.file)!.push(f);
}

for (const [file, items] of byFile.entries()) {
  console.log(`\n--- ${file} (${items.length} occurrences) ---`);
  for (const it of items) {
    console.log(`  Line ${it.line} [${it.pattern}]: ${it.text.slice(0, 120)}`);
  }
}

// Write report to scratch/findings.json
fs.writeFileSync('scratch/findings.json', JSON.stringify(findings, null, 2));
