---
"2048": patch
---

Bump `@8bitscript/*` dependencies from 0.14.0 to 0.15.0. That release is what actually lands the `@lib`/`@ui` import aliases, the `@8bitscript/i18n/catalog` and `./messages` exports, and the `Game.NAME.length`-style chained member expression this project's code already assumed — 0.14.0 predated all three, which is why `pnpm run check` and CI's compile step were failing on both this branch and trunk.
