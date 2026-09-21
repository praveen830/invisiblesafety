const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = 'C:/Users/surya/.gemini/antigravity-ide/brain/d6094211-47a6-49b1-9803-91cf643b62db/.user_uploaded/media_1789985036454.jpg';

async function processLogo() {
  const { data, info } = await sharp(inputPath).raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;
  const rgba = Buffer.alloc(width * height * 4);

  // Copy RGB
  for (let i = 0; i < width * height; i++) {
    rgba[i * 4] = data[i * 3];
    rgba[i * 4 + 1] = data[i * 3 + 1];
    rgba[i * 4 + 2] = data[i * 3 + 2];
    rgba[i * 4 + 3] = 255;
  }

  // Flood fill from borders
  const visited = new Uint8Array(width * height);
  const queue = [];

  function isBackground(x, y) {
    const idx = (y * width + x) * 3;
    const r = data[idx], g = data[idx + 1], b = data[idx + 2];
    // Any dark pixel connected to outer border
    return (r <= 28 && g <= 28 && b <= 28);
  }

  // Seeds along all four borders
  for (let x = 0; x < width; x++) {
    if (isBackground(x, 0)) { queue.push(x, 0); visited[0 * width + x] = 1; }
    if (isBackground(x, height - 1)) { queue.push(x, height - 1); visited[(height - 1) * width + x] = 1; }
  }
  for (let y = 0; y < height; y++) {
    if (isBackground(0, y) && !visited[y * width]) { queue.push(0, y); visited[y * width] = 1; }
    if (isBackground(width - 1, y) && !visited[y * width + width - 1]) { queue.push(width - 1, y); visited[y * width + width - 1] = 1; }
  }

  let head = 0;
  while (head < queue.length) {
    const cx = queue[head++];
    const cy = queue[head++];
    const pIdx = cy * width + cx;

    const r = data[pIdx * 3];
    const g = data[pIdx * 3 + 1];
    const b = data[pIdx * 3 + 2];
    const maxVal = Math.max(r, g, b);

    if (maxVal <= 10) {
      rgba[pIdx * 4 + 3] = 0;
    } else {
      // Smooth feathering
      const alpha = Math.min(255, Math.max(0, Math.round(((maxVal - 10) / 18) * 255)));
      rgba[pIdx * 4 + 3] = alpha;
      // Color recovery to prevent dark halo around transparent edges
      if (alpha > 0) {
        const factor = 255 / alpha;
        rgba[pIdx * 4] = Math.min(255, Math.round(r * factor));
        rgba[pIdx * 4 + 1] = Math.min(255, Math.round(g * factor));
        rgba[pIdx * 4 + 2] = Math.min(255, Math.round(b * factor));
      }
    }

    const neighbors = [[cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]];
    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nIdx = ny * width + nx;
        if (!visited[nIdx] && isBackground(nx, ny)) {
          visited[nIdx] = 1;
          queue.push(nx, ny);
        }
      }
    }
  }

  // Create trimmed master transparent image
  const trimmedBuffer = await sharp(rgba, { raw: { width, height, channels: 4 } })
    .trim({ threshold: 5 })
    .png()
    .toBuffer();

  // 1. Master logo for header and footer (512x512)
  await sharp(trimmedBuffer)
    .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 100 })
    .toFile(path.join(__dirname, '../public/images/logo.png'));

  // 2. Apple touch icon & PWA icon (192x192)
  await sharp(trimmedBuffer)
    .resize(192, 192, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ quality: 100 })
    .toFile(path.join(__dirname, '../public/images/logo-192.png'));

  // 3. Favicon PNG (64x64)
  await sharp(trimmedBuffer)
    .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(__dirname, '../public/favicon.png'));

  // 4. Favicon SVG (128x128 with embedded high-res data URI)
  const favicon128 = await sharp(trimmedBuffer)
    .resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const base64Favicon = favicon128.toString('base64');
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <image href="data:image/png;base64,${base64Favicon}" width="128" height="128" preserveAspectRatio="xMidYMid meet" />
</svg>
`;

  fs.writeFileSync(path.join(__dirname, '../public/favicon.svg'), svgContent, 'utf-8');

  console.log('SUCCESS: Generated all logo and favicon formats!');
}

processLogo().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
