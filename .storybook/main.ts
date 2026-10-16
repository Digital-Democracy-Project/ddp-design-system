import type { StorybookConfig } from '@storybook/react-vite'
import { fileURLToPath } from 'node:url'
import type { Plugin, PluginOption } from 'vite'

// vite.config.ts is the library build, and Storybook merges it in. These two plugins only make sense there: merge-tokens-into-stylesheet errors when the bundle has no dist/styles.css, and Storybook never needs .d.ts rollups.
const LIBRARY_ONLY_PLUGINS = ['merge-tokens-into-stylesheet', 'vite:dts']

const config: StorybookConfig = {
	async viteFinal(viteConfig) {
		// Widened to unknown[] first: flattening PluginOption[] directly makes TypeScript expand its recursive type (TS2589).
		const plugins = (viteConfig.plugins ?? []) as unknown[]
		viteConfig.plugins = plugins
			.flat(Infinity)
			.filter((plugin) => !LIBRARY_ONLY_PLUGINS.includes((plugin as Plugin | null)?.name ?? '')) as PluginOption[]
		return viteConfig
	},
	previewAnnotations: async (entries = []) => [
		...entries,
		fileURLToPath(new URL('./global-styles.ts', import.meta.url)),
	],
	stories: ['../components/**/*.stories.@(ts|tsx)'],
	addons: ['@storybook/addon-docs'],
	framework: {
		name: '@storybook/react-vite',
		options: {},
	},
}

export default config
