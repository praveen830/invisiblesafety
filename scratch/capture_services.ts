import fs from 'fs';
import path from 'path';
import http from 'http';
import { spawn } from 'child_process';

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const BASE_DIR = "c:\\Users\\surya\\OneDrive\\Desktop\\bhuvi safety nets project\\invisiblesafety-master";
const DIST_DIR = path.join(BASE_DIR, "dist");
const SCREENSHOTS_DIR = path.join(BASE_DIR, "audit", "live-vs-local", "screenshots");
const ARTIFACT_DIR = "C:\\Users\\surya\\.gemini\\antigravity\\brain\\3b6e4449-2148-4a56-806c-dba8de2d3fce";

const HTTP_PORT = 4996;
const CDP_PORT = 9596;
const sleep = ms => new Promise(r => setTimeout(r, ms));

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(DIST_DIR, reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(HTTP_PORT, async () => {
  const chrome = spawn(CHROME_PATH, [
    `--remote-debugging-port=${CDP_PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-sandbox',
    '--disable-extensions',
    'about:blank'
  ]);

  let newTab;
  for (let i = 0; i < 10; i++) {
    await sleep(800);
    try {
      const r = await fetch(`http://127.0.0.1:${CDP_PORT}/json/new?about:blank`, { method: 'PUT' });
      if (r.ok) {
        newTab = await r.json();
        break;
      }
    } catch (e) {}
  }

  const ws = new WebSocket(newTab.webSocketDebuggerUrl);
  let id = 1;
  const pending = new Map();
  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const msgId = id++;
      pending.set(msgId, { resolve, reject });
      ws.send(JSON.stringify({ id: msgId, method, params }));
    });
  }

  await new Promise(r => { ws.onopen = r; });
  ws.onmessage = e => {
    const d = JSON.parse(e.data);
    if (d.id && pending.has(d.id)) {
      const { resolve, reject } = pending.get(d.id);
      pending.delete(d.id);
      if (d.error) reject(d.error);
      else resolve(d.result);
    }
  };

  await send('Page.enable');
  await send('Runtime.enable');

  async function captureServices(url, outName, width, height, mobile = false) {
    console.log(`Capturing services: ${outName}...`);
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 2,
      mobile
    });

    await send('Page.navigate', { url });
    await sleep(2500);

    // Scroll to #services
    await send('Runtime.evaluate', {
      expression: `
        const el = document.getElementById('services');
        if (el) el.scrollIntoView();
      `
    });
    await sleep(1500);

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
    await captureServices('https://invisiblesafety.in/', 'live_services_desktop', 1440, 900, false);
    await captureServices('https://invisiblesafety.in/', 'live_services_mobile', 390, 844, true);
    await captureServices(`http://127.0.0.1:${HTTP_PORT}/`, 'local_services_desktop', 1440, 900, false);
    await captureServices(`http://127.0.0.1:${HTTP_PORT}/`, 'local_services_mobile', 390, 844, true);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    ws.close();
    chrome.kill();
    server.close();
    process.exit(0);
  }
});
