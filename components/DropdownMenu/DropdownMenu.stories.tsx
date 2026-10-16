import { useRef, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import {
	useFloating,
	useClick,
	useDismiss,
	useRole,
	useListNavigation,
	useInteractions,
	offset,
	flip,
	shift,
	size as sizeMiddleware,
	autoUpdate,
} from '@floating-ui/react'
import { Button } from '../Button'
import { Icon } from '../Icon'
import { Menu } from '../Menu'
import type { MenuOption } from '../Menu'
import { DropdownMenu } from './DropdownMenu'

const CATEGORIES: MenuOption[] = [
	{ value: 'environment', label: 'Environment' },
	{ value: 'education', label: 'Education' },
	{ value: 'healthcare', label: 'Healthcare' },
	{ value: 'public-lands', label: 'Public Lands' },
]

// DropdownMenu is only the panel shell, so it always needs a consumer-owned useFloating() context and trigger. This is the minimal version of Select.tsx's wiring; it starts open so static renders (docs, design-sync captures) show the panel rather than just the trigger.
function DropdownMenuDemo({ initialFocus }: { initialFocus?: number }) {
	const [open, setOpen] = useState(true)
	const [activeIndex, setActiveIndex] = useState<number | null>(null)
	const [selected, setSelected] = useState<string | undefined>('education')
	const listRef = useRef<Array<HTMLElement | null>>([])

	const { refs, floatingStyles, context } = useFloating({
		open,
		onOpenChange: setOpen,
		placement: 'bottom-start',
		whileElementsMounted: autoUpdate,
		middleware: [
			offset(4),
			flip(),
			shift({ padding: 8 }),
			sizeMiddleware({
				apply({ rects, elements }) {
					Object.assign(elements.floating.style, { width: `${rects.reference.width}px` })
				},
			}),
		],
	})

	const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
		useClick(context),
		useDismiss(context),
		useRole(context, { role: 'listbox' }),
		useListNavigation(context, { listRef, activeIndex, onNavigate: setActiveIndex, loop: true }),
	])

	return (
		<>
			<Button ref={refs.setReference} variant="secondary" appearance="outline" {...getReferenceProps()}>
				{CATEGORIES.find((option) => option.value === selected)?.label ?? 'Choose a category'}
				<Icon name="chevron-down" size="sm" />
			</Button>
			<DropdownMenu
				context={context}
				ref={refs.setFloating}
				style={floatingStyles}
				initialFocus={initialFocus}
				{...getFloatingProps()}
			>
				<Menu
					options={CATEGORIES}
					selected={selected}
					onSelect={(option) => {
						setSelected(option.value)
						setOpen(false)
					}}
					activeIndex={activeIndex}
					getItemProps={getItemProps}
					listRef={listRef}
				/>
			</DropdownMenu>
		</>
	)
}

const meta: Meta<typeof DropdownMenu> = {
	title: 'Components/DropdownMenu',
	component: DropdownMenu,
	// The stories start open and the panel portals to <body>, so on the Docs page each renders in its own iframe; inline, the panels spill over the content below. 250px = the open panel's measured bottom edge (218px with 4 options at default size) + the same 32px of padding that sits above the trigger. Re-measure if the options or sizes change.
	parameters: { docs: { story: { inline: false, height: '250px' } } },
}
export default meta

type Story = StoryObj<typeof DropdownMenu>

export const Playground: Story = { render: () => <DropdownMenuDemo /> }

// initialFocus={0} moves real focus into the panel on open, the override Select's searchable mode uses for its filter input.
export const FocusInsidePanel: Story = { render: () => <DropdownMenuDemo initialFocus={0} /> }
