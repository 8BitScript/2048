---
"2048": minor
---

`ui/Tile.8bx` is a call: `stampTile()` in `lib/petscii.8bs` (screen codes
into the PET's video RAM) and `paintTile()` in `lib/draw.8bs` (reverse-video
fills, block digits or a printed number through `@8bitscript/text`) own the
painting, and the element says which. A function with one caller is
written into it on 0.12.0, so this costs nothing — the form that measured
+56 / +84 bytes on 0.11.0 is byte-identical now. The PET's cells have names
in `lib/petscii.8bs`. Every build is the size it was.
