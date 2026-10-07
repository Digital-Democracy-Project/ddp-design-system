import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import { compile } from 'sass';

// Library-mode build: bundles components/index.ts into ESM + CJS, rolls up .d.ts via vite-plugin-dts, and emits one combined, self-sufficient stylesheet (dist/styles.css) for consumers who don't process Sass/CSS Modules themselves. The raw Sass source under styles/ is published separately, untouched by this build.
// dist/styles.css ships BOTH the token definitions (colors_and_type.scss) and the compiled component CSS in one file, tokens first — a single import gets a consumer everything, rather than requiring two separate imports that are easy to forget one of (this bit us for real, debugging the ddp-next integration). Token-only consumption is still available separately via the ./styles/tokens.css export, unaffected by this.
function mergeTokensIntoStylesheet(): Plugin {
  return {
    name: 'merge-tokens-into-stylesheet',
    apply: 'build' as const,
    // Runs after Vite's CSS plugin, which adds styles.css to the bundle in its own generateBundle.
    enforce: 'post' as const,
    // Registers the whole styles folder so `vite build --watch` rebuilds when any Sass file within changes, regardless of its content or structure.
    buildStart() {
      this.addWatchFile(resolve(__dirname, 'styles'));
    },
    generateBundle(options, bundle) {
      // Both output formats share one stylesheet, so only the ES pass merges and writes it; the CJS pass drops its copy (in watch mode Vite only includes the CSS in the first output anyway, and in one-off builds an unmerged copy would overwrite the merged one).
      if (options.format !== 'es') {
        delete bundle['styles.css'];
        return;
      }
      // Merges in memory before Vite writes the file, so nothing is shared or deleted on disk.
      const css = bundle['styles.css'];
      if (!css || css.type !== 'asset') return this.error('Component stylesheet (styles.css) missing from the bundle.');
      // Concatenation order is load-bearing: [data-theme="dark"] and :root have equal specificity, so the tokens (:root, then dark) come first, then base, utilities and components.
      // colors_and_type.scss's @font-face url()s point at ../assets/fonts/, which resolves the same from styles/ (Storybook) and dist/, since both sit next to assets/.
      const tokens = compile(resolve(__dirname, 'styles/colors_and_type.scss')).css;
      const base = compile(resolve(__dirname, 'styles/_base.scss')).css;
      const utilities = compile(resolve(__dirname, 'styles/utilities/index.scss')).css;
      css.source = `${tokens}\n\n${base}\n\n${utilities}\n\n${css.source}`;
      this.emitFile({ type: 'asset', fileName: 'colors_and_type.css', source: tokens });
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
    // Watch rebuilds triggered by non-TS changes (e.g. SCSS) re-emit JS/CSS but vite-plugin-dts skips regenerating types, so clearing dist/ on every rebuild deleted index.d.ts and left ddp-next type-checking against inferred JS. One-off builds (npm run build, prepack) still start from a clean dist/.
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'components/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    // Single combined stylesheet for now (dist/styles.css), matching the single-entry barrel below. To move to true per-component CSS code splitting later: switch `lib.entry` to a map of one entry per component (not just the barrel), set this to `true`, and add matching per-component `styles.css` export subpaths in package.json alongside the existing combined one (additive, non-breaking).
    cssCodeSplit: false,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        assetFileNames: 'styles.css',
        banner: '"use client";',
      },
    },
  },
});
