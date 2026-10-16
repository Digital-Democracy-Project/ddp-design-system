import type { Preview } from '@storybook/react-vite'

// Renders every story inside a themed wrapper so the toolbar toggle below
// actually exercises our [data-theme="dark"] token remapping, not just the
// default light theme. The `ddp` class matches how consuming apps use the
// library (ddp-next puts it on <body>): components take their font from it.
const withTheme: Preview['decorators'] = [
	(Story, context) => {
		// Portaled content (dropdown panels) renders under <body>, outside this wrapper, so <body> gets the class too, as in consuming apps. Story view only: in Docs view <body> also holds Storybook's own docs page.
		if (context.viewMode === 'story') document.body.classList.add('ddp')
		return (
			<div className="ddp" data-theme={context.globals.theme ?? 'light'} style={{ padding: '1rem' }}>
				<Story />
			</div>
		)
	},
]

const preview: Preview = {
	// Generates a Docs page (props table + every story) for each component; a story file can opt out with tags: ['!autodocs'].
	tags: ['autodocs'],
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	globalTypes: {
		theme: {
			description: 'Global theme for components',
			toolbar: {
				title: 'Theme',
				icon: 'circlehollow',
				items: [
					{ value: 'light', icon: 'circlehollow', title: 'Light' },
					{ value: 'dark', icon: 'circle', title: 'Dark' },
				],
				dynamicTitle: true,
			},
		},
	},
	initialGlobals: {
		theme: 'light',
	},
	decorators: withTheme,
}

export default preview
