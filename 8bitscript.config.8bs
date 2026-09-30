export default {
  // One program for every target — see README.md. The entry is the .8bs
  // that drives the game; ui/Screen.8bx and lib/game/rules.8bs reach it by
  // import.
  entry: 'src/2048.8bs',
  // The system the game is designed on: the build every fact it tests is
  // true on — 40 columns, sixteen colours, a raster list, a SID for
  // entropy, RAM to animate. `8bs run` alone runs it, and `8bs build
  // --release` says what every other build is short of, in facts (see
  // README.md, "The baseline"). The floor is the 4K PET 2001 below;
  // nothing here changes a build's bytes.
  baseline: 'c64',
  imports: {
    '@lib': 'src/lib',
    '@ui': 'src/ui',
    '@media': 'src/media',
  },
  targets: {
    vic20: { hardware: { ram: '8k' } },
    c64: {},
    // The game is 2826 bytes of program on a 2001/4K English build
    // (3003 German, still under the 3071-byte ceiling; 62 bytes of RAM
    // either way), measured 2026-09-23 once the copyright and the version
    // moved onto the playing screen (2876 and 3056 on 2026-09-18, when
    // those lines lived on a title screen), with the PET printing through
    // @8bitscript/text like every other machine and its look in two lib/
    // twins (layout.pet.8bs, tile.pet.8bs): 2779 with the elements'
    // `#system() == System.PET` arms of baked screen codes it had before,
    // the 97 bytes those arms bought. Before that: 2759 on 0.11.0 with
    // the screen as ui/ elements over lib/ (#50–#56), 2763 before that
    // restructure, the same functions at the same sizes at every step of
    // it but four bytes, a title trampoline that went. The header's
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
    // Four-pillar media (title.8bg, tile.8bg, game.8ba move + theme),
    // measured 2026-09-24 with the workspace toolchain: the 4K 2001 build
    // no longer links — the image ends $2984 past the $1000 RAM ceiling.
    // The 4032/32K default is 6281 program (88 RAM); German 6458 program
    // (90 RAM); C64 8341 program (111 RAM); unexpanded VIC-20 8K 5368
    // program (100 RAM); CX16 6542 program (170 RAM). Historical 4K
    // figures above are kept for comparison only.
    //
    // `release` is what `8bs build --release` (the GitHub Release
    // workflow) builds for this target: {} for the 4032/32K default
    // (and German via locale), not the stock-4K 2001 download — media
    // no longer fits that machine.
    pet: {
      hardware: { model: '4032', ram: '32' },
      release: [{}, { locale: 'de' }],
    },
    cx16: {},
    web: {
      release: [
        {},
        { hardware: { machine: 'c64' } },
        { hardware: { machine: 'pet-2001' } },
        { hardware: { machine: 'vic20' } },
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
