# NavDropdown

A top-menu item that opens a small list of pages. It is a button, not a link: clicking it only opens or closes the list, so if the label names a page of its own (About), put that page in `items` too. For choosing a value from options, use `Select`; for a floating panel anchored to any trigger, use `DropdownMenu`.

## Usage

```tsx
import { NavDropdown } from '@digital-democracy-project/design-system';

<NavDropdown
	label="About"
	items={[
		{ label: 'About', href: '/about' },
		{ label: 'Our Team', href: '/team' },
	]}
	active={pathname.startsWith('/about') || pathname.startsWith('/team')}
	align="left"
/>

// Client-side routing: pass the app's link component (Next.js's Link, for example).
<NavDropdown label="About" items={items} linkAs={Link} />
```

## Props

| Prop        | Type                                                        | Default   | Notes                                                                                                                                                                       |
| ----------- | ----------------------------------------------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`     | `string`                                                    | —         | The button's text.                                                                                                                                                          |
| `items`     | `{ label: string; href: string }[]`                         | —         | The pages in the list, in order.                                                                                                                                            |
| `active`    | `boolean`                                                   | `false`   | Colours the button while the visitor is on one of the list's pages. The app works that out, since only it knows the current address.                                        |
| `align`     | `'left' \| 'right'`                                         | `'right'` | Which edge of the button the list lines up with. Use `'left'` for an item in the middle of a bar, so the list opens under the button instead of running off the right edge. |
| `linkAs`    | component taking `href`, `className`, `onClick`, `children` | `'a'`     | Renders each link with another component, as `ClickableTile`'s `as` does. The component must accept those four props.                                                       |
| `className` | `string`                                                    | —         | Added to the wrapper (the element the list is positioned against).                                                                                                          |

## Behavior

- Opens and closes with a click or Enter.
- Closes with Escape (focus goes back to the button), a click elsewhere, a click on one of its links, or when focus leaves it.
- `aria-expanded` and, while open, `aria-controls` naming the list. There is deliberately no `aria-haspopup`: that would promise a menu with arrow-key navigation, and this is a list of ordinary links. The list follows the button in the page order, so Tab walks into it.
- The list is positioned with plain CSS under the button (not Floating UI), 12rem wide.

## useDismiss

The closing rules above, as a hook, for any small pop-up that is a button plus a list or panel (for example a phone menu). It is not Floating UI's `useDismiss`: it needs no Floating UI context.

```tsx
const onBlur = useDismiss({ open, onClose, root, button, refocusOnOutside })
// put `onBlur` on the element that holds both the button and the pop-up (`root`)
```

| Option             | Type                                   | Notes                                                                                                                         |
| ------------------ | -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `open`             | `boolean`                              | The listeners are only attached while it is `true`.                                                                           |
| `onClose`          | `() => void`                           | Should be stable (a state setter wrapped in `useCallback`).                                                                   |
| `root`             | `RefObject<HTMLElement \| null>`       | A click inside it never closes.                                                                                               |
| `button`           | `RefObject<HTMLButtonElement \| null>` | Where focus goes back to after Escape.                                                                                        |
| `refocusOnOutside` | `boolean`                              | Default `false`. Also gives focus back to `button` after a click or tap outside, so a phone tap does not leave focus nowhere. |
