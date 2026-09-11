# 2048

## 0.1.1

### Patch Changes

- 323cc46: GitHub Releases now tag automatically once the bot-maintained "Version Packages" PR merges, and attach two PET `.prg` builds — a stock 4K 2001 and the existing 32K 4032 — alongside the web `.wasm`, built from a matrix declared in `8bitscript.config.ts` (`targets.pet.release`) instead of duplicated into CI.
  
  Requires 8BitScript/8bitscript v0.4.0 (`@8bitscript/cli` and friends bumped accordingly) for `8bs build --release` and the renamed `8bitscript.config.ts`.
- 25cd227: Set up [changesets](https://github.com/changesets/changesets) to version and changelog this game's own releases, the same way [8BitScript](https://github.com/8BitScript/8bitscript) already versions the toolchain: a changeset per PR, a bot-maintained "Version Packages" PR collecting them, and merging it is the release button.
  
  The GitHub Release workflow itself — the tag it fires from, and building a PET 4K variant alongside the 32K one — lands in a follow-up PR once 8BitScript/8bitscript ships the `8bs build --release` and multi-artifact support this depends on.
