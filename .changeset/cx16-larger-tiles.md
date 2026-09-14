---
"2048": patch
---

Commander X16 tiles fill the 76×56 grid, at 12×8 instead of 5×3.

The portable five-wide tile is a postage stamp on that screen. 12×8 is
2× the C64's 6×4 (same 3:2 cell aspect). `drawTile` fills with
`text.fill` so the width is not a string literal the unexpanded VIC-20
would have to carry.
