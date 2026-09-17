---
"2048": minor
---

The score bar and the end of the game are elements: `ui/ScoreBar.8bx` is
the name, the score and the status line; `ui/GameOver.8bx` is GAME OVER
and how to try again, and the board composes it only when the game has
ended — `{over && <GameOver />}`. `drawHud()` leaves every skin. The
PET and the fluid web host keep their own of each. Every native build is
the size it was — 2763 bytes on the 4K PET 2001, 3490 on the unexpanded
VIC-20.
