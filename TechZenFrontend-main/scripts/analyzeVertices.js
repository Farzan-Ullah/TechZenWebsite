import fs from 'fs';
import { PNG } from 'pngjs';

fs.createReadStream('public/tz-emblem-raw.png')
  .pipe(new PNG())
  .on('parsed', function() {
    // Let's find the corners / contour of the shapes
    // The emblem has:
    // 1. T top bar
    // 2. T stem (left cyan facet, right blue facet)
    // 3. Z shape
    
    // Let's sample along key rows and columns to find corner vertices
    console.log('Analyzing emblem geometry...');
    
    // Find min/max for T (cyan/blue pixels: b > r + 30)
    let tPixels = [];
    let zPixels = [];

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        const a = this.data[idx + 3];
        if (a < 50) continue;

        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];

        const isT = (b > r + 35 && b > 70) || (g > r + 35 && g > 70);
        if (isT) {
          tPixels.push({ x, y, r, g, b });
        } else {
          zPixels.push({ x, y, r, g, b });
        }
      }
    }

    const tMinX = Math.min(...tPixels.map(p => p.x));
    const tMaxX = Math.max(...tPixels.map(p => p.x));
    const tMinY = Math.min(...tPixels.map(p => p.y));
    const tMaxY = Math.max(...tPixels.map(p => p.y));

    const zMinX = Math.min(...zPixels.map(p => p.x));
    const zMaxX = Math.max(...zPixels.map(p => p.x));
    const zMinY = Math.min(...zPixels.map(p => p.y));
    const zMaxY = Math.max(...zPixels.map(p => p.y));

    console.log(`T bounding box: x [${tMinX}, ${tMaxX}], y [${tMinY}, ${tMaxY}]`);
    console.log(`Z bounding box: x [${zMinX}, ${zMaxX}], y [${zMinY}, ${zMaxY}]`);

    // Let's check T vertices:
    // Top-left of T crossbar:
    console.log('T top edge at y =', tMinY, 'x span:', tPixels.filter(p => p.y === tMinY).map(p => p.x));
    console.log('T bottom-most pixel at y =', tMaxY, 'x:', tPixels.filter(p => p.y === tMaxY).map(p => p.x));

    // Z vertices:
    console.log('Z top edge at y =', zMinY, 'x span:', zPixels.filter(p => p.y === zMinY).map(p => p.x));
    console.log('Z bottom edge at y =', zMaxY, 'x span:', zPixels.filter(p => p.y === zMaxY).map(p => p.x));
  });
