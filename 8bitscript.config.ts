export default {
  // One main.8bs for every target — see README.md.
  entry: 'src/main.8bs',
  targets: {
    vic20: {},
    c64: {},
    // The game is 2440 bytes of program on a 2001/4K (2983 before the
    // HUD was baked as PET screen codes and the four move helpers
    // collapsed; 4005 before the compiler's 0.2.3 leaner 6502 codegen),
    // so `--profile 2001 --hardware ram=4` fits a stock 4K 2001's
    // usable RAM ($0401–$0FFF). The default PET stays the 4032: 40
    // columns (the layout tile.pet.8bs centres for), 32K, the biggest
    // on-board RAM a PET shipped with. `--profile 8032` still builds
    // the 80-column version.
    //
    // `release` is what `8bs build --release` (the GitHub Release
    // workflow) builds for this target: '2001' for the stock-4K
    // download, and {} for this target's own default above (the 32K
    // 4032 build) — not the '4032' catalog preset, which also sets a
    // speaker option this project doesn't.
    pet: { hardware: { model: '4032', ram: '32' }, release: ['2001', {}] },
    c128: {},
    atari8: {},
    nes: {},
    cx16: {},
    mega65: {},
    web: {},
  },
};
