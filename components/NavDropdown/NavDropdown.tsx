'use client'

import { useCallback, useId, useRef, useState } from 'react'
import type { ComponentType, ReactNode } from 'react'
import { Icon } from '../Icon'
import { useDismiss } from './useDismiss'
import './NavDropdown.scss'

export interface NavDropdownItem {
	label: string
	href: string
}

export type NavDropdownLinkComponent = ComponentType<{
	href: string
	className?: string
	onClick?: () => void
	children: ReactNode
}>

export interface NavDropdownProps {
	/** The button's text. */
	label: string
	/** The pages the list holds, in order. */
	items: readonly NavDropdownItem[]
	/** Colours the button while the visitor is on one of the list's pages. */
	active?: boolean
	/** Which edge of the button the list lines up with: `'left'` opens under the button's left edge, `'right'` (default) under its right edge. */
	align?: 'left' | 'right'
	/** Render each link with a different component instead of a native `<a>` — e.g. Next.js's `Link`, for client-side routing. The component must accept `href`, `className`, `onClick` and `children`. Defaults to `'a'`. */
	linkAs?: NavDropdownLinkComponent
	className?: string
}

/**
 * A top-menu item that opens a small list of pages. A button, not a link: clicking it only opens or closes the list (the page the label names, if any, goes in `items`).
 *
 * It opens and closes with a click or Enter, and closes with Escape (focus goes back to the button), a click elsewhere, a click on one of its pages, or when focus leaves it. It says whether it is open (`aria-expanded`, `aria-controls`); there is no `aria-haspopup`, which would promise a menu with arrow keys, and this is a list of links. The list follows the button in the page order, so Tab walks into it.
 */
export function NavDropdown({ label, items, active = false, align = 'right', linkAs, className }: NavDropdownProps) {
	const [open, setOpen] = useState(false)
	const root = useRef<HTMLDivElement>(null)
	const button = useRef<HTMLButtonElement>(null)
	const menuId = useId()
	const close = useCallback(() => setOpen(false), [])
	const onBlur = useDismiss({ open, onClose: close, root, button })
	const LinkComponent = linkAs ?? 'a'

	return (
		<div ref={root} className={['ddp-nav-dropdown', className].filter(Boolean).join(' ')} onBlur={onBlur}>
			<button
				ref={button}
				type="button"
				className={['ddp-nav-dropdown-button', active && 'ddp-nav-dropdown-button-active'].filter(Boolean).join(' ')}
				aria-expanded={open}
				aria-controls={open ? menuId : undefined}
				onClick={() => setOpen((o) => !o)}
			>
				{label}
				<Icon
					name="chevron-down"
					size={14}
					className={['ddp-nav-dropdown-chevron', open && 'ddp-nav-dropdown-chevron-open'].filter(Boolean).join(' ')}
				/>
			</button>
			{open && (
				<div id={menuId} className={`ddp-nav-dropdown-panel ddp-nav-dropdown-panel-${align}`}>
					{items.map(({ label: itemLabel, href }) => (
						<LinkComponent key={href} href={href} className="ddp-nav-dropdown-link" onClick={close}>
							{itemLabel}
						</LinkComponent>
					))}
				</div>
			)}
		</div>
	)
}
