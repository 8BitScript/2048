export default {
  // One program for every target — see README.md. The entry is the .8bs
  // that drives the game; ui/Game.8bx and lib/game/rules.8bs reach it by
  // import.
  entry: 'src/2048.8bs',
  imports: {
    '@lib': 'src/lib',
    '@ui': 'src/ui',
  },
  targets: {
    vic20: {},
    c64: {},
    // The game is 2876 bytes of program on a 2001/4K English build
    // (3056 German, still under the 3071-byte ceiling), measured
    // 2026-09-18 after catalogs, with the PET printing through
    // @8bitscript/text like every other machine and its look in two lib/
    // twins (layout.pet.8bs, tile.pet.8bs): 2779 with the elements'
    // `#system() == System.PET` arms of baked screen codes it had before,
    // the 97 bytes those arms bought. Before that: 2759 on 0.11.0 with
    // the screen as ui/ elements over lib/ (#50–#56), 2763 before that
    // restructure, the same functions at the same sizes at every step of
    // it but four bytes, a title trampoline that went. The title screen's
    // raster wobble folds away entirely here and on the unexpanded VIC-20
    // (3415 bytes on 0.13.0; 3482 on 0.11.0): #fact(video.raster) is
    // false on both.
    // (2581 at 0.9.0; 2420 at 0.6.1 before
    // the title screen, right-aligned HUD, and 0.6.2; 2624 before the
    // 0.6.1 linker stopped writing input.poll() out once per call site;
    // 2440 when this build was first fitted, drifting to 2624 across 0.6.0
    // as begin() began priming the edge detector and the PET's text
    // package began selecting a character set; 2983 before the HUD was
    // baked as PET screen codes and the four move helpers collapsed;
    // 4005 before the compiler's 0.2.3 leaner 6502 codegen),
    // so `--profile 2001 --hardware ram=4` fits a stock 4K 2001's
    // usable RAM ($0401–$0FFF). The default PET stays the 4032: 40
    // columns (the layout lib/layout/layout.pet.8bs centres for), 32K, the biggest
    // on-board RAM a PET shipped with. `--profile 8032` still builds
    // the 80-column version.
    //
    // `release` is what `8bs build --release` (the GitHub Release
    // workflow) builds for this target: '2001' for the stock-4K
    // download, and {} for this target's own default above (the 32K
    // 4032 build) — not the '4032' catalog preset, which also sets a
    // speaker option this project doesn't.
    pet: { hardware: { model: '4032', ram: '32' }, release: ['2001', {}, { profile: '2001', locale: 'de' }] },
    c128: {},
    atari8: {},
    nes: {},
    cx16: {},
    mega65: {},
    web: {
      release: [
        {},
        { hardware: { machine: 'c64' } },
        { hardware: { machine: 'pet-2001' } },
        { hardware: { machine: 'vic20' } },
        // The German one: src/i18n/de.8bs in place of src/i18n/en.8bs,
        // and nothing else. Any target builds it with `--locale de`;
        // the release ships it for the web and the 4K PET.
        { locale: 'de' },
      ],
    },
  },
  i18n: {
    defaultLocale: 'en',
    fallbackLocale: 'en',
    locales: ['en', 'de'],
  },
};
