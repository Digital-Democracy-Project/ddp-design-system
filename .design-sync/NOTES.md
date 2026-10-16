# Design-sync notes

## Every sync

- **This sync is the only thing that maintains the project.** Until 2026-10-16 the project was built by Claude Design's own GitHub sync (its Sync button, recorded in `github.md`), which rewrote the library as hand-written copies instead of shipping the real build. That content was retired on 2026-10-16, when this sync uploaded the real build; any leftover files contain a one-line "Retired … Safe to delete" stub. Don't use that Sync button for this project.
- **Upload the brand files from the repo.** The converter has no slot for them, so after the final driver run and before `finalize_plan`: `mkdir -p ds-bundle/assets/brand && cp assets/brand/* ds-bundle/assets/brand/`, add `"assets/brand/**"` to the plan's writes, and add to its deletes any `assets/brand/` file in the project that the repo no longer has.
- **Keep `ui_kits/scorecard/` in the project.** It's a hand-made scorecard mock-up kept as a design reference. It isn't produced by this sync, so the upload never writes or deletes it. On 2026-10-16 it was updated to work with the real library (its sort control became `Select`; `--ddp-text-muted` became `--ddp-text-subtle`) and tested. If a component it uses changes its props (`Badge`, `Button`, `Icon`, `TextInput`, `Checkbox`, `ToggleButton`, `Select`), re-test it.
- **Never delete a project file without review.** Deletes come from the driver's `upload.deletePaths` (files earlier syncs uploaded). Anything else in the project that the build doesn't produce is reviewed first, with what it is and a link (`https://claude.ai/design/p/<projectId>?file=<URL-encoded path>`), and deleted only once approved.

## Repo facts

- **Raw Sass is not synced.** The design agent builds from `_ds_bundle.js` and `styles.css`; nothing in the project compiles Sass. Don't push `styles/**` sources by hand.
- **`dist/styles.css` contains everything:** tokens, `@font-face` rules, the reset, the `.ddp` base text styles, the utility classes and the component CSS, merged at build time in `vite.config.ts`. No `cssEntry` override is needed.
- **Fonts:** Public Sans and Newsreader ship from `assets/fonts`. `--ddp-font-family-mono` is a system font stack on purpose (`ui-monospace`, `SF Mono`, `Menlo`, `Consolas`), so it has no font files.
- **Storybook:** `.storybook/main.ts` removes the library-only Vite plugins (`merge-tokens-into-stylesheet`, `vite:dts`) from Storybook builds. Autodocs is on, so `index.json` includes `docs` entries, which the converter skips.
- **Icons:** Icon's "All Icons" story maps over the exported `iconNames`, so new icons appear in Storybook and in the Claude Design card without a story edit.
- **DropdownMenu** stories start open and render their panel outside the layout, so `config.json` sets `cardMode: "single"` for it.
- **Badge, Button, ToggleButton** have stories wider than a grid cell (`[GRID_OVERFLOW] wide`), so `config.json` sets `cardMode: "column"` for them.
- **Pass `--max-stories 12` to both `compare.mjs` and `resync.mjs`.** No component has more than 9 stories, so that captures and grades every story; the default cap of 6 would leave tail stories ungraded. Raise it if a component grows past 12.
- **`.design-sync/namespace-alias.js`** (wired in through `extraEntries`) keeps `window.DesignSystem_ad94b7` pointing at the bundle's global, `DigitalDemocracyProjectDesignSystem`. Claude Design assigned that older name to the project's hand-written library, and existing designs that use the library, including the scorecard mock-up, still reference it. The module needs its named export: without one, the bundler drops it, because `package.json` marks only CSS as having side effects.
- **Playwright version:** each Playwright release expects one specific Chromium build. Install the release that matches the Chromium already in the local Playwright cache (`npm i playwright@<version>` in `.ds-sync/` after the standard dep install) to avoid a fresh browser download; the last sync used 1.62.1 with Chromium build 1234.
- **The decorator bundle warning `No loader is configured for ".scss"`** means Sass crept back into `.storybook/preview.tsx` (see the first fix below). The build log should say `preview-decorators.js: bundled from .storybook/preview.tsx`.

## Fixes made during syncs

- [GENERAL] Preview decorator didn't bundle ("No loader is configured for .scss") → `.storybook/preview.tsx` imported Sass, and the converter's decorator bundler only loads `.js`/`.json` → the Sass imports moved to `.storybook/global-styles.ts`, loaded through `previewAnnotations` in `main.ts`. Keep Sass out of `preview.tsx`.
- [GENERAL] Every component rendered in Times, in Storybook and in previews alike, so compare would have shown matching but wrong renders → components take their font from `.ddp`, and nothing in Storybook applied it → the decorator puts `ddp` on its wrapper, and on `<body>` in story view so portaled panels (DropdownMenu, Select, SearchBar) get it too. Check fonts directly (computed `font-family`), not only via compare.
- DropdownMenu's reference shots in compare show only the trigger → compare crops Storybook captures to `#storybook-root`, and the open panel is portaled to `<body>` outside it (compare reports `portal: false`) → grade DropdownMenu against a full-viewport screenshot of the same Storybook story instead.

## Re-sync risks

- **Fonts can fail invisibly.** If anything stops `.ddp` reaching the previews (Sass back in `preview.tsx`, a decorator change), both compare panels fall back to the same serif font and still look "matching". After any Storybook config change, check a preview's computed `font-family` is Public Sans.
- **DropdownMenu isn't really verified by compare.** Its reference shot is cropped (see fixes), so its `match` grade came from a hand-taken full-viewport capture. When its stories change, grade it the same way again.
- **Brand files and this project's cleanup depend on following "Every sync" above.** Skip the brand step and `assets/brand/` silently goes stale; press Claude Design's GitHub Sync button and the hand-written copies come back alongside the real bundle.
- **The `DesignSystem_ad94b7` alias hard-codes the bundle's global name.** If the package name or `globalName` ever changes, update `namespace-alias.js` too, or every design still using the old name breaks. After each build, check that `grep -c DesignSystem_ad94b7 ds-bundle/_ds_bundle.js` is non-zero.
- **`conventions.md` is hand-written.** Every token, class, component and icon it names was checked against the 2026-10-16 build; re-check after renames or removals.
- **Toolchain:** synced with Storybook 9.1.20, Node 24.3.0, Playwright 1.62.1 / Chromium 1234, design-sync scripts 2.1.289.
