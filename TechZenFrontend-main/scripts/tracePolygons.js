import fs from 'fs';
import { PNG } from 'pngjs';

fs.createReadStream('public/tz-emblem-raw.png')
  .pipe(new PNG())
  .on('parsed', function() {
    const W = this.width;
    const H = this.height;

    // Let's sample key vertices along the boundary of T and Z
    // For Z:
    // It's a polygon! Let's find its vertices (corners)
    let zPixels = [];
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const idx = (W * y + x) << 2;
        if (this.data[idx + 3] > 100) {
          const r = this.data[idx];
          const g = this.data[idx + 1];
          const b = this.data[idx + 2];
          const isT = (b > r + 35 && b > 70) || (g > r + 35 && g > 70);
          if (!isT) {
            zPixels.push({ x, y });
          }
        }
      }
    }

    // For each y, find minX and maxX of Z
    let zRowBounds = {};
    zPixels.forEach(p => {
      if (!zRowBounds[p.y]) zRowBounds[p.y] = { minX: p.x, maxX: p.x };
      else {
        if (p.x < zRowBounds[p.y].minX) zRowBounds[p.y].minX = p.x;
        if (p.x > zRowBounds[p.y].maxX) zRowBounds[p.y].maxX = p.x;
      }
    });

    console.log('Sample Z rows (y: minX -> maxX):');
    [101, 110, 120, 130, 140, 145, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270].forEach(y => {
      if (zRowBounds[y]) console.log(`y=${y}: [${zRowBounds[y].minX}, ${zRowBounds[y].maxX}], width=${zRowBounds[y].maxX - zRowBounds[y].minX + 1}`);
    });
  });
