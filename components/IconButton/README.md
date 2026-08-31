# IconButton

A real `<button>` whose only content is a single centered icon. Deliberately opinionated and single-purpose — unlike `Button`, there's no children/slot composition; the icon is a required prop, not something you compose in.

## Usage

```tsx
import { IconButton } from '@digital-democracy-project/design-system';

<IconButton iconName="close" aria-label="Clear" />
<IconButton iconName="check" theme="primary" padding={8} aria-label="Confirm" />
```

`aria-label` is **required**, not optional — there's no visible text label, so it's the only accessible name a screen reader gets.

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `iconName` | `string` | — (required) | Which icon to render — see `assets/icons/` for the full source set. |
| `iconSize` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number` | `'md'` | Maps to `Icon`'s own `size`. |
| `iconColor` | `string` | — | Sets the icon's CSS `color` directly. Named `iconColor`, not `iconFill` — icons use `fill="currentColor"` internally, which tracks the CSS `color` property, not the SVG `fill` attribute; a raw `fill` override wouldn't actually recolor them. |
| `theme` | `'none' \| 'primary' \| 'secondary' \| 'tertiary'` | `'none'` | `none` is transparent with a muted icon color (darkening on hover) — the only treatment validated against a real reference so far. The brand themes are solid-filled, same color pairing as `Button`'s solid variant. `iconColor` overrides whatever the theme sets. |
| `padding` | `string \| number` | `0` | No padding by default — matches the one validated reference exactly (a bare icon, no visible chrome). Add explicitly for more breathing room, e.g. with a brand `theme`. |
| `width` / `height` | `string \| number` | — (sized to content) | |
| `fill` | `boolean` | `false` | Stretch to 100% of the parent's box instead of sizing to content. Opt-in, not the default — depends on the parent being predictably sized (e.g. a fixed-height wrapper like `TextInput`'s). |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Same reasoning as `Button`: defaults away from the browser's implicit `'submit'`. |

Everything else is a normal `<button>` prop and passes through untouched. Accepts a `ref` to the underlying `<button>` element. Uses the `tap-target` mixin for an invisible, accessible hit-area expansion regardless of visual size — so a zero-padding icon button is still a reasonable target to tap, not just visually tight.

## Not built in

No colored/tinted variants beyond `primary`/`secondary`/`tertiary` — same "ship what's validated" rule as everywhere else in this library.
