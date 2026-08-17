# Button

A real `<button>` with four visual treatments.

## Usage

```tsx
import { Button } from '@digital-democracy-project/design-system';

<Button>Save</Button>
<Button variant="secondary" size="lg">Cancel</Button>
<Button variant="tertiary" disabled>Submitting…</Button>
<Button variant="link">Learn more</Button>
```

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'tertiary' \| 'link'` | `'primary'` | The three brand variants are solid-filled. `link` looks like an inline hyperlink — same color and hover-only underline as the base `<a>` styling in `colors_and_type.css` — but stays a real `<button>`, so screen readers still announce it as a button, not a link. Use it for actions that should *read* like a link without misrepresenting what they do. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Controls padding, font size, and icon/label gap. `link` ignores the padding (no padded hit-area, matching a real inline link) but still scales font size. |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Defaults away from the browser's implicit `'submit'`, which is a common source of accidental form submits from a stray button inside a `<form>`. |
| `disabled` | `boolean` | — | Native attribute; also honors `aria-disabled="true"` for cases where you need a visually- and interactively-disabled state without removing it from the tab order. |
| `customColors` | `{ background: string; foreground: string; backgroundHover?: string; backgroundActive?: string }` | — | Escape hatch for any color scheme outside the four variants. Overrides `variant`'s color only — shape (padding, radius, the `link` treatment) still comes from `variant`. `backgroundHover`/`backgroundActive` fall back to `background` if omitted. On `variant="link"`, only the base foreground is customizable — the background stays transparent and the hover color shift stays the built-in link-hover tone. |

Everything else is a normal `<button>` prop (`onClick`, `aria-*`, etc.) and passes through untouched. Accepts a `ref` to the underlying `<button>` element.

## Composing with Icon

There's no `iconLeft`/`iconRight` prop — pass `Icon` as a child alongside the label and the button's internal flex layout (`gap` scaled by `size`) handles spacing:

```tsx
<Button>
  <Icon name="check" size="sm" />
  Confirm
</Button>
```

## Not yet supported

- **Outline/ghost treatments** — every filled variant is solid; no bordered-transparent option yet. Not seen in any validated mockup so far, so not built speculatively.
- **Loading state** — needs a `Spinner` component, which doesn't exist yet.
- **Rendering as a link (`<a>`)** — that's a separate, not-yet-built `Link` component. Button stays a real `<button>` always, for correct native keyboard/AT behavior.
