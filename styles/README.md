# Style layer

Three SCSS files, no emitted CSS — `@use` them freely from any module — plus one JSON export for JS/TS consumers that don't go through Sass at all.

| File | Contains |
|---|---|
| `_tokens.scss` | Typed accessors that emit `var(--ddp-*)`, validated at compile time. Plus raw maps for the few places a literal is required. |
| `_breakpoints.scss` | Breakpoint map and the `media` / `media-below` / `media-between` mixins. |
| `_mixins.scss` | Everything CSS custom properties cannot express at author time. |
| `index.scss` | Barrel. `@forward`s all three. |
| `tokens.json` | The same semantic tokens as `_tokens.scss`, as plain data — `var(--ddp-*)` strings, keyed and grouped to match the Sass accessor functions one-for-one. For JS/TS code with no Sass step at all: `import tokens from '@digital-democracy-project/design-system/styles/tokens.json'`. |

## Why tokens stay CSS custom properties

The values live in `colors_and_type.css` as custom properties, not SCSS variables. That is deliberate:

- **Runtime theming.** `[data-theme="dark"]` reassigns every semantic token at once. SCSS variables compile away and cannot do this.
- **Consumer overrides.** An app can set `--ddp-color-primary` in its own stylesheet with no rebuild of the package.
- **DevTools.** Designers can inspect and change a token live.

The SCSS functions are a *typed interface* over those properties. `color('primary')` emits `var(--ddp-color-primary)` and fails the build if the key does not exist — you get autocomplete-adjacent safety without giving up runtime flexibility.

Reach for `$raw-*` maps only when a value must fold at compile time: media query conditions, colour manipulation, `calc()` that needs to resolve early.

## Usage

```scss
// Button.module.scss
@use '../styles' as *;

.button {
  @include unstyled-button;
  @include transition(background-color, color);
  @include focus-ring;

  display: inline-flex;
  align-items: center;
  gap: space(2);
  padding: space(3) space(5);
  border-radius: radius('md');

  @include type('sm', 'semibold');
}

.primary {
  background: color('primary');
  color: color('primary-foreground');

  &:hover  { background: color('primary-hover'); }
  &:active { background: color('primary-active'); }

  @include disabled;
}

.card {
  @include card('lg', 'sm');
  @include elevate-on-hover;
  padding: space(5);

  @include media('md') {
    padding: space(6);
  }
}
```

## JS/TS token export (`tokens.json`)

For code that never touches Sass — chart libraries, canvas rendering, map layer styling — `tokens.json` mirrors every accessor group above as plain data:

```ts
import tokens from '@digital-democracy-project/design-system/styles/tokens.json';

tokens.color.primary;   // "var(--ddp-color-primary)"
tokens.space['3'];      // "var(--ddp-space-3)"
tokens.scale['2']['tint-foreground'];   // "var(--ddp-scale-2-tint-foreground)"
```

TypeScript infers the exact shape automatically via `resolveJsonModule` (on by default in most modern setups) — no separate `.d.ts` to maintain.

Every value is a `var(--ddp-*)` string, not a resolved color/length — same as the Sass functions, and for the same reason (see above): one export works correctly under both themes because the *browser* resolves the variable against whichever `[data-theme]` is active, not the token file. That means these strings are only meaningful somewhere the CSS cascade applies — safe to hand to `style={{ color: tokens.color.primary }}` or a CSS-in-JS template, **not** safe to hand to a canvas `fillStyle` or a charting library that expects a literal color (those need `getComputedStyle(el).getPropertyValue('--ddp-color-primary')` at render time instead).

The one exception is `tokens.breakpoints` — plain pixel numbers (`{ sm: 480, md: 768, ... }`), because `matchMedia` and JS breakpoint logic can't consume a custom property either way, themed or not.

## Accessors

**Colour** — `palette($hue, $step)` · `color($key)` · `text($key)` · `surface($key)` · `border-color($key)` · `scale($step, $variant)`

**Space and size** — `space()` · `radius()` · `border-width()` · `icon-size()` · `container()`

**Type** — `font-family()` · `font-size()` · `line-height()` · `font-weight()` · `tracking()`

**Other** — `shadow()` · `z()` · `opacity()` · `duration()` · `ease()`

## Mixins

**A11y** — `focus-ring` · `focus-ring-inset` · `visually-hidden` · `motion-safe` · `motion-reduce` · `tap-target`

**Text** — `truncate` · `line-clamp` · `type` · `eyebrow`

**Surface** — `card` · `elevate-on-hover`

**Interaction** — `transition` · `disabled` · `unstyled-button`

**Layout** — `container` · `stack` · `cluster` · `auto-grid` · `media` · `media-below` · `media-between`

**Scroll** — `hide-scrollbar`

## Note on `palette()`

Tier 1 primitives. Avoid in component code — reach for a semantic token instead, or add one if the role you need is missing. Direct palette use bypasses theming and will not respond to dark mode.
