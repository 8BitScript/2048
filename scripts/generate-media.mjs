// Writes title/tile PNGs and move WAV for src/media/*.8bg and game.8ba.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { encodePng } from '../../8bitscript/packages/graphics-tools/src/index.mjs';
import { encodeWav } from '../../8bitscript/packages/audio-tools/src/index.mjs';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'media');
mkdirSync(OUT, { recursive: true });

function put(rgba, w, x, y, r, g, b, a = 0xff) {
  const o = (y * w + x) * 4;
  rgba[o] = r;
  rgba[o + 1] = g;
  rgba[o + 2] = b;
  rgba[o + 3] = a;
}

// 16×16: four tinted quadrants like the game's opening tiles.
const tw = 16;
const titleRgba = new Uint8Array(tw * tw * 4);
for (let y = 0; y < tw; y += 1) {
  for (let x = 0; x < tw; x += 1) {
    const qx = x < 8 ? 0 : 1;
    const qy = y < 8 ? 0 : 1;
    const palette = [
      [0xee, 0xe4, 0xda],
      [0xed, 0xe0, 0xc8],
      [0xf2, 0xb1, 0x79],
      [0xf5, 0x9e, 0x0b],
    ];
    const [r, g, b] = palette[qy * 2 + qx];
    if (x % 8 === 0 || y % 8 === 0 || x === 15 || y === 15) {
      put(titleRgba, tw, x, y, 0xbb, 0xad, 0xa0);
    } else {
      put(titleRgba, tw, x, y, r, g, b);
    }
  }
}

// 8×8: one filled tile face (tan) with a darker edge.
const tileW = 8;
const tileRgba = new Uint8Array(tileW * tileW * 4);
for (let y = 0; y < tileW; y += 1) {
  for (let x = 0; x < tileW; x += 1) {
    const edge = x === 0 || y === 0 || x === 7 || y === 7;
    put(tileRgba, tileW, x, y, edge ? 0xbb : 0xed, edge ? 0xad : 0xe0, edge ? 0xa0 : 0xc8);
  }
}

const moveSamples = new Float32Array(160);
for (let i = 0; i < moveSamples.length; i += 1) {
  moveSamples[i] = Math.sin(i / 3) * Math.exp(-i / 40) * 0.6;
}

writeFileSync(join(OUT, 'title.png'), encodePng(tw, tw, titleRgba));
writeFileSync(join(OUT, 'tile.png'), encodePng(tileW, tileW, tileRgba));
writeFileSync(join(OUT, 'move.wav'), encodeWav(moveSamples, 8000));

writeFileSync(
  join(OUT, 'title.8bg'),
  `sprite title {
  source "./title.png"
  size 16x16
  transparent auto
}
`,
);

writeFileSync(
  join(OUT, 'tile.8bg'),
  `sprite tile {
  source "./tile.png"
  size 8x8
  transparent auto
}
`,
);

writeFileSync(
  join(OUT, 'game.8ba'),
  `instrument pad {
  waveform pulse
  polyphony 1
}

sample move {
  source "./move.wav"
  fallback { synth noise }
}

song theme {
  tempo 96
  speed 8
  order { main }
  pattern main length 32 {
    track pad {
      row 0 { note C3; instrument pad; }
      row 12 { note G3; }
      row 24 { note C4; }
    }
  }
}
`,
);

console.log(`wrote media assets under ${OUT}`);
