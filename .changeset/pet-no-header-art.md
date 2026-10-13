---
"2048": patch
---

The PET draws no header art. Its header row is all text and the board starts on the row under it, so the title and tile marks — quadrant blocks on this machine — landed on the first tile: a stray block left of the top-left tile, on the native build and the wasm one alike, and over the name on the hosted PET 2001 page. A `HEADER_ART` flag in the layout twins (false in `layout.pet.8bs` and `layout.web.pet-2001.8bs`) leaves `<HeaderArt />` out at compile time. Measured on the PET 4032: 6333 bytes of program from 6769; German 6510 from 6946.
