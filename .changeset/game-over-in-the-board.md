---
"2048": minor
---

Say GAME OVER inside the board, on every target

The end of a game used to be a line of text under the board on the eight
machine skins, and a 28×9 panel laid over the board on the web's Modern
one. Both are gone. Every skin now puts "GAME OVER" in the blank row
between the first and second rows of tiles and how to play again in the row
between the third and fourth — the two rows that were already empty, and
the two rows `drawTile()` never touches, so the message costs the board
nothing and leaves the position the player just lost on in full view.

The prompt names the input the machine actually has: PRESS RETURN TO TRY
AGAIN on a native build, PRESS START on the NES, PRESS ENTER or TOUCH on
the web. It names one input where the title screen names two, because
"PRESS RETURN OR FIRE TO TRY AGAIN" is 33 characters. The VIC-20 drops the
PRESS as well — 25 characters do not fit on 22 columns — and that branch,
like the input branches, folds at build time, so each image carries only
the one string it prints.

`main.8bs` now blanks the screen when a new game starts, the same way
starting the first one does — a gap row is the one part of the screen the
board never repaints, so nothing else would clear the message.

The title screen carries the port's own line — `(C) 2026 8BITSCRIPT` — on
the second-to-last row, above the version. The original game's author and
repository are credited in README.md instead of on screen.

`(` and `)` are not in the portable character set (8BS1026: space, 0-9,
A-Z, a-z and `! , - . : ?`), so the line is printed with spaces where they
go and the two glyphs poked in with `text.putChar` after — the print is
what puts the colour on those cells, and every machine's `putChar` takes
the character in ASCII. `(C)` is what every target can spell: as of 8BitScript
0.7.1 three of the nine — web, NES and the X16 — do have a real © at 169,
but the PET, C64, VIC-20, C128, MEGA65 and Atari 8-bit draw from a
character ROM that has none, so a portable line cannot use it. (Taking the
glyph on the three that have it is a follow-up, not this change.) The NES
is still the exception in the other direction: its font draws both parens
as blank tiles, so it spells COPYRIGHT out, and `#system()` folds so each
image carries one form or the other.

Four redundant inlined 16-bit multiplies came out of `tile.8bs` along the
way — the status row's address, which was written out once in each of the
three HUD branches, and `drawTile`'s per-row `line * ROW` and digit-row
offset, both now walked with a cursor the way the web twin's `fillRows()`
already did. That is what let the unexpanded VIC-20 carry the message at
all: it builds at 3533 bytes against its 3583-byte ceiling, where before
this change it was 3466.

Three more came out of `tile.8bs` to make room for the credits, and they
are worth naming because each was silently costing every target:
`tileWidth()`'s chain of compares on the tile value became a twelve-byte
table indexed by the exponent the caller already had (-68 bytes);
`computeLayout()` assigned a default layout and then overwrote it inside a
folding branch, so the VIC-20 was carrying the wider build's run of spaces
and the stores to go with it (-73); and the status line's three messages
were still padded to 19, the width of the GAME OVER - RESTART that no
longer lives there (-15).
