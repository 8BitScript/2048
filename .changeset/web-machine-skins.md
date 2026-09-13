---
"2048": patch
---

The web site picks a look: 16:9, or a PET 2001 / C64 / VIC-20 skin.

Each skin is its own wasm (`program.wasm` plus `program-c64.wasm`, `program-pet-2001.wasm`, `program-vic20.wasm`), compiled against 8BitScript 0.6.2's `machine=` hardware. `site/index.html` swaps which file `EightBitScript.mount` loads. Tile geometry lives in `tile.web.<tag>.8bs` beside `tile.web.8bs`, the same system-specific-file rule the PET twin already used.
