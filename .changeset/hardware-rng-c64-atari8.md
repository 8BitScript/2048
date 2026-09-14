---
"2048": patch
---

The C64 and the Atari 8-bit take their randomness out of silicon.

Two of the nine targets can hand a program entropy directly: SID voice 3's
noise oscillator on the C64 (`$D41B`) and POKEY's counter on the Atari 8-bit
(`$D20A`). Both turn out to be **smaller** than computing the numbers —
reading a register costs less than a 16-bit multiply-and-add plus the two
bytes of state it steps — which is the only argument for reading hardware
inside game logic rather than once at start-up.

Measured against 0.6.2: the C64 goes 3884 to **3844** bytes (−40, and −2 of
RAM) and the Atari 8-bit 3828 to **3758** (−70, −2). The other seven targets
are byte-identical. The Atari saves more because POKEY's counter is already
running, where SID needs four register writes before voice 3 makes noise at
all. The 4K PET 2001 — the only build with a real size budget — is unchanged
and has no entropy source anyway.

`rng.8bs` is the one place that picks, with `rng.c64.8bs` and
`rng.atari8.8bs` as its per-machine twins, resolved the same way
`tile.pet.8bs` already is; `main.8bs` names none of them. One measured trap
is recorded in `rng.8bs`'s header: writing the wrapper's `range()` as
`random.range(bound)` rather than `random.next() % bound` costs 8 bytes on
every one of the seven software targets, because the forwarding call does
not inline away. Implementing the body directly is what makes the
abstraction free.

`rng.begin()` is `main()`'s first statement: on the C64 it claims voice 3 and
writes `$D418` as a whole known byte, and the SID's low registers are
write-only so it cannot read back what was there. A 2048 that ever grows
sound has to revisit that file, not merely add notes.

(Recorded after the fact: the change landed in #31 without a changeset, so
without this the release notes would omit it.)
