---
"2048": patch
---

Bump `@8bitscript/*` dependencies from 0.14.0 to 0.15.0. Trunk's compile step has been failing since PR #67 (message catalogs via `@8bitscript/i18n/catalog`, compile-time `i18n.format`, and `Game.NAME.length`-style chained member expressions) landed code that assumed compiler features 0.14.0 predates. All three shipped in the 8bitscript monorepo's v0.15.0 release. `pnpm run check` and a full `8bs build --release` both pass clean across every target with the bump.
