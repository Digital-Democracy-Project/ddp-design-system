# ClickableTile

A card-shaped surface whose entire box — chrome and padding alike — is one clickable hit target. Renders as a real `<a>` (or an injected router `Link`) when `href` is given, a real `<button>` otherwise. Unlike `Card`, there's no separate content element: by definition the whole thing is clickable, so nothing needs to sit outside the padded area.

## Usage

```tsx
import { ClickableTile } from '@digital-democracy-project/design-system';

<ClickableTile onClick={() => doSomething()}>
  <h3>Title</h3>
  <p>Body copy.</p>
</ClickableTile>

<ClickableTile href="/some/path">
  A link tile — the whole surface, padding included, navigates.
</ClickableTile>

// Next.js: render with next/link for client-side routing.
import Link from 'next/link';
<ClickableTile href="/some/path" as={Link}>
  Uses next/link instead of a plain <a>.
</ClickableTile>
```

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `href` | `string` | — | Renders as a link instead of a button. Anchor-only native props (`target`, `rel`, etc.) are only available when `href` is set. |
| `as` | `ComponentType` | `'a'` | Link-only. Swap in a router's `Link` component (Next.js's `Link`, for example) instead of a native `<a>`, for client-side routing. Must accept `href`, `className`, `children`, and forward a ref to the underlying `<a>`. React Router's `Link` takes `to` instead of `href` — wrap it in a small adapter component that renames the prop before passing it here. |
| `disabled` | `boolean` | — | Dims the tile, removes it from the tab order, and blocks clicks — works the same for both render paths. |
| `children` | `ReactNode` | — | Anything. |

Everything else passes straight through to the underlying `<a>`/`Link`/`<button>` (e.g. `onClick`, `target`, `rel`).

## Design notes

- **A single element, not `Card`'s chrome/content split.** `Card` separates `.ddp-card` (chrome) from `.ddp-card-content` (padding) because content might reasonably need to sit outside a padded, clickable area — a future header image, a footer divider. `ClickableTile` has no such case: the entire box, padding included, is one hit target by definition, so chrome and padding live on the same element.
- **This is the answer to "I want the whole card, padding included, to be a link."** Wrapping a `<div>`'s children in an `<a>` (e.g. inside `Card`) can't make the parent's own padding clickable — a nested anchor can only ever fill the content-box it's laid out in, never expand outward into an ancestor's padding. `ClickableTile` sidesteps that by putting the link/button as the outermost, padded element itself.
- **Always fully interactive — no `interactive` prop.** `Card`'s hover-raise is opt-in because a `Card` is often just a static box. A `ClickableTile` is never static; the elevate-on-hover treatment is unconditional.
- **Disabled anchors use `aria-disabled` + `tabIndex={-1}`, not a dropped `href`.** Real `<a>` elements have no native `disabled` attribute. Since `href` stays intact (an injected router `Link` may not tolerate it being removed), disabling relies on `aria-disabled`, `tabIndex={-1}`, and the existing `disabled()` mixin's `pointer-events: none` — the same mechanism already used everywhere else in this library.
- **Same generic-only scope as `Card`** — no domain-shaped variants, ever. Whatever content goes inside is the consuming app's composition.
