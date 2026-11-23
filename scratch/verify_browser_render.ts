import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const CDP_PORT = 9599;
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

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

  const consoleLogs: string[] = [];
  ws.addEventListener('message', (event) => {
    try {
      const data = JSON.parse(event.data as string);
      if (data.method === 'Runtime.consoleAPICalled') {
        consoleLogs.push(`[${data.params.type}] ${data.params.args.map((a: any) => a.value || a.description).join(' ')}`);
      }
    } catch (e) {}
  });

  const outDir = path.resolve('scratch/renders');
  fs.mkdirSync(outDir, { recursive: true });

  async function auditPage(route: string, label: string) {
    console.log(`\n--- Auditing ${route} ---`);
    
    // Desktop (1440x900)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 2,
      mobile: false
    });
    await send('Page.navigate', { url: `http://localhost:4321${route}` });
    await sleep(2500);

    const desktopShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, `${label}_desktop_1440.png`), Buffer.from(desktopShot.data, 'base64'));

    // Mobile (390x844)
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await send('Page.navigate', { url: `http://localhost:4321${route}` });
    await sleep(2000);

    const mobileShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(outDir, `${label}_mobile_390.png`), Buffer.from(mobileShot.data, 'base64'));

    // Evaluate DOM
    const evalData = await send('Runtime.evaluate', {
      expression: `({
        title: document.title,
        h1: document.querySelector('h1')?.innerText?.trim(),
        hasHeader: !!document.querySelector('header, .site-header, .editorial-header'),
        hasFooter: !!document.querySelector('footer'),
        images: Array.from(document.querySelectorAll('img')).map(img => ({
          src: img.src,
          alt: img.alt,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight
        }))
      })`,
      returnByValue: true
    });

    const info = evalData.result.value;
    console.log(`  Title: "${info.title}"`);
    console.log(`  H1: "${info.h1?.substring(0, 60)}"`);
    console.log(`  Images total: ${info.images.length}`);
    console.log(`  Loaded images: ${info.images.filter((i: any) => i.naturalWidth > 0).length}`);
  }

  // 1. Homepage
  await auditPage('/', 'home');

  // 2. All 7 Core Service Pages
  const services = [
    { slug: '/invisible-grills/', name: 'invisible_grills' },
    { slug: '/balcony-safety/', name: 'balcony_safety' },
    { slug: '/child-safety-nets/', name: 'child_safety' },
    { slug: '/pigeon-nets/', name: 'pigeon_nets' },
    { slug: '/sports-nets/', name: 'sports_nets' },
    { slug: '/cloth-drying-hangers/', name: 'cloth_drying_hangers' },
    { slug: '/bird-spikes/', name: 'bird_spikes' }
  ];

  for (const s of services) {
    await auditPage(s.slug, s.name);
  }

  console.log(`\nTotal console logs captured: ${consoleLogs.length}`);
  if (consoleLogs.length > 0) {
    console.log(consoleLogs.slice(0, 10).join('\n'));
  }

  ws.close();
  chrome.kill();
  process.exit(0);
}

run();
