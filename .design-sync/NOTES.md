# Design-sync notes

## Instructions for the next sync (decided 2026-10-16)

- **Update the existing project in place, as a full re-check.** Do not fetch the project's `_ds_sync.json` or pass `--remote`: that record is from the 2026-08-25 sync of Icon, Button and Badge, made with older scripts, and nothing from it should carry over. Every component with stories gets captured and graded.
- **Treat the project's existing files as material to review, not guidance.** Much of the project predates the current library: early designs, `ui_kits/*`, token preview pages under `preview/`, and Sass copies pushed by hand in August. Don't take conventions, tokens or component usage from any of them.
- **Review every file the new build doesn't produce with the user before anything is deleted.** Before `finalize_plan`, list every project file this build doesn't produce, grouped by folder. For each file or folder, show:
  - its path and size;
  - what it is: a preview card (with the group from its `@dsCard` line), a UI-kit screen, a Sass or CSS copy, or something else;
  - a short summary of its contents;
  - a link to open it: `https://claude.ai/design/p/<projectId>?file=<URL-encoded path>`.

  Get the user's decision on each item: keep or delete. A text file can instead be moved into `legacy/` if the user asks: copy it with `get_file` and `write_files`, then delete the original. Only items the user approved for deletion go in the plan's `deletes`. Nothing is deleted by default.

## Repo facts

- **Raw Sass is not synced.** The design agent builds from `_ds_bundle.js` and `styles.css`; nothing in the project compiles Sass. Don't push `styles/**` sources by hand (decided 2026-10-16). Any Sass copies already in the project are from 2026-08-25 and go through the review above.
- **`dist/styles.css` contains everything:** tokens, `@font-face` rules, the reset, the `.ddp` base text styles, the utility classes and the component CSS, merged at build time in `vite.config.ts`. No `cssEntry` override is needed.
- **Fonts:** Public Sans and Newsreader ship from `assets/fonts`. `--ddp-font-family-mono` is a system font stack on purpose (`ui-monospace`, `SF Mono`, `Menlo`, `Consolas`), so it has no font files.
- **Storybook:** `.storybook/main.ts` removes the library-only Vite plugins (`merge-tokens-into-stylesheet`, `vite:dts`) from Storybook builds. Autodocs is on, so `index.json` includes `docs` entries, which the converter skips.
- **DropdownMenu** stories start open and render their panel outside the layout, so `config.json` sets `cardMode: "single"` for it.

## Re-sync risks

The previous list described the project as it was in August and was retired on 2026-10-16. Write this section fresh at the end of the next sync.
