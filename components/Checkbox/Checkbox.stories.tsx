import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
	title: 'Components/Checkbox',
	component: Checkbox,
	args: { size: 'md', disabled: false, children: 'Hide voice votes' },
	argTypes: {
		size: { control: 'select', options: ['sm', 'md', 'lg'] },
	},
}
export default meta

type Story = StoryObj<typeof Checkbox>

export const Playground: Story = {}

export const Sizes: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
			<Checkbox size="sm" defaultChecked>
				Small
			</Checkbox>
			<Checkbox size="md" defaultChecked>
				Medium
			</Checkbox>
			<Checkbox size="lg" defaultChecked>
				Large
			</Checkbox>
		</div>
	),
}

export const Indeterminate: Story = {
	render: () => <Checkbox indeterminate>Select all</Checkbox>,
}

export const Controlled: Story = {
	render: () => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [checked, setChecked] = useState(false)
		return (
			<Checkbox checked={checked} onChange={setChecked}>
				{checked ? 'Checked' : 'Unchecked'}
			</Checkbox>
		)
	},
}

export const ErrorState: Story = {
	args: {
		error: true,
		errorMessage: 'You must accept the terms to continue.',
		children: 'I accept the terms',
	},
}

export const Disabled: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
			<Checkbox disabled>Unchecked, disabled</Checkbox>
			<Checkbox disabled defaultChecked>
				Checked, disabled
			</Checkbox>
		</div>
	),
}

export const NoLabel: Story = {
	args: { children: undefined, 'aria-label': 'Select row' },
}
