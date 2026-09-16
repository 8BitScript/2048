---
"2048": minor
---

The presentation layer (`drawTile`, `drawHud`, `drawTitleScreen`,
`wobbleTitle`, `computeLayout`) now routes through 8BX components in
`2048.8bx` (`2048.pet.8bx` on the PET) instead of `2048.8bs` calling
`tile.8bs`/`tile.pet.8bs` directly — `<Tile row={row} col={col}
exponent={exponent} />` and friends elaborate to the same calls at
compile time. Game logic in `2048.8bs` is unchanged.

The web's three fixed machine skins (`tile.web.c64.8bs`,
`tile.web.pet-2001.8bs`, `tile.web.vic20.8bs`) are consolidated into one
`tile.web.skins.8bs`, selected by `#fact(video.columns)` inside
`tile.web.8bs` rather than by which file the build picks up; the
resizable "Modern" web host is unaffected.

`rng.8bs` absorbs its two hardware twins (`rng.c64.8bs`, `rng.atari8.8bs`)
into one file gated by `#system()`, rather than a per-machine file split.

Measured on the stock 4K PET 2001: 55 bytes of RAM, 2816 bytes of
program — up from 2763 bytes on this same trunk before this change (and
from the stale 2440-byte figure the README previously cited), the cost of
routing five draw calls through 8BX component wrappers. Not yet
byte-identical to a hand-written call the way the compiler's own
`hello-bx` example is; worth another look once the elaboration pass gets
more mileage.

**Depends on an unreleased 8bitscript compiler.** `check`/`build` need
`@8bitscript/cli` from 8BitScript/8bitscript#158 (8BX support) — the
published `0.10.2` cannot parse `.8bx`. This PR stays a draft until that
lands and this package's pinned version is bumped.
