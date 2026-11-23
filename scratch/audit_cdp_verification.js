import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve('audit/phase-3/screenshots/phase-3-9-1');
fs.mkdirSync(OUT_DIR, { recursive: true });

const chrome = spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', [
  '--remote-debugging-port=9456',
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  'about:blank'
]);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  await sleep(1500);

  const viewports = [
    { name: 'desktop_1440x900', width: 1440, height: 900 },
    { name: 'mobile_390x844', width: 390, height: 844 },
    { name: 'mobile_427x952', width: 427, height: 952 },
  ];

  const results = {
    viewports: {},
    services: {}
  };

  for (const vp of viewports) {
    console.log(`Auditing viewport: ${vp.name}...`);
    const res = await fetch('http://localhost:9456/json/new?http://localhost:4321/', { method: 'PUT' });
    const tab = await res.json();
    const ws = new WebSocket(tab.webSocketDebuggerUrl);

    await new Promise((resolve) => {
      ws.onopen = async () => {
        let msgId = 1;
        const send = (method, params = {}) => {
          return new Promise(resSend => {
            const id = msgId++;
            const handler = (event) => {
              const data = JSON.parse(event.data);
              if (data.id === id) {
                ws.removeEventListener('message', handler);
                resSend(data.result);
              }
            };
            ws.addEventListener('message', handler);
            ws.send(JSON.stringify({ id, method, params }));
          });
        };

        // Set device metrics
        await send('Emulation.setDeviceMetricsOverride', {
          width: vp.width,
          height: vp.height,
          deviceScaleFactor: 1,
          mobile: vp.width < 768
        });

        // Navigate
        await send('Page.navigate', { url: 'http://localhost:4321/' });
        await sleep(2000);

        // Evaluate cards
        const evalRes = await send('Runtime.evaluate', {
          expression: `
            (() => {
              const cards = document.querySelectorAll('.service-card');
              return Array.from(cards).map((c, i) => {
                const rect = c.getBoundingClientRect();
                const title = c.querySelector('.service-card-title')?.innerText?.trim();
                const category = c.querySelector('.service-card-category')?.innerText?.trim();
                const img = c.querySelector('img');
                const sources = Array.from(c.querySelectorAll('source')).map(s => ({
                  media: s.media,
                  srcset: s.srcset,
                  type: s.type
                }));
                return {
                  index: i,
                  title,
                  category,
                  href: c.getAttribute('href'),
                  currentSrc: img ? img.currentSrc : null,
                  src: img ? img.getAttribute('src') : null,
                  naturalWidth: img ? img.naturalWidth : null,
                  naturalHeight: img ? img.naturalHeight : null,
                  renderedWidth: img ? img.clientWidth : null,
                  renderedHeight: img ? img.clientHeight : null,
                  box: {
                    x: rect.x + window.scrollX,
                    y: rect.y + window.scrollY,
                    width: rect.width,
                    height: rect.height
                  }
                };
              });
            })()
          `,
          returnByValue: true
        });

        const cardsData = evalRes?.value || [];
        results.viewports[vp.name] = cardsData;

        // Capture each card screenshot using clip
        for (const card of cardsData) {
          if (card.box && card.box.width > 0 && card.box.height > 0) {
            const clip = {
              x: Math.max(0, card.box.x),
              y: Math.max(0, card.box.y),
              width: card.box.width,
              height: card.box.height,
              scale: 1
            };
            const screenshotRes = await send('Page.captureScreenshot', {
              clip,
              captureBeyondViewport: true
            });
            if (screenshotRes && screenshotRes.data) {
              const filename = `hp_card_${card.index + 1}_${card.title.replace(/[^a-zA-Z0-9]/g, '_')}_${vp.name}.png`;
              fs.writeFileSync(path.join(OUT_DIR, filename), Buffer.from(screenshotRes.data, 'base64'));
              console.log(`  Saved card clip: ${filename}`);
            }
          }
        }

        await send('Page.close');
        ws.close();
        resolve();
      };
    });
  }

  // Now audit all 7 individual service pages
  const servicePages = [
    { slug: 'invisible-grills', url: 'http://localhost:4321/invisible-grills/' },
    { slug: 'balcony-safety', url: 'http://localhost:4321/balcony-safety/' },
    { slug: 'child-safety-nets', url: 'http://localhost:4321/child-safety-nets/' },
    { slug: 'pigeon-nets', url: 'http://localhost:4321/pigeon-nets/' },
    { slug: 'sports-nets', url: 'http://localhost:4321/sports-nets/' },
    { slug: 'cloth-drying-hangers', url: 'http://localhost:4321/cloth-drying-hangers/' },
    { slug: 'bird-spikes', url: 'http://localhost:4321/bird-spikes/' }
  ];

  for (const srv of servicePages) {
    results.services[srv.slug] = {};
    for (const vp of viewports) {
      console.log(`Auditing service ${srv.slug} on ${vp.name}...`);
      const res = await fetch(`http://localhost:9456/json/new?${srv.url}`, { method: 'PUT' });
      const tab = await res.json();
      const ws = new WebSocket(tab.webSocketDebuggerUrl);

      await new Promise(resolve => {
        ws.onopen = async () => {
          let msgId = 1;
          const send = (method, params = {}) => {
            return new Promise(resSend => {
              const id = msgId++;
              const handler = (event) => {
                const data = JSON.parse(event.data);
                if (data.id === id) {
                  ws.removeEventListener('message', handler);
                  resSend(data.result);
                }
              };
              ws.addEventListener('message', handler);
              ws.send(JSON.stringify({ id, method, params }));
            });
          };

          await send('Emulation.setDeviceMetricsOverride', {
            width: vp.width,
            height: vp.height,
            deviceScaleFactor: 1,
            mobile: vp.width < 768
          });

          await send('Page.navigate', { url: srv.url });
          await sleep(2000);

          const evalRes = await send('Runtime.evaluate', {
            expression: `
              (() => {
                // Find hero image
                const heroImg = document.querySelector('.hero-bg-media img') || document.querySelector('header img') || document.querySelector('main img');
                const heroSection = document.querySelector('.hero-bg-media') || document.querySelector('section') || document.querySelector('header');
                const rect = heroSection ? heroSection.getBoundingClientRect() : null;
                const h1 = document.querySelector('h1')?.innerText?.trim();
                return {
                  h1,
                  currentSrc: heroImg ? heroImg.currentSrc : null,
                  src: heroImg ? heroImg.getAttribute('src') : null,
                  naturalWidth: heroImg ? heroImg.naturalWidth : null,
                  naturalHeight: heroImg ? heroImg.naturalHeight : null,
                  renderedWidth: heroImg ? heroImg.clientWidth : null,
                  renderedHeight: heroImg ? heroImg.clientHeight : null,
                  box: rect ? {
                    x: rect.x + window.scrollX,
                    y: rect.y + window.scrollY,
                    width: rect.width,
                    height: rect.height
                  } : null
                };
              })()
            `,
            returnByValue: true
          });

          results.services[srv.slug][vp.name] = evalRes?.value || {};

          // Capture hero section screenshot
          const heroData = evalRes?.value;
          if (heroData && heroData.box && heroData.box.width > 0 && heroData.box.height > 0) {
            const clip = {
              x: Math.max(0, heroData.box.x),
              y: Math.max(0, heroData.box.y),
              width: heroData.box.width,
              height: Math.min(vp.height, heroData.box.height),
              scale: 1
            };
            const screenshotRes = await send('Page.captureScreenshot', {
              clip,
              captureBeyondViewport: false
            });
            if (screenshotRes && screenshotRes.data) {
              const filename = `hero_${srv.slug}_${vp.name}.png`;
              fs.writeFileSync(path.join(OUT_DIR, filename), Buffer.from(screenshotRes.data, 'base64'));
              console.log(`  Saved hero clip: ${filename}`);
            }
          }

          await send('Page.close');
          ws.close();
          resolve();
        };
      });
    }
  }

  // Save audit results json
  fs.writeFileSync(path.join(OUT_DIR, 'audit_results.json'), JSON.stringify(results, null, 2));
  console.log('Saved audit_results.json successfully!');

  chrome.kill();
  process.exit(0);
}

run().catch(err => {
  console.error('Audit run error:', err);
  chrome.kill();
  process.exit(1);
});
