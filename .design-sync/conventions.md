## Setup

No wrapping provider is required — `Button`, `Badge`, and `Icon` render correctly standalone. Load the one stylesheet (`styles.css`) and everything works — it ships both the token definitions and the compiled component CSS together already, tokens first. Dark mode is a `data-theme="dark"` attribute on any ancestor element (`<body>` or a page-level wrapper) — it remaps the same token names; there are no separate dark-mode component variants to reach for.

## Styling idiom: design tokens via `var(--ddp-*)`, components via props

This is a token system, not a utility-class system. Never invent class names — there are none to write against. Two layers:

1. **Compose the library's own components via their props** — that's the whole styling surface for `Button`/`Badge`/`Icon` themselves:
   - `Button`: `variant` (`primary` | `secondary` | `tertiary` | `link`), `appearance` (`solid` | `outline` — `outline` has no effect on `variant="link"`), `size` (`sm` | `md` | `lg`), `customColors` (`{background, foreground, backgroundHover?, backgroundActive?}` — escape hatch beyond the four variants).
   - `Badge`: `tone` (`neutral` | `primary` | `secondary` | `tertiary`), `appearance` (`soft` | `solid`), `size`, `customColors` (`{background, foreground}`).
   - `Icon`: `name` (string — see the bound icon set), `size` (`xs`|`sm`|`md`|`lg`|`xl` or a raw pixel number), `title` (accessible label; omit for decorative use).
2. **For your own layout glue** (spacing between components, containers, page structure) — reach directly for the real tokens as `var(--ddp-*)`, e.g.:
   - Spacing: `--ddp-space-{0,px,0-5,1,1-5,2,3,4,5,6,8,10,12,16,20,24,32}` (a 4px-based scale)
   - Color roles: `--ddp-color-{primary,secondary,tertiary}` (+ `-hover`, `-active`, `-tint`, `-tint-foreground`, `-foreground` suffixes)
   - Radius: `--ddp-radius-{none,xs,sm,md,lg,xl,2xl,full}`
   - Type: `--ddp-font-size-{2xs…7xl}`, `--ddp-font-family-{sans,serif,mono}`

Never hardcode a color/spacing/radius literal when composing a layout around these components — there's a named token for it.

## Where the truth lives

Read `styles.css` (and what it `@import`s) before styling anything — it's the actual, current token/component CSS, more reliable than this summary. Each component's own `.prompt.md` has its full prop reference and usage examples.

## Example

```jsx
<div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ddp-space-2)' }}>
  <Button variant="primary">
    <Icon name="check" size="sm" />
    Confirm
  </Button>
  <Badge tone="positive" appearance="soft">Active</Badge>
</div>
```
