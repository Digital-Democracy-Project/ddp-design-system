'use client';

import { forwardRef, useState } from 'react';
import type { ChangeEvent, InputHTMLAttributes, KeyboardEvent } from 'react';
import { IconButton } from '../IconButton';
import styles from './TextInput.module.scss';

export type TextInputSize = 'sm' | 'md' | 'lg';

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'onSubmit' | 'value' | 'defaultValue'> {
  value?: string;
  defaultValue?: string;
  /** Fires on every keystroke, with the current string value. */
  onChange?: (value: string) => void;
  /**
   * Fires when Enter is pressed, with the current string value — a
   * "commit" callback distinct from `onChange`'s live updates, matching
   * the two-tier model already validated in ddp-scorecard-react's search
   * box. Purely a visual/interaction primitive: matching, filtering, and
   * any debouncing are the consumer's responsibility, not this
   * component's — it doesn't know or care what onSubmit does with the value.
   */
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
    styles.wrapper,
    styles[size],
    error ? styles.error : undefined,
    disabled ? styles.disabled : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div>
      <div className={wrapperClasses}>
        <input
          ref={ref}
          type={type}
          value={currentValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={styles.input}
          aria-invalid={error || undefined}
          {...rest}
        />
        {clearable && currentValue && (
          <IconButton
            iconName="close"
            iconSize="sm"
            theme="none"
            onClick={handleClear}
            disabled={disabled}
            aria-label="Clear"
            className={styles.clearButton}
          />
        )}
      </div>
      {error && errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
});
