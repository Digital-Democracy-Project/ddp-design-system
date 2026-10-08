# SearchBar

A search-styled `TextInput` (leading search icon, `type="search"`, `clearable`) that can optionally drive a suggestions combobox — or not, and just be a styled search field. Composes `TextInput` + `DropdownMenu` + `Menu`.

## Two modes

**Standalone** — omit `suggestions` entirely:

```tsx
<SearchBar placeholder="Search…" value={query} onChange={setQuery} />
```

No floating panel, no combobox ARIA, no `Menu` — just the styled `TextInput`. This is the mode `Select`'s own internal search field uses (a search box that's already inside another dropdown doesn't want a second, nested one).

**Combobox** — pass an array (even `[]`) to `suggestions`:

```tsx
<SearchBar
	value={query}
	onChange={setQuery}
	suggestions={results}
	onSelectSuggestion={(r) => navigate(r.value)}
	placeholder="Search legislators or bills…"
/>
```

The panel opens whenever the input is focused and `suggestions.length > 0`. `suggestions` is a `MenuOption[]` — already filtered by you; `SearchBar` does no matching itself, same "not a search engine" rule `TextInput` follows. Each option can carry an `icon` (see "Facet icons" below).

## Props

| Prop                     | Type                               | Default                       | Notes                                                                                                                                                                                                                    |
| ------------------------ | ---------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `value` / `defaultValue` | `string`                           | —                             | Controlled/uncontrolled, same convention as `TextInput`.                                                                                                                                                                 |
| `onChange`               | `(value: string) => void`          | —                             | Every keystroke.                                                                                                                                                                                                         |
| `onSubmit`               | `(value: string) => void`          | —                             | Enter with nothing highlighted — matches `TextInput`'s model exactly. Also fires when a suggestion is picked (click, or Enter while highlighted), with that suggestion's label — picking one is a valid way to "submit." |
| `suggestions`            | `MenuOption[]`                     | — (omitted = standalone mode) | Pass an array, even `[]`, to turn on combobox behavior.                                                                                                                                                                  |
| `onSelectSuggestion`     | `(suggestion: MenuOption) => void` | —                             | Fires when a suggestion is picked, alongside `onSubmit`.                                                                                                                                                                 |
| `size`                   | `'sm' \| 'md' \| 'lg'`             | `'md'`                        | Matches `TextInput`'s scale.                                                                                                                                                                                             |
| `emptyMessage`           | `string`                           | —                             | Passed through to `Menu`.                                                                                                                                                                                                |

Everything else is a normal `<input>` prop and passes through untouched. Accepts a `ref` to the underlying `<input>` element.

## Design notes

- **This is a combobox, not a listbox** — a real distinction, not just a visual variant of `Select`. `Select` is a button that opens a listbox (arrow keys move real DOM focus between options — the correct WAI-ARIA listbox pattern). `SearchBar` is a text input the user is actively typing into, so focus has to stay on the input at all times, including while arrow-keying through suggestions — the correct WAI-ARIA combobox pattern (`aria-activedescendant`, a virtual active index, highlighting via a CSS class instead of real `:focus`). `Menu`'s `focusMode="virtual"` and `MenuItem`'s `highlighted` prop exist for this.
- **Why virtual focus, precisely** — not primarily to prevent a focus trap (`DropdownMenu`'s `FloatingFocusManager` is already `modal={false}`/`initialFocus={-1}`, same as `Select`, so nothing traps focus either way). Two real reasons: moving focus off the input at all disrupts active typing (mobile keyboards, IME, screen-reader announcements mid-keystroke); and more concretely, `suggestions` re-filters on every keystroke, so a real-focused suggestion `<div>` could be unmounted on the very next keystroke, orphaning focus unpredictably. Virtual focus never leaves the one stable `<input>`, regardless of how much the list underneath it churns.
- **No `useClick`, no `useTypeahead`** (unlike `Select`) — the panel opens by the input being focused/typed into, not clicked like a trigger button, and the real input already is the typeahead.
- **Closing is never blur-driven** — Escape, an outside press (`useDismiss`), or a selection. Blur-closes-the-panel is the classic combobox bug where blur fires before a suggestion's click registers; since focus never actually leaves the input here, that race doesn't exist in the first place.
- **`open` is real state, not derived from `isFocused && suggestions.length > 0`** — otherwise Escape would have no lasting effect (the next render would immediately recompute it back open). It only reopens on a genuine change to `suggestions` or focus.
- **Facet icons**: `MenuOption.icon` — added for a concrete case (a unified Explore-page search spanning multiple entity types, each needing an icon indicating which facet it is), not a generic slot. See `Menu`/`MenuItem`'s READMEs for the deliberately-deferred `content` (full per-row override) extension point this leaves room for without building it now.

## Not built in

- The actual suggestion-matching/fetching logic, and debouncing — same rule as `TextInput`, entirely the consumer's responsibility.
- A loading state — nothing has validated a need for one yet; add it if a real async consumer shows up.
