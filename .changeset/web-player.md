---
"2048": minor
---

A web player built for the device most people will open it on.

**The page.** The screen is laid out in flow and sized from the smallest of
`window.innerHeight`, `documentElement.clientHeight` and
`visualViewport.height`. Three earlier attempts at this clipped the top of the
board on an iPhone in landscape, every one of them because the container
believed it was taller than the screen — so it now takes the measure that
cannot be too big, and `viewport-fit=cover` and `status-bar-style=black-translucent`
are gone, since both exist to let a page draw *underneath* the system UI.

**The controls.** The 49px bar across the top is a handle in the corner that
expands and gets out of the way — a phone in landscape has no vertical pixels
to give away, and the top strip is where the browser puts its own chrome. It
lives outside the screen element, because the loader paints over everything
inside it. The systems are Modern and Commodore, and Model is a Commodore
idea, so it only appears there.

**The board.** Tiles are 8×5 with the HUD in the side margins, each keeping a
clear column against the board. Numbers centre exactly down the tile, and as
near across as a whole-cell grid allows: a digit is 3 half-cells of ink on a 4
half-cell pitch, so a run of them is an odd width inside an even tile and lands
2px from centre either way, with nothing in between.

**Game over** is a panel in the middle of the board rather than a line of text
at the bottom — a red frame around a white card, because an empty cell is also
a white block and a plain white panel has no edge you can see — and the screen
border turns red underneath it. On a touch host it says TAP TO CONTINUE.

Also: the status line always prints. The branch that printed nothing is what
stranded "YOU MADE 2048" on screen across a restart.
