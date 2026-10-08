import type { Meta, StoryObj } from '@storybook/react-vite'
import { Card } from './Card'
import { Badge } from '../Badge'
import { Button } from '../Button'

const meta: Meta<typeof Card> = {
	title: 'Components/Card',
	component: Card,
}
export default meta

type Story = StoryObj<typeof Card>

export const Playground: Story = {
	args: {
		children: 'Card content goes here.',
	},
}

export const Interactive: Story = {
	render: () => (
		<div style={{ maxWidth: 320 }}>
			<Card interactive>Hover to see the elevation raise — for a card used as a clickable list row.</Card>
		</div>
	),
}

// Illustrative composition only — a title, tags, and a trailing action, all built from this package's own generic pieces. Not a component this package ships or names.
export const WithTagsAndAction: Story = {
	render: () => (
		<div style={{ maxWidth: 420 }}>
			<Card interactive>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
					<div style={{ fontWeight: 600 }}>Example Title</div>
					<p style={{ margin: 0 }}>A short description of this item, showing how body copy reads inside a card.</p>
					<div style={{ display: 'flex', gap: 8 }}>
						<Badge tone="secondary">Category</Badge>
						<Badge tone="tertiary">Tag</Badge>
					</div>
					<Button size="sm">Take action</Button>
				</div>
			</Card>
		</div>
	),
}

// Illustrative composition only — a banner/alert form factor (not a pill), so caution's actual color can be judged in a shape closer to how a real warning would read. Not a component this package ships; a left-border accent + tint background from the live `--ddp-color-caution*` tokens (amber, now hue 55). Body text uses the app's default text token, not the tint-foreground -- an alert's readable copy shouldn't itself be tinted; the tone belongs on the accent/background only, matching the "don't rely on color alone" guidance USWDS's own Alert docs call out. Known follow-up: the left border reads a step too light/washed relative to the fill -- deferred to when a real Alert component gets built.
function CautionBanner() {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: 4,
				padding: '12px 16px',
				borderLeft: '4px solid var(--ddp-color-caution)',
				background: 'var(--ddp-color-caution-tint)',
				color: 'var(--ddp-text-default)',
				borderRadius: 4,
			}}
		>
			<div style={{ fontWeight: 700 }}>Heads up</div>
			<div>This bill&apos;s text changed after committee — the summary below may not reflect the latest version.</div>
		</div>
	)
}

export const CautionBannerFormFactor: Story = {
	render: () => (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 420 }}>
			<div data-theme="light" style={{ background: '#FFFFFF', padding: 24, border: '1px solid #D7DDE6' }}>
				<p style={{ color: '#56647C', fontSize: 12, marginBottom: 12 }}>Light theme</p>
				<CautionBanner />
			</div>
			<div data-theme="dark" style={{ background: '#14212F', padding: 24 }}>
				<p style={{ color: '#97A3B4', fontSize: 12, marginBottom: 12 }}>Dark theme</p>
				<CautionBanner />
			</div>
		</div>
	),
}

// Illustrative composition only — an avatar-style placeholder, a heading, and a stat, showing a different real content shape than the example above.
export const WithAvatarAndStat: Story = {
	render: () => (
		<div style={{ maxWidth: 420 }}>
			<Card>
				<div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
					<div
						style={{
							width: 48,
							height: 48,
							borderRadius: '50%',
							background: 'var(--ddp-surface-sunken)',
							flexShrink: 0,
						}}
					/>
					<div style={{ flex: 1 }}>
						<div style={{ fontWeight: 600 }}>Example Name</div>
						<div style={{ color: 'var(--ddp-text-soft)', fontSize: 'var(--ddp-font-size-sm)' }}>Subtitle detail</div>
					</div>
					<div style={{ textAlign: 'right' }}>
						<div style={{ fontWeight: 700, fontSize: 'var(--ddp-font-size-xl)' }}>92</div>
						<div style={{ color: 'var(--ddp-text-soft)', fontSize: 'var(--ddp-font-size-xs)' }}>Score</div>
					</div>
				</div>
			</Card>
		</div>
	),
}
