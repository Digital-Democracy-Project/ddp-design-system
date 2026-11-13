'use client'

import { useId, useState } from 'react'
import type { FieldsetHTMLAttributes, ReactNode } from 'react'
import type { SizeOptions3 } from '../types'
import { RadioGroupContext } from './RadioGroupContext'
import './Radio.scss'

export type RadioGroupSize = SizeOptions3

export interface RadioGroupProps extends Omit<
	FieldsetHTMLAttributes<HTMLFieldSetElement>,
	'onChange' | 'defaultValue'
> {
	/** The selected row's value; `null` for nothing selected. Pass it (with `onChange`) to control the group. */
	value?: string | null
	defaultValue?: string
	/** Called with the newly selected row's value. A chosen row cannot be un-chosen: offer an explicit "All ..." row for "no filter". */
	onChange?: (value: string) => void
	/** The shared native `name` for every row; generated when omitted. */
	name?: string
	/** The group's visible name, rendered as the fieldset's `<legend>`. Without it, pass `aria-label` or `aria-labelledby`. */
	label?: ReactNode
	size?: RadioGroupSize
	disabled?: boolean
	error?: boolean
	errorMessage?: string
	/** The `Radio` rows. */
	children: ReactNode
}

// A `<fieldset>` around native radios sharing one `name`: the browser itself gives one Tab stop for the group, arrow keys that move and select, and the "selected, 1 of N" announcement.
export function RadioGroup({
	value,
	defaultValue,
	onChange,
	name,
	label,
	size = 'md',
	disabled = false,
	error = false,
	errorMessage,
	className,
	children,
	'aria-describedby': describedBy,
	...rest
}: RadioGroupProps) {
	const generatedName = useId()
	const errorId = useId()
	const [internalValue, setInternalValue] = useState<string | null>(defaultValue ?? null)
	const isControlled = value !== undefined
	const selectedValue = isControlled ? value : internalValue

	const select = (next: string) => {
		if (!isControlled) setInternalValue(next)
		onChange?.(next)
	}

	const showError = error && Boolean(errorMessage)
	const classes = ['ddp-radio-group', className].filter(Boolean).join(' ')
	// Keeps a consumer's own description and adds the error message to it, rather than one replacing the other.
	const describedByIds = [describedBy, showError ? errorId : undefined].filter(Boolean).join(' ') || undefined

	return (
		<fieldset className={classes} disabled={disabled} aria-describedby={describedByIds} {...rest}>
			{label && <legend className="ddp-radio-group-legend">{label}</legend>}
			<RadioGroupContext.Provider value={{ name: name ?? generatedName, selectedValue, select, size, disabled, error }}>
				<div className="ddp-radio-group-options">{children}</div>
			</RadioGroupContext.Provider>
			{showError && (
				<p id={errorId} className="ddp-radio-group-error-message">
					{errorMessage}
				</p>
			)}
		</fieldset>
	)
}
