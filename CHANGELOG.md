# 2048

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
