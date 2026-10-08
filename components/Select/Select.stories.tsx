import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Select } from './Select'

const JURISDICTIONS = [
	{ value: 'us', label: 'United States' },
	{ value: 'az', label: 'Arizona' },
	{ value: 'fl', label: 'Florida' },
	{ value: 'mi', label: 'Michigan' },
	{ value: 'ut', label: 'Utah' },
	{ value: 'va', label: 'Virginia' },
	{ value: 'wa', label: 'Washington' },
]

const meta: Meta<typeof Select> = {
	title: 'Components/Select',
	component: Select,
	args: { options: JURISDICTIONS, placeholder: 'Select a jurisdiction…', size: 'md', disabled: false },
	argTypes: {
		size: { control: 'select', options: ['sm', 'md', 'lg'] },
	},
}
export default meta

type Story = StoryObj<typeof Select>

export const Playground: Story = {}

export const Controlled: Story = {
	render: () => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [value, setValue] = useState('fl')
		return <Select options={JURISDICTIONS} value={value} onChange={setValue} placeholder="Select a jurisdiction…" />
	},
}

export const Sizes: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 300 }}>
			<Select size="sm" options={JURISDICTIONS} placeholder="Small" />
			<Select size="md" options={JURISDICTIONS} placeholder="Medium" />
			<Select size="lg" options={JURISDICTIONS} placeholder="Large" />
		</div>
	),
}

export const Searchable: Story = {
	args: {
		searchable: true,
		searchPlaceholder: 'Filter jurisdictions…',
	},
}

export const WithDisabledOptions: Story = {
	args: {
		options: JURISDICTIONS.map((o) => (o.value === 'mi' || o.value === 'ut' ? { ...o, disabled: true } : o)),
	},
}

export const Disabled: Story = {
	args: { disabled: true },
}

export const Empty: Story = {
	args: { options: [], searchable: true },
}
