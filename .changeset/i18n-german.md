---
"2048": minor
---

German and English builds use `@8bitscript/i18n/catalog`: namespaced catalogs in `src/i18n/en.8bs` and `src/i18n/de.8bs`, with `i18n.format` for control labels and `number.print` for grouped scores (the unexpanded VIC-20 keeps a zero-padded field). One locale, one binary. Measured 2026-09-18: 2876 bytes English / 3056 German on the 4K PET 2001; 3431 on the unexpanded VIC-20 in both locales; 4500 / 4771 on the C64.
