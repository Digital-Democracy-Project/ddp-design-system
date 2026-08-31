# TextInput

A general-purpose text input. Not search-specific, but built with a search/filter use case in mind — see the two-tier `onChange`/`onSubmit` model and the "Typeahead readiness" section below.

## Usage

```tsx
import { TextInput } from '@digital-democracy-project/design-system';

<TextInput placeholder="Search bill title or ID..." clearable onSubmit={(value) => runSearch(value)} />
<TextInput error errorMessage="This field is required." />
```

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `value` / `defaultValue` | `string` | — | Controlled/uncontrolled, same convention as a native input. |
| `onChange` | `(value: string) => void` | — | Fires on every keystroke, with the plain string value (not a native event) — matches the validated pattern from `ddp-scorecard-react`'s own search box. |
| `onSubmit` | `(value: string) => void` | — | Fires on Enter, separate from `onChange`'s live updates — a "commit" callback. Matching, filtering, and any debouncing are entirely the consumer's responsibility; this component doesn't know or care what `onSubmit` does with the value. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | |
| `clearable` | `boolean` | — | Shows a clear (×) control (built from `IconButton`) once there's a value. Clears and fires both `onChange('')` and `onSubmit('')`. |
| `error` | `boolean` | — | |
| `errorMessage` | `string` | — | Only rendered when `error` is also true. |

Everything else is a normal `<input>` prop and passes through untouched. Accepts a `ref` to the underlying `<input>` element.

## Typeahead readiness

This component deliberately does **not** implement a suggestions dropdown — that's planned as a separate, higher-level `SearchBar` component that composes `TextInput` with a future `Menu` component, once dropdown positioning is settled (see the `Select`/`Menu` build). `TextInput` is built so that composition doesn't require rewriting it later:

- The forwarded `ref` reaches the real `<input>` DOM node, which a combobox layer needs for positioning a popup and managing focus.
- Full native prop pass-through (`...rest`) means a future wrapper can inject `role="combobox"`, `aria-expanded`, `aria-controls`, etc. without modifying this component.

## Not built in

- **A decorative leading icon** — considered and deliberately dropped; nothing in this codebase has actually validated a need for one yet (the real reference this component is based on puts its icon inside a submit button, not as passive decoration). Add it if/when `SearchBar` or another real use case needs it.
- **Debouncing** — left entirely to the consumer via `onChange`. Timers and cleanup-on-unmount are a concern for whoever's wiring up the actual search/filter logic, not this visual primitive.
- **The suggestions dropdown itself** — see "Typeahead readiness" above.
