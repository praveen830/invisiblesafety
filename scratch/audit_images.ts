import fs from 'fs';
import path from 'path';
import { products, APPROVED_PRODUCT_SLUGS } from '../src/data/geo/index.ts';

const ROOT_DIR = process.cwd();
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

console.log('=== IMAGE INTEGRATION VERIFICATION (14 APPROVED ASSETS) ===');

const desktopUrls = new Set<string>();
const mobileUrls = new Set<string>();
const allUrls = new Set<string>();

let totalErrors = 0;

for (const slug of APPROVED_PRODUCT_SLUGS) {
  const p = products[slug];
  const assets = p.heroAssets;

  console.log(`\n--- Product: [${slug}] ${p.name} ---`);
  console.log(`  Desktop: ${assets.desktopWebp} (${assets.widthDesktop}x${assets.heightDesktop})`);
  console.log(`  Mobile:  ${assets.mobileWebp} (${assets.widthMobile}x${assets.heightMobile})`);
  console.log(`  AltText: "${assets.altText}"`);

  // 1. Check distinct desktop vs mobile
  if (assets.desktopWebp === assets.mobileWebp) {
    console.error(`  ERROR: Desktop and mobile URLs are identical for ${slug}`);
    totalErrors++;
  }

  // 2. Check collisions
  if (desktopUrls.has(assets.desktopWebp)) {
    console.error(`  ERROR: Duplicate desktop asset reused: ${assets.desktopWebp}`);
    totalErrors++;
  }
  desktopUrls.add(assets.desktopWebp);

  if (mobileUrls.has(assets.mobileWebp)) {
    console.error(`  ERROR: Duplicate mobile asset reused: ${assets.mobileWebp}`);
    totalErrors++;
  }
  mobileUrls.add(assets.mobileWebp);

  if (allUrls.has(assets.desktopWebp) || allUrls.has(assets.mobileWebp)) {
    console.error(`  ERROR: Cross-reuse between desktop/mobile sets detected for ${slug}`);
    totalErrors++;
  }
  allUrls.add(assets.desktopWebp);
  allUrls.add(assets.mobileWebp);

  // 3. Physical file existence and size on disk
  const diskDesktop = path.join(PUBLIC_DIR, assets.desktopWebp.replace(/^\//, ''));
  const diskMobile = path.join(PUBLIC_DIR, assets.mobileWebp.replace(/^\//, ''));

  if (!fs.existsSync(diskDesktop)) {
    console.error(`  ERROR: Desktop file does not exist on disk: ${diskDesktop}`);
    totalErrors++;
  } else {
    const stat = fs.statSync(diskDesktop);
    console.log(`  Disk Desktop: OK (${stat.size} bytes)`);
  }

  if (!fs.existsSync(diskMobile)) {
    console.error(`  ERROR: Mobile file does not exist on disk: ${diskMobile}`);
    totalErrors++;
  } else {
    const stat = fs.statSync(diskMobile);
    console.log(`  Disk Mobile: OK (${stat.size} bytes)`);
  }

  // 4. Aspect Ratio Checks
  const desktopRatio = assets.widthDesktop / assets.heightDesktop;
  const mobileRatio = assets.widthMobile / assets.heightMobile;
  console.log(`  Desktop Aspect Ratio: ${desktopRatio.toFixed(3)} (expected 16:9 = 1.778)`);
  console.log(`  Mobile Aspect Ratio:  ${mobileRatio.toFixed(3)} (expected 4:5 = 0.800)`);

  if (Math.abs(desktopRatio - 16/9) > 0.01) {
    console.warn(`  WARN: Desktop ratio deviates from 16:9: ${desktopRatio}`);
  }
  if (Math.abs(mobileRatio - 4/5) > 0.01) {
    console.warn(`  WARN: Mobile ratio deviates from 4:5: ${mobileRatio}`);
  }
}

console.log('\n=== SUMMARY ===');
console.log(`Total Desktop Assets: ${desktopUrls.size} / 7`);
console.log(`Total Mobile Assets:  ${mobileUrls.size} / 7`);
console.log(`Total Unique Assets:  ${allUrls.size} / 14`);
console.log(`Total Errors:         ${totalErrors}`);
