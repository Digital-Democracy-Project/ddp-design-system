# Radio / RadioGroup

A single-choice group: real `<input type="radio">` rows sharing one `name`, inside a `<fieldset>`. Use it wherever exactly one of several rows can be chosen (for example Current / Previous / All sessions); use `Checkbox` for genuine multi-select.

## Usage

```tsx
import { Radio, RadioGroup } from '@digital-democracy-project/design-system';

<RadioGroup label="Session" value={session} onChange={setSession}>
	<Radio value="current">Current session</Radio>
	<Radio value="previous">Previous sessions</Radio>
	<Radio value="all">All sessions</Radio>
</RadioGroup>

<RadioGroup label="Chamber" defaultValue="both" size="sm">...</RadioGroup>
<RadioGroup aria-labelledby="chamber-label" ...>...</RadioGroup>
```

## RadioGroup props

| Prop                     | Type                        | Default   | Notes                                                                                                                                                           |
| ------------------------ | --------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value` / `defaultValue` | `string \| null` / `string` | —         | Controlled/uncontrolled, same convention as `Checkbox`'s `checked`/`defaultChecked`. `null` (or no default) means nothing selected yet.                         |
| `onChange`               | `(value: string) => void`   | —         | The newly selected row's `value`. Plain value, not a native event.                                                                                              |
| `label`                  | `ReactNode`                 | —         | Rendered as the fieldset's `<legend>`, styled like `SectionLabel`. Without it, pass `aria-label` or `aria-labelledby` (for example the id of a `SectionLabel`). |
| `name`                   | `string`                    | generated | The native `name` every row shares. Generated with `useId` when omitted; pass one if the group is part of a real `<form>` submission.                           |
| `size`                   | `'sm' \| 'md' \| 'lg'`      | `'md'`    | Applied to every row; same scale as `Checkbox`.                                                                                                                 |
| `disabled`               | `boolean`                   | `false`   | Disables the whole fieldset natively.                                                                                                                           |
| `error` / `errorMessage` | `boolean` / `string`        | —         | Red circles on every row; the message shows under the group (only when `error` is also true) and is tied to the fieldset with `aria-describedby`.               |
| `children`               | `ReactNode`                 | —         | The `Radio` rows.                                                                                                                                               |

Everything else is a normal `<fieldset>` prop.

## Radio props

| Prop                          | Type        | Default | Notes                                                                                                                                                |
| ----------------------------- | ----------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`                       | `string`    | —       | Required. What the group reports when this row is picked.                                                                                            |
| `children`                    | `ReactNode` | —       | Label content, inside the same `<label>` as the circle. Omit and pass `aria-label` for an unlabelled row.                                            |
| `disabled`                    | `boolean`   | —       | Disables just this row (the group's `disabled` disables all of them).                                                                                |
| `size` / `error` / `onChange` |             |         | Only used for a `Radio` outside a `RadioGroup` (then also pass `name` and `checked`/`defaultChecked` yourself). Inside a group, the group sets them. |

Other `<input>` props pass through. Accepts a `ref` to the underlying `<input>`.

## Design notes

- **Native radio behaviour, no keyboard code.** Because the rows are real radios sharing one `name`, the browser gives the group one Tab stop, Up/Down/Left/Right move and select, and screen readers announce "selected, radio button, 1 of 3". Nothing here re-implements that.
- **A chosen row cannot be un-chosen** (decided on NEXT-110: strict radio behaviour). For a "no filter" choice, add an explicit row such as "All sessions".
- **Reuses Checkbox's styles.** Each row renders `Checkbox`'s own `ddp-checkbox*` classes for the row layout, box size, label text, disabled and error looks, so a Radio and a Checkbox line up exactly at every size. `Radio.scss` only adds the round shape, the dot, and the checked/focus rules.
- **Checked/focus rules are keyed on `.ddp-radio-input`, not Checkbox's input class**, because a radio in a group with nothing selected matches the native `:indeterminate` pseudo-class and would otherwise pick up Checkbox's indeterminate dash.
