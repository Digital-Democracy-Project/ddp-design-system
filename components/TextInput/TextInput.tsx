'use client';

import { forwardRef, useState } from 'react';
import type { ChangeEvent, InputHTMLAttributes, KeyboardEvent } from 'react';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';
import type { IconName } from '../Icon';
import './TextInput.scss';

// Internal icons (the leading icon, the clear button) scale 1:1 with the
// component's own size rather than staying fixed — TextInputSize ('sm' |
// 'md' | 'lg') is already a subset of IconSize, so `size` passes straight
// through with no lookup needed. Now a general convention — see
// ddp-select's chevron for the other instance of the same fix.

export type TextInputSize = 'sm' | 'md' | 'lg';

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'onSubmit' | 'value' | 'defaultValue'> {
  value?: string;
  defaultValue?: string;
  /** A leading, decorative icon — fixed position, no interaction. Deliberately dropped when this component was first built (nothing had validated a need for one), added once `SearchBar` did. */
  icon?: IconName;
  /** Fires on every keystroke, with the current string value. */
  onChange?: (value: string) => void;
  /** Fires when Enter is pressed, with the current string value — a "commit" callback distinct from `onChange`'s live updates, matching the two-tier model already validated in ddp-scorecard-react's search box. Purely a visual/interaction primitive: matching, filtering, and any debouncing are the consumer's responsibility, not this component's — it doesn't know or care what onSubmit does with the value. */
  onSubmit?: (value: string) => void;
  size?: TextInputSize;
  /** Shows a clear (×) control once there's a value; clears and fires both `onChange('')` and `onSubmit('')`. */
  clearable?: boolean;
  error?: boolean;
  errorMessage?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput(
  {
    value,
    defaultValue,
    icon,
    onChange,
    onSubmit,
    onKeyDown,
    size = 'md',
    clearable,
    error,
    errorMessage,
    disabled,
    type = 'text',
    className,
    ...rest
  },
  ref
) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(e.target.value);
    onChange?.(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e);
    if (e.key === 'Enter') onSubmit?.(currentValue);
  };

  const handleClear = () => {
    if (!isControlled) setInternalValue('');
    onChange?.('');
    onSubmit?.('');
  };

  const wrapperClasses = [
    'ddp-text-input',
    `ddp-text-input-${size}`,
    error ? 'is-error' : undefined,
    disabled ? 'is-disabled' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div>
      <div className={wrapperClasses}>
        {icon && <Icon name={icon} size={size} className="ddp-text-input-icon" />}
        <input
          ref={ref}
          type={type}
          value={currentValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className="ddp-text-input-field"
          aria-invalid={error || undefined}
          {...rest}
        />
        {clearable && currentValue && (
          <IconButton
            iconName="close"
            iconSize={size}
            onClick={handleClear}
            disabled={disabled}
            aria-label="Clear"
            className="ddp-text-input-clear-button"
          />
        )}
      </div>
      {error && errorMessage && <p className="ddp-text-input-error-message">{errorMessage}</p>}
    </div>
  );
});
