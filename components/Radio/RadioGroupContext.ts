import { createContext, useContext } from 'react'
import type { SizeOptions3 } from '../types'

// What a RadioGroup hands each Radio inside it: the shared native `name` (which is what gives the browser's own one-Tab-stop, arrow-key, "1 of N" radio behaviour), the selected value, and the look shared by every row.
export interface RadioGroupContextValue {
	name: string
	selectedValue: string | null
	select: (value: string) => void
	size: SizeOptions3
	disabled: boolean
	error: boolean
}

export const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

export function useRadioGroupContext(): RadioGroupContextValue | null {
	return useContext(RadioGroupContext)
}
