# Icon

Renders one of the design system's self-hosted SVG icons by name.

## Usage

```tsx
import { Icon } from '@digital-democracy-project/design-system';

<Icon name="chevron-down" />
<Icon name="check" size="sm" />
<Icon name="close" title="Close" />
```

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `name` | `string` | — (required) | The icon's filename without `.svg` — see `assets/icons/` for the full source set. Discovered automatically at build time, so this isn't a validated literal type; a typo won't be caught until runtime (the icon just won't render — a console warning fires in development). |
| `size` | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| number` | `'md'` | Named steps map to the `--ddp-icon-size-*` tokens; a number is a raw-pixel escape hatch. |
| `title` | `string` | — | Accessible label. Omit for decorative icons (the common case next to visible text) — the icon gets `aria-hidden`. Provide it and the icon gets `role="img"` + `aria-label` instead. |

Any other SVG prop is passed through to the root `<svg>`.

## Adding a new icon

Drop a standardized SVG (see the existing files in `assets/icons/` for the convention — `fill="currentColor"` or `stroke="currentColor"`, no explicit `width`/`height`, no design-tool cruft) into `assets/icons/`. It's picked up automatically — no import statement or registry entry to add. Storybook's icon-picker dropdown (`Icon.stories.tsx`) is a separate, manually-maintained list purely for that control's UI; update it too if you want the new icon to show up there, but nothing functional depends on it.

## Color

Most icons use `currentColor` — they inherit color from the surrounding text via ordinary CSS, same as any component using `color()`/`-foreground` tokens. `democrat` and `republican` are the deliberate exception: they're fixed to `--ddp-color-democratic`/`--ddp-color-republican` (with a static fallback matching each token's current light-theme value) and don't respond to `currentColor`, since party identity colors are never supposed to shift with context.

## Not available through this component

`thumb-up`/`thumb-down` remain in `ddp-scorecard-react` for now — genuine two-color icons that don't fit this component's single-recolorable-color model. Possible future enhancement.
