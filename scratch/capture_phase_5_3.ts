import fs from 'fs';
import path from 'path';
import http from 'http';
import { spawn } from 'child_process';

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_DIR = "c:\\Users\\surya\\OneDrive\\Desktop\\bhuvi safety nets project\\invisiblesafety-master";
const DIST_DIR = path.join(BASE_DIR, "dist");
const SCREENSHOTS_DIR = path.join(BASE_DIR, "audit", "phase-5-3", "screenshots");
const ARTIFACT_DIR = "C:\\Users\\surya\\.gemini\\antigravity\\brain\\3b6e4449-2148-4a56-806c-dba8de2d3fce";

fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
fs.mkdirSync(ARTIFACT_DIR, { recursive: true });

const HTTP_PORT = 4998;
const CDP_PORT = 9598;
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url ? req.url.split('?')[0] : '/';
  if (reqPath.endsWith('/')) {
    reqPath += 'index.html';
  } else if (!path.extname(reqPath)) {
    reqPath += '/index.html';
  }
  const filePath = path.join(DIST_DIR, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not Found: ' + reqPath);
  }
});

server.listen(HTTP_PORT, async () => {
  console.log(`Static server running on http://127.0.0.1:${HTTP_PORT}`);
  const chrome = spawn(CHROME_PATH, [
    `--remote-debugging-port=${CDP_PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-sandbox',
    '--disable-extensions',
    'about:blank'
  ]);

  let newTab: any;
  for (let i = 0; i < 15; i++) {
    await sleep(600);
    try {
      const r = await fetch(`http://127.0.0.1:${CDP_PORT}/json/new?about:blank`, { method: 'PUT' });
      if (r.ok) {
        newTab = await r.json();
        break;
      }
    } catch (e) {}
  }

  if (!newTab) {
    console.error("Failed to connect to Chrome CDP");
    chrome.kill();
    server.close();
    process.exit(1);
  }

  const ws = new WebSocket(newTab.webSocketDebuggerUrl);
  let id = 1;
  const pending = new Map<number, { resolve: (res: any) => void; reject: (err: any) => void }>();
  function send(method: string, params: any = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      pending.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await new Promise(r => { ws.onopen = r as any; });
  ws.onmessage = e => {
    const d = JSON.parse(e.data as string);
    if (d.id && pending.has(d.id)) {
      const { resolve, reject } = pending.get(d.id)!;
      pending.delete(d.id);
      if (d.error) reject(d.error);
      else resolve(d.result);
    }
  };

  await send('Page.enable');
  await send('Runtime.enable');

  async function capturePage(
    route: string,
    outName: string,
    width: number,
    height: number,
    mobile: boolean,
    scrollSelector?: string
  ) {
    console.log(`Capturing: ${outName} (${width}x${height})...`);
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 2,
      mobile
    });

    const url = `http://127.0.0.1:${HTTP_PORT}${route}`;
    await send('Page.navigate', { url });
    await sleep(1800);

    if (scrollSelector) {
      await send('Runtime.evaluate', {
        expression: `
          const el = document.querySelector(${JSON.stringify(scrollSelector)});
          if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        `
      });
      await sleep(1000);
    }

    const { data } = await send('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: false
    });

    const buf = Buffer.from(data, 'base64');
    fs.writeFileSync(path.join(SCREENSHOTS_DIR, `${outName}.png`), buf);
    fs.writeFileSync(path.join(ARTIFACT_DIR, `${outName}.png`), buf);
    console.log(`Saved: ${outName}.png (${buf.length} bytes)`);
  }

  try {
    // 1. Homepage & Viewports
    await capturePage('/', 'phase53_home_desktop_1440x900', 1440, 900, false);
    await capturePage('/', 'phase53_home_mobile_390x844', 390, 844, true);
    await capturePage('/', 'phase53_home_mobile_427x952', 427, 952, true);

    // 2. Hero Section
    await capturePage('/', 'phase53_hero_desktop_1440', 1440, 900, false, 'section');
    await capturePage('/', 'phase53_hero_mobile_390', 390, 844, true, 'section');

    // 3. Seven-Service Section
    await capturePage('/', 'phase53_services_desktop_1440', 1440, 900, false, '#services');
    await capturePage('/', 'phase53_services_mobile_390', 390, 844, true, '#services');

    // 4. Seven Service Detail Pages (Desktop & Mobile)
    const serviceRoutes = [
      { slug: 'invisible-grills', name: 'invisible_grills' },
      { slug: 'balcony-safety', name: 'balcony_safety' },
      { slug: 'child-safety-nets', name: 'child_safety_nets' },
      { slug: 'pigeon-nets', name: 'pigeon_nets' },
      { slug: 'sports-nets', name: 'sports_nets' },
      { slug: 'cloth-drying-hangers', name: 'cloth_drying_hangers' },
      { slug: 'bird-spikes', name: 'bird_spikes' }
    ];

    for (const s of serviceRoutes) {
      await capturePage(`/${s.slug}/`, `phase53_service_${s.name}_desktop`, 1440, 900, false);
      await capturePage(`/${s.slug}/`, `phase53_service_${s.name}_mobile`, 390, 844, true);
    }

    // 5. About Page
    await capturePage('/about/', 'phase53_about_desktop_1440', 1440, 900, false);
    await capturePage('/about/', 'phase53_about_mobile_390', 390, 844, true);

    // 6. Contact Page
    await capturePage('/contact/', 'phase53_contact_desktop_1440', 1440, 900, false);
    await capturePage('/contact/', 'phase53_contact_mobile_390', 390, 844, true);

    // 7. Footer
    await capturePage('/', 'phase53_footer_desktop_1440', 1440, 900, false, 'footer');
    await capturePage('/', 'phase53_footer_mobile_390', 390, 844, true, 'footer');

    // 8. Fixed CTA Dock (Mobile bottom dock)
    await capturePage('/', 'phase53_mobile_cta_dock_390', 390, 844, true);

    console.log("All screenshots captured successfully!");
  } catch (err) {
    console.error('Error during screenshot capture:', err);
  } finally {
    ws.close();
    chrome.kill();
    server.close();
    process.exit(0);
  }
});
