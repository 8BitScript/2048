# 2048

## 0.8.4

### Patch Changes

- 6b6a877: Bump `@8bitscript/*` and the CI `cli-version` fallback to 0.22.0.

## 0.8.3

### Patch Changes

- deaa1cb: The program entry starts the session and runs a frame. `session.8bs` is start-up and that frame, `play.8bs` is a turn, and `<Game />` returns the board or the title directly. Release sizes are unchanged.

## 0.8.2

### Patch Changes

- 197ad46: 8bitscript 0.20.0: the web's `input.keyboard()`, which the status row's SWIPE TO MOVE reads.
- 197ad46: The status row says SWIPE TO MOVE on a phone or a tablet in the hands, where there are no arrows to press, and SWIPE OR ARROWS everywhere both work — a desktop, a touchscreen laptop, a tablet from the first arrow a plugged-in keyboard sends. `host.keyboard()` in lib/host/ is the question: `Input.KEYBOARD` on the eight machines (a fact, folded — every 6502 build is byte-identical, the 4K PET still 2876), and the web's new `input.keyboard()` on the page. The fixed web replicas, which said nothing at all on a touchscreen because SWIPE OR ARROWS might have been a lie there, now say the same as the fluid grid. Needs the 8bitscript release that carries `input.keyboard()`.

## 0.8.1

### Patch Changes

- c1b96ea: Bump `@8bitscript/*` from 0.15.0 to 0.19.1. The Atari 8-bit's `textmode=gr1` (#71) is 0.16.0's, so CI's compile step had refused the option since that merge; it builds again, as `2048-atari8-gr1-ntsc.xex` (4089 bytes of program). What 0.18.0 changes under the game, measured 2026-09-19 with `8bs build --release` (0.19.1, 2026-09-20, is byte-identical to it on every build): the C64 takes `@8bitscript/c64/text`'s native `print`/`printNumber`/`fill` (a nine-character HUD print 1,908 → 498 cycles) and the reworked, double-buffered raster list, 4500 → 5185 bytes of program (4771 → 5398 German); the MEGA65 3566 → 3581. Every other build is byte-identical — 2876 English / 3056 German on the 4K PET 2001, 2886 on the 4032, 3431 on the unexpanded VIC-20, 3599 on the C128, 4345 on the X16, and the five web builds. The two workflows' `cli-version` fallback moves to 0.19.1 with it.
- 58292d7: The Atari 8-bit build now uses 20-column ANTIC 6 (`textmode=gr1`) so board tiles get per-cell color instead of grey reverse video.
- c1b96ea: `baseline: 'c64'` in `8bitscript.config.ts`: the game is designed on the C64 — the build every fact it tests is true on — and says so where the toolchain can read it. On 8BitScript 0.19.1, `8bs run` alone runs the C64 build and `8bs build --release` prints, after every artifact, which of the facts the game tests that build is short of (`2048-pet.prg: short of the baseline (c64): video.palette 2 of 16, video.raster, input.joysticks 0 of 2, memory.ram 3071 of 51199`). `pnpm start` is plain `8bs run` now — the C64 (`pnpm run start:vic20` for the VIC-20). README: the opening says the C64 is the baseline and the 4K PET the floor, the 22-columns bullet says the VIC-20 is the floor of width rather than "the machine checked first", and a new section carries the release report and the vocabulary — floor, baseline, build; not port, tier or edition. No build's bytes change.
- c1b96ea: The title's wobble reads `raster.STRIDE` — the bytes one raster-list entry takes, 4 on the C64 and 3 on the web, a fact that folds — instead of probing for it at start-up. `<TitleWobble />` no longer writes a trial `setValue` at offset 3 and `wobble.step()` no longer reads the answer back from two bytes of RAM each frame; `examples/fancy` in 8bitscript, whose probe this was, made the same change in 0.18. C64: 5185 → 5122 bytes of program and 94 → 92 of RAM; the web's C64 skin 109 → 107 of RAM; the 4K PET and the VIC-20, which never link the wobble, byte-identical. Checked on screen: `8bs run c64 --screenshot --frames 1200` and `1203` show the band, the yellow border, and "2048" sheared at the two-scanline pitch in two different phases; the web's C64 skin at `--frames 300` and `303` the same.

## 0.8.0

### Minor Changes

- d508d1c: German and English builds use `@8bitscript/i18n/catalog`: namespaced catalogs in `src/i18n/en.8bs` and `src/i18n/de.8bs`, with `i18n.format` for control labels and `number.print` for grouped scores (the unexpanded VIC-20 keeps a zero-padded field). One locale, one binary. Measured 2026-09-18: 2876 bytes English / 3056 German on the 4K PET 2001; 3431 on the unexpanded VIC-20 in both locales; 4500 / 4771 on the C64.

### Patch Changes

- 40a5113: Bump `@8bitscript/*` dependencies from 0.14.0 to 0.15.0. That release is what actually lands the `@lib`/`@ui` import aliases, the `@8bitscript/i18n/catalog` and `./messages` exports, and the `Game.NAME.length`-style chained member expression this project's code already assumed — 0.14.0 predated all three, which is why `pnpm run check` and CI's compile step were failing on both this branch and trunk.
- 40a5113: Use `@lib` and `@ui` import aliases from `8bitscript.config.ts` instead of relative `../../lib` paths in UI modules.

## 0.7.0

### Minor Changes

- 7455259: Structure under `ui/` and `lib/`, and the PET prints through `@8bitscript/text` like every other machine.
  
  `ui/Game.8bx` is the root (was `App.8bx`), `ui/board/` is the game (`Board`, `Tiles`, `Tile`, `ScoreBar`, `GameOver`) and `ui/title/` the front door; `lib/` is grouped by what it is — `game/`, `layout/`, `draw/`, `text/`, `host/`, `raster/`. Byte-identical on every target (checksummed on the PET and VIC-20).
  
  No element names a machine any more. Every `#system() == System.PET` arm — eight switches in eight files that wrote hand-baked screen codes into video RAM (`lib/petscii.8bs`, `lib/codes.8bs`, `codes.de.8bs`) — is gone; the PET prints `lib/text/strings.8bs` through `@8bitscript/text`, and what it keeps is its look, as two twins in `lib/`: `layout/layout.pet.8bs` (the 8×5 block-digit arrangement, both widths) and `draw/tile.pet.8bs` (the tile stamped into video RAM, because `text.putChar`'s ASCII contract cannot carry two of the quadrant-block glyph codes). Measured: 2876 bytes on the 4K PET 2001 (2779 before; the arms bought 97 bytes; the German build is 2877), 2886 on the 4032, 2905 on the 8032 (2970 before), and every other target byte-identical. A 3032/4032 now exits to a lower-case `ready.`, as `@8bitscript/pet/text` documents.

## 0.6.0

### Minor Changes

- 4a70539: One element, every machine that draws through `@8bitscript/text`. The
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
- 45f96c4: Where the random numbers come from is the platform's decision now:
  `@8bitscript/random/entropy` (8bitscript 0.12.0) is one import that the
  compiler resolves to SID voice 3 on the C64, POKEY's counter on the Atari
  8-bit, and the seeded generator on the other seven. The game's own
  `rng.8bs` and its two machine twins go. Every build is byte-for-byte the
  size it was: 2687 on the 4K PET 2001, 3396 on the unexpanded VIC-20, and
  the C64 and Atari still link the register read and not the generator.
- 60552de: No element has a machine twin. The PET's eight `*.pet.8bx` files — the
  screen codes it writes straight into video RAM — are each an arm of the
  one element now, behind `#system() == System.PET`, over `lib/petscii.8bs`
  (its positions, its tables, its primitives; not a twin, so every machine
  can name it and the arm folds away on the eight that are not a PET).
  Measured one element at a time on the 4K PET 2001: every one at exactly
  the bytes its twin cost, 2759 before and after, and 6 bytes less RAM.
  `src/ui/` is ten files, one per element; the twins left in `src/lib/`
  are the PET's font, the web's PET replica, the web's host, and the
  hardware random numbers.
- f5b3d8a: `ui/Tile.8bx` is a call: `stampTile()` in `lib/petscii.8bs` (screen codes
  into the PET's video RAM) and `paintTile()` in `lib/draw.8bs` (reverse-video
  fills, block digits or a printed number through `@8bitscript/text`) own the
  painting, and the element says which. A function with one caller is
  written into it on 0.12.0, so this costs nothing — the form that measured
  +56 / +84 bytes on 0.11.0 is byte-identical now. The PET's cells have names
  in `lib/petscii.8bs`. Every build is the size it was.
- a91e8cf: Every line the game prints is in `lib/strings.8bs`, and `strings.de.8bs`
  beside it is the German one: `8bs build --locale de` (or the release's
  `{ locale: 'de' }` entries, for the web and the 4K PET) builds a German
  game, and with no locale named no locale's file is read. The PET's lines
  are baked screen codes in `lib/codes.8bs` and `codes.de.8bs`. The elements
  read the strings and their `.length`, so the centring moves with the words.
  The score header is two prints instead of a template, which is 14 bytes
  smaller on every 6502 but the PET (unchanged at 2687); the VIC-20 is 3382.
  The version line is not yet a string here — it waits on 8bitscript 0.13.0's
  `#package("version")`.
- d7bd0df: The source is now two directories under the program: `src/ui/` holds the
  `.8bx` — what is on the screen, one element per file, starting with
  `App.8bx` (the root that was `Screen.8bx`) — and `src/lib/` holds the
  `.8bs` underneath it: the rules (`game.8bs`), the skins (`tile.8bs` and
  its machine twins) and the random numbers (`rng.8bs` and its twins).
  `src/2048.8bs` stays the program. Nothing moved but files: every one of
  the thirteen release builds is the same size it was — 2763 bytes on the 4K
  PET 2001, 3490 on the unexpanded VIC-20.
- c8acf79: The score bar and the end of the game are elements: `ui/ScoreBar.8bx` is
  the name, the score and the status line; `ui/GameOver.8bx` is GAME OVER
  and how to try again, and the board composes it only when the game has
  ended — `{over && <GameOver />}`. `drawHud()` leaves every skin. The
  PET and the fluid web host keep their own of each. Every native build is
  the size it was — 2763 bytes on the 4K PET 2001, 3490 on the unexpanded
  VIC-20.
- d6ea161: A tile is an element: `src/ui/Tile.8bx` is the filled square and the
  value on it, and `<Tile row={…} col={…} exponent={…} />` is how the board
  places sixteen of them. The element owns the painting; `lib/tile.8bs` and
  its twins own the layout and the tables it paints from. The PET and the
  fluid web host paint a tile differently enough to have their own
  (`Tile.pet.8bx`, `Tile.web.8bx`). Every native build is the size it was —
  2763 bytes on the 4K PET 2001, 3490 on the unexpanded VIC-20.
- 1739019: The title screen is composition: `ui/TitleScreen.8bx` is a `<Logo />`, a
  `<StartMessage />` that names this machine's controls, the
  `<Copyright />`, the `<Version />` and — on the real C64 and the web's C64
  skin — a `<TitleWobble />`, the raster band and wobble behind the name,
  whose sine table and per-frame step now live once in `lib/wobble.8bs`
  instead of twice. `drawTitleScreen()` and `wobbleTitle()` leave every
  skin. Every native build is four bytes smaller than before — 2759 bytes
  on the 4K PET 2001, 3486 on the unexpanded VIC-20 — because the
  one-line `Title` that used to forward to `drawTitleScreen()` is gone.
- f4f6713: The web's C64 and VIC-20 replicas read `lib/layout.8bs` — the machine's
  own layout, at the replica's columns — instead of a twin each of baked
  cell numbers. The C64's picture is named by its facts (40 columns, sixteen
  colours, a raster) rather than by `#system()`, which is what lets the web
  replica take the C64's arm; the title screen's raster band comes with it.
  Both replicas replay frame for frame. Nine native builds unchanged.

### Patch Changes

- fb2a474: The title screen's version is `package.json`'s, read at compile time by
  `#package("version")` — one number in one place, where it used to be
  three (the PET's baked table said V0.1.4, `version.8bs` said v0.2.0, and
  the package was at 0.5.0). The text machines print a `v` and the number;
  the PET stamps a baked V and copies the number's bytes straight into
  video RAM, since a digit and a `.` are the same code in ASCII and in both
  of its character sets. 4K PET 2001 2687 → 2779, VIC-20 3382 → 3415.

## 0.5.0

### Minor Changes

- dc70e1a: What goes on the screen is now composition: `src/Screen.8bx` — `<Title />`,
  or a `<Board />` that is the HUD over sixteen `<Tiles />` — written as 8BX
  elements over the drawing calls `tile.8bs` and its twins provide. The
  rules and the board move to `src/game.8bs`; `src/2048.8bs` is the program
  that drives both. The same functions at the same sizes on every target —
  2763 bytes on the 4K PET 2001 and 3490 on the unexpanded VIC-20, as before
  — and 60 bytes less on every build that animates. Needs `@8bitscript/cli`
  0.11.0.

## 0.4.0

### Minor Changes

- cad9b55: The web target's board and HUD now lay themselves out from the live grid (`text.columns()`/`text.rows()`) instead of a layout frozen for a fixed 48×27, and react to `screen.resized()` by recomputing and redrawing — so resizing the browser window or rotating a phone reflows the board instead of leaving it stuck at its start-up shape. The nine machine builds are byte-for-byte unchanged: the new code is gated behind a build-time `screen.RESIZABLE` check that folds away everywhere except the web target's resizable "Modern" host.
  
  Two arrangements: a WIDE one (48+ live columns) keeps the original 8×5 block-digit tile and side-margin HUD; a NARROW one (below that) stacks the title and score in a header row above the board and a move hint ("SWIPE OR ARROWS" — this target's move hint now names both input methods instead of picking one from touch detection) in a status row below it, because a narrow window has rows to spare rather than margin columns.
  
  Neither arrangement's tile size is fixed any more — computeLayout() picks tileW and tileH independently, each the biggest that fits four of it plus gaps on its own axis, plus whatever that arrangement's HUD needs there. tileW is uncapped against tileH (a tile wider than tall, like WIDE's own 8×5, reads as an ordinary landscape tile — NARROW's row axis is almost always the tighter one anyway, so it's column room, not row room, that a bigger tile should spend); tileH is capped at 1.5x tileW so a genuine phone portrait's generous row budget doesn't turn the tile into a tall obelisk. A portrait phone, a near-square window, and an ultrawide monitor each get a board sized for their own shape rather than one of two hand-picked sizes; the score's right edge also now aligns with the board's own right edge instead of the screen's. computeLayout() also always reserves enough that the NARROW arrangement's header and status rows keep at least one blank row of padding above and below rather than sometimes landing flush against the screen edge. The title screen's copyright line is dropped in the NARROW arrangement, where there isn't room for it next to the version line without the two crowding each other.
  
  The chunky block-digit font — previously only in the WIDE arrangement — now draws in NARROW too whenever its tile reaches 8 cells wide (the font's own minimum: 2 cells per digit, 4 digits for "2048"), which most non-portrait NARROW shapes do (4:3, a phone in landscape, most windows that aren't a true portrait phone). Only where the live grid is too narrow for an 8-wide tile does a tile fall back to the plain printed digit NARROW always used before.
  
  Known remaining gap: an extreme letterbox window (roughly 18–24 live rows while still narrow enough for the NARROW arrangement — a very short, wide browser window, not a phone rotation) can still lose the padding guarantee, because the tile's 4-character minimum width takes priority over it at that size. Bounds-safe either way; just not padded.

## 0.3.0

### Minor Changes

- 4b9073e: The title screen wobbles on the C64 — the real one and the web's `c64`
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

## 0.2.2

### Patch Changes

- 8ac88aa: Upgrades every `@8bitscript/*` dependency (and the `8bs` toolchain) from 0.7.1 to 0.9.0. Every target (`vic20`, `c64`, `pet`, `c128`, `atari8`, `nes`, `cx16`, `mega65`, `web`) still checks and builds clean — the packages this game depends on had no changes between 0.7.1 and 0.9.0 beyond the lockstep version bump itself.

## 0.2.1

### Patch Changes

- e7b1a7f: `pnpm run check` pointed at `src/main.8bs`, which the entry-filename rename left nonexistent — it now checks `src/2048.8bs`, matching `8bitscript.config.ts`'s own `entry`. README.md, `8bitscript.config.ts`'s header comment, and the same filename mentioned in `rng.8bs`/`tile.8bs`'s own comments follow. `.gitignore` also picks up `.8bitscript/`, the clone-local systems/checkout-pointer directory a local `--checkout` writes.

## 0.2.0

### Minor Changes

- 61e4908: Say GAME OVER inside the board, on every target
  
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
- 982694f: A web player built for the device most people will open it on.
  
  **The page.** The screen is laid out in flow and sized from the smallest of
  `window.innerHeight`, `documentElement.clientHeight` and
  `visualViewport.height`. Three earlier attempts at this clipped the top of the
  board on an iPhone in landscape, every one of them because the container
  believed it was taller than the screen — so it now takes the measure that
  cannot be too big, and `viewport-fit=cover` and `status-bar-style=black-translucent`
  are gone, since both exist to let a page draw *underneath* the system UI.
  
  **The controls.** The 49px bar across the top is a handle in the corner that
  expands and gets out of the way — a phone in landscape has no vertical pixels
  to give away, and the top strip is where the browser puts its own chrome. It
  lives outside the screen element, because the loader paints over everything
  inside it. The systems are Modern and Commodore, and Model is a Commodore
  idea, so it only appears there.
  
  **The board.** Tiles are 8×5 with the HUD in the side margins, each keeping a
  clear column against the board. Numbers centre exactly down the tile, and as
  near across as a whole-cell grid allows: a digit is 3 half-cells of ink on a 4
  half-cell pitch, so a run of them is an odd width inside an even tile and lands
  2px from centre either way, with nothing in between.
  
  **Game over** is a panel in the middle of the board rather than a line of text
  at the bottom — a red frame around a white card, because an empty cell is also
  a white block and a plain white panel has no edge you can see — and the screen
  border turns red underneath it. On a touch host it says TAP TO CONTINUE.
  
  Also: the status line always prints. The branch that printed nothing is what
  stranded "YOU MADE 2048" on screen across a restart.

### Patch Changes

- 61e4908: Build against 8BitScript 0.7.1.
  
  Dependencies move 0.6.2 -> 0.7.1, two releases at once; the reusable
  compile workflow is repinned from v0.6.2's commit to v0.7.1's in both
  `ci.yml` and `release.yml`; and `pnpm-workspace.yaml`'s
  `minimumReleaseAgeExclude` gains 0.7.1 for each package so a freshly
  published version installs.
  
  0.7.1 is what the tile and GAME OVER work in this same release is built on:
  portable `text.fill(cell, count, code)` arrived in 0.7.0 and only the X16
  had it before, so `drawTile` could not fill a run of cells on the other
  eight targets without a string literal the unexpanded VIC-20 cannot carry.
  
  What else comes with it, measured on this game rather than quoted:
  
  - **0.7.0** gave the web target a Modern grid that follows the window
    (`text.columns()` / `screen.RESIZABLE`), and `text.fill()`.
  - **0.7.1** narrows 16-bit values to 8 bits by reading only the byte that
    survives, which is pure profit here — every 6502 target gets smaller with
    no source change. It also fixes the X16's `locate()` past row 32 (this
    game's "ARROWS TO MOVE" printed as "AR" at the right edge and "ROWS TO
    MOVE" at the left), reverse video taking its paper from the wrong port
    (the '2' tile printed cyan on white), and gives the X16 a keyboard and
    SNES pads at last — the title screen could not be left on that machine.
  
  Program sizes on 0.7.1, every target built (with #31's hardware RNG merged in):
  
  | target | bytes | ceiling |
  | --- | --- | --- |
  | PET 2001, stock 4K | **2763** | ~3071 usable |
  | PET 4032, 32K | 2853 | — |
  | VIC-20, unexpanded | **3490** | 3583 |
  | C64 | 3811 | — |
  | C128 | 3748 | — |
  | MEGA65 | 3723 | — |
  | Atari 8-bit | 3780 | — |
  | Commander X16 | 4493 | — |
  | NES | 40976 | fixed ROM |
  | web | 349 bytes of constant data | — |
  
  The unexpanded VIC-20 is the tight one and it gained room: 3490 against its
  3583 ceiling, 93 bytes of headroom, where the same source measured 3533 on
  0.6.2's codegen. The stock 4K 2001 has 308 bytes spare.
- 61e4908: Commander X16 tiles fill the 76×56 grid, at 12×8 instead of 5×3.
  
  The portable five-wide tile is a postage stamp on that screen. 12×8 is
  2× the C64's 6×4 (same 3:2 cell aspect). `drawTile` fills with
  `text.fill` so the width is not a string literal the unexpanded VIC-20
  would have to carry.
- ec95b28: The C64 and the Atari 8-bit take their randomness out of silicon.
  
  Two of the nine targets can hand a program entropy directly: SID voice 3's
  noise oscillator on the C64 (`$D41B`) and POKEY's counter on the Atari 8-bit
  (`$D20A`). Both turn out to be **smaller** than computing the numbers —
  reading a register costs less than a 16-bit multiply-and-add plus the two
  bytes of state it steps — which is the only argument for reading hardware
  inside game logic rather than once at start-up.
  
  Measured against 0.6.2: the C64 goes 3884 to **3844** bytes (−40, and −2 of
  RAM) and the Atari 8-bit 3828 to **3758** (−70, −2). The other seven targets
  are byte-identical. The Atari saves more because POKEY's counter is already
  running, where SID needs four register writes before voice 3 makes noise at
  all. The 4K PET 2001 — the only build with a real size budget — is unchanged
  and has no entropy source anyway.
  
  `rng.8bs` is the one place that picks, with `rng.c64.8bs` and
  `rng.atari8.8bs` as its per-machine twins, resolved the same way
  `tile.pet.8bs` already is; `main.8bs` names none of them. One measured trap
  is recorded in `rng.8bs`'s header: writing the wrapper's `range()` as
  `random.range(bound)` rather than `random.next() % bound` costs 8 bytes on
  every one of the seven software targets, because the forwarding call does
  not inline away. Implementing the body directly is what makes the
  abstraction free.
  
  `rng.begin()` is `main()`'s first statement: on the C64 it claims voice 3 and
  writes `$D418` as a whole known byte, and the SID's low registers are
  write-only so it cannot read back what was there. A 2048 that ever grows
  sound has to revisit that file, not merely add notes.
  
  (Recorded after the fact: the change landed in #31 without a changeset, so
  without this the release notes would omit it.)
- 1029fc9: The title screen says TOUCH TO START on a touchscreen — and now actually
  manages to.
  
  The wording is TOUCH rather than TAP, on all four web skins, and the game-over
  panel says TOUCH TO CONTINUE to match. Each is centred for its own length,
  since these layouts print at an absolute cell and the new string is two
  characters longer.
  
  The prompt was also drawn too early to be right. `main()` drew the title
  before its first `waitFrame()`, but on the web the page writes its status byte
  — the bit that says "this is a touchscreen" — when the worker hands it the
  program's memory, which is the same moment the program starts running. That is
  a race, and losing it puts PRESS ENTER on a phone. The title is now drawn
  after one frame has passed, which is the program's own way of letting the host
  get a word in.
  
  Native targets already chose their own wording from build-time facts and are
  unchanged: PRESS START where there is a pad and no keyboard (the NES), PRESS
  RETURN OR START where there is both, PRESS FIRE for a joystick, PRESS RETURN
  otherwise.

## 0.1.4

### Patch Changes

- a0b4c03: C64 tiles are 6×4 cells (a 27×19 board) instead of 5×3.
  
  `computeLayout` and `drawTile` take a per-build tile height, so the VIC-20 and everyone else keep their existing sizes. Four 6×4 tiles plus gaps still leave the header, status row, and margins on a 40×25 C64 screen.
- a0b4c03: The HUD puts **2048** on the left and **SCORE** with the padded value on the right.
- a0b4c03: Build against 8BitScript 0.6.2.
  
  Dependencies move 0.6.1 -> 0.6.2, and the reusable compile workflow is repinned from v0.6.1's commit to v0.6.2's.
  
  0.6.2 is the web-skins release: the default wasm grid is 48×27 (16:9), and `--hardware machine=<c64|pet-2001|vic20>` compiles a skin. This game's `targets.web.release` now builds all four, and `site/index.html` is a picker that loads the matching `program-*.wasm`.
  
  The 4K 2001 is **2581 bytes** (2420 at 0.6.1, before the title screen and HUD work on this same release) — still inside a stock 4K 2001's ~3071 usable, 490 bytes of headroom under `$0FFF`. Measured with the published 0.6.2 packages, not the workspace.
- a0b4c03: The web site picks a look: 16:9, or a PET 2001 / C64 / VIC-20 skin.
  
  Each skin is its own wasm (`program.wasm` plus `program-c64.wasm`, `program-pet-2001.wasm`, `program-vic20.wasm`), compiled against 8BitScript 0.6.2's `machine=` hardware. `site/index.html` swaps which file `EightBitScript.mount` loads. Tile geometry lives in `tile.web.<tag>.8bs` beside `tile.web.8bs`, the same system-specific-file rule the PET twin already used.

## 0.1.3

### Patch Changes

- d2704cd: Build against 8BitScript 0.6.1.
  
  Dependencies move 0.5.0 -> 0.6.1, and the reusable compile workflow is repinned from v0.5.0's commit to v0.6.1's.
  
  What that release does to this game is almost entirely one change: the linker stopped inlining a parameterless void body at every call site. `@8bitscript/input`'s `poll()` is 182 bytes on the PET, and this game reaches it from four places — once from `begin()` and once per direction read — so it was carrying four copies. Every target it builds for gets smaller:
  
  | target | 0.5.0 | 0.6.1 | saved |
  | --- | --- | --- | --- |
  | PET 2001 (4K) | 2448 | 2420 | 28 |
  | PET 4032 (32K) | 2744 | 2510 | 234 |
  | VIC-20 | 3388 | 3123 | 265 |
  | C64 | 4018 | 3477 | 541 |
  | C128 | 3849 | 3318 | 531 |
  | Atari 8-bit | 4206 | 3488 | 718 |
  | Commander X16 | 4404 | 3907 | 497 |
  | MEGA65 | 3869 | 3382 | 487 |
  | web (wasm) | 3891 | 2745 | 1146 |
  | NES | 40976 | 40976 | 0 |
  
  The PET figures are against what v0.1.2 actually shipped; the rest are against a 0.6.0 build, since those targets were parked when v0.1.2 was cut. The NES cannot move: a `.nes` is 16 + 32768 PRG + 8192 CHR whichever program is inside it.
  
  The 4K 2001 is the build that had to be fitted, and it is now **2420 bytes** — below the 2440 it was originally trimmed to, with 651 bytes of headroom under `$0FFF` rather than 447. Measured under `xpet`: the board draws and plays.

## 0.1.2

### Patch Changes

- 2360cbe: Built against 8BitScript 0.5.0 (from 0.4.0, and a lockfile that was still resolving 0.2.5).
  
  Two things in that release reach this game. The PET's text package no longer selects a character set — it draws for whichever set the model booted into — which is what this project's own `tile.pet.8bs` was already doing by hand, so the HUD and the baked screen-code font agree with the toolchain now instead of working around it. And because `tile.pet.8bs` does still write `$E84C` itself, the new `restoreOnExit` gives the machine its character set back on exit: eight bytes, taking the stock 4K 2001 build from 2440 to 2448 of its ~3071 usable.
  
  The reusable release workflow is repinned to v0.5.0, which is what fixes the release asset listing: the web bundle's internals (`index.html`, `worker.js`, `_headers`, and a `program.wasm` that was a byte-for-byte duplicate of `main.wasm`) were each being attached as loose downloads. A release now lists the two `.prg` files and one `web-bundle.zip`.
  
  Verified on a stock 4K 2001 and the default 4032: board, HUD and tile font all render as before, and the machine is left in the character set it booted in.

## 0.1.1

### Patch Changes

- 323cc46: GitHub Releases now tag automatically once the bot-maintained "Version Packages" PR merges, and attach two PET `.prg` builds — a stock 4K 2001 and the existing 32K 4032 — alongside the web `.wasm`, built from a matrix declared in `8bitscript.config.ts` (`targets.pet.release`) instead of duplicated into CI.
  
  Requires 8BitScript/8bitscript v0.4.0 (`@8bitscript/cli` and friends bumped accordingly) for `8bs build --release` and the renamed `8bitscript.config.ts`.
- 25cd227: Set up [changesets](https://github.com/changesets/changesets) to version and changelog this game's own releases, the same way [8BitScript](https://github.com/8BitScript/8bitscript) already versions the toolchain: a changeset per PR, a bot-maintained "Version Packages" PR collecting them, and merging it is the release button.
  
  The GitHub Release workflow itself — the tag it fires from, and building a PET 4K variant alongside the 32K one — lands in a follow-up PR once 8BitScript/8bitscript ships the `8bs build --release` and multi-artifact support this depends on.
