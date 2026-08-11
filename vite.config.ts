import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

// Library-mode build: bundles components/index.ts into ESM + CJS, rolls up
// .d.ts via vite-plugin-dts, and emits one combined stylesheet (dist/style.css)
// for consumers who don't process Sass/CSS Modules themselves. The raw Sass
// source under styles/ is published separately, untouched by this build.
export default defineConfig({
  plugins: [
    react(),
    // Inlines assets/icons/*.svg?react imports into real React components
    // at build time (same mechanism ddp-scorecard-react already uses via
    // this same plugin) — no runtime fetch, no separate icon-font/sprite
    // dependency.
    svgr(),
    dts({
      include: ['components'],
      exclude: ['components/**/*.stories.tsx'],
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'components/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs'),
    },
    // Single combined stylesheet for now (dist/style.css), matching the
    // single-entry barrel below. To move to true per-component CSS code
    // splitting later: switch `lib.entry` to a map of one entry per
    // component (not just the barrel), set this to `true`, and add
    // matching per-component `styles.css` export subpaths in package.json
    // alongside the existing combined one (additive, non-breaking).
    cssCodeSplit: false,
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        // Without this, Vite falls back to deriving the CSS asset name from
        // package.json's "name" (producing design-system.css) now that
        // lib.name isn't set. Pinning it explicitly keeps it decoupled from
        // the package name and matching the ./styles.css export below.
        assetFileNames: 'style.css',
      },
    },
  },
});
