## Setup

Load the one stylesheet, `styles.css`. It contains everything: the tokens, the fonts (Public Sans for sans, Newsreader for serif), a reset that removes browser default styles, the base text styles, the utility classes, and every component's CSS. No component needs a provider or wrapper component.

Put `class="ddp"` on `<body>` or the page's outermost wrapper. That turns on the design system's styles for plain elements: body text, `h1`–`h3`, `p`, links, `small`, `code`, `blockquote`, placeholders and focus rings. Without it, plain HTML renders unstyled, because the reset removes the browser's defaults. Components look the same either way.

Dark mode is `data-theme="dark"` on any ancestor element. It redefines the same token names, so there are no dark-mode props or separate dark variants.

## Styling, in order of preference

1. **Component props.** A component's look comes from its props (`variant`, `tone`, `size`, `appearance`, and so on). Component styles have zero specificity, so a class passed via `className` overrides any of them. Adjust a component with a class, not an inline style.
2. **The stylesheet's own classes.**
   - Spacing, on the spacing scale: padding `pa-` `px-` `py-` `pt-` `pr-` `pb-` `pl-`, margin `ma-` `mx-` `my-` `mt-` `mr-` `mb-` `ml-` (each also has `-auto`), and gap `gap-` `gap-x-` `gap-y-`. Steps: `0` `px` `0.5` `1` `1.5` `2` `2.5` `3` `3.5` `4` `5` `6` `7` `8` `9` `10` `12` `16` `20` `24` `32`, where `1` is 0.25rem (4px). Example: `className="pa-4 gap-2"`.
   - Text styles, which only work inside `.ddp`: `.h1` `.h2` `.h3` (heading looks on any element), `.display` (larger than `h1`), `.lead` (on a `<p>`), `.small`, `.eyebrow`, `.section-label` and `.mono`.
   - Grades: `.ddp-scale-1` to `.ddp-scale-5`, plus `.ddp-scale-none` for ungraded, on an element that represents a grade. Each sets that step's tinted background and text color. For quieter secondary text inside a graded element, use `color: var(--ddp-scale-base)`, never opacity.
   - There are no layout classes (flex, grid, widths). Write those in your own CSS, using tokens.
3. **Tokens, in your own CSS**, as `var(--ddp-*)`. Never hardcode a color, size, spacing, radius, shadow or font value; there's a token for each.

## Tokens

- **Brand colors:** `--ddp-color-{primary,secondary,tertiary}`, each with `-hover`, `-active`, `-foreground` (text on a solid fill), `-tint` (a soft background) and `-tint-foreground` (text on that soft background).
- **Neutral:** `--ddp-color-neutral`, with `-hover`, `-tint`, `-tint-foreground`, `-solid-bg` and `-solid-fg`.
- **Status:** `--ddp-color-{positive,negative,caution,info}`, each with `-tint` and `-tint-foreground`. Don't use the older aliases `--ddp-color-success`, `-danger` and `-warning`.
- **Party:** `--ddp-color-{democratic,republican,unaffiliated}`, each with `-tint` and `-tint-foreground`.
- **Surfaces:** `--ddp-surface-{page,raised,sunken,overlay,inverse,inverse-raised,inverse-raised-hover}`.
- **Text:** `--ddp-text-{default,soft,subtle,disabled,link,link-hover,inverse,inverse-soft,inverse-subtle}`.
- **Borders:** `--ddp-border-{subtle,default,strong,emphasis,interactive,interactive-hover,focus,inverse}`, and widths `--ddp-border-width-{0,1,2,4}`.
- **Spacing:** `--ddp-space-*`, the same steps as the spacing classes, with `.` written as `-` (`--ddp-space-0-5`).
- **Type:**
  - `--ddp-font-size-{3xs,2xs,xs,sm,md,lg,xl,2xl,3xl,4xl,5xl,6xl,7xl}`, each with a matching `--ddp-line-height-*`;
  - `--ddp-font-weight-{light,regular,medium,semibold,bold,extrabold}`;
  - `--ddp-letter-spacing-{tighter,tight,snug,normal,wide,wider,widest}`;
  - `--ddp-font-family-{sans,serif,mono}`.
- **Shape and depth:** `--ddp-radius-{none,xs,sm,md,lg,xl,2xl,full}` and `--ddp-shadow-{none,xs,sm,md,lg,xl}`.
- **Layout:** `--ddp-container-{xs,sm,md,lg,xl,2xl}`, `--ddp-gutter`, `--ddp-paragraph-width`, and `--ddp-z-{base,sticky,dropdown,popover,overlay,modal,toast,tooltip}`.
- **Motion:** `--ddp-duration-{instant,fast,base,slow,slower}` and `--ddp-ease-{standard,in,out,emphasized}`.

The raw color steps behind these (`--ddp-color-violet-500` and so on) exist, but use the named tokens above.

## Props shared across components

- `size`: `'sm' | 'md' | 'lg'` on Badge, Button, Checkbox, Select, SearchBar, TextInput, ToggleButton and ToggleSwitch. Button also takes `'inherit'`, to follow the surrounding text. Icon takes `'xs'` to `'xl'`, or a number of pixels.
- `tone`:
  - Badge takes `neutral`, `primary`, `secondary`, `tertiary`, `positive`, `negative`, `caution`, `info`, `democratic`, `republican` and `unaffiliated`.
  - ToggleButton takes `primary`, `secondary`, `tertiary` and `neutral`.
  - SectionLabel takes `subtle` (the default), `neutral`, `primary`, `secondary` and `tertiary`.
- `customColors` on Button and Badge: a last resort, only when no `variant` or `tone` fits.
- Form controls take `value` or `defaultValue`. Their change handlers receive the new value, not the event: `onChange(value)` on TextInput, Select and SearchBar, `onChange(checked)` on Checkbox and ToggleSwitch, and `onPressedChange(pressed)` on ToggleButton.

## Which component to use

- **Actions:**
  - `Button`, with variants `primary`, `secondary`, `tertiary` and `link`, and appearance `solid` or `outline`;
  - `IconButton` for a button that shows only an icon. Its `aria-label` is required.
- **Making choices:**
  - `Select` for picking one option from a list (`searchable` adds a filter field);
  - `SearchBar` for a search field, with optional `suggestions`;
  - `Checkbox` and `ToggleSwitch` for a yes/no setting: the same role, with a checkbox or a switch look;
  - `ToggleButton` for a pill-style button that stays pressed. Without `indicator` it's a plain pill, for example for picking one or more years. With `indicator="checkbox"` it's for independent yes/no options.
- **Text entry:** `TextInput`, which supports `icon`, `clearable`, `error` and `errorMessage`.
- **Containers:**
  - `Card` for a general container. It has no padding of its own, so add it with `contentClassName` (for example `"pa-5"`). `interactive` makes it lift on hover, for a card used as a clickable list row.
  - `ClickableTile` when the whole box is one link or button. It renders a link when given `href`, otherwise a button.
- **Labels and icons:**
  - `Badge` for a label pill that isn't clickable;
  - `SectionLabel` for a small label above a field or section, or for inline details about a record;
  - `Icon`, which has these names: `arrow-down`, `arrow-up`, `arrows-up-down`, `check`, `chevron-down`, `close`, `democrat`, `info`, `menu`, `republican`, `search`, `sliders`, `sort-down` and `trash`.
- **Lists and menus:**
  - `MenuItem` is a single option row, with an optional `icon` and a selection indicator (`'check'` or `'checkbox'`). It works on its own.
  - `Menu` is a list of options with keyboard navigation. It takes `getItemProps`, `listRef` and `activeIndex` from Floating UI's interaction hooks (`@floating-ui/react`), set up by the code using it.
  - `DropdownMenu` is the floating panel attached to a trigger. It takes the `context` from a `useFloating()` call in the code using it.
  - `Select` and `SearchBar` are ready-made combinations of these three, with the Floating UI setup included.

## Where to check details

Each component's `.prompt.md` has its full list of props. `styles.css` is the actual CSS, so read it when in doubt about a class or token.

## Example

```jsx
<main className="ddp pa-8">
	<span className="eyebrow">Legislator</span>
	<h1 className="mt-2 mb-4">Jane Doe</h1>
	<div className="legislator-meta gap-2">
		<Badge tone="democratic">Democrat</Badge>
		<Badge tone="neutral">State Senate</Badge>
	</div>
	<Card className="mt-6" contentClassName="pa-5">
		<Select
			options={[
				{ value: '2025', label: '2025 session' },
				{ value: '2026', label: '2026 session' },
			]}
			placeholder="Choose a session"
		/>
	</Card>
</main>
```

```css
.legislator-meta {
	display: flex;
	align-items: center;
}
```
