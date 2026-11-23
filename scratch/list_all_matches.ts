import fs from 'fs';

const results = JSON.parse(fs.readFileSync('scratch/all_claim_matches.json', 'utf8'));

// Aggregate by file
const fileMap: Record<string, { line: number; cat: string; text: string; match: string }[]> = {};

for (const [cat, items] of Object.entries(results as Record<string, any[]>)) {
  for (const item of items) {
    fileMap[item.file] = fileMap[item.file] || [];
    fileMap[item.file].push({ line: item.line, cat, text: item.text, match: item.match });
  }
}

// Sort files alphabetically
const sortedFiles = Object.keys(fileMap).sort();
console.log(`Total files containing claims: ${sortedFiles.length}`);

for (const file of sortedFiles) {
  console.log(`\n--- FILE: ${file} (${fileMap[file].length} matches) ---`);
  // Sort lines
  fileMap[file].sort((a, b) => a.line - b.line);
  fileMap[file].forEach(m => {
    console.log(`  L${m.line} [${m.cat}:${m.match}] -> ${m.text.substring(0, 100)}`);
  });
}
