const fs = require('fs');
const path = require('path');

const siteUrl = 'https://invisiblesafety.in';
const today = new Date().toISOString().split('T')[0];

const routes = [
  { url: '/', priority: '1.0', changefreq: 'weekly' },
  { url: '/invisible-grills/', priority: '0.95', changefreq: 'weekly' },
  { url: '/safety-nets/', priority: '0.95', changefreq: 'weekly' },
  { url: '/visualizer/', priority: '0.95', changefreq: 'weekly' },
  { url: '/solutions/', priority: '0.90', changefreq: 'weekly' },
  { url: '/invisible-grill-cost/', priority: '0.90', changefreq: 'weekly' },
  { url: '/balcony-safety/', priority: '0.90', changefreq: 'weekly' },
  { url: '/balcony-invisible-grills/', priority: '0.90', changefreq: 'weekly' },
  { url: '/window-invisible-grills/', priority: '0.90', changefreq: 'weekly' },
  { url: '/staircase-invisible-grills/', priority: '0.90', changefreq: 'weekly' },
  { url: '/child-safety-invisible-grills/', priority: '0.90', changefreq: 'weekly' },
  { url: '/pigeon-nets/', priority: '0.90', changefreq: 'weekly' },
  { url: '/locations/', priority: '0.90', changefreq: 'weekly' },
  { url: '/locations/visakhapatnam/', priority: '0.90', changefreq: 'weekly' },
  { url: '/locations/hyderabad/', priority: '0.90', changefreq: 'weekly' },
  { url: '/locations/vijayawada/', priority: '0.90', changefreq: 'weekly' },
  { url: '/locations/amaravati/', priority: '0.90', changefreq: 'weekly' },
  { url: '/child-safety-nets/', priority: '0.85', changefreq: 'monthly' },
  { url: '/building-safety-nets/', priority: '0.85', changefreq: 'monthly' },
  { url: '/duct-safety-nets/', priority: '0.85', changefreq: 'monthly' },
  { url: '/bird-spikes/', priority: '0.85', changefreq: 'monthly' },
  { url: '/cloth-drying-hangers/', priority: '0.80', changefreq: 'monthly' },
  { url: '/construction-safety-nets/', priority: '0.80', changefreq: 'monthly' },
  { url: '/industrial-safety-nets/', priority: '0.80', changefreq: 'monthly' },
  { url: '/car-parking-safety-nets/', priority: '0.80', changefreq: 'monthly' },
  { url: '/coconut-safety-nets/', priority: '0.80', changefreq: 'monthly' },
  { url: '/swimming-pool-nets/', priority: '0.80', changefreq: 'monthly' },
  { url: '/terrace-safety-nets/', priority: '0.80', changefreq: 'monthly' },
  { url: '/staircase-safety-nets/', priority: '0.80', changefreq: 'monthly' },
  { url: '/sports-nets/', priority: '0.80', changefreq: 'monthly' },
  { url: '/sports-practice-nets/', priority: '0.80', changefreq: 'monthly' },
  { url: '/monkey-safety-nets/', priority: '0.80', changefreq: 'monthly' },
  { url: '/mosquito-safety-nets/', priority: '0.80', changefreq: 'monthly' },
  { url: '/animals-birds-safety-nets/', priority: '0.80', changefreq: 'monthly' },
  { url: '/projects/', priority: '0.85', changefreq: 'weekly' },
  { url: '/gallery/', priority: '0.85', changefreq: 'weekly' },
  { url: '/materials/', priority: '0.85', changefreq: 'monthly' },
  { url: '/about/', priority: '0.80', changefreq: 'monthly' },
  { url: '/contact/', priority: '0.85', changefreq: 'monthly' },
  { url: '/warranty/', priority: '0.80', changefreq: 'monthly' },
  { url: '/why-invisible-safety/', priority: '0.80', changefreq: 'monthly' },
  { url: '/faq/', priority: '0.80', changefreq: 'monthly' }
];

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
xml += '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n';
xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n';
xml += '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9\n';
xml += '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n';

routes.forEach(r => {
  xml += '  <url>\n';
  xml += `    <loc>${siteUrl}${r.url}</loc>\n`;
  xml += `    <lastmod>${today}</lastmod>\n`;
  xml += `    <changefreq>${r.changefreq}</changefreq>\n`;
  xml += `    <priority>${r.priority}</priority>\n`;
  xml += '  </url>\n';
});

xml += '</urlset>\n';

const outPath = path.join(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf-8');
console.log(`Generated sitemap with ${routes.length} URLs at ${outPath}`);
