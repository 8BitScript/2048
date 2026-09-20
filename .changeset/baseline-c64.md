---
"2048": patch
---

`baseline: 'c64'` in `8bitscript.config.ts`: the game is designed on the C64 — the build every fact it tests is true on — and says so where the toolchain can read it. From 8BitScript 0.19.0, `8bs run` alone runs the C64 build and `8bs build --release` prints, after every artifact, which of the facts the game tests that build is short of (`2048-pet.prg: short of the baseline (c64): video.palette 2 of 16, video.raster, input.joysticks 0 of 2, memory.ram 3071 of 51199`); 0.18.0 ignores the key. `pnpm start` is the C64 now (`pnpm run start:vic20` for the VIC-20). README: the opening says the C64 is the baseline and the 4K PET the floor, the 22-columns bullet says the VIC-20 is the floor of width rather than "the machine checked first", and a new section carries the release report and the vocabulary — floor, baseline, build; not port, tier or edition. No build's bytes change.
