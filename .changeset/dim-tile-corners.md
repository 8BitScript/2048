---
"2048": patch
---

The PET's empty tile rounds all four corners. Its checkerboard was 16×10 quadrants, and a checkerboard on an even grid puts two opposite corners on dark squares, where taking the corner quadrant out shows nothing, so only the top-left and bottom-right corners ever looked rounded. The board now stops one quadrant short of the cell grid, at 15×9, so every corner sits on a lit square and each loses that one quadrant the same way, mirrored corner to corner. The web's PET skin draws the same board, quadrant for quadrant: it used to light the opposite checkers from the real PET, and now matches it. Numbered tiles are unchanged. Measured on the PET 4032: 6894 bytes of program from 6769; no other build changes.
