# 2048

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
