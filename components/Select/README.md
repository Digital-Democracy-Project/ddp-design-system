# Select

A single-select dropdown. Reads visually as a form field (same box language as `TextInput`), not an action — matches the one real native `<select>` precedent found in `ddp-next`.

## Usage

```tsx
import { Select } from '@digital-democracy-project/design-system';

<Select
  options={[{ value: 'us', label: 'United States' }, { value: 'fl', label: 'Florida' }]}
  value={jurisdiction}
  onChange={setJurisdiction}
  placeholder="Select a jurisdiction…"
/>

<Select options={categories} searchable placeholder="Select a category…" />
```

## Props

| Prop                     | Type                                                                                                                                    | Default      | Notes                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options`                | `{ value: string; label: string; disabled?: boolean; icon?: IconName }[]` (this is `MenuOption` — `SelectOption` is a type alias of it) | — (required) | `label` is a plain string, not `ReactNode` — typeahead needs to match against it, and every real option set found in research (jurisdiction codes, session names, categories) is plain text. `icon` (a per-option leading icon) comes along for free from `MenuOption` — added for `SearchBar`'s unified multi-facet search, but nothing stops a `Select` consumer from using it too. |
| `value` / `defaultValue` | `string`                                                                                                                                | —            | Controlled/uncontrolled, same convention as the rest of the library.                                                                                                                                                                                                                                                                                                                  |
| `onChange`               | `(value: string) => void`                                                                                                               | —            | Plain string, not a native event.                                                                                                                                                                                                                                                                                                                                                     |
| `placeholder`            | `string`                                                                                                                                | `'Select…'`  | Shown when nothing is selected.                                                                                                                                                                                                                                                                                                                                                       |
| `size`                   | `'sm' \| 'md' \| 'lg'`                                                                                                                  | `'md'`       | Same scale as `TextInput`.                                                                                                                                                                                                                                                                                                                                                            |
| `searchable`             | `boolean`                                                                                                                               | `false`      | Adds a filter `TextInput` inside the panel — a real, validated pattern (Aqua's `AquaDropdown`, the legislative-scorecard hi-fi mockup's `CategoryMenu`), not speculative.                                                                                                                                                                                                             |
| `searchPlaceholder`      | `string`                                                                                                                                | `'Search…'`  | Only used when `searchable`.                                                                                                                                                                                                                                                                                                                                                          |

Everything else is a normal `<button>` prop (the trigger) and passes through untouched, including `disabled` and a `ref` to the trigger element.

## Design notes

- **Positioning is `@floating-ui/react`**, not hand-rolled JS or CSS-only — chosen specifically for real, collision-aware positioning (`flip`/`shift`) without writing/maintaining that math ourselves. Even Aqua, the most mature reference available, hand-rolls this; Floating UI is a deliberate upgrade beyond that, not a port of it.
- **Real keyboard support** — arrow keys (wrapping), typeahead-by-typing (disabled in `searchable` mode, where the search field does that job), Enter to select, Escape to close and return focus to the trigger. This is real functionality absent from every DDP-family precedent found in research except Aqua — included because the original project plan named accessibility a firm requirement, not for feature-parity with Aqua on its own.
- **Composes `DropdownMenu` (the positioning shell) and `Menu` (the option-list/keyboard-nav-target rendering)** rather than owning panel markup directly — see `DropdownMenu`'s and `Menu`'s own READMEs for why that split exists. `Select` itself still owns all the Floating UI hook orchestration (`useClick`/`useDismiss`/`useRole`/`useListNavigation`/`useTypeahead`/`useInteractions`), since Floating UI requires those to combine wherever the floating `context` originates — `Menu` only takes the already-computed pieces (`getItemProps`, `activeIndex`, the nav refs) and renders `MenuItem`s from `options`.
- **No `error`/`errorMessage` prop** — dropped, not deferred. Nothing in the ecosystem shows a select-like control needing validation-error display.

## Not built in

- **Multi-select.** `Select` itself stays single-select only. `ddp-next`'s one real consumer (a jurisdiction/session picker) is single-select, and Aqua's own `AquaDropdown` — the explicit reference for this component — has no multi-select mode either. Note this is a scope decision for `Select` specifically, not a real limitation — `Menu` (the piece `Select` composes for its option list) already supports multi-select directly, since a `selected` array instead of a single string is enough to switch it into that mode. Adding a `multiple` prop to `Select` itself later is additive and non-breaking; revisit when a real consumer needs it.
- **Native form submission** — no hidden `<select>`, no `name`/`form` support. No current consumer submits selection via a real form post.
- **Rich (`ReactNode`) option labels** — see the `options` prop note above.
