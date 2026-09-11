---
"2048": patch
---

Set up [changesets](https://github.com/changesets/changesets) to version and changelog this game's own releases, the same way [8BitScript](https://github.com/8BitScript/8bitscript) already versions the toolchain: a changeset per PR, a bot-maintained "Version Packages" PR collecting them, and merging it is the release button.

The GitHub Release workflow itself — the tag it fires from, and building a PET 4K variant alongside the 32K one — lands in a follow-up PR once 8BitScript/8bitscript ships the `8bs build --release` and multi-artifact support this depends on.
