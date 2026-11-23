import fs from 'fs';

function compareLocalDist() {
  const localHtml = fs.readFileSync('dist/index.html', 'utf-8');
  const liveHtml = fs.readFileSync('scratch/live_homepage.html', 'utf-8');

  console.log('=== LOCAL DIST VS LIVE SITE COMPARISON ===');
  console.log('Local dist length:', localHtml.length);
  console.log('Live site length:', liveHtml.length);

  // Extract titles
  const localTitle = localHtml.match(/<title>([^<]*)<\/title>/i)?.[1];
  const liveTitle = liveHtml.match(/<title>([^<]*)<\/title>/i)?.[1];
  console.log('\nLocal Title:', localTitle);
  console.log('Live Title: ', liveTitle);

  // Extract CSS
  const localCss = [...localHtml.matchAll(/href="([^"]*\.css)"/gi)].map(m => m[1]);
  const liveCss = [...liveHtml.matchAll(/href="([^"]*\.css)"/gi)].map(m => m[1]);
  console.log('\nLocal CSS:', localCss);
  console.log('Live CSS: ', liveCss);

  // Compare images
  const localImgs = [...localHtml.matchAll(/<img[^>]*src="([^"]*)"[^>]*>/gi)].map(m => m[1]);
  const liveImgs = [...liveHtml.matchAll(/<img[^>]*src="([^"]*)"[^>]*>/gi)].map(m => m[1]);
  console.log('\nTotal Local Images:', localImgs.length);
  console.log('Total Live Images: ', liveImgs.length);

  console.log('\nLocal Image paths:');
  console.log([...new Set(localImgs)]);

  console.log('\nLive Image paths:');
  console.log([...new Set(liveImgs)]);

  // Check 14 Phase 3 service images in local dist
  const phase3Images = [
    '/images/services/invisible-grills-desktop.webp',
    '/images/services/invisible-grills-mobile.webp',
    '/images/services/balcony-safety-nets-desktop.webp',
    '/images/services/balcony-safety-nets-mobile.webp',
    '/images/services/child-safety-nets-desktop.webp',
    '/images/services/child-safety-nets-mobile.webp',
    '/images/services/pigeon-safety-nets-desktop.webp',
    '/images/services/pigeon-safety-nets-mobile.webp',
    '/images/services/sports-nets-desktop.webp',
    '/images/services/sports-nets-mobile.webp',
    '/images/services/cloth-drying-hangers-desktop.webp',
    '/images/services/cloth-drying-hangers-mobile.webp',
    '/images/services/bird-spikes-desktop.webp',
    '/images/services/bird-spikes-mobile.webp',
  ];

  console.log('\n--- Phase 3 Images in Local dist/index.html ---');
  for (const img of phase3Images) {
    console.log(`${img}: ${localHtml.includes(img) ? 'PRESENT' : 'MISSING'}`);
  }
}

compareLocalDist();
