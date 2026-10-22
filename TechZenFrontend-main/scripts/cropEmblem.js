import fs from 'fs';
import { PNG } from 'pngjs';

fs.createReadStream('public/TechZenLogo.png')
  .pipe(new PNG())
  .on('parsed', function() {
    // Emblem bounds: x in [35, 306], y in [48, 290]
    // Width: 272, Height: 243
    // Let's create a square canvas, say 300x300, or exact square with padding
    const size = 300;
    const emblemW = 306 - 35 + 1; // 272
    const emblemH = 290 - 48 + 1; // 243
    
    const padX = Math.round((size - emblemW) / 2);
    const padY = Math.round((size - emblemH) / 2);

    // 1. Raw cropped emblem (with original colors)
    const rawEmblem = new PNG({ width: size, height: size });
    // Initialize transparent
    rawEmblem.data.fill(0);

    // 2. High-contrast emblem for dark mode / general favicon (Z is white or bright gradient)
    const whiteZEmblem = new PNG({ width: size, height: size });
    whiteZEmblem.data.fill(0);

    for (let y = 0; y < emblemH; y++) {
      for (let x = 0; x < emblemW; x++) {
        const srcX = 35 + x;
        const srcY = 48 + y;

        // Exclude the starting pixels of the "T" in "Tech" if x >= 304 && y >= 160
        if (srcX >= 304 && srcY >= 160) continue;

        const srcIdx = (this.width * srcY + srcX) << 2;
        const destIdx = (size * (y + padY) + (x + padX)) << 2;

        const r = this.data[srcIdx];
        const g = this.data[srcIdx + 1];
        const b = this.data[srcIdx + 2];
        const a = this.data[srcIdx + 3];

        if (a === 0) continue;

        // Raw copy
        rawEmblem.data[destIdx] = r;
        rawEmblem.data[destIdx + 1] = g;
        rawEmblem.data[destIdx + 2] = b;
        rawEmblem.data[destIdx + 3] = a;

        // White Z copy
        const isBlueCyan = (b > r + 35 && b > 70) || (g > r + 35 && g > 70);
        whiteZEmblem.data[destIdx + 3] = a;
        if (isBlueCyan) {
          whiteZEmblem.data[destIdx] = r;
          whiteZEmblem.data[destIdx + 1] = g;
          whiteZEmblem.data[destIdx + 2] = b;
        } else {
          // Dark/black Z portion -> make crisp white
          whiteZEmblem.data[destIdx] = 255;
          whiteZEmblem.data[destIdx + 1] = 255;
          whiteZEmblem.data[destIdx + 2] = 255;
        }
      }
    }

    rawEmblem.pack().pipe(fs.createWriteStream('public/tz-emblem-raw.png')).on('finish', () => {
      console.log('Saved tz-emblem-raw.png');
    });

    whiteZEmblem.pack().pipe(fs.createWriteStream('public/tz-emblem-white.png')).on('finish', () => {
      console.log('Saved tz-emblem-white.png');
    });
  });
