# ToggleButton

A real `<button aria-pressed>` with two shapes, validated against two independently-built real references:

- Omitting `indicator` — a plain pill, solid-filled with `tone`'s color when pressed. Matches `ddp-scorecard-react`'s `ToggleChip` and the `ChipToggle` in the "Filter - Hi-fi (Direction D)" mockup in Claude Design (the basis for the legislator-page filters on digitaldemocracyproject.org) — used for multi-select-style chips (e.g. picking one or more years/sessions).
- `indicator="checkbox"` — a rounded rect with a small decorative checkbox square, soft/tint-filled with `tone`'s color when pressed. Matches `ddp-scorecard-react`'s `CheckboxItem` (button mode) and the mockup's own `ToggleButton` — used for independent boolean flags (e.g. "hide voice votes").

Both real references consistently pair a shape with a fill treatment, so `indicator` drives both together rather than exposing them as independent props — there's no validated case that mixes them.

## Usage

```tsx
import { ToggleButton } from '@digital-democracy-project/design-system';

<ToggleButton indicator="checkbox" pressed={hideVoice} onPressedChange={setHideVoice}>
  Hide voice votes
</ToggleButton>

<ToggleButton tone="secondary" pressed={years.includes('2025')} onPressedChange={() => toggle('2025')}>
  2025
</ToggleButton>
```

## Props

| Prop                         | Type                                                  | Default                     | Notes                                                                                                                                                                                                                                                               |
| ---------------------------- | ----------------------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pressed` / `defaultPressed` | `boolean`                                             | —                           | Controlled/uncontrolled, same convention as `Checkbox`'s `checked`/`defaultChecked`.                                                                                                                                                                                |
| `onPressedChange`            | `(pressed: boolean) => void`                          | —                           |                                                                                                                                                                                                                                                                     |
| `tone`                       | `'neutral' \| 'primary' \| 'secondary' \| 'tertiary'` | `'primary'`                 | Same vocabulary as `Badge`'s `tone`. `'neutral'` has no dedicated brand color token (same reasoning as `Badge`), so its pressed state inverts using `text()`/`surface()` tokens instead of a `color()` value — monochrome by design, not a guessed "neutral color." |
| `size`                       | `'sm' \| 'md' \| 'lg'`                                | `'md'`                      | Same padding/font scale as `Button`, so the two sit comfortably in the same row.                                                                                                                                                                                    |
| `indicator`                  | `'checkbox'`                                          | — (omit for the plain pill) | See above — not a peer shape, just present or absent.                                                                                                                                                                                                               |
| `children`                   | `ReactNode`                                           | —                           | The button's label.                                                                                                                                                                                                                                                 |

Everything else is a normal `<button>` prop and passes through untouched. Accepts a `ref` to the underlying `<button>` element.

## Design notes

- **Always a real `<button>`, never a native checkbox input** — even with `indicator="checkbox"`. Both real references implement it this way (a `<button>` containing a decorative square, not a `<label>`+`<input type="checkbox">`), and semantically this is a toggle action (`aria-pressed`), not a form field that submits a value. Reach for `Checkbox` instead when you actually need a real checkbox input (e.g. inside a `<form>`).
- **The checkbox square always solid-fills when pressed**, even though the button's own background only soft/tints — matches both real references exactly (the outer chip tints, but the inner square goes fully solid), and mirrors `Checkbox`'s own box treatment.
- **Not addressed here**: whether individual `ToggleButton`s represent a mutually-exclusive selection (e.g. a segmented control) or independent flags — that's a consumer-level grouping concern, not something this component structurally distinguishes. A `ToggleButtonGroup` wrapper for the mutually-exclusive case is a possible future addition, not built yet.
