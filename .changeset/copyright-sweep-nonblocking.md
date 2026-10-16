---
"2048": patch
---

The copyright line's sweep no longer holds the game up. It used to wait out all of its frames before anything else could happen, dropping every key pressed meanwhile and making the first moves feel laggy; now it advances one cell a frame inside the game's own frame loop, so a move made during the sweep is taken at once, and the slide and the sweep run together. The PET 4032 is 6333 bytes of program from 6343.
