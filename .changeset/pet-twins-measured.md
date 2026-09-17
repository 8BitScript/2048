---
"2048": minor
---

No element has a machine twin. The PET's eight `*.pet.8bx` files — the
screen codes it writes straight into video RAM — are each an arm of the
one element now, behind `#system() == System.PET`, over `lib/petscii.8bs`
(its positions, its tables, its primitives; not a twin, so every machine
can name it and the arm folds away on the eight that are not a PET).
Measured one element at a time on the 4K PET 2001: every one at exactly
the bytes its twin cost, 2759 before and after, and 6 bytes less RAM.
`src/ui/` is ten files, one per element; the twins left in `src/lib/`
are the PET's font, the web's PET replica, the web's host, and the
hardware random numbers.
