import fs from 'fs';
import { PNG } from 'pngjs';

// High-quality area-averaging (box filter) image resizer
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

          // Premultiplied alpha weighting for smooth edges
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

// Create a premium badge version (squircle for apple-touch-icon / PWA)
function createBadge(emblemPng, size) {
  const badge = new PNG({ width: size, height: size });
  const cornerRadius = size * 0.22; // iOS squircle radius ratio

  // Resize emblem to ~72% of badge size so it sits comfortably inside
  const emblemSize = Math.round(size * 0.72);
  const resizedEmblem = resizePNG(emblemPng, emblemSize, emblemSize);
  const offsetX = Math.round((size - emblemSize) / 2);
  const offsetY = Math.round((size - emblemSize) / 2);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (size * y + x) << 2;

      // Squircle distance check
      let dist = 0;
      const rx = Math.abs(x - size / 2) - (size / 2 - cornerRadius);
      const ry = Math.abs(y - size / 2) - (size / 2 - cornerRadius);
      if (rx > 0 && ry > 0) {
        dist = Math.sqrt(rx * rx + ry * ry) - cornerRadius;
      } else if (rx > 0) {
        dist = rx - cornerRadius;
      } else if (ry > 0) {
        dist = ry - cornerRadius;
      }

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

      // Background: Deep obsidian cybernetic gradient (#060913 to #0c1427)
      const gradT = (x + y) / (2 * size);
      const bgR = Math.round(6 + (12 - 6) * gradT);
      const bgG = Math.round(9 + (20 - 9) * gradT);
      const bgB = Math.round(19 + (39 - 19) * gradT);

      // Subtle 1px border glow
      const isBorder = (dist >= -1.5 && dist <= 0.5);
      let r = bgR, g = bgG, b = bgB;
      if (isBorder) {
        r = Math.min(255, bgR + 45);
        g = Math.min(255, bgG + 90);
        b = Math.min(255, bgB + 140);
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

// Build standard ICO file containing multiple PNG images
function createICO(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6 + count * 16;
  let totalSize = headerSize;
  for (const item of pngBuffers) {
    totalSize += item.buffer.length;
  }

  const ico = Buffer.alloc(totalSize);

  // ICONDIR
  ico.writeUInt16LE(0, 0); // reserved
  ico.writeUInt16LE(1, 2); // type: 1 = ICO
  ico.writeUInt16LE(count, 4); // count

  let currentOffset = headerSize;

  for (let i = 0; i < count; i++) {
    const item = pngBuffers[i];
    const entryOffset = 6 + i * 16;

    ico.writeUInt8(item.width >= 256 ? 0 : item.width, entryOffset);
    ico.writeUInt8(item.height >= 256 ? 0 : item.height, entryOffset + 1);
    ico.writeUInt8(0, entryOffset + 2); // color count
    ico.writeUInt8(0, entryOffset + 3); // reserved
    ico.writeUInt16LE(1, entryOffset + 4); // color planes
    ico.writeUInt16LE(32, entryOffset + 6); // bits per pixel
    ico.writeUInt32LE(item.buffer.length, entryOffset + 8); // size in bytes
    ico.writeUInt32LE(currentOffset, entryOffset + 12); // offset in file

    item.buffer.copy(ico, currentOffset);
    currentOffset += item.buffer.length;
  }

  return ico;
}

async function run() {
  const rawData = fs.readFileSync('public/tz-emblem-clean-raw.png');
  const rawPng = PNG.sync.read(rawData);

  const whiteData = fs.readFileSync('public/tz-emblem-clean-white.png');
  const whitePng = PNG.sync.read(whiteData);

  // 1. Generate favicon-16x16.png (dark & light)
  const f16Dark = resizePNG(whitePng, 16, 16);
  fs.writeFileSync('public/favicon-16x16-dark.png', PNG.sync.write(f16Dark));

  const f16Light = resizePNG(rawPng, 16, 16);
  fs.writeFileSync('public/favicon-16x16-light.png', PNG.sync.write(f16Light));

  // Default 16x16: high-contrast dark version
  fs.writeFileSync('public/favicon-16x16.png', PNG.sync.write(f16Dark));

  // 2. Generate favicon-32x32.png (dark & light)
  const f32Dark = resizePNG(whitePng, 32, 32);
  fs.writeFileSync('public/favicon-32x32-dark.png', PNG.sync.write(f32Dark));

  const f32Light = resizePNG(rawPng, 32, 32);
  fs.writeFileSync('public/favicon-32x32-light.png', PNG.sync.write(f32Light));

  // Default 32x32
  fs.writeFileSync('public/favicon-32x32.png', PNG.sync.write(f32Dark));

  // 3. Generate favicon-48x48.png
  const f48Dark = resizePNG(whitePng, 48, 48);
  fs.writeFileSync('public/favicon-48x48.png', PNG.sync.write(f48Dark));

  // 4. Generate Apple Touch Icon (180x180 squircle badge)
  const appleTouch = createBadge(whitePng, 180);
  fs.writeFileSync('public/apple-touch-icon.png', PNG.sync.write(appleTouch));

  // 5. Generate Android Chrome icons (192x192 & 512x512)
  const pwa192 = createBadge(whitePng, 192);
  fs.writeFileSync('public/android-chrome-192x192.png', PNG.sync.write(pwa192));

  const pwa512 = createBadge(whitePng, 512);
  fs.writeFileSync('public/android-chrome-512x512.png', PNG.sync.write(pwa512));

  // 6. Generate favicon.ico (16, 32, 48)
  const buf16 = PNG.sync.write(f16Dark);
  const buf32 = PNG.sync.write(f32Dark);
  const buf48 = PNG.sync.write(f48Dark);

  const icoBuf = createICO([
    { width: 16, height: 16, buffer: buf16 },
    { width: 32, height: 32, buffer: buf32 },
    { width: 48, height: 48, buffer: buf48 },
  ]);
  fs.writeFileSync('public/favicon.ico', icoBuf);

  // 7. Generate adaptive SVG Favicon (with automatic light/dark media query)
  const rawBase64 = rawData.toString('base64');
  const whiteBase64 = whiteData.toString('base64');

  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
  <style>
    .theme-light { display: block; }
    .theme-dark { display: none; }
    @media (prefers-color-scheme: dark) {
      .theme-light { display: none; }
      .theme-dark { display: block; }
    }
  </style>
  <image class="theme-light" href="data:image/png;base64,${rawBase64}" width="300" height="300"/>
  <image class="theme-dark" href="data:image/png;base64,${whiteBase64}" width="300" height="300"/>
</svg>
`;
  fs.writeFileSync('public/favicon.svg', svgContent);

  // 8. Generate site.webmanifest
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

  console.log('Successfully re-generated all favicons & manifests with pristine clean emblems!');
}

run();
