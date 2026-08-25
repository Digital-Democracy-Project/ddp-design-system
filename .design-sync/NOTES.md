# Design-sync notes

## Re-sync risks

- **Tier 4 legacy token aliases were deleted from `colors_and_type.css` (2026-08-25), including `--ddp-font-script`.** This is expected to break `preview/14-tagline.html` and `ui_kits/marketing-site`'s `HeroBanner` in the Claude Design project, both of which reference `var(--ddp-font-script)` directly — user-confirmed acceptable, to be fixed properly later by migrating those to real design-system patterns rather than restoring the legacy alias. Neither file is touched by this sync (see the sync plan below), so they'll break in place until that migration happens. The `[FONT_MISSING]` warning this previously caused no longer fires, since the variable itself is gone, not just its font file.
- **`dist/style.css` is now self-sufficient** (tokens + component CSS merged at build time in `vite.config.ts`, tokens first) — the `cssEntry` override this config previously needed is gone; auto-detection finds everything correctly on its own now.
