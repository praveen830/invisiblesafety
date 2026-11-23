import { execSync } from 'child_process';

const commits = ['627d2f31', '3dd7a4b5', '93f6908c', '2c0b0359'];

for (const c of commits) {
  try {
    const html = execSync(`git show ${c}:dist/index.html`, { encoding: 'utf-8' });
    const css = html.match(/_astro\/index\.[^"]*\.css/)?.[0];
    const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
    console.log(`Commit ${c}: CSS = ${css}, Title = ${title}`);
  } catch (e) {
    console.log(`Commit ${c}: failed (${e.message})`);
  }
}
