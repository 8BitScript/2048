---
"2048": minor
---

The title screen is composition: `ui/TitleScreen.8bx` is a `<Logo />`, a
`<StartMessage />` that names this machine's controls, the
`<Copyright />`, the `<Version />` and — on the real C64 and the web's C64
skin — a `<TitleWobble />`, the raster band and wobble behind the name,
whose sine table and per-frame step now live once in `lib/wobble.8bs`
instead of twice. `drawTitleScreen()` and `wobbleTitle()` leave every
skin. Every native build is four bytes smaller than before — 2759 bytes
on the 4K PET 2001, 3486 on the unexpanded VIC-20 — because the
one-line `Title` that used to forward to `drawTitleScreen()` is gone.
