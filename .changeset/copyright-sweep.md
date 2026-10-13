---
"2048": patch
---

The copyright line is the program's greeting, not every game's: it is on screen from the first frame until the first move that changes the board, and then a reverse-video cursor runs along it, one cell a frame, and leaves the header to the name and the score. It never comes back — not on a resize, not on a new game. `lib/text/copyright.8bs` holds where the line is (shared with `ui/Copyright.8bx`), whether it is still up, and the sweep; a turn (`lib/game/play.8bs`) takes it down after the board the move earned is drawn. Measured on the PET 4032: 6769 bytes of program from 6548.
