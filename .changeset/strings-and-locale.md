---
"2048": minor
---

Every line the game prints is in `lib/strings.8bs`, and `strings.de.8bs`
beside it is the German one: `8bs build --locale de` (or the release's
`{ locale: 'de' }` entries, for the web and the 4K PET) builds a German
game, and with no locale named no locale's file is read. The PET's lines
are baked screen codes in `lib/codes.8bs` and `codes.de.8bs`. The elements
read the strings and their `.length`, so the centring moves with the words.
The score header is two prints instead of a template, which is 14 bytes
smaller on every 6502 but the PET (unchanged at 2687); the VIC-20 is 3382.
The version line is not yet a string here — it waits on 8bitscript 0.13.0's
`#package("version")`.
