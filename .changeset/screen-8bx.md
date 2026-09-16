---
"2048": minor
---

What goes on the screen is now composition: `src/Screen.8bx` — `<Title />`,
or a `<Board />` that is the HUD over sixteen `<Tiles />` — written as 8BX
elements over the drawing calls `tile.8bs` and its twins provide. The
rules and the board move to `src/game.8bs`; `src/2048.8bs` is the program
that drives both. The same functions at the same sizes on every target —
2763 bytes on the 4K PET 2001 and 3490 on the unexpanded VIC-20, as before
— and 60 bytes less on every build that animates. Needs `@8bitscript/cli`
0.11.0.
