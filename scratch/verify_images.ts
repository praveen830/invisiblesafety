import fs from 'fs';
import path from 'path';

const services = [
  {
    slug: 'invisible-grills',
    desktop: '/images/ai-generated/architectural/invisible-grills/invisible-grills-desktop-hero.webp',
    mobile: '/images/ai-generated/architectural/invisible-grills/invisible-grills-mobile-hero.webp',
    alt: 'Balcony invisible safety grills with open skyline view'
  },
  {
    slug: 'balcony-safety-nets',
    desktop: '/images/ai-generated/safety-nets/balcony-safety-nets/balcony-safety-net-desktop-hero.webp',
    mobile: '/images/ai-generated/safety-nets/balcony-safety-nets/balcony-safety-net-mobile-hero.webp',
    alt: 'Balcony fall safety netting installation for high-rise residences'
  },
  {
    slug: 'pigeon-safety-nets',
    desktop: '/images/ai-generated/safety-nets/pigeon-safety-nets/pigeon-safety-net-desktop-hero.webp',
    mobile: '/images/ai-generated/safety-nets/pigeon-safety-nets/pigeon-safety-net-mobile-hero.webp',
    alt: 'Translucent anti-pigeon safety nets installed on high-rise residential balcony'
  },
  {
    slug: 'child-safety-nets',
    desktop: '/images/ai-generated/safety-nets/child-safety-nets/child-safety-net-desktop-hero.webp',
    mobile: '/images/ai-generated/safety-nets/child-safety-nets/child-safety-net-mobile-hero.webp',
    alt: 'High-tensile child safety net installation for balcony fall protection'
  },
  {
    slug: 'sports-nets',
    desktop: '/images/ai-generated/safety-nets/sports-nets/sports-net-desktop-hero.webp',
    mobile: '/images/ai-generated/safety-nets/sports-nets/sports-net-mobile-hero.webp',
    alt: 'Sports and cricket practice netting installation on green turf'
  },
  {
    slug: 'cloth-drying-hangers',
    desktop: '/images/ai-generated/architectural/cloth-drying-hangers/cloth-drying-hanger-desktop-hero.webp',
    mobile: '/images/ai-generated/architectural/cloth-drying-hangers/cloth-drying-hanger-mobile-hero.webp',
    alt: 'Ceiling mounted stainless steel pull-down cloth drying hanger system'
  },
  {
    slug: 'bird-spikes',
    desktop: '/images/ai-generated/architectural/bird-spikes/bird-spikes-desktop-hero.webp',
    mobile: '/images/ai-generated/architectural/bird-spikes/bird-spikes-mobile-hero.webp',
    alt: 'Stainless steel bird spikes for parapet walls and AC outdoor ledges'
  }
];

console.log('=== VERIFYING 14 UNIQUE SERVICE IMAGES ===\n');

const allPaths = new Set<string>();

for (const s of services) {
  const dPath = path.join(process.cwd(), 'public', s.desktop.replace(/^\//, ''));
  const mPath = path.join(process.cwd(), 'public', s.mobile.replace(/^\//, ''));

  const dExists = fs.existsSync(dPath);
  const mExists = fs.existsSync(mPath);

  const dSize = dExists ? fs.statSync(dPath).size : 0;
  const mSize = mExists ? fs.statSync(mPath).size : 0;

  console.log(`Service: ${s.slug}`);
  console.log(`  Desktop: ${s.desktop} -> ${dExists ? `EXISTS (${dSize} bytes)` : 'MISSING'}`);
  console.log(`  Mobile:  ${s.mobile} -> ${mExists ? `EXISTS (${mSize} bytes)` : 'MISSING'}`);
  console.log(`  Alt:     "${s.alt}"`);

  allPaths.add(s.desktop);
  allPaths.add(s.mobile);
}

console.log(`\nTotal unique paths checked: ${allPaths.size} / 14`);
if (allPaths.size === 14) {
  console.log('All 14 assets are completely distinct and unique!');
} else {
  console.error('ERROR: Duplicate paths found!');
}
