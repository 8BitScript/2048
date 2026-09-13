---
"2048": patch
---

C64 tiles are 6×4 cells (a 27×19 board) instead of 5×3.

`computeLayout` and `drawTile` take a per-build tile height, so the VIC-20 and everyone else keep their existing sizes. Four 6×4 tiles plus gaps still leave the header, status row, and margins on a 40×25 C64 screen.
