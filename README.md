# 2048

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

`package.json` pins every `@8bitscript/*` package to the published npm
version (currently `0.1.2`) — a plain clone and `pnpm install` needs nothing
else. Bump the pin after each 8bitscript release. **Adding a target to
`8bs.config.ts`'s `targets` list means also adding the matching
`@8bitscript/<target>` to `package.json`'s `dependencies`** — nothing
enforces the two stay in step, and a target the compiler can't find its
package for fails the same way an unpinned dependency did.

**Developing against a local `../8bitscript` checkout:** if you're changing
both repos at once, point this checkout at your sibling `8bitscript` working
copy instead of the registry:

```bash
pnpm link ../8bitscript/packages/cli ../8bitscript/packages/screen \
  ../8bitscript/packages/text ../8bitscript/packages/input \
  ../8bitscript/packages/random ../8bitscript/packages/system \
  ../8bitscript/packages/vic20 ../8bitscript/packages/c64 \
  ../8bitscript/packages/pet ../8bitscript/packages/c128 \
  ../8bitscript/packages/atari8 ../8bitscript/packages/nes \
  ../8bitscript/packages/cx16 ../8bitscript/packages/mega65 \
  ../8bitscript/packages/web
```

`pnpm link` only rewrites `pnpm-lock.yaml` and `node_modules` — `package.json`
keeps its pinned version, so `git status` shows the link state and it's
obvious before a commit. Undo it with:

```bash
pnpm unlink @8bitscript/cli @8bitscript/screen @8bitscript/text \
  @8bitscript/input @8bitscript/random @8bitscript/system \
  @8bitscript/vic20 @8bitscript/c64 @8bitscript/pet @8bitscript/c128 \
  @8bitscript/atari8 @8bitscript/nes @8bitscript/cx16 @8bitscript/mega65 \
  @8bitscript/web
```

(or just `git checkout -- pnpm-lock.yaml && pnpm install`, which does the
same thing). CI runs `pnpm install --frozen-lockfile` against a checkout
with no `../8bitscript` sibling, so a linked lockfile accidentally pushed
fails there before it can reach `trunk`.

Then, from this directory:

| Command | Machine |
| --- | --- |
| `pnpm start` | VIC-20 (NTSC) |
| `pnpm run start:c64` | C64 |
| `pnpm run start:pet` | PET |
| `pnpm run start:c128` | C128 |
| `pnpm run start:atari8` | Atari 8-bit |
| `pnpm run start:nes` | NES |
| `pnpm run start:cx16` | Commander X16 |
| `pnpm run start:mega65` | MEGA65 |
| `pnpm run start:web` | Web (see below) |

`pnpm run build` (and its `:c64`, `:pet`, … variants) compiles without
opening an emulator; `pnpm run check` runs the compiler's diagnostics alone.

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
  a compare. `POW2[]` is the only place 2<sup>N</sup> is ever written down.
- **One board move is the same four-row (or column) slide, run twice or
  transposed.** `moveLeft`/`Right`/`Up`/`Down` differ only in which four
  board cells they copy into a shared scratch row (`line`) and in which
  order; `processLine()` — compress, merge, compress again — is the entire
  algorithm, and it is the one place a bug would live.
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
  every tile is drawn; on the PET, the Atari 8-bit, and the NES —
  the three of nine 8BitScript targets with no per-cell colour — that
  package's own `setColor`/`putColor` already exists as a deliberately
  empty function, so this program never has to ask `video.colorPerCell`
  itself. The other six (VIC-20, C64, C128, Commander X16, MEGA65, web) show
  each tile value in a distinct colour, the closest a text-mode board gets
  to upstream 2048's own tile colours.
- **Nothing is wider than a VIC-20's 22 columns.** The HUD line is 17
  characters, the board's widest row 19, the dashed rule 20 — checked by
  actually running it there (`pnpm start`), the machine every layout in
  this project is checked against first.
- **RAM is tiny everywhere.** `8bs build` reports well under a hundred
  bytes of RAM for the whole game's state on every 6502 target (an
  unexpanded VIC-20 has 3583 bytes total for the entire program) — the
  board, the scratch row, the score, and a handful of flags, nothing else
  retained between frames.

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
