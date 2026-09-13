---
"2048": patch
---

The title screen says TOUCH TO START on a touchscreen — and now actually
manages to.

The wording is TOUCH rather than TAP, on all four web skins, and the game-over
panel says TOUCH TO CONTINUE to match. Each is centred for its own length,
since these layouts print at an absolute cell and the new string is two
characters longer.

The prompt was also drawn too early to be right. `main()` drew the title
before its first `waitFrame()`, but on the web the page writes its status byte
— the bit that says "this is a touchscreen" — when the worker hands it the
program's memory, which is the same moment the program starts running. That is
a race, and losing it puts PRESS ENTER on a phone. The title is now drawn
after one frame has passed, which is the program's own way of letting the host
get a word in.

Native targets already chose their own wording from build-time facts and are
unchanged: PRESS START where there is a pad and no keyboard (the NES), PRESS
RETURN OR START where there is both, PRESS FIRE for a joystick, PRESS RETURN
otherwise.
