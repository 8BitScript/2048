---
"2048": patch
---

The title's wobble reads `raster.STRIDE` — the bytes one raster-list entry takes, 4 on the C64 and 3 on the web, a fact that folds — instead of probing for it at start-up. `<TitleWobble />` no longer writes a trial `setValue` at offset 3 and `wobble.step()` no longer reads the answer back from two bytes of RAM each frame; `examples/fancy` in 8bitscript, whose probe this was, made the same change in 0.18. C64: 5185 → 5122 bytes of program and 94 → 92 of RAM; the web's C64 skin 109 → 107 of RAM; the 4K PET and the VIC-20, which never link the wobble, byte-identical. Checked on screen: `8bs run c64 --screenshot --frames 1200` and `1203` show the band, the yellow border, and "2048" sheared at the two-scanline pitch in two different phases; the web's C64 skin at `--frames 300` and `303` the same.
