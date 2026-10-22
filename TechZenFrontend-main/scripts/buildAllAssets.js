import fs from 'fs';
import { PNG } from 'pngjs';

const originalUploadedPath = 'C:/Users/farza/.gemini/antigravity-ide/brain/103ac05c-2b2d-46e8-8fb3-2b86a262e7c8/.user_uploaded/media_1792171933755.png';

// High-quality area-averaging image resizer (box filter supersampling)
function resizePNG(srcPng, targetW, targetH) {
  const destPng = new PNG({ width: targetW, height: targetH });
  const srcW = srcPng.width;
  const srcH = srcPng.height;

  const scaleX = srcW / targetW;
  const scaleY = srcH / targetH;

  for (let dy = 0; dy < targetH; dy++) {
    const syStart = dy * scaleY;
    const syEnd = (dy + 1) * scaleY;

    for (let dx = 0; dx < targetW; dx++) {
      const sxStart = dx * scaleX;
      const sxEnd = (dx + 1) * scaleX;

      let sumR = 0, sumG = 0, sumB = 0, sumA = 0;
      let totalWeight = 0;

      const y0 = Math.floor(syStart);
      const y1 = Math.min(Math.ceil(syEnd), srcH);
      const x0 = Math.floor(sxStart);
      const x1 = Math.min(Math.ceil(sxEnd), srcW);

      for (let sy = y0; sy < y1; sy++) {
        const yWeight = Math.min(sy + 1, syEnd) - Math.max(sy, syStart);
        if (yWeight <= 0) continue;

        for (let sx = x0; sx < x1; sx++) {
          const xWeight = Math.min(sx + 1, sxEnd) - Math.max(sx, sxStart);
          if (xWeight <= 0) continue;

          const weight = xWeight * yWeight;
          const sIdx = (srcW * sy + sx) << 2;
          const a = srcPng.data[sIdx + 3] / 255;

          sumR += srcPng.data[sIdx] * a * weight;
          sumG += srcPng.data[sIdx + 1] * a * weight;
          sumB += srcPng.data[sIdx + 2] * a * weight;
          sumA += srcPng.data[sIdx + 3] * weight;
          totalWeight += weight;
        }
      }

      const dIdx = (targetW * dy + dx) << 2;
      if (totalWeight > 0 && sumA > 0) {
        const avgA = sumA / totalWeight;
        const normA = avgA / 255;
        destPng.data[dIdx] = Math.round(Math.min(255, Math.max(0, (sumR / totalWeight) / normA)));
        destPng.data[dIdx + 1] = Math.round(Math.min(255, Math.max(0, (sumG / totalWeight) / normA)));
        destPng.data[dIdx + 2] = Math.round(Math.min(255, Math.max(0, (sumB / totalWeight) / normA)));
        destPng.data[dIdx + 3] = Math.round(Math.min(255, Math.max(0, avgA)));
      } else {
        destPng.data[dIdx] = 0;
        destPng.data[dIdx + 1] = 0;
        destPng.data[dIdx + 2] = 0;
        destPng.data[dIdx + 3] = 0;
      }
    }
  }

  return destPng;
}

// Build standard ICO file containing multiple PNG images
function createICO(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6 + count * 16;
  let totalSize = headerSize;
  for (const item of pngBuffers) {
    totalSize += item.buffer.length;
  }

  const ico = Buffer.alloc(totalSize);

  ico.writeUInt16LE(0, 0); // reserved
  ico.writeUInt16LE(1, 2); // type: 1 = ICO
  ico.writeUInt16LE(count, 4); // count

  let currentOffset = headerSize;

  for (let i = 0; i < count; i++) {
    const item = pngBuffers[i];
    const entryOffset = 6 + i * 16;

    ico.writeUInt8(item.width >= 256 ? 0 : item.width, entryOffset);
    ico.writeUInt8(item.height >= 256 ? 0 : item.height, entryOffset + 1);
    ico.writeUInt8(0, entryOffset + 2);
    ico.writeUInt8(0, entryOffset + 3);
    ico.writeUInt16LE(1, entryOffset + 4);
    ico.writeUInt16LE(32, entryOffset + 6);
    ico.writeUInt32LE(item.buffer.length, entryOffset + 8);
    ico.writeUInt32LE(currentOffset, entryOffset + 12);

    item.buffer.copy(ico, currentOffset);
    currentOffset += item.buffer.length;
  }

  return ico;
}

// Create a sleek squircle badge for Apple Touch Icon & PWA
function createBadge(emblemPng, size) {
  const badge = new PNG({ width: size, height: size });
  const cornerRadius = size * 0.22;

  const emblemSize = Math.round(size * 0.72);
  const resizedEmblem = resizePNG(emblemPng, emblemSize, emblemSize);
  const offsetX = Math.round((size - emblemSize) / 2);
  const offsetY = Math.round((size - emblemSize) / 2);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (size * y + x) << 2;

      const qx = Math.abs(x - size / 2 + 0.5) - (size / 2 - cornerRadius);
      const qy = Math.abs(y - size / 2 + 0.5) - (size / 2 - cornerRadius);
      const dist = Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - cornerRadius;

      // Alpha for antialiased corner cutoff (dist > 0 is outside)
      let alpha = 1;
      if (dist > 0) {
        alpha = Math.max(0, 1 - dist);
      }

      if (alpha <= 0) {
        badge.data[idx] = 0;
        badge.data[idx + 1] = 0;
        badge.data[idx + 2] = 0;
        badge.data[idx + 3] = 0;
        continue;
      }

      // Deep cybernetic obsidian backdrop (#050811 to #0c1427)
      const gradT = (x + y) / (2 * size);
      const bgR = Math.round(6 + (14 - 6) * gradT);
      const bgG = Math.round(9 + (22 - 9) * gradT);
      const bgB = Math.round(18 + (42 - 18) * gradT);

      // Subtle 1.5px border glow on the rim
      let r = bgR, g = bgG, b = bgB;
      if (dist >= -2 && dist <= 0) {
        r = Math.min(255, bgR + 40);
        g = Math.min(255, bgG + 80);
        b = Math.min(255, bgB + 130);
      }

      badge.data[idx] = r;
      badge.data[idx + 1] = g;
      badge.data[idx + 2] = b;
      badge.data[idx + 3] = Math.round(alpha * 255);
    }
  }

  // Alpha blend emblem over badge
  for (let ey = 0; ey < emblemSize; ey++) {
    for (let ex = 0; ex < emblemSize; ex++) {
      const bx = offsetX + ex;
      const by = offsetY + ey;
      if (bx < 0 || bx >= size || by < 0 || by >= size) continue;

      const eIdx = (emblemSize * ey + ex) << 2;
      const bIdx = (size * by + bx) << 2;

      const ea = resizedEmblem.data[eIdx + 3] / 255;
      if (ea <= 0) continue;

      const er = resizedEmblem.data[eIdx];
      const eg = resizedEmblem.data[eIdx + 1];
      const eb = resizedEmblem.data[eIdx + 2];

      const ba = badge.data[bIdx + 3] / 255;
      const outA = ea + ba * (1 - ea);

      if (outA > 0) {
        badge.data[bIdx] = Math.round((er * ea + badge.data[bIdx] * ba * (1 - ea)) / outA);
        badge.data[bIdx + 1] = Math.round((eg * ea + badge.data[bIdx + 1] * ba * (1 - ea)) / outA);
        badge.data[bIdx + 2] = Math.round((eb * ea + badge.data[bIdx + 2] * ba * (1 - ea)) / outA);
        badge.data[bIdx + 3] = Math.round(outA * 255);
      }
    }
  }

  return badge;
}

async function run() {
  console.log('Reading pristine uploaded logo...');
  const originalBuf = fs.readFileSync(originalUploadedPath);
  const origPng = PNG.sync.read(originalBuf);

  // 1. Write pristine original to public/TechZenLogo.png
  fs.writeFileSync('public/TechZenLogo.png', originalBuf);
  console.log('Saved pristine public/TechZenLogo.png');

  // 2. Generate pristine TechZenLogo-white.png
  const whiteLogo = new PNG({ width: origPng.width, height: origPng.height });
  for (let y = 0; y < origPng.height; y++) {
    for (let x = 0; x < origPng.width; x++) {
      const idx = (origPng.width * y + x) << 2;
      const a = origPng.data[idx + 3];

      if (a === 0) {
        whiteLogo.data[idx] = 0;
        whiteLogo.data[idx + 1] = 0;
        whiteLogo.data[idx + 2] = 0;
        whiteLogo.data[idx + 3] = 0;
        continue;
      }

      const r = origPng.data[idx];
      const g = origPng.data[idx + 1];
      const b = origPng.data[idx + 2];

      const isBlueCyan = (b > r + 35 && b > 70) || (g > r + 35 && g > 70);
      whiteLogo.data[idx + 3] = a;

      if (isBlueCyan) {
        whiteLogo.data[idx] = r;
        whiteLogo.data[idx + 1] = g;
        whiteLogo.data[idx + 2] = b;
      } else {
        const brightness = (r + g + b) / 3;
        if (brightness < 120) {
          whiteLogo.data[idx] = 255;
          whiteLogo.data[idx + 1] = 255;
          whiteLogo.data[idx + 2] = 255;
        } else {
          whiteLogo.data[idx] = r;
          whiteLogo.data[idx + 1] = g;
          whiteLogo.data[idx + 2] = b;
        }
      }
    }
  }
  fs.writeFileSync('public/TechZenLogo-white.png', PNG.sync.write(whiteLogo));
  console.log('Saved pristine public/TechZenLogo-white.png');

  // 3. Extract the pristine TZ emblem
  // Emblem bounding box: x in [35, 306], y in [48, 290] (excluding starting edge of 'Tech' at x >= 304, y >= 160)
  const emblemW = 306 - 35 + 1; // 272
  const emblemH = 290 - 48 + 1; // 243
  const squareSize = 300;
  const padX = Math.round((squareSize - emblemW) / 2);
  const padY = Math.round((squareSize - emblemH) / 2);

  const tzLight = new PNG({ width: squareSize, height: squareSize });
  tzLight.data.fill(0);

  const tzDark = new PNG({ width: squareSize, height: squareSize });
  tzDark.data.fill(0);

  for (let y = 0; y < emblemH; y++) {
    for (let x = 0; x < emblemW; x++) {
      const srcX = 35 + x;
      const srcY = 48 + y;

      if (srcX >= 304 && srcY >= 160) continue;

      const srcIdx = (origPng.width * srcY + srcX) << 2;
      const a = origPng.data[srcIdx + 3];

      // Exclude any faint background drop shadow box (a < 100)
      if (a < 100) continue;

      const r = origPng.data[srcIdx];
      const g = origPng.data[srcIdx + 1];
      const b = origPng.data[srcIdx + 2];

      const destIdx = (squareSize * (y + padY) + (x + padX)) << 2;

      // Light theme emblem (original dark navy Z)
      tzLight.data[destIdx] = r;
      tzLight.data[destIdx + 1] = g;
      tzLight.data[destIdx + 2] = b;
      tzLight.data[destIdx + 3] = a;

      // Dark theme emblem (white Z for high contrast)
      const isBlueCyan = (b > r + 35 && b > 70) || (g > r + 35 && g > 70);
      tzDark.data[destIdx + 3] = a;
      if (isBlueCyan) {
        tzDark.data[destIdx] = r;
        tzDark.data[destIdx + 1] = g;
        tzDark.data[destIdx + 2] = b;
      } else {
        tzDark.data[destIdx] = 255;
        tzDark.data[destIdx + 1] = 255;
        tzDark.data[destIdx + 2] = 255;
      }
    }
  }

  const lightBuf = PNG.sync.write(tzLight);
  const darkBuf = PNG.sync.write(tzDark);
  fs.writeFileSync('public/tz-emblem.png', lightBuf);
  fs.writeFileSync('public/tz-emblem-dark.png', darkBuf);
  console.log('Saved pristine tz-emblem.png and tz-emblem-dark.png');

  // 4. Generate all favicon sizes
  const f16Dark = resizePNG(tzDark, 16, 16);
  const f16Light = resizePNG(tzLight, 16, 16);
  fs.writeFileSync('public/favicon-16x16-dark.png', PNG.sync.write(f16Dark));
  fs.writeFileSync('public/favicon-16x16-light.png', PNG.sync.write(f16Light));
  fs.writeFileSync('public/favicon-16x16.png', PNG.sync.write(f16Dark));

  const f32Dark = resizePNG(tzDark, 32, 32);
  const f32Light = resizePNG(tzLight, 32, 32);
  fs.writeFileSync('public/favicon-32x32-dark.png', PNG.sync.write(f32Dark));
  fs.writeFileSync('public/favicon-32x32-light.png', PNG.sync.write(f32Light));
  fs.writeFileSync('public/favicon-32x32.png', PNG.sync.write(f32Dark));

  const f48Dark = resizePNG(tzDark, 48, 48);
  fs.writeFileSync('public/favicon-48x48.png', PNG.sync.write(f48Dark));

  // 5. Apple Touch Icon & PWA Icons (Premium obsidian squircle badge)
  const appleTouch = createBadge(tzDark, 180);
  fs.writeFileSync('public/apple-touch-icon.png', PNG.sync.write(appleTouch));

  const pwa192 = createBadge(tzDark, 192);
  fs.writeFileSync('public/android-chrome-192x192.png', PNG.sync.write(pwa192));

  const pwa512 = createBadge(tzDark, 512);
  fs.writeFileSync('public/android-chrome-512x512.png', PNG.sync.write(pwa512));

  // 6. Favicon.ico
  const icoBuf = createICO([
    { width: 16, height: 16, buffer: PNG.sync.write(f16Dark) },
    { width: 32, height: 32, buffer: PNG.sync.write(f32Dark) },
    { width: 48, height: 48, buffer: PNG.sync.write(f48Dark) },
  ]);
  fs.writeFileSync('public/favicon.ico', icoBuf);

  // 7. Adaptive SVG Favicon (Automatic dark/light mode tab switching)
  const lightBase64 = lightBuf.toString('base64');
  const darkBase64 = darkBuf.toString('base64');

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
  <style>
    .theme-light { display: block; }
    .theme-dark { display: none; }
    @media (prefers-color-scheme: dark) {
      .theme-light { display: none; }
      .theme-dark { display: block; }
    }
  </style>
  <image class="theme-light" href="data:image/png;base64,${lightBase64}" width="300" height="300"/>
  <image class="theme-dark" href="data:image/png;base64,${darkBase64}" width="300" height="300"/>
</svg>
`;
  fs.writeFileSync('public/favicon.svg', svgContent);

  // 8. Site Webmanifest
  const manifest = {
    name: "TechZen Consulting",
    short_name: "TechZen",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ],
    theme_color: "#050811",
    background_color: "#050811",
    display: "standalone"
  };
  fs.writeFileSync('public/site.webmanifest', JSON.stringify(manifest, null, 2));

  console.log('All favicons, badges, and manifest files successfully generated!');
}

run();
