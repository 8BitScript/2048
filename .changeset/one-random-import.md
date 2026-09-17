---
"2048": minor
---

Where the random numbers come from is the platform's decision now:
`@8bitscript/random/entropy` (8bitscript 0.12.0) is one import that the
compiler resolves to SID voice 3 on the C64, POKEY's counter on the Atari
8-bit, and the seeded generator on the other seven. The game's own
`rng.8bs` and its two machine twins go. Every build is byte-for-byte the
size it was: 2687 on the 4K PET 2001, 3396 on the unexpanded VIC-20, and
the C64 and Atari still link the register read and not the generator.
