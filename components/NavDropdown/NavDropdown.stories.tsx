import type { Meta, StoryObj } from '@storybook/react-vite'
import { NavDropdown } from './NavDropdown'

const items = [
	{ label: 'About', href: '#about' },
	{ label: 'Our Team', href: '#team' },
	{ label: 'Endorsements', href: '#supporters' },
	{ label: 'Contact', href: '#contact' },
]

const meta: Meta<typeof NavDropdown> = {
	title: 'Components/NavDropdown',
	component: NavDropdown,
	args: { label: 'About', items },
	argTypes: {
		align: { control: 'select', options: ['left', 'right'] },
	},
}
export default meta

type Story = StoryObj<typeof NavDropdown>

export const Playground: Story = {}

export const ActivePage: Story = { args: { active: true } }

export const InABar: Story = {
	render: (args) => (
		<nav style={{ display: 'flex', gap: 24, alignItems: 'center', padding: 16, minHeight: 200 }} aria-label="Example">
			<a href="#trending">Trending</a>
			<a href="#explore">Explore</a>
			<NavDropdown {...args} align="left" />
			<a href="#media">Media</a>
		</nav>
	),
}
