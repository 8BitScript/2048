---
"2048": patch
---

The title screen's version is `package.json`'s, read at compile time by
`#package("version")` — one number in one place, where it used to be
three (the PET's baked table said V0.1.4, `version.8bs` said v0.2.0, and
the package was at 0.5.0). The text machines print a `v` and the number;
the PET stamps a baked V and copies the number's bytes straight into
video RAM, since a digit and a `.` are the same code in ASCII and in both
of its character sets. 4K PET 2001 2687 → 2779, VIC-20 3382 → 3415.
