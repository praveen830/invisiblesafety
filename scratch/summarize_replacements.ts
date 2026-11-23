import fs from 'fs';

const findings = JSON.parse(fs.readFileSync('scratch/replacement_audit_findings.json', 'utf8'));

const groups: Record<string, any[]> = {};
for (const item of findings) {
  const m = item.matched.toLowerCase();
  let key = 'other';
  if (m.includes('guarantee')) key = 'guarantee';
  else if (m.includes('warranty')) key = 'warranty';
  else if (m.includes('consultation')) key = 'on-site consultation';
  else if (m.includes('measurement')) key = 'on-site measurement';
  else if (m.includes('assessment')) key = 'site assessment';
  else if (m.includes('multi-strand')) key = 'multi-strand';
  else if (m.includes('sleeve')) key = 'polymer sleeve';
  else if (m.includes('quality commitments')) key = 'quality commitments';
  else if (m.includes('monofilament')) key = 'monofilament nylon';
  else if (m.includes('experienced installation')) key = 'experienced installation team';
  else if (m.includes('fall protection')) key = 'residential fall protection';
  else if (m.includes('certified')) key = 'certified';
  else if (m.includes('laser')) key = 'laser';

  groups[key] = groups[key] || [];
  groups[key].push(item);
}

for (const [k, arr] of Object.entries(groups)) {
  console.log(`${k}: ${arr.length} occurrences`);
  console.log(`   Sample: "${arr[0].text}" in ${arr[0].file}:${arr[0].line}`);
}
