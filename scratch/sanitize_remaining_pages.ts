import fs from 'fs';
import path from 'path';

const SRC_DIR = path.resolve('src');

function getAllFiles(dir: string, fileList: string[] = []): string[] {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, fileList);
    } else if (/\.(astro|ts|tsx)$/.test(file)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const allFiles = getAllFiles(SRC_DIR);
let totalUpdated = 0;

for (const file of allFiles) {
  const relPath = path.relative(process.cwd(), file).replace(/\\/g, '/');
  
  // Skip tests or geo validator
  if (relPath.includes('tests/')) continue;

  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  // 1. Direct workmanship guarantee
  content = content.replace(/direct\s+workmanship\s+guarantee/gi, 'professional installation support');

  // 2. 10-Year or specific guarantees
  content = content.replace(/10[- ]year\s+direct\s+written\s+guarantee/gi, 'Standard installation details on inquiry');
  content = content.replace(/3[- ]year\s+clean\s+balcony\s+living\s+guarantee/gi, 'Standard installation details on inquiry');
  content = content.replace(/certified\s+high-tension\s+long-life\s+guarantee/gi, 'Standard installation details on inquiry');
  content = content.replace(/3\s+to\s+5[- ]year\s+certified\s+replacement\s+guarantee/gi, 'Standard installation details on inquiry');
  content = content.replace(/commercial\s+site-grade\s+certification/gi, 'Standard installation details on inquiry');
  content = content.replace(/weatherproof\s+coating\s+guarantee/gi, 'Standard installation details on inquiry');
  content = content.replace(/permanent\s+deterrent\s+guarantee/gi, 'Standard installation details on inquiry');
  content = content.replace(/anti-rust\s+guarantee/gi, 'corrosion protection');
  content = content.replace(/anti-sag\s+certified\s+warranty/gi, 'durable mesh installation');
  content = content.replace(/quality\s+guarantee/gi, 'standard support');

  // 3. Multi-strand & polymer sleeve
  content = content.replace(/multi[- ]strand\s+stainless\s+steel\s+cable\s+system/gi, 'stainless steel cable system');
  content = content.replace(/multi[- ]strand\s+stainless\s+steel\s+cables?/gi, 'stainless steel cables');
  content = content.replace(/multi[- ]strand\s+stainless\s+steel/gi, 'stainless steel');
  content = content.replace(/multi[- ]strand\s+braided\s+alloy\s+core/gi, 'braided stainless steel core');
  content = content.replace(/multi[- ]strand/gi, 'stainless steel');
  content = content.replace(/protective\s+polymer\s+sleeve/gi, 'protective coating');
  content = content.replace(/polymer\s+sleeve/gi, 'protective coating');
  content = content.replace(/transparent\s+polymer\s+sleeve/gi, 'transparent protective coating');

  // 4. Tensile / High-tensile
  content = content.replace(/high[- ]tensilef\s+breaking\s+strength\s+per\s+cable/gi, 'Secure balcony containment barrier');
  content = content.replace(/high[- ]tensile\s+stainless\s+steel/gi, 'stainless steel');
  content = content.replace(/high[- ]tensile\s+cables?/gi, 'safety cables');
  content = content.replace(/high[- ]tensile\s+fall\s+protection/gi, 'balcony fall protection');
  content = content.replace(/high[- ]tensile\s+mesh/gi, 'durable mesh');
  content = content.replace(/high[- ]tensile/gi, 'durable');

  // 5. Monofilament
  content = content.replace(/high[- ]density\s+monofilament\s+nylon/gi, 'high-density nylon netting');
  content = content.replace(/monofilament\s+netting/gi, 'nylon netting');
  content = content.replace(/weatherproof\s+monofilament/gi, 'weather-resistant netting');

  // 6. Laser
  content = content.replace(/laser\s+accuracy/gi, 'proper accuracy');
  content = content.replace(/laser\s+measuring/gi, 'careful measurement');
  content = content.replace(/laser\s+measurement/gi, 'measurement');
  content = content.replace(/laser\s+calibration/gi, 'balcony measurement');
  content = content.replace(/laser/gi, 'accurate');

  // 7. Doorstep & On-site promises
  content = content.replace(/free\s+doorstep\s+on-site\s+measurement/gi, 'installation quotation');
  content = content.replace(/doorstep\s+measurement/gi, 'measurement inquiry');
  content = content.replace(/on-site\s+measurement\s+and\s+consultation/gi, 'measurement and consultation');
  content = content.replace(/complimentary\s+on-site\s+measurement/gi, 'quotation consultation');
  content = content.replace(/free\s+on-site\s+measurement/gi, 'quotation and consultation');
  content = content.replace(/doorstep\s+re-tensioning\s+inspections/gi, 'support inspections upon request');
  content = content.replace(/calibrated\s+doorstep\s+check/gi, 'installation check');
  content = content.replace(/immediate\s+technician\s+dispatch/gi, 'customer support response');

  // 8. Certified
  content = content.replace(/certified\s+to\s+withstand\s+massive\s+kinetic\s+impact\s+forces/gi, 'designed for residential containment');
  content = content.replace(/certified\s+high-rise\s+safety/gi, 'high-rise safety');
  content = content.replace(/certified\s+engineering\s+quotation/gi, 'quotation estimate');
  content = content.replace(/certified\s+riggers/gi, 'experienced technicians');
  content = content.replace(/certified\s+technicians/gi, 'trained technicians');
  content = content.replace(/locally\s+certified\s+installation\s+teams/gi, 'local installation teams');
  content = content.replace(/certified\s+on-site\s+measurement/gi, 'on-site measurement');
  content = content.replace(/certified\s+engineering/gi, 'professional installation');

  // 9. Three quality commitments
  content = content.replace(/three\s+quality\s+commitments/gi, 'core service standards');
  content = content.replace(/quality\s+commitments/gi, 'service standards');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Sanitized: ${relPath}`);
    totalUpdated++;
  }
}

console.log(`Total files updated: ${totalUpdated}`);
