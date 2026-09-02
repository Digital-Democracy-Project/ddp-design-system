'use client';

import { forwardRef, useEffect, useRef, useState } from 'react';
import type { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';
import { Icon } from '../Icon';
import './Checkbox.scss';

export type CheckboxSize = 'sm' | 'md' | 'lg';

// Matches the real, shipped reference (ddp-scorecard-react's CheckboxItem, button mode): the checkmark fills the box edge-to-edge (icon size == box size, no internal padding) — only the box's own border provides any visual margin. These match the box dimensions in Checkbox.scss.
const CHECK_ICON_SIZE: Record<CheckboxSize, number> = { sm: 12, md: 16, lg: 20 };

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'checked' | 'defaultChecked' | 'type'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  /**
   * Neither checked nor unchecked — a DOM property, not an HTML attribute, so it can't be set via JSX and is synced imperatively via a ref. Purely visual: the underlying input's `checked` state (and what `onChange` reports on the next interaction) is unaffected.
   */
  indeterminate?: boolean;
  size?: CheckboxSize;
  error?: boolean;
  errorMessage?: string;
  /** Label content, rendered next to the box inside the same `<label>`. */
  children?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  {
    checked,
    defaultChecked,
    onChange,
    indeterminate,
    size = 'md',
    error,
    errorMessage,
    disabled,
    className,
    children,
    ...rest
  },
  ref
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : internalChecked;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate ?? false;
    }
  }, [indeterminate]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalChecked(e.target.checked);
    onChange?.(e.target.checked);
  };

  const setRefs = (node: HTMLInputElement | null) => {
    inputRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  const rootClasses = [
    'ddp-checkbox',
    `ddp-checkbox-${size}`,
    error ? 'is-error' : undefined,
    disabled ? 'is-disabled' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div>
      <label className={rootClasses}>
        <span className="ddp-checkbox-control">
          <input
            ref={setRefs}
            type="checkbox"
            checked={currentChecked}
            onChange={handleChange}
            disabled={disabled}
            className="ddp-checkbox-input"
            aria-invalid={error || undefined}
            {...rest}
          />
          <span className="ddp-checkbox-box">
            <Icon name="check" size={CHECK_ICON_SIZE[size]} className="ddp-checkbox-check-icon" />
            <span className="ddp-checkbox-dash" />
          </span>
        </span>
        {children && <span className="ddp-checkbox-text">{children}</span>}
      </label>
      {error && errorMessage && <p className="ddp-checkbox-error-message">{errorMessage}</p>}
    </div>
  );
});
