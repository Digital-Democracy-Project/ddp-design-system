import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon, iconNames } from './Icon'

const meta: Meta<typeof Icon> = {
	title: 'Components/Icon',
	component: Icon,
	args: { name: 'chevron-down', size: 'md' },
	argTypes: {
		name: { control: 'select', options: iconNames },
		size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
	},
}
export default meta

type Story = StoryObj<typeof Icon>

export const Playground: Story = {}

export const AllIcons: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
			{iconNames.map((n) => (
				<div
					key={n}
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						gap: 6,
						fontSize: 11,
						width: 72,
					}}
				>
					<Icon name={n} size="lg" />
					<span>{n}</span>
				</div>
			))}
		</div>
	),
}

export const CustomSize: Story = {
	args: { name: 'chevron-down', size: 48 },
}

export const WithAccessibleLabel: Story = {
	args: { name: 'close', title: 'Close' },
}

export const FixedPartyColors: Story = {
	render: () => (
		<div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
			<Icon name="democrat" size="xl" />
			<Icon name="republican" size="xl" />
			<span style={{ color: 'seagreen' }}>
				<Icon name="check" size="xl" />
			</span>
		</div>
	),
}
