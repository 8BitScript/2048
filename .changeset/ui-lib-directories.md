---
"2048": minor
---

The source is now two directories under the program: `src/ui/` holds the
`.8bx` — what is on the screen, one element per file, starting with
`App.8bx` (the root that was `Screen.8bx`) — and `src/lib/` holds the
`.8bs` underneath it: the rules (`game.8bs`), the skins (`tile.8bs` and
its machine twins) and the random numbers (`rng.8bs` and its twins).
`src/2048.8bs` stays the program. Nothing moved but files: every one of
the thirteen release builds is the same size it was — 2763 bytes on the 4K
PET 2001, 3490 on the unexpanded VIC-20.
