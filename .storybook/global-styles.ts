// Loaded via previewAnnotations in main.ts rather than imported by preview.tsx, so preview.tsx stays free of Sass imports and tools that bundle its decorators on their own (the Claude Design sync) can compile it.
import '../styles/colors_and_type.scss'
// Not part of the tokens file itself (see styles/_base.scss for why it's a separate partial); loaded here directly because Storybook bypasses vite.config.ts's dist/styles.css assembly.
import '../styles/_base.scss'
import '../styles/utilities/index.scss'
