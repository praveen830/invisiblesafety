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

  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 2,
    mobile: false
  });

  await send('Page.navigate', { url: 'http://localhost:4321/' });
  await sleep(3000);

  const { data } = await send('Page.captureScreenshot', { format: 'png' });
  fs.writeFileSync('scratch/current_localhost_4321.png', Buffer.from(data, 'base64'));
  console.log("Saved current_localhost_4321.png");

  // Also check console errors or failed network requests
  const evalRes = await send('Runtime.evaluate', {
    expression: `({
      title: document.title,
      h1: document.querySelector('h1')?.innerText,
      servicesCount: document.querySelectorAll('#services .service-card, .editorial-snap-card').length,
      imagesCount: document.querySelectorAll('img').length,
      brokenImages: Array.from(document.querySelectorAll('img')).filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src)
    })`,
    returnByValue: true
  });
  console.log("Page evaluation:", JSON.stringify(evalRes.result.value, null, 2));

  ws.close();
  chrome.kill();
  process.exit(0);
}

run();
