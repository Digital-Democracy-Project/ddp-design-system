import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { SearchBar } from './SearchBar'
import type { MenuOption } from '../Menu'

const LEGISLATORS: MenuOption[] = [
	{ value: 'eliason', label: 'Steve Eliason', icon: 'democrat' },
	{ value: 'mooney', label: 'Jim Mooney', icon: 'republican' },
	{ value: 'hb-1110', label: 'HB 1110 — State Park Preservation Act' },
	{ value: 'sb-42', label: 'SB 42 — Water Rights Modernization' },
]

function ComboboxDemo() {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [value, setValue] = useState('')
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [submitted, setSubmitted] = useState('')

	const suggestions = value ? LEGISLATORS.filter((o) => o.label.toLowerCase().includes(value.toLowerCase())) : []

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 320 }}>
			<SearchBar
				value={value}
				onChange={setValue}
				onSubmit={setSubmitted}
				suggestions={suggestions}
				placeholder="Search legislators or bills…"
			/>
			<span>Last submitted: {submitted || '(nothing yet)'}</span>
		</div>
	)
}

const meta: Meta<typeof SearchBar> = {
	title: 'Components/SearchBar',
	component: SearchBar,
}
export default meta

type Story = StoryObj<typeof SearchBar>

export const Combobox: Story = { render: () => <ComboboxDemo /> }

export const Standalone: Story = {
	render: () => (
		<div style={{ maxWidth: 320 }}>
			<SearchBar placeholder="Search…" />
		</div>
	),
}

export const Sizes: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 320 }}>
			<SearchBar size="sm" placeholder="Small" />
			<SearchBar size="md" placeholder="Medium" />
			<SearchBar size="lg" placeholder="Large" />
		</div>
	),
}

export const Disabled: Story = {
	render: () => (
		<div style={{ maxWidth: 320 }}>
			<SearchBar placeholder="Search…" disabled />
		</div>
	),
}
