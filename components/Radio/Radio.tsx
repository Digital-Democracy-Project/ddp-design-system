'use client'

import { forwardRef } from 'react'
import type { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react'
import type { SizeOptions3 } from '../types'
import { useRadioGroupContext } from './RadioGroupContext'
import '../Checkbox/Checkbox.scss'
import './Radio.scss'

export type RadioSize = SizeOptions3

export interface RadioProps extends Omit<
	InputHTMLAttributes<HTMLInputElement>,
	'size' | 'onChange' | 'type' | 'value'
> {
	/** The value this row stands for; the group reports it through its own `onChange` when this row is picked. */
	value: string
	/** Called with this row's `value` when it becomes selected. Only needed for a Radio used outside a `RadioGroup`. */
	onChange?: (value: string) => void
	/** Ignored inside a `RadioGroup`, which sets one size for every row. */
	size?: RadioSize
	error?: boolean
	/** Label content, rendered next to the circle inside the same `<label>`. */
	children?: ReactNode
}

// One row of a single-choice group: a real `<input type="radio">`, visually hidden, with a drawn circle and dot. Meant to sit inside a RadioGroup, which supplies the shared `name`, the selected value, size, disabled and error; used on its own it is a plain native radio (pass `name` and `checked`/`defaultChecked` yourself).
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
	{
		value,
		onChange,
		size: ownSize = 'md',
		error: ownError,
		disabled: ownDisabled,
		checked,
		name,
		className,
		children,
		...rest
	},
	ref,
) {
	const group = useRadioGroupContext()
	const size = group?.size ?? ownSize
	const disabled = Boolean(group?.disabled || ownDisabled)
	const error = Boolean(group?.error || ownError)

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		// A native radio only fires `change` when it becomes checked, never when another row takes the choice away.
		if (!e.target.checked) return
		if (group) group.select(value)
		onChange?.(value)
	}

	const rootClasses = [
		'ddp-checkbox',
		`ddp-checkbox-${size}`,
		'ddp-radio',
		error ? 'is-error' : undefined,
		disabled ? 'is-disabled' : undefined,
		className,
	]
		.filter(Boolean)
		.join(' ')

	return (
		<label className={rootClasses}>
			<span className="ddp-checkbox-control">
				<input
					ref={ref}
					type="radio"
					name={group ? group.name : name}
					value={value}
					checked={group ? group.selectedValue === value : checked}
					onChange={handleChange}
					disabled={disabled}
					className="ddp-radio-input"
					aria-invalid={error || undefined}
					{...rest}
				/>
				<span className="ddp-checkbox-box ddp-radio-circle">
					<span className="ddp-radio-dot" />
				</span>
			</span>
			{children && <span className="ddp-checkbox-text">{children}</span>}
		</label>
	)
})
