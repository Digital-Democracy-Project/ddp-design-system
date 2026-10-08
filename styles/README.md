# Style layer

Three groups, split by what they actually do — not just files sitting in the same directory:

**`core/` — zero-CSS Sass, `@use` freely from any module.**

| File                     | Contains                                                                                                                                                                                                                    |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `core/_tokens.scss`      | Typed accessors that emit `var(--ddp-*)`, validated at compile time. Plus raw maps for the few places a literal is required.                                                                                                |
| `core/_breakpoints.scss` | Width queries from the one width scale (`$raw-widths`, xs–2xl): `container-min` / `container-below` / `query-container` for component layouts, `media` / `media-below` / `media-between` (width + gutters) for page chrome. |
| `core/_mixins.scss`      | Everything CSS custom properties cannot express at author time.                                                                                                                                                             |
| `core/index.scss`        | Barrel. `@forward`s the three above.                                                                                                                                                                                        |

**Real, applied CSS — not `@use`-able, reaches consumers via a build step or a direct import, never via `core/index.scss`.**

| File                   | Contains                                                                                                                                                                                                                                                                                                                                                         |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `colors_and_type.scss` | The actual token _values_ as CSS custom properties (`--ddp-color-primary: #F85828`, etc.), plus `@font-face` declarations and the dark-theme override block. `core/`'s accessor functions don't read this file at compile time; they just emit `var()` references validated against a hardcoded list of allowed keys, kept in sync with this file by convention. |
| `_base.scss`           | The box-sizing reset and the opt-in `.ddp` base element styles. Forwarding either of these through `core/index.scss` would mean every consumer component using `@use '.../styles' as *;` silently re-emits them into their own compiled output — see the file's own header comment.                                                                              |

Both reach the published `dist/styles.css` via `vite.config.ts`'s build step, and Storybook via their own direct imports in `.storybook/preview.tsx` — the same two paths, for the same reason.

**Data export — for code with no Sass step at all.**

| File          | Contains                                                                                                                                                                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `tokens.json` | The same semantic tokens as `core/_tokens.scss`, as plain data — `var(--ddp-*)` strings, keyed and grouped to match the Sass accessor functions one-for-one. `import tokens from '@digital-democracy-project/design-system/styles/tokens.json'`. |

## Why tokens stay CSS custom properties

The values live in `colors_and_type.scss` as custom properties, not SCSS variables. That is deliberate:

- **Runtime theming.** `[data-theme="dark"]` reassigns every semantic token at once. SCSS variables compile away and cannot do this.
- **Consumer overrides.** An app can set `--ddp-color-primary` in its own stylesheet with no rebuild of the package.
- **DevTools.** Designers can inspect and change a token live.

The SCSS functions are a _typed interface_ over those properties. `color('primary')` emits `var(--ddp-color-primary)` and fails the build if the key does not exist — you get autocomplete-adjacent safety without giving up runtime flexibility.

Reach for `$raw-*` maps only when a value must fold at compile time: media query conditions, colour manipulation, `calc()` that needs to resolve early.

## Usage

```scss
// Button.scss
@use '@digital-democracy-project/design-system/styles' as *;

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

	&:hover {
		background: color('primary-hover');
	}
	&:active {
		background: color('primary-active');
	}

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

## Opt-in base element styles

`_base.scss`'s heading/body/link/`.eyebrow`/`.section-label` treatments (everything past the unconditional box-sizing reset) only apply under a `.ddp` or `body.ddp` ancestor class — they're not global. A component in this package never needs this (each one styles its own scoped classes directly), but a consumer rendering plain HTML/Markdown content, or content assembled outside this package's own components, needs to add `class="ddp"` to a wrapping element (or `body`) to get any of it — without that wrapper, `.eyebrow`/`.h1`/`.small`/etc. classes are present in the compiled stylesheet but silently do nothing where they're used.

## JS/TS token export (`tokens.json`)

For code that never touches Sass — chart libraries, canvas rendering, map layer styling — `tokens.json` mirrors every accessor group above as plain data:

```ts
import tokens from '@digital-democracy-project/design-system/styles/tokens.json'

tokens.color.primary // "var(--ddp-color-primary)"
tokens.space['3'] // "var(--ddp-space-3)"
tokens.scale['2']['tint-foreground'] // "var(--ddp-scale-2-tint-foreground)"
```

TypeScript infers the exact shape automatically via `resolveJsonModule` (on by default in most modern setups) — no separate `.d.ts` to maintain.

Every value is a `var(--ddp-*)` string, not a resolved color/length — same as the Sass functions, and for the same reason (see above): one export works correctly under both themes because the _browser_ resolves the variable against whichever `[data-theme]` is active, not the token file. That means these strings are only meaningful somewhere the CSS cascade applies — safe to hand to `style={{ color: tokens.color.primary }}` or a CSS-in-JS template, **not** safe to hand to a canvas `fillStyle` or a charting library that expects a literal color (those need `getComputedStyle(el).getPropertyValue('--ddp-color-primary')` at render time instead).

The one exception is `tokens.breakpoints` — plain pixel numbers, the media-query breakpoints (each container width plus both gutters: `{ xs: 448, sm: 688, md: 888, ... }`), because `matchMedia` and JS breakpoint logic can't consume a custom property either way, themed or not.

## Accessors

**Colour** — `palette($hue, $step)` · `color($key)` · `text($key)` · `surface($key)` · `border-color($key)` · `scale($step, $variant)`

**Space and size** — `space()` · `radius()` · `border-width()` · `icon-size()` · `container()`

**Type** — `font-family()` · `font-size()` · `line-height()` · `font-weight()` · `tracking()`

**Other** — `shadow()` · `z()` · `opacity()` · `duration()` · `ease()`

## Mixins

**A11y** — `focus-ring` · `focus-ring-inset` · `visually-hidden` · `motion-safe` · `motion-reduce` · `tap-target`

**Text** — `truncate` · `line-clamp` · `type` · `eyebrow` · `section-label`

**Surface** — `card` · `elevate-on-hover`

**Interaction** — `transition` · `disabled` · `unstyled-button`

**Layout** — `container` · `stack` · `cluster` · `auto-grid` · `media` · `media-below` · `media-between`

**Scroll** — `hide-scrollbar`

## Note on `palette()`

Tier 1 primitives. Avoid in component code — reach for a semantic token instead, or add one if the role you need is missing. Direct palette use bypasses theming and will not respond to dark mode.
