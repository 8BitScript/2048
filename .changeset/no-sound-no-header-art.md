---
"2048": patch
---

No sound and no header art, on every machine. The move sample and the theme song are gone (`game.8ba`, `move.wav`, every `audio` call), and so are the `.8bg` title and tile marks that `<HeaderArt />` placed beside the name: on the VIC-20 they fell back to software glyphs written over the "2" of "2048", and on the C64, the web and the Commander X16 they sat as stray blocks left of the board. Measured with the workspace toolchain: PET 4032 3326 bytes of program from 6333, German 3503 from 6510, C64 5484 from 9263, VIC-20 8K 3639 from 5967, CX16 4363 from 7239.
