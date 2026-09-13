---
"2048": patch
---

Build against 8BitScript 0.6.2.

Dependencies move 0.6.1 -> 0.6.2, and the reusable compile workflow is repinned from v0.6.1's commit to v0.6.2's.

0.6.2 is the web-skins release: the default wasm grid is 48×27 (16:9), and `--hardware machine=<c64|pet-2001|vic20>` compiles a skin. This game's `targets.web.release` now builds all four, and `site/index.html` is a picker that loads the matching `program-*.wasm`.

The 4K 2001 is **2581 bytes** (2420 at 0.6.1, before the title screen and HUD work on this same release) — still inside a stock 4K 2001's ~3071 usable, 490 bytes of headroom under `$0FFF`. Measured with the published 0.6.2 packages, not the workspace.
