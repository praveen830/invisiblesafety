import fs from 'fs';
import path from 'path';

const assets = [
  '/images/ai-generated/architectural/invisible-grills/invisible-grills-desktop-hero.webp',
  '/images/ai-generated/architectural/invisible-grills/invisible-grills-mobile-hero.webp',
  '/images/ai-generated/safety-nets/balcony-safety-nets/balcony-safety-net-desktop-hero.webp',
  '/images/ai-generated/safety-nets/balcony-safety-nets/balcony-safety-net-mobile-hero.webp',
  '/images/ai-generated/safety-nets/child-safety-nets/child-safety-net-desktop-hero.webp',
  '/images/ai-generated/safety-nets/child-safety-nets/child-safety-net-mobile-hero.webp',
  '/images/ai-generated/safety-nets/pigeon-safety-nets/pigeon-safety-net-desktop-hero.webp',
  '/images/ai-generated/safety-nets/pigeon-safety-nets/pigeon-safety-net-mobile-hero.webp',
  '/images/ai-generated/safety-nets/sports-nets/sports-net-desktop-hero.webp',
  '/images/ai-generated/safety-nets/sports-nets/sports-net-mobile-hero.webp',
  '/images/ai-generated/architectural/cloth-drying-hangers/cloth-drying-hanger-desktop-hero.webp',
  '/images/ai-generated/architectural/cloth-drying-hangers/cloth-drying-hanger-mobile-hero.webp',
  '/images/ai-generated/architectural/bird-spikes/bird-spikes-desktop-hero.webp',
  '/images/ai-generated/architectural/bird-spikes/bird-spikes-mobile-hero.webp',
];

console.log('=== VERIFYING 14 HERO ASSETS ON DISK ===');
for (const a of assets) {
  const p = path.join(process.cwd(), 'public', a.replace(/^\//, ''));
  const exists = fs.existsSync(p);
  const size = exists ? fs.statSync(p).size : 0;
  console.log(`${a}: ${exists ? `EXISTS (${size} bytes)` : 'NOT FOUND'}`);
}
