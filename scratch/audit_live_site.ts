import fs from 'fs';
import path from 'path';

async function auditLiveSite() {
  const res = await fetch('https://invisiblesafety.in/');
  const html = await res.text();

  console.log('=== LIVE SITE AUDIT ===');
  console.log('Status:', res.status);
  console.log('Content-Length:', html.length);

  // Extract Title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  console.log('Title:', titleMatch ? titleMatch[1] : 'NONE');

  // Extract H1
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]*>/g, '').trim());
  console.log('H1:', h1Matches);

  // Extract Hero section
  const heroMatch = html.match(/<section[^>]*hero[^>]*>([\s\S]*?)<\/section>/i) || html.match(/id="hero"[^>]*>([\s\S]*?)<\/section>/i);
  console.log('Hero section present:', !!heroMatch);

  // Search for images
  const imgMatches = [...html.matchAll(/<img[^>]*src="([^"]*)"[^>]*>/gi)].map(m => m[1]);
  console.log('Total images found on live homepage:', imgMatches.length);
  const sampleImages = imgMatches.slice(0, 15);
  console.log('Sample image URLs:', sampleImages);

  // Check for specific service images from Phase 3
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

  console.log('\n--- Phase 3 Service Images on Live Site ---');
  for (const img of phase3Images) {
    const present = html.includes(img);
    console.log(`${img}: ${present ? 'PRESENT' : 'MISSING'}`);
  }

  // Check CSS assets / bundle hashes
  const cssMatches = [...html.matchAll(/href="([^"]*\.css)"/gi)].map(m => m[1]);
  console.log('\nLive CSS assets:', cssMatches);

  const jsMatches = [...html.matchAll(/src="([^"]*\.js)"/gi)].map(m => m[1]);
  console.log('Live JS assets:', jsMatches);

  // Check for prohibited claims on live site
  const prohibitedPatterns = [
    /AISI 316/i,
    /SS316/i,
    /SS304/i,
    /Japanese Marine Grade/i,
    /400\+?\s*kg/i,
    /Break-load/i,
    /10-year warranty/i,
    /DuPont/i,
    /Virgin nylon/i,
    /Structural Slab Anchoring/i,
    /Laser/i,
    /Certified/i,
    /ISO/i
  ];

  console.log('\n--- Prohibited / Unverified Claims on Live Site ---');
  for (const p of prohibitedPatterns) {
    const m = html.match(p);
    console.log(`${p.source}: ${m ? `FOUND ("${m[0]}")` : 'CLEAN'}`);
  }

  // Save live HTML for detailed diff
  fs.writeFileSync('scratch/live_homepage.html', html, 'utf-8');
  console.log('\nSaved scratch/live_homepage.html for diff analysis.');
}

auditLiveSite().catch(console.error);
