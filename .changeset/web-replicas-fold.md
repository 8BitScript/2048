---
"2048": minor
---

The web's C64 and VIC-20 replicas read `lib/layout.8bs` — the machine's
own layout, at the replica's columns — instead of a twin each of baked
cell numbers. The C64's picture is named by its facts (40 columns, sixteen
colours, a raster) rather than by `#system()`, which is what lets the web
replica take the C64's arm; the title screen's raster band comes with it.
Both replicas replay frame for frame. Nine native builds unchanged.
