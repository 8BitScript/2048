# 2048

[![CI](https://github.com/8BitScript/2048/actions/workflows/ci.yml/badge.svg)](https://github.com/8BitScript/2048/actions/workflows/ci.yml)
[![Release](https://img.shields.io/github/v/release/8BitScript/2048?label=release)](https://github.com/8BitScript/2048/releases)

[2048](https://github.com/gabrielecirulli/2048) (MIT, Gabriele Cirulli), written
from scratch in [8BitScript](https://github.com/8BitScript/8bitscript) — one
source file, [`src/main.8bs`](src/main.8bs), running on the VIC-20, C64, PET,
C128, Atari 8-bit, NES, Commander X16, MEGA65, *and* the web, the way
8BitScript's own `examples/borders` and `examples/menubar` do.

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

Play it in a browser at [2048.8bitscript.com](https://2048.8bitscript.com)
(swipe on a phone, arrows on a keyboard). GitHub Releases attach the
compiled `.prg` / `.nes` / `.xex` / `.wasm` for every machine.

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
| `pnpm run start:pet` | PET (a 32K 4032 by default; `--profile 2001 --hardware ram=4` for a stock 4K 2001 — the game is 2440 bytes of program, inside that machine's ~3K of usable RAM; `--profile 8032` for 80 columns) |
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
tiles, Enter or a tap starts a new game once it is over. `pnpm run deploy:web`
builds `dist/web/` and deploys it to [2048.8bitscript.com](https://2048.8bitscript.com)
once the `8bitscript.com` zone is in Cloudflare and `CLOUDFLARE_API_TOKEN` is
set. Every other target reads a real keyboard, joystick, or pad the same way.

## How it's built

- **The board is sixteen exponents, not sixteen numbers.** `board[i]` is 0
  for empty or *N* for the tile worth 2<sup>N</sup> (1 = 2, 2 = 4, … 11 =
  2048) — one byte instead of two, and "two equal tiles merge" becomes "two
  equal exponents merge into exponent + 1," one add instead of a double and
  a compare. `POW2[]` in `main.8bs` is the rules' own 2<sup>N</sup> table
  (score); `tile.8bs` has a second copy for drawing, and the PET twin never
  links either drawing copy.
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
  frame later (`ANIM_STEP_FRAMES` in `main.8bs` is the knob). A
  full-width slide lands in 3 steps, ~50–100ms at 60/50Hz, and settles
  on exactly the board the instant mover computes — checked exhaustively
  over all 20,736 line states. The 4K PET 2001, the unexpanded VIC-20,
  and the NES keep their instant moves and their exact byte counts.
- **Randomness is [`@8bitscript/random`](../8bitscript/packages/random)**, a
  small deterministic generator added to 8BitScript itself for this —
  nothing in the language had one for any of these nine targets before
  now, only Atari 8-bit's own hardware-entropy register
  (`@8bitscript/atari8/random`, a different thing on purpose: see its
  header). `random.next()` runs once every frame regardless of input, so
  the sequence a game actually sees depends on how long the player took
  between moves, not just how many moves they made — deterministic and
  replayable in principle, unpredictable in practice, with no hardware
  dependency at all.
- **Colour is a table lookup, and it costs nothing on the three machines
  that can't use it.** `TILE_COLOR[exponent]` feeds `text.setColor()` before
  every tile is drawn. On the PET, Atari 8-bit and NES that call is an
  empty function, and the compiler deletes it — table and all — so those
  three never link `setColor`. The other six (VIC-20, C64, C128,
  Commander X16, MEGA65, web) show each tile value in a distinct colour,
  the closest a text-mode board gets to upstream 2048's own tile colours.
  The PET and the web both stamp a 2×3-cell block-digit into an 8×5
  square so a "2" fills the tile the way the PET's own ROM digits do;
  `tile.web.8bs` is the web's twin of `tile.pet.8bs`.
- **RAM is tiny everywhere.** `8bs build` reports 54 bytes of RAM on a
  PET 2001 and 81 on the web — the board, a 16-byte copy of what is on
  screen (so a tile that did not move is never erased and redrawn), the
  scratch row, the animated builds' merge-lock mask, the score, and a
  handful of flags. The PET program itself is
  **2440 bytes** on a 2001/4K (down from 2983, and from 4005 before the
  compiler's 0.2.3 leaner 6502 codegen): the PET HUD is baked screen codes
  rather than `text.print` / `printNumber`, the four move helpers are one
  start/step/stride walk, and helpers that would otherwise be inlined into
  `main` four times stay as calls. That is what fits a stock 4K 2001.
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
