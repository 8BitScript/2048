---
"2048": patch
---

Upgrades every `@8bitscript/*` dependency (and the `8bs` toolchain) from 0.7.1 to 0.9.0. Every target (`vic20`, `c64`, `pet`, `c128`, `atari8`, `nes`, `cx16`, `mega65`, `web`) still checks and builds clean — the packages this game depends on had no changes between 0.7.1 and 0.9.0 beyond the lockstep version bump itself.
