import fs from 'fs';
import { PNG } from 'pngjs';

function transformLogo(inputPath, outputPath, isWhite) {
  const origPng = PNG.sync.read(fs.readFileSync(inputPath));
  const result = new PNG({ width: origPng.width, height: origPng.height });
  origPng.data.copy(result.data);

  // 1. Clear old 'C' in LLC (x in [932..1005] for y < 215, x in [951..1005] for y >= 215 to protect the foot of second L)
  for (let y = 175; y <= 230; y++) {
    const clearStartX = y < 215 ? 932 : 951;
    for (let x = clearStartX; x <= 1005; x++) {
      const idx = (result.width * y + x) << 2;
      result.data[idx] = 0;
      result.data[idx + 1] = 0;
      result.data[idx + 2] = 0;
      result.data[idx + 3] = 0;
    }
  }

  // 2. Synthesize 'P' from the typeface 'R' in the same line
  // 'R' is at sx in [558..600], sy in [178..226]
  // Shift dx = 393 so stem of P is at 559 + 393 = 952
  // (matching 34px stem spacing: 884 -> 918 -> 952)
  const dx = 393;
  for (let sy = 178; sy <= 226; sy++) {
    for (let sx = 558; sx <= 600; sx++) {
      const sIdx = (origPng.width * sy + sx) << 2;
      const tx = sx + dx;
      const ty = sy;
      const tIdx = (result.width * ty + tx) << 2;

      let a = origPng.data[sIdx + 3];
      let r = origPng.data[sIdx];
      let g = origPng.data[sIdx + 1];
      let b = origPng.data[sIdx + 2];

      // Remove diagonal leg of R to leave pure P bowl and stem
      if (sx >= 571) {
        if (sy === 204) {
          // Bottom inner bar of bowl matching top inner bar at sy=179
          const topIdx = (origPng.width * 179 + sx) << 2;
          a = origPng.data[topIdx + 3];
          r = origPng.data[topIdx];
          g = origPng.data[topIdx + 1];
          b = origPng.data[topIdx + 2];
        } else if (sy === 205) {
          // Bottom outer edge of bowl matching top outer edge at sy=178
          const topIdx = (origPng.width * 178 + sx) << 2;
          a = origPng.data[topIdx + 3];
          r = origPng.data[topIdx];
          g = origPng.data[topIdx + 1];
          b = origPng.data[topIdx + 2];
        } else if (sy >= 206) {
          a = 0;
        }
      }

      if (a > 0) {
        if (isWhite) {
          result.data[tIdx] = 255;
          result.data[tIdx + 1] = 255;
          result.data[tIdx + 2] = 255;
        } else {
          result.data[tIdx] = r;
          result.data[tIdx + 1] = g;
          result.data[tIdx + 2] = b;
        }
        result.data[tIdx + 3] = a;
      }
    }
  }

  const outBuf = PNG.sync.write(result);
  fs.writeFileSync(outputPath, outBuf);
  console.log(`Successfully updated ${outputPath} with LLP!`);
}

// Update TechZenLogo.png (light theme)
transformLogo('TechZenFrontend-main/public/TechZenLogo.png', 'TechZenFrontend-main/public/TechZenLogo.png', false);

// Update TechZenLogo-white.png (dark theme)
transformLogo('TechZenFrontend-main/public/TechZenLogo-white.png', 'TechZenFrontend-main/public/TechZenLogo-white.png', true);

// Update TechZenLogo-light.png
fs.copyFileSync('TechZenFrontend-main/public/TechZenLogo.png', 'TechZenFrontend-main/public/TechZenLogo-light.png');
console.log('Successfully updated TechZenLogo-light.png!');
