'use client';

import { forwardRef, useState } from 'react';
import type { ChangeEvent, InputHTMLAttributes, ReactNode } from 'react';
import type { SizeOptions } from '../shared/types';
import './ToggleSwitch.scss';

export type ToggleSwitchSize = SizeOptions;

export interface ToggleSwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange' | 'checked' | 'defaultChecked' | 'type'> {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  size?: ToggleSwitchSize;
  /** Label content, rendered next to the switch inside the same `<label>`. */
  children?: ReactNode;
}

export const ToggleSwitch = forwardRef<HTMLInputElement, ToggleSwitchProps>(function ToggleSwitch(
  { checked, defaultChecked, onChange, size = 'md', disabled, className, children, ...rest },
  ref
) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : internalChecked;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalChecked(e.target.checked);
    onChange?.(e.target.checked);
  };

  const rootClasses = ['ddp-toggle-switch', `ddp-toggle-switch-${size}`, disabled ? 'is-disabled' : undefined, className]
    .filter(Boolean)
    .join(' ');

  return (
    <div>
      <label className={rootClasses}>
        <span className="ddp-toggle-switch-control">
          <input
            ref={ref}
            type="checkbox"
            role="switch"
            checked={currentChecked}
            onChange={handleChange}
            disabled={disabled}
            className="ddp-toggle-switch-input"
            {...rest}
          />
          <span className="ddp-toggle-switch-track">
            <span className="ddp-toggle-switch-thumb" />
          </span>
        </span>
        {children && <span className="ddp-toggle-switch-text">{children}</span>}
      </label>
    </div>
  );
});
