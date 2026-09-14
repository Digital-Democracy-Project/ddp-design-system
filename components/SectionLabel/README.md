# SectionLabel

A quiet, small uppercase text label — for a field label, a section heading above a block of content, or inline record-meta. Same tracked/bold/uppercase treatment as the `eyebrow` mixin/class, one size step down (`2xs`) and muted by default (`text('subtle')`) instead of loud page-overline orange.

## Usage

```tsx
import { SectionLabel } from '@digital-democracy-project/design-system';

<SectionLabel>Jurisdiction</SectionLabel>
<SectionLabel tone="primary">HR 5587</SectionLabel> · <SectionLabel tone="primary">Federal</SectionLabel>
```

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `tone` | `'subtle' \| 'neutral' \| 'primary' \| 'secondary' \| 'tertiary'` | `'subtle'` | `'subtle'` is the quiet field/section-label look this component exists for. `'neutral'` is the same look at full-strength text color. `'primary'`/`'secondary'`/`'tertiary'` are for brand-colored inline record-meta (e.g. a bill number, a category tag) — same brand vocabulary as `Badge`'s own `tone`. |
| `children` | `ReactNode` | — | Anything. |

Everything else is a normal `<span>` prop and passes through untouched.

## Design notes

- **Not the page overline.** The louder, `xs`-sized, primary-colored page-overline treatment (labelling the context above a page heading — e.g. "2025–26 SESSION") is the `eyebrow` mixin/`.ddp .eyebrow` class in `styles/`, unchanged. `SectionLabel` is specifically the smaller, quieter role that treatment doesn't cover — a field label, a column header, a section heading above a block of filters or content. Two different roles, two different names, not one component with a size prop trying to be both.
- **Built on the `section-label()` Sass mixin** (`styles/core/_mixins.scss`), the same one available directly to any of this package's own `.scss` files via `@include section-label();` — this component exists for React consumers who'd rather not hand-write a stylesheet for one label, not as a replacement for the mixin.
- **`tone` is a peer-choice axis** — every value, including `'subtle'`, gets its own explicit class (`ddp-section-label-subtle`, etc.), same convention `Badge`'s own `tone` prop follows.
- **No size prop.** The role is fixed at `2xs` by definition — that's exactly what distinguishes it from `eyebrow`'s `xs`. A future need for a different scale would be a different, explicitly-named treatment, not a size variant bolted onto this one.
- **No domain-shaped variants** — same generic-only scope as every other component here. What text goes inside, and what it labels, is entirely the consuming app's concern.
- **TODO: always a `<span>`, no polymorphic element yet.** Real usage will commonly want `SectionLabel` to actually be an `h1`–`h6` (it's frequently the heading of the section it labels, not just decoration next to one) — logged as a near-term follow-up (an `as` prop), not built yet, same "wait for a validated need" precedent `Card`/`ClickableTile` followed before adding their own polymorphism.
