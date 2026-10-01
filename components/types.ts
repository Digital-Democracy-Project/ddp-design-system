import { AllColorTones, BrandTones, Sizes } from './utils';

/**
 * Get keys from a Record-like type
 */
export type Keys<T extends Record<string, unknown>> = keyof T

/**
 * Get values from a Record-like type
 */
export type Values<T extends Record<string, unknown>> = T[Keys<T>]

// The recurring `'sm' | 'md' | 'lg'` size scale, shared by Button/Badge/Checkbox/Select/SearchBar/TextInput/ToggleButton/ToggleSwitch. Each still exports its own `<Name>Size` alias for its own README/call-site clarity — `SizeOptions` is the one place the actual literal values live, so they only need changing here. `Icon`'s own five-step scale ('xs'|'sm'|'md'|'lg'|'xl') is deliberately a superset of this one, not an alias of it — see its own definition for why.
export type SizeOptions = Values<typeof Sizes>;
export type SizeOptions3 = Values<Pick<typeof Sizes, 'S' | 'M' | 'L'>>;
export type SizeOptions5 = Values<Pick<typeof Sizes, 'XS' | 'S' | 'M' | 'L' | 'XL'>>;

export type AllToneOptions = Values<typeof AllColorTones>;
export type BrandToneWithNeutral = Values<typeof BrandTones> | typeof AllColorTones.NEUTRAL;
