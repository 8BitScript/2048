# 2048

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
