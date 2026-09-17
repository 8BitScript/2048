---
"2048": minor
---

One element, every machine that draws through `@8bitscript/text`. The
eight `*.web.8bx` twins and the nine `*.web.{c64,pet-2001,vic20}.8bx`
copies are gone: `ui/Tile.8bx`, `ui/ScoreBar.8bx`, `ui/GameOver.8bx` and
the title's five are each one file, fixed grid or fluid — what differs is
a fact (`screen.RESIZABLE`, `#system()`, `Input.*`) and the arm a build
cannot take folds away. Underneath, `lib/` exposes one surface from every
skin: `layout.8bs` (the fixed grids and the fluid host in one file, the
PET and the web's replicas as twins of it), the tables written once in
`palette.8bs` and `font.8bs` instead of three to five times, the shared
primitives in `draw.8bs`, and `host.8bs` for what only the web can ask.
The 4K PET 2001 and the unexpanded VIC-20 are the size they were (2759 and
3486); the C64, C128, Atari and MEGA65 are 26 to 34 bytes smaller. The
web's C64 and VIC-20 replicas now print the score on the same row as the
name, as the machines they replicate do.
