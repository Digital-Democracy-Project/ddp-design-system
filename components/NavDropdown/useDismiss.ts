'use client'

import { useEffect } from 'react'
import type { FocusEvent, RefObject } from 'react'

export interface UseDismissOptions {
	open: boolean
	/** Should be stable (a state setter call wrapped in `useCallback`, or one that never changes). */
	onClose: () => void
	/** The element that holds the button and the pop-up. A click inside it never closes. */
	root: RefObject<HTMLElement | null>
	/** Where focus goes back to after Escape. */
	button: RefObject<HTMLButtonElement | null>
	/** Also give focus back to `button` after a click or tap outside `root` (a phone menu: the tap would otherwise leave focus nowhere). Default `false`. */
	refocusOnOutside?: boolean
}

/**
 * How a small pop-up list closes: a click outside `root`, Escape (focus goes back to `button`), or focus leaving `root`. Returns the `onBlur` handler to put on `root`.
 *
 * Not Floating UI's `useDismiss`: this one has no Floating UI context to attach to, so it works for any plain button and list. `NavDropdown` uses it, and so can an app's own pop-up (for example a phone menu).
 */
export function useDismiss({
	open,
	onClose,
	root,
	button,
	refocusOnOutside = false,
}: UseDismissOptions): (event: FocusEvent) => void {
	useEffect(() => {
		if (!open) return
		const onPointerDown = (event: MouseEvent) => {
			if (!root.current || root.current.contains(event.target as Node)) return
			onClose()
			// After the browser's own focus change for this press, so the button keeps it.
			if (refocusOnOutside) setTimeout(() => button.current?.focus())
		}
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key !== 'Escape') return
			onClose()
			button.current?.focus()
		}
		document.addEventListener('mousedown', onPointerDown)
		document.addEventListener('keydown', onKeyDown)
		return () => {
			document.removeEventListener('mousedown', onPointerDown)
			document.removeEventListener('keydown', onKeyDown)
		}
	}, [open, onClose, root, button, refocusOnOutside])

	return (event) => {
		if (!root.current?.contains(event.relatedTarget as Node | null)) onClose()
	}
}
