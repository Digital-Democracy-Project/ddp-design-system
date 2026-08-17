'use client';

import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import styles from './Button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonCustomColors {
  background: string;
  foreground: string;
  /** Falls back to `background` if omitted. */
  backgroundHover?: string;
  /** Falls back to `background` if omitted. */
  backgroundActive?: string;
}

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /**
   * Visual treatment. `'link'` looks like an inline hyperlink (matches the
   * base `<a>` styling in colors_and_type.css exactly — same color, same
   * hover-only underline) but stays a real `<button>`, so assistive tech
   * still announces it correctly as a button — use it for actions that
   * should read visually as a link without misrepresenting what they do.
   */
  variant?: ButtonVariant;
  size?: ButtonSize;
  /**
   * Native button type. Defaults to `'button'`, not the browser's implicit
   * `'submit'` default, since an unintentional form submit from a stray
   * button inside a `<form>` is a common, easy-to-miss bug.
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Escape hatch for any color scheme outside the standard variants —
   * overrides `variant`'s color only; shape (padding, radius, the `link`
   * treatment) still comes from `variant`. On `variant="link"`, only the
   * base foreground is customizable — the hover color shift stays the
   * built-in link-hover tone, and the background stays transparent.
   */
  customColors?: ButtonCustomColors;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', type = 'button', customColors, className, style, children, ...rest },
  ref
) {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    customColors ? styles.custom : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const mergedStyle: CSSProperties | undefined = customColors
    ? ({
        '--ddp-button-bg': customColors.background,
        '--ddp-button-fg': customColors.foreground,
        '--ddp-button-bg-hover': customColors.backgroundHover,
        '--ddp-button-bg-active': customColors.backgroundActive,
        ...style,
      } as CSSProperties)
    : style;

  return (
    <button ref={ref} type={type} className={classes} style={mergedStyle} {...rest}>
      {children}
    </button>
  );
});
