import type { FunctionComponent, SVGProps } from 'react'
import type { SizeOptions5 } from '../types'
import './Icon.scss'

type IconComponent = FunctionComponent<SVGProps<SVGSVGElement>>

// Auto-discovers every SVG in assets/icons/ at build time via Vite's glob import — drop a new standardized icon in that folder and it's available here immediately, no import statement or registry entry to maintain. Trade-off, accepted deliberately: `name` below can only be typed as `string`, not a literal union, since TypeScript has no way to know what the glob will match without actually running it. A typo in `name` is a runtime issue (the icon silently fails to render), not a compile error.
const modules = import.meta.glob<IconComponent>('../../assets/icons/*.svg', {
	eager: true,
	query: '?react',
	import: 'default',
})

const ICONS: Record<string, IconComponent> = {}
for (const path in modules) {
	const match = path.match(/([^/]+)\.svg$/)
	if (match) {
		ICONS[match[1]] = modules[path]
	}
}

export type IconName = string
// Deliberately a superset of SizeOptions ('xs' and 'xl' added), not an alias of it — every SizeOptions-scaled component's own size passes straight through to this one with no lookup table, since the subset relationship holds by construction. See TextInput/Select for the components that rely on this.
export type IconSize = SizeOptions5

const SIZE_CLASSES: Record<IconSize, string> = {
	xs: 'ddp-icon-xs',
	sm: 'ddp-icon-sm',
	md: 'ddp-icon-md',
	lg: 'ddp-icon-lg',
	xl: 'ddp-icon-xl',
}

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
	/** Which icon to render — see assets/icons/ for the full source set. */
	name: IconName
	/** Named size step (default 'md'), or a raw pixel number as an escape hatch. */
	size?: IconSize | number
	/** Accessible label. Omit for decorative icons — the common case alongside visible text — and the icon gets `aria-hidden`. Provide it and the icon gets `role="img"` + `aria-label` instead. */
	title?: string
}

export function Icon({ name, size = 'md', title, className, style, ...rest }: IconProps) {
	const Component = ICONS[name]
	const isCustomSize = typeof size === 'number'
	const classes = ['ddp-icon', !isCustomSize ? SIZE_CLASSES[size] : undefined, className].filter(Boolean).join(' ')
	const mergedStyle = isCustomSize ? { width: size, height: size, ...style } : style

	if (!Component) {
		if (process.env.NODE_ENV !== 'production') {
			console.warn(`Icon: unknown icon name "${name}".`)
		}
		return null
	}

	return (
		<Component
			className={classes}
			style={mergedStyle}
			aria-hidden={title ? undefined : true}
			role={title ? 'img' : undefined}
			aria-label={title}
			{...rest}
		/>
	)
}
