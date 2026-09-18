---
"2048": minor
---

Structure under `ui/` and `lib/`, and the PET prints through `@8bitscript/text` like every other machine.

`ui/Game.8bx` is the root (was `App.8bx`), `ui/board/` is the game (`Board`, `Tiles`, `Tile`, `ScoreBar`, `GameOver`) and `ui/title/` the front door; `lib/` is grouped by what it is — `game/`, `layout/`, `draw/`, `text/`, `host/`, `raster/`. Byte-identical on every target (checksummed on the PET and VIC-20).

No element names a machine any more. Every `#system() == System.PET` arm — eight switches in eight files that wrote hand-baked screen codes into video RAM (`lib/petscii.8bs`, `lib/codes.8bs`, `codes.de.8bs`) — is gone; the PET prints `lib/text/strings.8bs` through `@8bitscript/text`, and what it keeps is its look, as two twins in `lib/`: `layout/layout.pet.8bs` (the 8×5 block-digit arrangement, both widths) and `draw/tile.pet.8bs` (the tile stamped into video RAM, because `text.putChar`'s ASCII contract cannot carry two of the quadrant-block glyph codes). Measured: 2876 bytes on the 4K PET 2001 (2779 before; the arms bought 97 bytes; the German build is 2877), 2886 on the 4032, 2905 on the 8032 (2970 before), and every other target byte-identical. A 3032/4032 now exits to a lower-case `ready.`, as `@8bitscript/pet/text` documents.
