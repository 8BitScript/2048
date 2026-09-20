---
"2048": patch
---

Bump `@8bitscript/*` from 0.15.0 to 0.18.0. The Atari 8-bit's `textmode=gr1` (#71) is 0.16.0's, so CI's compile step had refused the option since that merge; it builds again, as `2048-atari8-gr1-ntsc.xex` (4089 bytes of program). What 0.18.0 changes under the game, measured 2026-09-19 with `8bs build --release`: the C64 takes `@8bitscript/c64/text`'s native `print`/`printNumber`/`fill` (a nine-character HUD print 1,908 → 498 cycles) and the reworked, double-buffered raster list, 4500 → 5185 bytes of program (4771 → 5398 German); the MEGA65 3566 → 3581. Every other build is byte-identical — 2876 English / 3056 German on the 4K PET 2001, 2886 on the 4032, 3431 on the unexpanded VIC-20, 3599 on the C128, 4345 on the X16, and the five web builds. The two workflows' `cli-version` fallback moves to 0.18.0 with it.
