import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Checkbox } from '../Checkbox'
import { SectionLabel } from '../SectionLabel'
import { Radio } from './Radio'
import { RadioGroup } from './RadioGroup'

const SESSIONS = [
	{ value: 'current', label: 'Current session' },
	{ value: 'previous', label: 'Previous sessions' },
	{ value: 'all', label: 'All sessions' },
]

const meta: Meta<typeof RadioGroup> = {
	title: 'Components/RadioGroup',
	component: RadioGroup,
	args: { size: 'md', disabled: false, label: 'Session', defaultValue: 'current' },
	argTypes: {
		size: { control: 'select', options: ['sm', 'md', 'lg'] },
	},
	render: (args) => (
		<RadioGroup {...args}>
			{SESSIONS.map((s) => (
				<Radio key={s.value} value={s.value}>
					{s.label}
				</Radio>
			))}
		</RadioGroup>
	),
}
export default meta

type Story = StoryObj<typeof RadioGroup>

export const Playground: Story = {}

// The website keeps the choice in the address bar, so this is the shape it uses: value + onChange, with an explicit "All ..." row for "no filter" (a chosen row cannot be un-chosen).
export const Controlled: Story = {
	render: () => {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const [value, setValue] = useState('all')
		return (
			<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
				<RadioGroup label="Session" value={value} onChange={setValue}>
					{SESSIONS.map((s) => (
						<Radio key={s.value} value={s.value}>
							{s.label}
						</Radio>
					))}
				</RadioGroup>
				<p style={{ margin: 0 }}>Selected: {value}</p>
			</div>
		)
	},
}

// Side by side with Checkbox at each size, to check the two line up (switch the toolbar theme for dark).
export const SizesBesideCheckbox: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: 48 }}>
			{(['sm', 'md', 'lg'] as const).map((size) => (
				<div key={size} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
					<RadioGroup label={`Radio ${size}`} size={size} defaultValue="a">
						<Radio value="a">Selected</Radio>
						<Radio value="b">Not selected</Radio>
					</RadioGroup>
					<Checkbox size={size} defaultChecked>
						Checkbox checked
					</Checkbox>
					<Checkbox size={size}>Checkbox unchecked</Checkbox>
				</div>
			))}
		</div>
	),
}

export const NothingSelected: Story = {
	args: { defaultValue: undefined },
}

export const ErrorState: Story = {
	args: { error: true, errorMessage: 'Pick a session to continue.', defaultValue: undefined },
}

export const Disabled: Story = {
	args: { disabled: true },
}

// The group named by a SectionLabel outside it, instead of its own legend.
export const LabelledByOutsideLabel: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
			<SectionLabel id="chamber-label">Chamber</SectionLabel>
			<RadioGroup aria-labelledby="chamber-label" defaultValue="both">
				<Radio value="both">Both chambers</Radio>
				<Radio value="house">House</Radio>
				<Radio value="senate">Senate</Radio>
			</RadioGroup>
		</div>
	),
}
