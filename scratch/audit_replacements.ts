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

const targetPhrases = [
  /workmanship\s+guarantee/i,
  /guarantee/i,
  /warranty/i,
  /on-site\s+consultation/i,
  /on-site\s+measurement/i,
  /site\s+assessment/i,
  /multi-strand/i,
  /protective\s+polymer\s+sleeve/i,
  /polymer\s+sleeve/i,
  /quality\s+commitments/i,
  /high-density\s+monofilament/i,
  /laser/i,
  /certified/i,
  /experienced\s+installation\s+team/i,
  /residential\s+fall\s+protection/i
];

const allFiles = getAllFiles(SRC_DIR);
console.log(`Auditing ${allFiles.length} files in src/...`);

const findings: { file: string; line: number; text: string; matched: string }[] = [];

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((lineText, idx) => {
    for (const regex of targetPhrases) {
      const match = lineText.match(regex);
      if (match) {
        findings.push({
          file: path.relative(process.cwd(), file).replace(/\\/g, '/'),
          line: idx + 1,
          text: lineText.trim(),
          matched: match[0]
        });
        break; // one match per line is enough
      }
    }
  });
}

console.log(`Found ${findings.length} occurrences across src/.`);
fs.writeFileSync('scratch/replacement_audit_findings.json', JSON.stringify(findings, null, 2));

const byFile: Record<string, number> = {};
findings.forEach(f => {
  byFile[f.file] = (byFile[f.file] || 0) + 1;
});

console.log('Top files by findings:');
Object.entries(byFile)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 20)
  .forEach(([f, count]) => console.log(`  ${f}: ${count}`));
