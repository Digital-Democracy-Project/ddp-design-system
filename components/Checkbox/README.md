# Checkbox

A real `<input type="checkbox">`, visually hidden and paired with a custom-styled box + checkmark driven off its own native state.

## Usage

```tsx
import { Checkbox } from '@digital-democracy-project/design-system';

<Checkbox defaultChecked>Hide voice votes</Checkbox>
<Checkbox checked={checked} onChange={setChecked}>Hide voice votes</Checkbox>
<Checkbox indeterminate>Select all</Checkbox>
<Checkbox error errorMessage="You must accept the terms to continue.">I accept the terms</Checkbox>
```

## Props

| Prop                         | Type                         | Default | Notes                                                                                                                                                                                                                                                                                                                           |
| ---------------------------- | ---------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `checked` / `defaultChecked` | `boolean`                    | —       | Controlled/uncontrolled, same convention as `TextInput`'s `value`/`defaultValue`.                                                                                                                                                                                                                                               |
| `onChange`                   | `(checked: boolean) => void` | —       | Plain boolean, not a native event — matches `TextInput`'s plain-value convention.                                                                                                                                                                                                                                               |
| `indeterminate`              | `boolean`                    | —       | A DOM property, not an HTML attribute, so it can't be set via JSX — synced onto the real input imperatively via a ref + `useEffect`. Purely visual (a dash instead of a checkmark); doesn't affect `checked` or what `onChange` reports next.                                                                                   |
| `size`                       | `'sm' \| 'md' \| 'lg'`       | `'md'`  | Box is `space(3/4/5)` (12/16/20px); label text is one font-size/line-height step down from the size name (`sm`→`xs` text, `md`→`sm` text, `lg`→`md` text) — a checkbox reads as too heavy next to its label at the same scale a standalone text input or button uses. All borrowed from the existing scale, no new size tokens. |
| `error`                      | `boolean`                    | —       |                                                                                                                                                                                                                                                                                                                                 |
| `errorMessage`               | `string`                     | —       | Only rendered when `error` is also true.                                                                                                                                                                                                                                                                                        |
| `children`                   | `ReactNode`                  | —       | The label content, rendered inside the same `<label>` as the box. Omit for an icon-only/unlabeled use (e.g. a table row selector) and pass `aria-label` instead — same "provide one or the other" contract `Icon`'s `title` prop follows.                                                                                       |

Everything else is a normal `<input>` prop and passes through untouched (`name`, `value`, `required`, etc. — native checkbox inputs don't use `value` for their own state, `checked` does that job). Accepts a `ref` to the underlying `<input>` element.

## Design notes

- **No generated `id`/`htmlFor`.** The input, box, and label text all nest inside one `<label>` element, so clicking anywhere in the row (box or text) toggles the input via native label-click delegation — no id plumbing needed, unlike a case where the label and control can't be nested.
- **State is CSS-driven off the real input**, not mirrored into JS-computed classes: `.box`'s checked/indeterminate/focus-visible/disabled appearance all come from sibling selectors off the hidden input's own native pseudo-classes (`:checked`, `:indeterminate`, `:focus-visible`, `:disabled`). The real DOM checkbox stays the single source of truth.
- **The indeterminate dash is drawn with CSS**, not a source icon — there's no minus/dash glyph in `assets/icons/` yet, and adding one felt like overkill for a single state of one component. Revisit if a real second use case for a dash/minus icon shows up.
- **Visually hidden, never `display: none`** — the input stays focusable and keeps being announced correctly by assistive tech; only its visual box is replaced.
- **The checkmark fills the box edge-to-edge** (icon size == box size, no internal padding) — matches the real, shipped reference in `ddp-scorecard-react`'s `CheckboxItem` (button mode: a 17×17px box, icon at `width:100%; height:100%`), not a guessed proportion.
