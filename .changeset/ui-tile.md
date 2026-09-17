---
"2048": minor
---

A tile is an element: `src/ui/Tile.8bx` is the filled square and the
value on it, and `<Tile row={…} col={…} exponent={…} />` is how the board
places sixteen of them. The element owns the painting; `lib/tile.8bs` and
its twins own the layout and the tables it paints from. The PET and the
fluid web host paint a tile differently enough to have their own
(`Tile.pet.8bx`, `Tile.web.8bx`). Every native build is the size it was —
2763 bytes on the 4K PET 2001, 3490 on the unexpanded VIC-20.
