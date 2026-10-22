import fs from 'fs';
import { PNG } from 'pngjs';

fs.createReadStream('public/TechZenLogo.png')
  .pipe(new PNG())
  .on('parsed', function() {
    console.log('Size:', this.width, 'x', this.height);
    let colCounts = new Array(this.width).fill(0);
    let minX = this.width, maxX = 0, minY = this.height, maxY = 0;
    
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        if (this.data[idx + 3] > 10) {
          colCounts[x]++;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }
    console.log(`Overall bbox: x in [${minX}, ${maxX}], y in [${minY}, ${maxY}]`);

    // Let's print column counts from minX to minX + 350
    let gaps = [];
    for (let x = minX; x < minX + 350; x++) {
      if (colCounts[x] === 0) {
        gaps.push(x);
      }
    }
    console.log('Zero pixel columns in [minX, minX + 350]:', gaps);

    // Let's find emblem bounding box specifically
    // Emblem starts at minX. Where is the first gap after minX?
    let emblemMaxX = gaps[0] ? gaps[0] - 1 : minX + 200;
    let emblemMinY = this.height, emblemMaxY = 0;
    for (let y = 0; y < this.height; y++) {
      for (let x = minX; x <= emblemMaxX; x++) {
        const idx = (this.width * y + x) << 2;
        if (this.data[idx + 3] > 10) {
          if (y < emblemMinY) emblemMinY = y;
          if (y > emblemMaxY) emblemMaxY = y;
        }
      }
    }
    console.log(`Emblem bbox: x [${minX}, ${emblemMaxX}], y [${emblemMinY}, ${emblemMaxY}]`);
    console.log(`Emblem width: ${emblemMaxX - minX + 1}, height: ${emblemMaxY - emblemMinY + 1}`);
  });
