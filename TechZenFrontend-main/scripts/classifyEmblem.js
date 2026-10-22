import fs from 'fs';
import { PNG } from 'pngjs';

fs.createReadStream('public/tz-emblem-raw.png')
  .pipe(new PNG())
  .on('parsed', function() {
    const W = this.width;
    const H = this.height;

    // Classify each pixel:
    // 0: transparent
    // 1: T cyan (left facet)
    // 2: T blue (right facet)
    // 3: Z dark
    const grid = new Uint8Array(W * H);

    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const idx = (W * y + x) << 2;
        const a = this.data[idx + 3];
        if (a < 120) continue;

        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];

        const isT = (b > r + 35 && b > 70) || (g > r + 35 && g > 70);
        if (isT) {
          // Check cyan vs blue facet
          // Cyan facet has higher green: g > 130
          if (g > 130) {
            grid[y * W + x] = 1; // Cyan
          } else {
            grid[y * W + x] = 2; // Blue
          }
        } else {
          grid[y * W + x] = 3; // Z
        }
      }
    }

    // Let's print out the boundary points of each region
    function getBBox(val) {
      let minX = W, maxX = 0, minY = H, maxY = 0;
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          if (grid[y * W + x] === val) {
            if (x < minX) minX = x;
            if (x > maxX) maxX = x;
            if (y < minY) minY = y;
            if (y > maxY) maxY = y;
          }
        }
      }
      return { minX, maxX, minY, maxY };
    }

    console.log('T-Cyan bbox:', getBBox(1));
    console.log('T-Blue bbox:', getBBox(2));
    console.log('Z bbox:', getBBox(3));
  });
