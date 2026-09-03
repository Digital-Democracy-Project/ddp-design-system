# ToggleSwitch

A physical track-and-knob on/off switch — a real `<input type="checkbox" role="switch">`, visually hidden and paired with a custom-styled track/thumb driven off its own native state. Distinct from `ToggleButton` (a pill/chip-style button for a toggleable *action*); this one represents a boolean *setting*, the same conceptual role as `Checkbox`, just a different visual affordance.

## Usage

```tsx
import { ToggleSwitch } from '@digital-democracy-project/design-system';

<ToggleSwitch defaultChecked>Show only scored bills</ToggleSwitch>
<ToggleSwitch checked={checked} onChange={setChecked}>Show only scored bills</ToggleSwitch>
<ToggleSwitch aria-label="Toggle setting" />
```

## Props

| Prop | Type | Default | Notes |
|---|---|---|---|
| `checked` / `defaultChecked` | `boolean` | — | Controlled/uncontrolled, same convention as `Checkbox`. |
| `onChange` | `(checked: boolean) => void` | — | Plain boolean, not a native event — matches `Checkbox`/`TextInput`'s plain-value convention. |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Track `32×18` / `40×22` / `48×26`px, thumb `14` / `18` / `22`px. Component-local dimensions — see design notes. |
| `children` | `ReactNode` | — | Label content, rendered next to the switch inside the same `<label>`. Omit for an unlabeled use and pass `aria-label` instead, same contract `Checkbox`'s `children` follows. |

Everything else is a normal `<input>` prop and passes through untouched. Accepts a `ref` to the underlying `<input>` element.

## Design notes

- **Reuses `Checkbox`'s structural pattern, not `ToggleButton`'s.** `ToggleButton` deliberately renders a real `<button aria-pressed>`, never a checkbox — right for a momentary toggle action. A switch represents a boolean setting, so it's built the same way `Checkbox` is: a real, visually-hidden `<input type="checkbox">` (here with `role="switch"`, per WAI-ARIA's own switch pattern) paired with a custom-styled sibling. That gets real form semantics — participates in `FormData`, native label-click delegation, no generated `id`/`htmlFor` needed — that a button-only implementation doesn't have.
- **State is CSS-driven off the real input**, exactly like `Checkbox`: the track/thumb's checked/focus-visible/disabled appearance all come from sibling selectors off the hidden input's native pseudo-classes. The real DOM checkbox stays the single source of truth, no JS-mirrored classes.
- **No `indeterminate`** — a switch is strictly binary, unlike a checkbox driving a tri-state selection list.
- **No `error`/`errorMessage`** — no validated DDP use case needs inline validation on a switch yet; easy to add later if one shows up, same trim-unvalidated-props call already made for `Select`.
- **Proportions are a loose sanity check, not a fully vetted reference.** The only track-and-knob switch anywhere in the DDP codebase is `ddp-scorecard-react`'s `ToggleSwitch`, but its own stylesheet flags itself as unreviewed, AI-generated output with ad hoc hex colors. Its rough scale (~40×22 track, ~18px thumb, ~2px inset) lines up with standard platform switch conventions, so `md` anchors to that (rounded to whole pixels) while every color here comes from this package's own tokens instead of copied hex values.
- **Thumb position uses `left: calc(100% - thumb-size - inset)` on `:checked`**, not a `translateX` distance calculation — sidesteps needing the track's own width as an input to the math.
