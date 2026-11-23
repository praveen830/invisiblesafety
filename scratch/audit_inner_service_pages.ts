import fs from 'fs';

const services = [
  'invisible-grills',
  'balcony-safety',
  'child-safety-nets',
  'pigeon-nets',
  'sports-nets',
  'cloth-drying-hangers',
  'bird-spikes'
];

async function checkInnerPages() {
  console.log('=== CHECKING 7 SERVICE PAGES LIVE VS LOCAL ===');

  for (const s of services) {
    const liveUrl = `https://invisiblesafety.in/${s}/`;
    try {
      const res = await fetch(liveUrl);
      const liveHtml = await res.text();

      const localPath = `dist/${s}/index.html`;
      const localHtml = fs.existsSync(localPath) ? fs.readFileSync(localPath, 'utf-8') : '';

      console.log(`\n--- /${s}/ ---`);
      console.log(`Live HTTP: ${res.status}, Length: ${liveHtml.length}`);
      console.log(`Local Length: ${localHtml.length}`);

      // Check for <picture> in hero
      const liveHasPicture = liveHtml.includes('<picture') || liveHtml.includes('<source');
      const localHasPicture = localHtml.includes('<picture') || localHtml.includes('<source');
      console.log(`Hero <picture> tag: Live = ${liveHasPicture}, Local = ${localHasPicture}`);

      // Check hero image URLs
      const liveHeroImg = liveHtml.match(/<img[^>]*class="[^"]*hero[^"]*"[^>]*src="([^"]*)"/i)?.[1]
        || liveHtml.match(/<section[^>]*hero[\s\S]*?<img[^>]*src="([^"]*)"/i)?.[1];
      console.log(`Live Hero Img: ${liveHeroImg}`);

      // Check prohibited claims on live inner page
      const liveHasSS316 = /SS316|AISI 316/i.test(liveHtml);
      const liveHas400kg = /400\+?\s*kg/i.test(liveHtml);
      const liveHasWarranty = /10-year|15-year/i.test(liveHtml);
      const localHasSS316 = /SS316|AISI 316/i.test(localHtml);
      console.log(`SS316 claim: Live = ${liveHasSS316}, Local = ${localHasSS316}`);
      console.log(`400+ kg claim: Live = ${liveHas400kg}`);
      console.log(`10/15-yr warranty: Live = ${liveHasWarranty}`);
    } catch (e: any) {
      console.log(`Error checking ${s}:`, e?.message);
    }
  }
}

checkInnerPages();
