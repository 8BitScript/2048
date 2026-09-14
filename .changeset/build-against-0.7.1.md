---
"2048": patch
---

Build against 8BitScript 0.7.1.

Dependencies move 0.6.2 -> 0.7.1, two releases at once; the reusable
compile workflow is repinned from v0.6.2's commit to v0.7.1's in both
`ci.yml` and `release.yml`; and `pnpm-workspace.yaml`'s
`minimumReleaseAgeExclude` gains 0.7.1 for each package so a freshly
published version installs.

0.7.1 is what the tile and GAME OVER work in this same release is built on:
portable `text.fill(cell, count, code)` arrived in 0.7.0 and only the X16
had it before, so `drawTile` could not fill a run of cells on the other
eight targets without a string literal the unexpanded VIC-20 cannot carry.

What else comes with it, measured on this game rather than quoted:

- **0.7.0** gave the web target a Modern grid that follows the window
  (`text.columns()` / `screen.RESIZABLE`), and `text.fill()`.
- **0.7.1** narrows 16-bit values to 8 bits by reading only the byte that
  survives, which is pure profit here — every 6502 target gets smaller with
  no source change. It also fixes the X16's `locate()` past row 32 (this
  game's "ARROWS TO MOVE" printed as "AR" at the right edge and "ROWS TO
  MOVE" at the left), reverse video taking its paper from the wrong port
  (the '2' tile printed cyan on white), and gives the X16 a keyboard and
  SNES pads at last — the title screen could not be left on that machine.

Program sizes on 0.7.1, every target built (with #31's hardware RNG merged in):

| target | bytes | ceiling |
| --- | --- | --- |
| PET 2001, stock 4K | **2763** | ~3071 usable |
| PET 4032, 32K | 2853 | — |
| VIC-20, unexpanded | **3490** | 3583 |
| C64 | 3811 | — |
| C128 | 3748 | — |
| MEGA65 | 3723 | — |
| Atari 8-bit | 3780 | — |
| Commander X16 | 4493 | — |
| NES | 40976 | fixed ROM |
| web | 349 bytes of constant data | — |

The unexpanded VIC-20 is the tight one and it gained room: 3490 against its
3583 ceiling, 93 bytes of headroom, where the same source measured 3533 on
0.6.2's codegen. The stock 4K 2001 has 308 bytes spare.
