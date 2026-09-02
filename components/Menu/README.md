# Menu

The content/keyboard-nav-target layer for a list of selectable options — rendering, not positioning. Renders `MenuItem`s from an `options` array and handles the empty state; positioning/portal/focus-trap is `DropdownMenu`'s job, not this component's.

## Why this is a separate component from `DropdownMenu`

Floating UI requires every interaction hook (`useClick`, `useDismiss`, `useListNavigation`, `useTypeahead`, etc.) to combine in a single `useInteractions([...])` call, since they merge event handlers onto the same reference/floating/item elements — that orchestration has to live wherever the floating `context` originates (`Select`, today), and can't be split into `Menu` without fighting the library. So `Menu` doesn't own keyboard nav itself; it takes the already-computed `getItemProps`/`activeIndex`/nav refs from its consumer and only owns turning `options` into correctly-wired `MenuItem`s. `DropdownMenu` wraps `Menu` for the floating case, the same way it would wrap any other content.

Built alongside `Select` rather than deferred, once a second consumer with the same internal shape was judged likely enough to extract this immediately instead of letting `Select` duplicate it later. Multi-select support was added the same way, for the same reason — a single-select-only `Menu` would have had little more reuse value than `Select` just inlining its own list rendering.

## Usage

`Menu` is a building block for a floating/positioned selection UI — see `Select.tsx` for the real usage (owning `useFloating`/`useClick`/`useDismiss`/`useRole`/`useListNavigation`/`useTypeahead`/`useInteractions`, then rendering `<DropdownMenu context={context}><Menu ... /></DropdownMenu>`).

```tsx
// Single-select — selected is a plain string, items get a checkmark.
<Menu options={options} selected={value} onSelect={(o) => setValue(o.value)} ... />

// Multi-select — selected is an array, items get a checkbox square instead.
<Menu options={options} selected={selectedValues} onSelect={(o) => toggle(o.value)} ... />
```

## Props

| Prop | Type | Notes |
|---|---|---|
| `options` | `{ value: string; label: string; disabled?: boolean }[]` | |
| `selected` | `string \| string[]` | A single value (single-select) or an array of values (multi-select) — mode is inferred from which shape this is, not a separate `multiple` flag that could drift out of sync with it. Drives which item(s) show a checkmark (single) or a checked checkbox square (multi) — see `MenuItem`'s `indicator` prop, which `Menu` picks automatically based on this. |
| `onSelect` | `(option) => void` | Reports which option was clicked — nothing more. `Menu` doesn't decide whether that replaces a single value or toggles array membership; that's the consumer's `onSelect` handler's job, same in both modes. |
| `activeIndex` | `number \| null` | Which option is keyboard-highlighted — drives roving `tabIndex`. |
| `getItemProps` | `(userProps?) => Record<string, unknown>` | The consumer's already-computed Floating UI `getItemProps` (or an equivalent shape). Deliberately not typed against `@floating-ui/react` directly — `Menu` only needs "a function that returns per-item props to spread," not a hard dependency on that library. |
| `listRef` | `MutableRefObject<Array<HTMLElement \| null>>` | Populated with each rendered item's DOM node, in `options` order — feeds the consumer's `useListNavigation`. |
| `labelsRef` | `MutableRefObject<Array<string \| null>>` | Populated with each item's label — feeds the consumer's `useTypeahead`. Omit if the consumer doesn't need typeahead (e.g. a searchable `Select`, where the search field does that job instead). |
| `emptyMessage` | `string` | Default `'No options found'`. |
