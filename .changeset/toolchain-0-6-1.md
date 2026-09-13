---
"2048": patch
---

Build against 8BitScript 0.6.1.

Dependencies move 0.5.0 -> 0.6.1, and the reusable compile workflow is repinned from v0.5.0's commit to v0.6.1's.

What that release does to this game is almost entirely one change: the linker stopped inlining a parameterless void body at every call site. `@8bitscript/input`'s `poll()` is 182 bytes on the PET, and this game reaches it from four places — once from `begin()` and once per direction read — so it was carrying four copies. Every target it builds for gets smaller:

| target | 0.5.0 | 0.6.1 | saved |
| --- | --- | --- | --- |
| PET 2001 (4K) | 2448 | 2420 | 28 |
| PET 4032 (32K) | 2744 | 2510 | 234 |
| VIC-20 | 3388 | 3123 | 265 |
| C64 | 4018 | 3477 | 541 |
| C128 | 3849 | 3318 | 531 |
| Atari 8-bit | 4206 | 3488 | 718 |
| Commander X16 | 4404 | 3907 | 497 |
| MEGA65 | 3869 | 3382 | 487 |
| web (wasm) | 3891 | 2745 | 1146 |
| NES | 40976 | 40976 | 0 |

The PET figures are against what v0.1.2 actually shipped; the rest are against a 0.6.0 build, since those targets were parked when v0.1.2 was cut. The NES cannot move: a `.nes` is 16 + 32768 PRG + 8192 CHR whichever program is inside it.

The 4K 2001 is the build that had to be fitted, and it is now **2420 bytes** — below the 2440 it was originally trimmed to, with 651 bytes of headroom under `$0FFF` rather than 447. Measured under `xpet`: the board draws and plays.
