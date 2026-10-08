# Button

A real `<button>`. Three brand color variants (`solid` or `outline`), plus a fourth `link` treatment that looks like an inline hyperlink.

## Usage

```tsx
import { Button } from '@digital-democracy-project/design-system';

<Button>Save</Button>
<Button variant="secondary" size="lg">Cancel</Button>
<Button variant="tertiary" disabled>Submitting…</Button>
<Button variant="link">Learn more</Button>
```

## Props

| Prop           | Type                                                                                              | Default                                  | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| -------------- | ------------------------------------------------------------------------------------------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`      | `'primary' \| 'secondary' \| 'tertiary' \| 'link'`                                                | `'primary'`                              | The three brand variants are solid-filled. `link` looks and behaves exactly like a text link — the same `link()` recipe as the base `<a>` styling (color, underline, focus ring), inline and wrapping, type inherited from context — but stays a real `<button>`, so screen readers still announce it as a button. Use it for actions that should _read_ like a link without misrepresenting what they do, like show more/less toggles.                                                                                                                                                                                         |
| `size`         | `'sm' \| 'md' \| 'lg' \| 'inherit'`                                                               | `'inherit'` for `link`, `'md'` otherwise | `sm`/`md`/`lg`: the design system sets font size, padding and icon/label gap. `inherit`: the consumer does — type inherits from context (or the consumer's `className`), padding and gap scale with it in em at `md`'s proportions, and all of it is zero-specificity so a `className` overrides it regardless of stylesheet order.                                                                                                                                                                                                                                                                                             |
| `underline`    | `'hover' \| 'always' \| 'none'`                                                                   | `'hover'`                                | `link` only: when the underline shows. `none` is only for links whose context already reads as interactive (buttons, cards, nav), never inside running text.                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `type`         | `'button' \| 'submit' \| 'reset'`                                                                 | `'button'`                               | Defaults away from the browser's implicit `'submit'`, which is a common source of accidental form submits from a stray button inside a `<form>`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `disabled`     | `boolean`                                                                                         | —                                        | Native attribute; also honors `aria-disabled="true"` for cases where you need a visually- and interactively-disabled state without removing it from the tab order.                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `appearance`   | `'solid' \| 'outline'`                                                                            | `'solid'`                                | `outline` swaps to a transparent background with a border and text in the variant's color, filled with that variant's tint token on hover/active. Has no effect on `variant="link"` — it has no color of its own to outline.                                                                                                                                                                                                                                                                                                                                                                                                    |
| `customColors` | `{ background: string; foreground: string; backgroundHover?: string; backgroundActive?: string }` | —                                        | Escape hatch for any color scheme outside the four variants. Overrides `variant`'s color only — shape (padding, radius, the `link` treatment, the `outline` border) still comes from `variant`/`appearance`. `backgroundHover`/`backgroundActive` fall back to `background` if omitted. On `variant="link"`, only the base foreground is customizable — the background stays transparent and the hover color shift stays the built-in link-hover tone. Combined with `appearance="outline"`, the border takes the custom foreground color, and there's no hover/active fill (no separate "custom tint" value to draw one from). |

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

- **Loading state** — needs a `Spinner` component, which doesn't exist yet.
- **Rendering as a link (`<a>`)** — that's a separate, not-yet-built `Link` component. Button stays a real `<button>` always, for correct native keyboard/AT behavior.
