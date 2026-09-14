---
"2048": patch
---

`pnpm run check` pointed at `src/main.8bs`, which the entry-filename rename left nonexistent — it now checks `src/2048.8bs`, matching `8bitscript.config.ts`'s own `entry`. README.md, `8bitscript.config.ts`'s header comment, and the same filename mentioned in `rng.8bs`/`tile.8bs`'s own comments follow. `.gitignore` also picks up `.8bitscript/`, the clone-local systems/checkout-pointer directory a local `--checkout` writes.
