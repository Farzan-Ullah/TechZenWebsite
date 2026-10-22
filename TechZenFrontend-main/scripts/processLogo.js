import fs from 'fs';
import { PNG } from 'pngjs';

const inputPath = 'public/TechZenLogo.png';
const outputPath = 'public/TechZenLogo-white.png'; // Logo for dark theme (where black is turned to white)

fs.createReadStream(inputPath)
  .pipe(new PNG({ filterType: 4 }))
  .on('parsed', function() {
    let blackCount = 0;
    let blueCount = 0;
    let transparentCount = 0;

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const idx = (this.width * y + x) << 2;
        const r = this.data[idx];
        const g = this.data[idx + 1];
        const b = this.data[idx + 2];
        const a = this.data[idx + 3];

        if (a === 0) {
          transparentCount++;
          continue;
        }

        // Check if pixel is part of the blue/cyan emblem/text
        // Blue/cyan has strong blue or green-blue dominance: b > r + 30 or g > r + 30
        const isBlueCyan = (b > r + 35 && b > 70) || (g > r + 35 && g > 70);

        if (isBlueCyan) {
          blueCount++;
          // Keep the vibrant cyan/blue intact!
        } else {
          // This is the black/dark navy text ("Tech", "Z", "IT and HR Services LLC", "Learn. Build. Grow.")
          // Or the anti-aliased transition of black text.
          blackCount++;

          // Invert the darkness: turn dark navy/black into crisp white #ffffff
          // Notice that the alpha channel preserves all the anti-aliased smoothness!
          // If a pixel was pure black (r=5, g=10, b=25), we turn it into pure white (255, 255, 255)
          // For anti-aliased edges, we calculate how "dark" it was:
          const brightness = (r + g + b) / 3;
          if (brightness < 120) {
            this.data[idx] = 255;     // R
            this.data[idx + 1] = 255; // G
            this.data[idx + 2] = 255; // B
            // keep alpha as-is for crisp anti-aliasing!
          }
        }
      }
    }

    console.log(`Dimensions: ${this.width}x${this.height}`);
    console.log(`Pixels - Blue/Cyan: ${blueCount}, Black/Dark: ${blackCount}, Transparent: ${transparentCount}`);

    this.pack().pipe(fs.createWriteStream(outputPath)).on('finish', () => {
      console.log(`Successfully generated ${outputPath}!`);
    });
  });
