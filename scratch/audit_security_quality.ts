import fs from 'fs';
import path from 'path';

const ROOT_DIR = process.cwd();

function walk(dir: string): string[] {
  let files: string[] = [];
  if (!fs.existsSync(dir)) return files;
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      files = files.concat(walk(full));
    } else if (full.endsWith('.ts') || full.endsWith('.astro')) {
      files.push(full);
    }
  }
  return files;
}

const geoFiles = [
  ...walk('src/data/geo'),
  ...walk('src/components/geo'),
  'src/layouts/GeoLandingLayout.astro'
];

console.log('=== SECURITY & CODE QUALITY AUDIT ===');
console.log(`Auditing ${geoFiles.length} geo files...\n`);

let setHtmlCount = 0;
let missingAltCount = 0;
let targetBlankWithoutRel = 0;
let brokenImports = 0;

geoFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');

  // 1. Check set:html
  if (content.includes('set:html')) {
    console.log(`[set:html detected]: ${file}`);
    const matches = content.match(/set:html=\{[^}]+\}/g);
    console.log('  Matches:', matches);
    setHtmlCount++;
  }

  // 2. Check <img> tags for missing alt
  const imgTags = content.match(/<img\b[^>]*>/gi) || [];
  imgTags.forEach(img => {
    if (!/alt\s*=\s*["'{]/i.test(img)) {
      console.error(`[Missing alt text]: ${file} -> ${img}`);
      missingAltCount++;
    }
  });

  // 3. Check target="_blank" without rel="noopener noreferrer"
  const targetBlank = content.match(/<a\b[^>]*target=["']_blank["'][^>]*>/gi) || [];
  targetBlank.forEach(a => {
    if (!/rel=["'][^"']*noopener/i.test(a) || !/rel=["'][^"']*noreferrer/i.test(a)) {
      console.warn(`[target=_blank missing rel=noopener noreferrer]: ${file} -> ${a}`);
      targetBlankWithoutRel++;
    }
  });

  // 4. Check import paths exist
  const importLines = content.match(/from\s+['"]([^'"]+)['"]/g) || [];
  importLines.forEach(imp => {
    const match = imp.match(/from\s+['"]([^'"]+)['"]/);
    if (match && match[1].startsWith('.')) {
      const dir = path.dirname(file);
      const targetRel = match[1];
      const targetAbs = path.resolve(dir, targetRel);
      const exists = fs.existsSync(targetAbs) || fs.existsSync(targetAbs + '.ts') || fs.existsSync(targetAbs + '.astro') || fs.existsSync(targetAbs + '/index.ts');
      if (!exists) {
        console.error(`[Broken relative import]: ${file} -> ${targetRel}`);
        brokenImports++;
      }
    }
  });
});

console.log('\n=== QUALITY SUMMARY ===');
console.log(`Unsafe set:html usages: ${setHtmlCount}`);
console.log(`Missing <img> alt text: ${missingAltCount}`);
console.log(`Insecure target="_blank": ${targetBlankWithoutRel}`);
console.log(`Broken relative imports: ${brokenImports}`);
