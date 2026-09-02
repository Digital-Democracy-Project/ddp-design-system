# MenuItem

A single option row — presentational only. The interaction wiring (click-to-select, roving `tabIndex`, keyboard highlight) is owned by whatever renders a list of these (`Menu`, composed by `Select` and any future consumer), spread in via `...rest`.

## Usage

`MenuItem` is a building block, not typically used standalone — see `Menu`'s README for real usage.

```tsx
<MenuItem selected={option.value === currentValue} disabled={option.disabled}>
  {option.label}
</MenuItem>
```

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `selected` | `boolean` | — | |
| `disabled` | `boolean` | — | |
| `indicator` | `'check' \| 'checkbox'` | `'check'` | `'check'` shows a bare checkmark that only occupies space when `selected` — right for a single-select list, where only one row is ever marked. `'checkbox'` shows a persistent checkbox square, checked or not — matches the real validated multi-select precedent (the legislative-scorecard hi-fi mockup's `CategoryMenu`), reusing the same box styling `Checkbox`/`ToggleButton`'s `has-checkbox` indicator use. |
| `children` | `ReactNode` | — | The option's label content. |

Everything else is a normal `<div role="option">` prop and passes through untouched. Accepts a `ref` to the underlying element.

## Design notes

- **Highlighted (keyboard-active) state is deliberately not a separate CSS class.** The actively-navigated item receives real DOM focus via the consumer's roving `tabIndex` (Floating UI's `useListNavigation`), so plain `&:focus` styling picks it up for free — matching how a real listbox's "highlighted" state is supposed to work (genuine focus, not a simulated one).
- **`indicator` is picked automatically by `Menu`** based on whether its `selected` prop is a single value or an array — a consumer using `MenuItem` directly (outside `Menu`) sets it explicitly.
