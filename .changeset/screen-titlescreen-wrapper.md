---
"2048": patch
---

`Screen.8bx`'s `Title` now composes a `<TitleScreen />` element instead of
calling `drawTitleScreen()` directly — a parameterless forwarding wrapper,
free since 8bitscript #175's inliner fix (the same fix that made `Screen.8bx`
itself byte-neutral). Measured identical: PET 2001 2763 bytes, VIC-20
unexpanded 3490 bytes, NES 40976 bytes.

`drawTile()` and `drawHud()` stay plain calls, not `<Tile row col exponent />`
/ `<Hud .../>` elements: wrapping either the same way costs **+36 bytes** on
both the PET 2001 and the VIC-20 unexpanded (measured directly, then
reverted) — a component wrapper around a call with *run-time* props isn't
free yet, unlike the parameterless case #175 fixed. See the PR body for the
compiler-side gap this points at.
