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
let updatedFiles = 0;

for (const file of allFiles) {
  const relPath = path.relative(process.cwd(), file).replace(/\\/g, '/');
  if (relPath.includes('tests/')) continue;

  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // Warranties & Guarantees in spec objects
  content = content.replace(/\{ label: "(Replacement Warranty|Direct Warranty|Tension Warranty|Commercial Warranty|Direct Written Guarantee|Site Guarantee|Durability Guarantee|Clean Living Guarantee|Living Guarantee)", value: "[^"]*", icon: ([^}]+) \}/g,
    '{ label: "Service Support", value: "Installation & Fitting Support", icon: $2 }');

  content = content.replace(/\{ label: "(Tensile Strength|Impact Tensile Load|Cable Metallurgy)", value: "[^"]*", icon: ([^}]+) \}/g,
    '{ label: "Safety Feature", value: "Residential Balcony Protection", icon: $2 }');

  // Product specs warranty values in src/data/products.ts
  content = content.replace(/warranty: "(Quality Workmanship Guarantee|Standard Service Guarantee|Standard installation)"/g,
    'warranty: "Installation support on inquiry"');

  // React CostEstimator text
  content = content.replace(/Virgin Stainless Steel corrosion-resistant tensile cables/g, 'Stainless steel cables with protective coating');
  content = content.replace(/UV-stabilized virgin polymer netting/g, 'Durable nylon netting');

  // Materials & Certification headings
  content = content.replace(/METALLURGICAL CERTIFICATION & STANDARDS/g, 'MATERIAL SPECIFICATIONS & STANDARDS');
  content = content.replace(/CERTIFIED 7-SERVICE PHOTO-FIRST SHOWCASE/g, '7-SERVICE PHOTO-FIRST SHOWCASE');
  content = content.replace(/Certified Workplace Protection/g, 'Workplace Safety Protection');
  content = content.replace(/Certified Architectural Safety System/g, 'Architectural Safety System');

  // Certified mentions in prose
  content = content.replace(/certified\s+installation\s+crew/gi, 'installation crew');
  content = content.replace(/certified\s+Stainless\s+Steel-grade\s+tensile\s+cables/gi, 'stainless steel cables');
  content = content.replace(/providing\s+certified\s+peace\s+of\s+mind/gi, 'providing dependable safety support');
  content = content.replace(/Certified\s+300\+\s*kg\s+drop\s+catch\s+with\s+industrial\s+certification/gi, 'Heavy-duty fall containment and debris barrier');
  content = content.replace(/Speak\s+directly\s+with\s+a\s+certified\s+installation\s+engineer/gi, 'Speak directly with our installation team');
  content = content.replace(/certified\s+to\s+industrial\s+standards/gi, 'designed for industrial workplace protection');
  content = content.replace(/Factory\s+compliance\s+certified/gi, 'Industrial safety containment');
  content = content.replace(/Certified\s+heavy-duty/gi, 'Heavy-duty');
  content = content.replace(/load\s+certifications/gi, 'material information');
  content = content.replace(/Certified\s+Animals\s+&\s+Birds\s+Safety\s+Nets/gi, 'Animals & Birds Safety Nets');
  content = content.replace(/Certified\s+Site-Grade\s+Safety\s+Documentation/gi, 'Site-Grade Safety Documentation');
  content = content.replace(/Commercial\s+High-Rise\s+Certified/gi, 'Commercial High-Rise Installation');
  content = content.replace(/Commercial\s+Industrial\s+Safety\s+Certification/gi, 'Commercial Industrial Safety Installation');
  content = content.replace(/Commercial\s+Site\s+Safety\s+Certification/gi, 'Commercial Site Safety Installation');
  content = content.replace(/Certified\s+High-Tension\s+Guarantee/gi, 'Installation Support on Inquiry');
  content = content.replace(/3\s+to\s+5-Year\s+Certified\s+Guarantee/gi, 'Installation Support on Inquiry');
  content = content.replace(/5-Year\s+Certified\s+Replacement\s+Guarantee/gi, 'Installation Support on Inquiry');
  content = content.replace(/Certified\s+HDPE/gi, 'High-density');
  content = content.replace(/Certified\s+high-density/gi, 'High-density');

  // Turnaround & on-site promises in remaining pages
  content = content.replace(/same-day\s+on-site\s+measurement/gi, 'measurement and consultation');
  content = content.replace(/Same-day\s+measurement\s+inquiry/gi, 'Measurement consultation');
  content = content.replace(/Same-Day\s+Transparent\s+Quote/gi, 'Clear Transparent Quotation');
  content = content.replace(/real-time\s+instant\s+quotation\s+and\s+on-site\s+measurement\s+scheduling/gi, 'real-time quotation and inquiry scheduling');

  // Netting material details in prose
  content = content.replace(/Translucent\s+Nylon\s+Monofilament\s+or\s+Durable\s+HDPE\s+Netting/gi, 'Translucent nylon netting or durable HDPE netting');
  content = content.replace(/monofilament\s+mesh\s+and\s+stainless\s+steel\s+spikes/gi, 'nylon netting and stainless steel spikes');
  content = content.replace(/Near-invisible\s+monofilament\s+grid/gi, 'Discreet nylon netting');
  content = content.replace(/high-tenacity\s+monofilament\s+nets/gi, 'high-density nylon nets');
  content = content.replace(/tensile\s+cables\s+tensioned/gi, 'cables secured');
  content = content.replace(/Frameless\s+tensile\s+cable/gi, 'Frameless cable');
  content = content.replace(/Full-width\s+tensile\s+installation/gi, 'Full-width cable installation');
  content = content.replace(/tensile\s+durability/gi, 'outdoor durability');
  content = content.replace(/tensile/gi, 'durable');

  // Clean remaining guarantee words
  content = content.replace(/100%\s+humane,\s+zero-rust\s+guaranteed/gi, 'Humane bird deterrent, corrosion-resistant');
  content = content.replace(/guaranteed\s+to\s+endure/gi, 'designed to endure');
  content = content.replace(/Guaranteed\s+whole-balcony/gi, 'Secure whole-balcony');
  content = content.replace(/guaranteed\s+against/gi, 'designed to prevent');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated: ${relPath}`);
    updatedFiles++;
  }
}

console.log(`Total files updated: ${updatedFiles}`);
