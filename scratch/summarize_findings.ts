import fs from 'fs';

const raw = fs.readFileSync('scratch/findings.json', 'utf-8');
const findings = JSON.parse(raw);

const byFile = new Map<string, number>();
for (const f of findings) {
  byFile.set(f.file, (byFile.get(f.file) || 0) + 1);
}

console.log(`Total files with occurrences: ${byFile.size}`);
const sorted = [...byFile.entries()].sort((a, b) => b[1] - a[1]);
for (const [file, count] of sorted) {
  console.log(`${count.toString().padStart(3, ' ')}: ${file}`);
}
