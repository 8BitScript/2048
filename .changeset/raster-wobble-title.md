---
"2048": minor
---

The title screen wobbles on the C64 — the real one and the web's `c64`
skin: background and border switch colour a text row above "2048" and
back a row below it, and the title row itself rides a sine-driven
horizontal wobble — the raster showpiece `@8bitscript/raster` and its
`fancy` example established, scaled to one text row. The moment the game
starts, `raster.disable()` tears the splits down before the board draws,
so nothing of the effect survives past the title.

Everywhere `#fact(video.raster)` answers false the whole effect folds
away to nothing: the 4K PET (2763 bytes of program) and the unexpanded
VIC-20 (3490) are byte-identical with and without it, measured 2026-09-14
against the 0.10.0 toolchain. The other web skins draw their own title
and do not take the effect up.

All `@8bitscript/*` dependencies move to 0.10.0, the first release that
carries `@8bitscript/raster`.
