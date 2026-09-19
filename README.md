# 2048

[![CI](https://github.com/8BitScript/2048/actions/workflows/ci.yml/badge.svg)](https://github.com/8BitScript/2048/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/8BitScript/2048?label=release)](https://github.com/8BitScript/2048/releases)

[2048](https://github.com/gabrielecirulli/2048) (MIT, Gabriele Cirulli), written
from scratch in [8BitScript](https://github.com/8BitScript/8bitscript) — one
program, running on the VIC-20, C64, PET, C128, Atari 8-bit, NES, Commander
X16, MEGA65, *and* the web, the way 8BitScript's own `examples/borders` and
`examples/menubar` do. [`src/2048.8bs`](src/2048.8bs) is the program (the
loop that reads the player); [`src/ui/`](src/ui) is what goes on the screen,
as [8BX](https://github.com/8BitScript/8bitscript/blob/trunk/docs/project/8bx.md)
elements — `Game.8bx` is the root, `ui/board/` the game and `ui/title/`
the front door, one file per element; and [`src/lib/`](src/lib) is the
`.8bs` underneath, by what it is: `lib/game/` the rules and the board,
`lib/layout/` where everything goes, `lib/draw/` how a tile is painted
and the tables it is painted from, `lib/text/` the version, `src/i18n/` every line the game
prints, `lib/host/` what the machine is like, and
`lib/raster/` the title's wobble. No element names a machine: what
differs between builds is a fact the element tests, or a machine twin
in `lib/` that the build picks by filename. There are five twins — the
PET's layout, the PET's tile and its font, the web's PET replica, and
the web's host — and they live in `lib/` and nowhere else. Where the
random numbers come from is the platform's choice, not the game's — see
below.

```
2048  SCORE 00042
--------------------
   2    4
        8   2
  16
   2    2    4
--------------------
ARROWS TO MOVE
```

## Credits

2048 is **[Gabriele Cirulli](https://github.com/gabrielecirulli)**'s game, and
the original lives at
[github.com/gabrielecirulli/2048](https://github.com/gabrielecirulli/2048)
(MIT). This repository is an independent port written from scratch in
8BitScript — the rules are Cirulli's, none of the code is. It is not
affiliated with or endorsed by the original author.

The port is copyright (c) 2026 8BitScript contributors, MIT-licensed; see
[LICENSE](LICENSE). The title screen carries that line; the attribution above
is deliberately here rather than on a 22-column screen.

Play it in a browser at [2048.8bitscript.com](https://2048.8bitscript.com)
(swipe on a phone, arrows on a keyboard). The site's picker loads a
separate wasm per look — the default 16:9 host, or a PET 2001 / C64 /
VIC-20 skin. GitHub Releases attach the
compiled PET `.prg` — a stock 4K 2001 and a roomier 32K build — and the
web `.wasm`. VIC-20, C64, C128, Atari 8-bit, NES, Commander X16, and
MEGA65 binaries return once 8BitScript's own backends for those machines
do (`RELEASE_MACHINES` in [8bitscript](https://github.com/8BitScript/8bitscript)'s
compiler); the source already targets all of them, so nothing about this
game's own code needs to change when they land.

## Playing it

Arrow keys, a swipe on the web build, or a joystick/pad slide every tile as
far as it goes; two equal tiles that collide combine into one tile worth
their sum. A new tile appears after every move that actually changed the
board — a 2 nine times in ten, a 4 the tenth. The game ends when no move
would change anything; **confirm** (RETURN on the Commodores, fire on a
joystick/pad, tap on the web) starts a new game once it has.

## Building it

```bash
pnpm install
pnpm exec 8bs doctor
```

Then, from this directory:

| Command | Machine |
| --- | --- |
| `pnpm start` | VIC-20 (NTSC) |
| `pnpm run start:c64` | C64 |
| `pnpm run start:pet` | PET (a 32K 4032 by default; `--profile 2001 --hardware ram=4` for a stock 4K 2001 — the game is 2876 bytes of program, inside that machine's ~3K of usable RAM; `--profile 8032` for 80 columns) |
| `pnpm run start:c128` | C128 |
| `pnpm run start:atari8` | Atari 8-bit |
| `pnpm run start:nes` | NES |
| `pnpm run start:cx16` | Commander X16 |
| `pnpm run start:mega65` | MEGA65 |
| `pnpm run start:web` | Web (see below) |

`pnpm run build:vic20` (and its `:c64`, `:pet`, … variants) compiles
without opening an emulator; `pnpm run check` runs the compiler's
diagnostics alone. Plain `pnpm run build` targets `web` specifically —
that's what Cloudflare Workers Builds runs to deploy
[2048.8bitscript.com](https://2048.8bitscript.com), and a 6502 target
needs `LLVM_MOS_HOME`, which that build image doesn't have.

`pnpm run start:web` is playable in the browser: arrows or swipe slide
tiles, Enter or a tap starts a new game once it is over. A touch host
hides the arrows tutorial so the board keeps that row. `pnpm run build:web`
emits `program.wasm` plus `program-c64.wasm`, `program-pet-2001.wasm` and
`program-vic20.wasm` into `dist/web/`, then copies `site/index.html` (the
machine picker) over the generated shell. `pnpm run deploy:web`
builds that directory and deploys it to [2048.8bitscript.com](https://2048.8bitscript.com)
once the `8bitscript.com` zone is in Cloudflare and `CLOUDFLARE_API_TOKEN` is
set. Every other target reads a real keyboard, joystick, or pad the same way.

Every line the game prints is in [`src/i18n/en.8bs`](src/i18n/en.8bs)
and [`src/i18n/de.8bs`](src/i18n/de.8bs), imported as
`@8bitscript/i18n/catalog`. `pnpm run start:de` or
`pnpm exec 8bs build --target vic20 --locale de` (or `8bs run c64 --locale
de`) builds a German game, `dist/2048-vic20-de-ntsc.prg` beside the English
one, and the release ships the German web build and the German 4K PET. A
locale is a build input, not a menu — a 4K PET has no room for a switch —
and with no locale named the English catalog is the default. Scores use [`@8bitscript/i18n`](../8bitscript/packages/i18n)'s
`number.print` on every target that has the bytes so thousands grouping
follows the build (`12.345` in German); the unexpanded VIC-20 keeps a
zero-padded field like English — there is no room for the routine. The PET
prints the same strings through
`@8bitscript/text` as every other machine (until 0.7.0 its lines were
baked screen codes in a `codes.8bs` of their own, and a second table for
the German build — see "the PET is the same program" below). The
version is `package.json`'s, read at compile time by
`#package("version")` (`src/lib/text/version.8bs`), and the title
screen prints a `v` and then the number.

## How it's built

- **The board is sixteen exponents, not sixteen numbers.** `board[i]` is 0
  for empty or *N* for the tile worth 2<sup>N</sup> (1 = 2, 2 = 4, … 11 =
  2048) — one byte instead of two, and "two equal tiles merge" becomes "two
  equal exponents merge into exponent + 1," one add instead of a double and
  a compare. `POW2[]` in `lib/game/rules.8bs` is the rules' own
  2<sup>N</sup> table (score); `lib/draw/palette.8bs` has a second copy
  for drawing, and the PET never links either drawing copy.
- **One board move is the same four-row (or column) slide.** `moveLines`
  walks a direction as start / step / stride — wrapping `utinyint` add
  so right is step 255 (−1) and down is step 252 (−4) — into a shared
  scratch row; compress, merge, compress again is the entire algorithm,
  and it is the one place a bug would live.
- **On machines with RAM to spare, the slide is animated.** Builds with
  at least 4K for the program (`Memory.RAM` is a compile-time fact, so
  the branch folds away everywhere else) play a move one board cell per
  frame instead of all at once: every tile that can advance does — into
  an empty neighbour, or merging onto an equal tile that hasn't merged
  this move — the changed tiles repaint, and the next step follows a
  frame later (`ANIM_STEP_FRAMES` in `2048.8bs` is the knob). A
  full-width slide lands in 3 steps, ~50–100ms at 60/50Hz, and settles
  on exactly the board the instant mover computes — checked exhaustively
  over all 20,736 line states. The 4K PET 2001, the unexpanded VIC-20,
  and the NES keep their instant moves and their exact byte counts.
- **Randomness is the machine's own, on the two machines that have one.**
  Two of the nine can hand a program entropy straight out of silicon: the
  C64's SID voice-3 noise oscillator (`@8bitscript/c64/random`) and the
  Atari 8-bit's POKEY counter (`@8bitscript/atari8/random`). Both are
  *smaller* than computing the numbers — reading a register costs less than
  a 16-bit multiply-and-add plus the two bytes of state it steps — which is
  the whole reason those two builds use them. Against 0.6.2: 3844 bytes of
  program where the software generator needs 3884 on the C64, and 3758
  against 3828 on the Atari, which needs no set-up write at all and so saves
  70 bytes where the C64 saves 40. The other seven use
  [`@8bitscript/random`](../8bitscript/packages/random), a small
  deterministic generator added to 8BitScript itself for this, stepped once
  every frame regardless of input so the sequence a game sees depends on how
  long the player took between moves and not just how many they made.
  [`@8bitscript/random/entropy`](../8bitscript/packages/random) is the one
  place that picks: one import, and the compiler takes the C64's or the
  Atari's file for those two builds and the software generator's for the
  rest, the same twin rule that gives the NES its own `screen.8bs`. The
  game carried that choice itself until 0.12.0 — an `rng.8bs` with two
  machine twins — and moving it into the platform changed no build by a
  byte. The price on the two hardware builds is replay — every spawn reads
  a register, so those games cannot be replayed from a start state or
  reproduced from a screenshot, which is exactly why `/entropy` is an
  explicitly optional import and the bare `@8bitscript/random` stays
  deterministic (see the package's README).
- **What is on the screen is composition, and it costs nothing.**
  `ui/Game.8bx` is the arrangement — a `<TitleScreen />` (a `<Logo />`, a
  `<StartMessage />` in the words of this machine's controls, the
  `<Copyright />`, the `<Version />`, and a `<TitleWobble />` where there
  is a raster to ride), or a `<Board />` that is a `<ScoreBar />`, a
  `<GameOver />` once the game has ended, and sixteen `<Tile />`s —
  written as 8BX elements over the positions `lib/layout/` works out
  and the tables `lib/draw/palette.8bs` and `lib/draw/font.8bs` keep,
  with none of the screen addresses those files are made of. Each
  element is one file for every machine, fixed grid, fluid host or the
  4K PET: what differs between them is a fact (`screen.RESIZABLE`,
  `#system()`, `Input.*`), and the arm a build cannot take folds away —
  measured, one element at a time, at exactly the bytes the per-machine
  twins cost. `ui/board/Tile.8bx` is one call, `drawTile()` in
  `lib/draw/tile.8bs`, and the PET's `tile.pet.8bs` beside it is what
  that call is there; each element's words are `src/i18n/<locale>.8bs`'s;
  the elements are the arrangement, and `lib/` is the how. That is free
  because a function with one caller is written into it (8bitscript
  #184): on 0.11.0 the same `Tile` measured +56 bytes on every 6502 and
  +84 on the PET, and a `<Tile />` that merely forwarded to a
  `drawTile()` +36, which is why the painting used to live in the
  element. A component is a function and an element is a call, so this
  is the same program it was when `2048.8bs` wrote those calls out by
  hand: the same functions at the same sizes on every target — 2759
  bytes on the 4K PET 2001 and 3482 on the unexpanded VIC-20
  (2026-09-17, against the 0.11.0 toolchain; 2763 and 3490 before the
  screen became elements, the four bytes a title trampoline that went;
  2779 and 3415 on 0.13.0, whose inliner took the VIC-20's 67) — and
  60 bytes *less* on every build that animates, because the between-steps
  repaint and the settled board now share one `<Tiles />` where the
  hand-written version kept a second copy of the loop. It also drew two
  improvements out of the compiler's inliner along the way (8bitscript
  #175) — a dogfood ladder is for that.
- **The PET is the same program, and it says so in two files.** Until
  0.7.0 every element carried a `#system() == System.PET` arm: the PET
  wrote its lines as hand-baked screen codes straight into video RAM
  (`lib/petscii.8bs`, `lib/codes.8bs`, and a `codes.de.8bs` for the
  German build), because `@8bitscript/text`'s `print` links an
  ASCII-to-screen-code conversion the 4K 2001 was thought not to afford
  — eight switches in eight files, and a second copy of every string.
  Measured, that machinery bought **97 bytes**: the PET now prints
  through `@8bitscript/text` like the other eight, at 2876 bytes on the
  4K 2001 (2779 with the arms; 3056 in German after catalogs, still
  under the 3071-byte ceiling), 2886 on the 4032, and 2905 on the 8032
  (2970 before — the two-width cell tables went). What the PET keeps is its *look*, as two
  twins in `lib/`: `layout/layout.pet.8bs` (the 8×5 block-digit
  arrangement, both widths in one file, folded) and `draw/tile.pet.8bs`
  (the tile stamped into video RAM). The tile is the one thing that
  cannot go through `text`: `putChar` takes ASCII and remaps 97–122 as
  lower case, and two of the quadrant-block glyphs a digit is made of
  are codes 98 and 108 — a portable `blocks` capability in 8BitScript
  would retire that twin too, and give the C64 and VIC-20 the same
  digits. The other fixed grids' 5×3 printed-number tile was measured
  and rejected for the PET: 299 bytes past the 4K ceiling (3415 on the
  8032). One
  visible change on a 3032 or 4032: `text` selects the text character
  set to print, so the `ready.` after the game is lower-case, which
  `@8bitscript/pet/text` documents as the cost of printing what was
  written. The restructure into `ui/board/`, `ui/title/` and `lib/*/`
  is byte-identical on every build (checksummed on the PET 2001 and the
  VIC-20), and every target but the PET is byte-identical with the arms
  gone too (the VIC-20 checksummed through both steps, sizes on the
  rest).
- **Colour is a table lookup, and it costs nothing on the machines
  that can't use it.** `TILE_COLOR[exponent]` feeds `text.setColor()` before
  every tile is drawn. On the PET and NES that call is an
  empty function, and the compiler deletes it — table and all — so those
  two never link `setColor`. The Atari 8-bit build opts into
  `textmode=gr1` (20-column ANTIC 6), so its tiles take the same table as
  VIC-20, C64, C128, Commander X16, MEGA65, and the web — the closest a
  text-mode board gets to upstream 2048's own tile colours.
  The PET and the web both stamp a 2×3-cell block-digit into an 8×5
  square so a "2" fills the tile the way the PET's own ROM digits do —
  the same glyphs, `lib/draw/font.8bs` for the web and
  `lib/draw/font.pet.8bs` as screen codes.
- **RAM is tiny everywhere.** `8bs build` reports 65 bytes of RAM on a
  PET 2001 and 109 on the web — the board, a 16-byte copy of what is on
  screen (so a tile that did not move is never erased and redrawn), the
  scratch row, the animated builds' merge-lock mask, the score, and a
  handful of flags. The PET program itself is **2876 bytes** on a
  2001/4K (2440 when it was first fitted, 2983 before the four move
  helpers collapsed into one start/step/stride walk, and 4005 before the
  compiler's 0.2.3 leaner 6502 codegen; helpers that would otherwise be
  inlined into `main` four times stay as calls). That is what fits a
  stock 4K 2001.
- **Nothing is wider than a VIC-20's 22 columns.** The HUD line is 17
  characters, the board's widest row 19, the dashed rule 20 — checked by
  actually running it there (`pnpm start`), the machine every layout in
  this project is checked against first.

## What's next

The three machines with real graphics hardware beyond a character grid —
**C64** (bitmap mode, `@8bitscript/c64/bitmap`), **Commander X16**, and
**MEGA65** — could draw the board as actual coloured tiles instead of
numbers in a text cell, the way the disabled-until-you-look-away idea in
upstream 2048's own CSS animates tiles. That is a deliberate follow-up, not
a gap in this version: the text-mode board above is the version that runs
identically, and legibly, on all nine targets first, matching 8BitScript's
own project principle that a program says what a machine cannot do rather
than papering over it.
