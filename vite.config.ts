import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { compile } from 'sass';

// Library-mode build: bundles components/index.ts into ESM + CJS, rolls up .d.ts via vite-plugin-dts, and emits one combined, self-sufficient stylesheet (dist/style.css) for consumers who don't process Sass/CSS Modules themselves. The raw Sass source under styles/ is published separately, untouched by this build.
// dist/style.css ships BOTH the token definitions (colors_and_type.scss) and the compiled component CSS in one file, tokens first — a single import gets a consumer everything, rather than requiring two separate imports that are easy to forget one of (this bit us for real, debugging the ddp-next integration). Token-only consumption is still available separately via the ./styles/tokens.css export, unaffected by this.
function mergeTokensIntoStylesheet() {
  return {
    name: 'merge-tokens-into-stylesheet',
    apply: 'build' as const,
    writeBundle() {
      // build.lib.formats builds ['es', 'cjs'] as two separate Rollup passes, and both emit the component CSS + fire writeBundle. Vite writes it fresh to dist/style.raw.css (see assetFileNames below) on EACH pass, and this hook recomputes dist/style.css fresh from that plus the token file every time — never reading its own prior output — so running twice is harmless: same two stable inputs in, same result out. 
      // NOTE: An earlier version read/wrote dist/style.css directly, in place; that's what made the two passes interfere — first attempt duplicated the token block by prepending twice, second attempt (a naive run-once guard) suppressed the merge entirely on the pass that mattered, silently shipping unmerged component-only CSS. Both caught by inspecting the actual output.
      const rawPath = resolve(__dirname, 'dist/style.raw.css');
      // An explicit compile-and-concatenate step, not an import-graph trick — the concatenation order here is load-bearing, not cosmetic: [data-theme="dark"] and :root have identical CSS specificity, so on an element matching  both, the LATER rule in source order wins. colors_and_type.scss's own internal order (:root, then [data-theme="dark"]) already depends on this; prepending it whole here preserves that.
      // Relying on Vite/Rollup's CSS-module concatenation order instead (e.g. via an `import '../styles/colors_and_type.scss'` in components/index.ts) would make that correctness depend on bundler-internal behavior rather than an explicit, auditable step.
      // colors_and_type.scss's @font-face url()s point at ../assets/fonts/ — no rewriting needed here, unlike a plain concatenation normally would: assets/, styles/, and dist/ are all direct siblings under the repo root, so that same relative path resolves correctly whether read from styles/colors_and_type.scss directly (Storybook) or from this concatenated dist/style.css.
      const tokens = compile(resolve(__dirname, 'styles/colors_and_type.scss')).css;
      writeFileSync(resolve(__dirname, 'dist/colors_and_type.css'), tokens);
      // styles/_base.scss (the box-sizing reset + opt-in .ddp base element
      // styles) isn't part of the raw-Sass @use layer (index.scss only
      // forwards the CSS-free accessor/mixin files) — compiled here
      // instead, same as colors_and_type.scss is read here rather than
      // relied upon via the JS import graph. Storybook gets it via its own
      // direct import in .storybook/preview.tsx.
      const base = compile(resolve(__dirname, 'styles/_base.scss')).css;
      const spacing = compile(resolve(__dirname, 'styles/_spacing.scss')).css;
      const componentCss = readFileSync(rawPath, 'utf8');
      writeFileSync(resolve(__dirname, 'dist/style.css'), `${tokens}\n\n${base}\n\n${spacing}\n\n${componentCss}`);
      unlinkSync(rawPath);
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    // Inlines assets/icons/*.svg?react imports into real React components at build time (same mechanism ddp-scorecard-react already uses via this same plugin) — no runtime fetch, no separate icon-font/sprite dependency.
    svgr(),
    dts({
      include: ['components'],
      exclude: ['components/**/*.stories.tsx'],
      rollupTypes: true,
    }),
    mergeTokensIntoStylesheet(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'components/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    // Single combined stylesheet for now (dist/style.css), matching the single-entry barrel below. To move to true per-component CSS code splitting later: switch `lib.entry` to a map of one entry per component (not just the barrel), set this to `true`, and add matching per-component `styles.css` export subpaths in package.json alongside the existing combined one (additive, non-breaking).
    cssCodeSplit: false,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        // Without this, Vite falls back to deriving the CSS asset name from package.json's "name" (producing design-system.css) now that lib.name isn't set. Named .raw.css, not .css: mergeTokensIntoStylesheet reads this file and writes the real dist/style.css (tokens + this) from it, then deletes it — keeping Vite's own output separate from the final merged artifact avoids the two output formats' writeBundle calls stepping on each other (see that plugin's comment for the full story).
        assetFileNames: 'style.raw.css',
        // Every component is bundled into this one flat chunk (see the cssCodeSplit comment above for why), which silently drops the individual `'use client'` directives that components like Checkbox/Select/Menu/SearchBar carry in their own source — Rollup only preserves a directive prologue per output chunk, and merging 16 source files into one chunk leaves no single chunk to hoist it onto. Next's RSC compiler then sees a client-only API (useState, etc.) inside a module with no client boundary and refuses to let a Server Component import ANY export from it, even a hook-free one like Badge or Card. Banner-injecting the directive here re-marks the whole merged bundle client, which is correct for the half of the barrel that actually needs it and overcautious for the half that doesn't (Badge, Button, Card, Icon, IconButton, MenuItem, SectionLabel, ClickableTile) — accept that cost until the per-component code-splitting described above happens, at which point each component's own directive (or lack of one) survives on its own chunk and this banner should come out.
        banner: '"use client";',
      },
    },
  },
});
