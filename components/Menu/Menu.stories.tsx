import { useRef, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Menu } from './Menu'

const CATEGORIES = [
	{ value: 'environment', label: 'Environment' },
	{ value: 'education', label: 'Education' },
	{ value: 'healthcare', label: 'Healthcare' },
	{ value: 'public-lands', label: 'Public Lands' },
]

// Menu is normally driven by a consumer's own Floating UI interaction
// hooks (see Select.tsx) — these stories stand in a minimal getItemProps/
// listRef/activeIndex of their own so Menu can be previewed on its own,
// without a floating panel around it.
function MenuDemo({ options = CATEGORIES }: { options?: typeof CATEGORIES }) {
	const [value, setValue] = useState<string | undefined>('education')
	const listRef = useRef<Array<HTMLElement | null>>([])

	return (
		<div
			style={{
				width: 240,
				border: '1px solid var(--ddp-border-default)',
				borderRadius: 'var(--ddp-radius-md)',
				padding: 4,
			}}
		>
			<Menu
				options={options}
				selected={value}
				onSelect={(option) => setValue(option.value)}
				activeIndex={null}
				getItemProps={(userProps) => ({ ...userProps })}
				listRef={listRef}
			/>
		</div>
	)
}

// Multi-select mode: `selected` is an array, so Menu automatically renders
// each MenuItem with a checkbox indicator instead of a bare checkmark, and
// onSelect is used to toggle membership rather than replace a single value.
function MultiSelectMenuDemo({ options = CATEGORIES }: { options?: typeof CATEGORIES }) {
	const [selected, setSelected] = useState<string[]>(['education', 'public-lands'])
	const listRef = useRef<Array<HTMLElement | null>>([])

	const toggle = (value: string) =>
		setSelected((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))

	return (
		<div
			style={{
				width: 240,
				border: '1px solid var(--ddp-border-default)',
				borderRadius: 'var(--ddp-radius-md)',
				padding: 4,
			}}
		>
			<Menu
				options={options}
				selected={selected}
				onSelect={(option) => toggle(option.value)}
				activeIndex={null}
				getItemProps={(userProps) => ({ ...userProps })}
				listRef={listRef}
			/>
		</div>
	)
}

const meta: Meta<typeof Menu> = {
	title: 'Components/Menu',
	component: Menu,
}
export default meta

type Story = StoryObj<typeof Menu>

export const Playground: Story = { render: () => <MenuDemo /> }

export const MultiSelect: Story = { render: () => <MultiSelectMenuDemo /> }

export const WithDisabledOptions: Story = {
	render: () => <MenuDemo options={CATEGORIES.map((o) => (o.value === 'healthcare' ? { ...o, disabled: true } : o))} />,
}

export const Empty: Story = { render: () => <MenuDemo options={[]} /> }
