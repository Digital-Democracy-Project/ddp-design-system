# Badge

A generic, non-interactive label pill. Always a `<span>` — never focusable or
clickable. (An interactive, selectable pill — like a filter chip — is a
different component, built on the Toggle button/group primitive, not this
one.)

## Usage

```tsx
import { Badge } from '@digital-democracy-project/design-system';

<Badge>Draft</Badge>
<Badge tone="primary">New</Badge>
<Badge tone="secondary" appearance="solid" size="lg">Featured</Badge>
```

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `tone` | `'neutral' \| 'primary' \| 'secondary' \| 'tertiary'` | `'neutral'` | Deliberately just the brand roles plus a token-backed neutral default — not a valence/status/grade vocabulary. See "Not built in" below. |
| `appearance` | `'soft' \| 'solid'` | `'soft'` | `solid` only has a real effect on `primary`/`secondary`/`tertiary` — `neutral` has no dedicated safe-foreground-on-solid token, so it stays soft regardless of `appearance`. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls padding and font size. |
| `customColors` | `{ background: string; foreground: string }` | — | Escape hatch for any color outside the four built-in tones. Sets background/foreground directly as inline styles; takes priority over `tone`/`appearance` when provided. |

Everything else is a normal `<span>` prop and passes through untouched.

## Not built in: valence/grade semantics

Badge has no `positive`/`negative`/`caution`/`info` or ordinal-grade (1–5)
color mapping. A `ValencePill`, `GradeChip`, or similar component that needs
that kind of domain-specific color logic should be built separately, wrapping
this component and choosing an explicit color (via `tone` or `customColors`)
rather than Badge guessing at meaning from a status/grade value.
