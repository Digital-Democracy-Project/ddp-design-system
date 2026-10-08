# Card

A generic styled container — nothing more. This is a design-system primitive, not a domain-specific component: whatever content goes inside it (composed from `Card` plus other pieces like `Badge`, `Button`, `Icon`, plain text) is entirely up to the consumer, in their own app.

## Usage

```tsx
import { Card } from '@digital-democracy-project/design-system';

<Card>
  <h3>Title</h3>
  <p>Body copy.</p>
</Card>

<Card interactive onClick={() => navigate(item.href)}>
  A clickable list row.
</Card>
```

## Props

| Prop               | Type        | Default | Notes                                                                                                                                                                                                                                                                   |
| ------------------ | ----------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `interactive`      | `boolean`   | —       | Raises the card's elevation on hover (`shadow('sm')` → `shadow('md')`) — for a card used as a clickable list row. Off by default; a static card shouldn't imply it's clickable.                                                                                         |
| `contentClassName` | `string`    | —       | Class for the inner content element. Every Card style (chrome and content) is a zero-specificity default, so this — a spacing utility like `pa-5`, or a module class — overrides padding, color or type with plain CSS; `className` does the same for the outer chrome. |
| `children`         | `ReactNode` | —       | Anything.                                                                                                                                                                                                                                                               |

Everything else is a normal `<div>` prop and passes through untouched (e.g. `onClick`, if you're making the whole card clickable yourself).

## Design notes

- **Chrome and content are two separate elements** (`ddp-card` for background/border/radius/shadow, `ddp-card-content` for padding and baseline typography) — not one class doing both. This leaves room for a later addition, like a full-bleed header image or a divider-separated footer section, to sit outside the padded body without needing a breaking restructure.
- **Reuses the existing `card()` Sass mixin directly** (`surface('raised')` background, 1px `border-color('default')`, `radius('lg')`, `shadow('sm')`) rather than re-declaring that recipe — already the settled, validated look, independently confirmed by the Claude Design project's own documented "Visual foundations → Cards" notes.
- **No polymorphic `as="a"` rendering** — always a `<div>`. An `onClick` placed directly on `Card` itself (as in the `interactive` example above) already covers the whole padded surface via normal event bubbling — but a _nested_ `<a>` wrapping just `children` would not: that anchor's own box only ever fills the content-box it's laid out in, never reaching outward into `Card`'s own padding.
- **`interactive` vs. `ClickableTile`** — both exist because they solve different shapes. `interactive` is a purely visual affordance (the hover-raise) on a `<div>` that's still exactly as accessible as whatever the consumer wires up themselves; it doesn't add keyboard support, a focus ring, or `role` on its own. Reach for it when the row also needs to contain another independently-interactive element — a "…" menu button, a favorite-toggle icon — since a real `<a>`/`<button>` (which is what `ClickableTile` renders) can't legally nest another interactive element inside it. Reach for `ClickableTile` instead when the _entire_ card is the one clickable thing and nothing inside it needs its own separate click target — it gets native keyboard activation, a visible focus ring, a real tab stop, and (when it's a link) proper `<a>` semantics — `Cmd`/middle-click to open in a new tab, "copy link," screen-reader announcement as a link — for free, none of which a plain `<div onClick>` provides without being hand-built.
- **No domain-shaped variants, ever** — this package is a generic design system, not the DDP website. A bill list, a legislator profile, or any other DDP-specific card content is composed by the consuming app from `Card` and this package's other generic components — not something this package names, shapes, or grows toward.
