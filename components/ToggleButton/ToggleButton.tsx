'use client';

import { forwardRef, useState } from 'react';
import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { Icon } from '../Icon';
import styles from './ToggleButton.module.scss';

export type ToggleButtonTone = 'neutral' | 'primary' | 'secondary' | 'tertiary';
export type ToggleButtonSize = 'sm' | 'md' | 'lg';
export type ToggleButtonIndicator = 'none' | 'checkbox';

// Matches Checkbox's own box scale exactly, since indicator="checkbox"
// reuses that same visual language (edge-to-edge checkmark fill).
const CHECK_ICON_SIZE: Record<ToggleButtonSize, number> = { sm: 12, md: 16, lg: 20 };

export interface ToggleButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'onChange' | 'value' | 'defaultValue'> {
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  tone?: ToggleButtonTone;
  size?: ToggleButtonSize;
  /**
   * `'none'` (a plain pill, filled solid when pressed — for a
   * multi-select-style chip) or `'checkbox'` (a rounded rect with a small
   * decorative checkbox square, tinted when pressed — for an independent
   * boolean flag read as "hide voice votes"-style). Purely presentational:
   * this is always a real `<button aria-pressed>`, never a native
   * checkbox input — see the README for why.
   */
  indicator?: ToggleButtonIndicator;
  children: ReactNode;
}

export const ToggleButton = forwardRef<HTMLButtonElement, ToggleButtonProps>(function ToggleButton(
  {
    pressed,
    defaultPressed,
    onPressedChange,
    tone = 'primary',
    size = 'md',
    indicator = 'none',
    disabled,
    className,
    children,
    onClick,
    ...rest
  },
  ref
) {
  const [internalPressed, setInternalPressed] = useState(defaultPressed ?? false);
  const isControlled = pressed !== undefined;
  const currentPressed = isControlled ? pressed : internalPressed;

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    const next = !currentPressed;
    if (!isControlled) setInternalPressed(next);
    onPressedChange?.(next);
  };

  const classes = [
    styles.toggleButton,
    styles[tone],
    styles[size],
    styles[indicator],
    currentPressed ? styles.pressed : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      ref={ref}
      type="button"
      aria-pressed={currentPressed}
      disabled={disabled}
      className={classes}
      onClick={handleClick}
      {...rest}
    >
      {indicator === 'checkbox' && (
        <span className={styles.box}>
          <Icon name="check" size={CHECK_ICON_SIZE[size]} className={styles.checkIcon} />
        </span>
      )}
      {children}
    </button>
  );
});
