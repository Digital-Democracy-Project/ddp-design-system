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

| Prop          | Type                    | Default   | Notes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ------------- | ----------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `selected`    | `boolean`               | —         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `disabled`    | `boolean`               | —         |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `indicator`   | `'check' \| 'checkbox'` | `'check'` | `'check'` shows a bare checkmark that only occupies space when `selected` — right for a single-select list, where only one row is ever marked. `'checkbox'` shows a persistent checkbox square, checked or not — matches the real validated multi-select precedent (the `CategoryMenu` in the "Filter - Hi-fi (Direction D)" mockup in Claude Design, the basis for the legislator-page filters on digitaldemocracyproject.org), reusing the same box styling `Checkbox`/`ToggleButton`'s `has-checkbox` indicator use. |
| `highlighted` | `boolean`               | —         | Keyboard-highlighted via `aria-activedescendant`, without real DOM focus — for a combobox-style consumer (`SearchBar`) where focus has to stay on a text input while arrow keys move a virtual active item. Distinct from `selected`: a search suggestion isn't "the current value," it's just momentarily highlighted. Deliberately not named `active` — that word already means "pre-selected by default, not user-chosen" in some contexts here, which is a different concept.                                       |
| `icon`        | `IconName`              | —         | A leading icon for this specific row — e.g. indicating which facet/entity type a search result belongs to (a legislator vs. a bill vs. a district, in one unified search list). A concrete, named need, not a generic content slot — see "A deliberately deferred extension point" below.                                                                                                                                                                                                                               |
| `children`    | `ReactNode`             | —         | The option's label content.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |

Everything else is a normal `<div role="option">` prop and passes through untouched. Accepts a `ref` to the underlying element.

## Design notes

- **Two ways to be "highlighted," matching two different keyboard-nav patterns.** `Select`'s roving-`tabIndex` listbox pattern gives the actively-navigated item real DOM focus (Floating UI's `useListNavigation`), so plain `&:focus` styling picks it up for free — genuine focus, not simulated, matching how a real listbox is supposed to work. `SearchBar`'s combobox pattern keeps focus on its text input at all times, so there's no real `:focus` to key off — `highlighted` (set by `Menu`'s virtual focus mode) gets the identical visual treatment instead via a real CSS class.
- **`indicator` is picked automatically by `Menu`** based on whether its `selected` prop is a single value or an array — a consumer using `MenuItem` directly (outside `Menu`) sets it explicitly.
- **`highlighted` is set by `Menu`'s `focusMode="virtual"`** — a consumer using `MenuItem` directly for a combobox-style list sets it explicitly instead.
- **A deliberately deferred extension point**: `icon` covers the one concrete need identified so far (a facet-type icon). A future `content?: ReactNode` prop — a full per-row render override, for richer enrichment once a specific need for it shows up — is anticipated but not built yet. When it lands, it renders _instead of_ the `icon`+`children` composition, not alongside it.
