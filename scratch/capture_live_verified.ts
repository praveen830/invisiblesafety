import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const CDP_PORT = 9599;
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));
const ARTIFACT_DIR = "C:\\Users\\surya\\.gemini\\antigravity\\brain\\3b6e4449-2148-4a56-806c-dba8de2d3fce";
const OUT_DIR = path.resolve('audit/phase-5-3-1/live-renders');
fs.mkdirSync(OUT_DIR, { recursive: true });

async function run() {
  const chrome = spawn(CHROME_PATH, [
    `--remote-debugging-port=${CDP_PORT}`,
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--no-sandbox',
    'about:blank'
  ]);

  let newTab: any;
  for (let i = 0; i < 15; i++) {
    await sleep(500);
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

  async function capture(urlPath: string, name: string, width: number, height: number, mobile: boolean, scrollSel?: string) {
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 2,
      mobile
    });

    const fullUrl = `http://localhost:4321${urlPath}`;
    await send('Page.navigate', { url: fullUrl });
    await sleep(2000);

    if (scrollSel) {
      await send('Runtime.evaluate', {
        expression: `
          const el = document.querySelector(${JSON.stringify(scrollSel)});
          if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
        `
      });
      await sleep(1000);
    }

    const { data } = await send('Page.captureScreenshot', { format: 'png' });
    const buf = Buffer.from(data, 'base64');
    fs.writeFileSync(path.join(OUT_DIR, `${name}.png`), buf);
    fs.writeFileSync(path.join(ARTIFACT_DIR, `${name}.png`), buf);
    console.log(`Captured: ${name}.png (${buf.length} bytes)`);
  }

  // 1. Homepage Desktop & Mobile
  await capture('/', 'live_local_home_desktop_1440', 1440, 900, false);
  await capture('/', 'live_local_home_mobile_390', 390, 844, true);

  // 2. Services Section Desktop & Mobile
  await capture('/', 'live_local_services_desktop_1440', 1440, 900, false, '#services');
  await capture('/', 'live_local_services_mobile_390', 390, 844, true, '#services');

  // 3. Invisible Grills Page
  await capture('/invisible-grills/', 'live_local_invisible_grills_desktop', 1440, 900, false);
  await capture('/invisible-grills/', 'live_local_invisible_grills_mobile', 390, 844, true);

  // 4. Balcony Safety Nets Page
  await capture('/balcony-safety/', 'live_local_balcony_safety_desktop', 1440, 900, false);
  await capture('/balcony-safety/', 'live_local_balcony_safety_mobile', 390, 844, true);

  // 5. Contact Page
  await capture('/contact/', 'live_local_contact_desktop', 1440, 900, false);
  await capture('/contact/', 'live_local_contact_mobile', 390, 844, true);

  // 6. Warranty / Service Care Page
  await capture('/warranty/', 'live_local_service_care_desktop', 1440, 900, false);
  await capture('/warranty/', 'live_local_service_care_mobile', 390, 844, true);

  console.log("All live captures completed!");
  ws.close();
  chrome.kill();
  process.exit(0);
}

run();
