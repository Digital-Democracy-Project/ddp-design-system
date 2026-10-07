'use client';

import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';
import type { SizeOptions3 } from '../types';
import './Button.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'link';
export type ButtonSize = SizeOptions3 | 'inherit';
export type ButtonUnderline = 'hover' | 'always' | 'none';
export type ButtonAppearance = 'solid' | 'outline';

export interface ButtonCustomColors {
  background: string;
  foreground: string;
  /** Falls back to `background` if omitted. */
  backgroundHover?: string;
  /** Falls back to `background` if omitted. */
  backgroundActive?: string;
}

export interface ButtonProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'type'
> {
  /**
   * Visual treatment. `'link'` looks and behaves exactly like a text link (same `link()` recipe as the base `<a>` styling: color, underline, focus ring; inline, wrapping, type inherited from context) but stays a real `<button>`, so assistive tech still announces it correctly as a button — use it for actions that should read visually as a link without misrepresenting what they do, like show more/less toggles.
   */
  variant?: ButtonVariant;
  /**
   * `'sm' | 'md' | 'lg'`: the design system sets type, padding and gap. `'inherit'`: the consumer does — type inherits from context, padding and gap scale with it in em, and a `className` can override any of them regardless of stylesheet order. Defaults to `'inherit'` for `variant="link"` and `'md'` otherwise.
   */
  size?: ButtonSize;
  /**
   * Link variant only: when the underline shows. `'hover'` (default) fades it in on hover and keyboard focus; `'always'` keeps it; `'none'` removes it, only for links whose context already reads as interactive, never inside running text. No effect on other variants.
   */
  underline?: ButtonUnderline;
  /**
   * `'solid'` (filled, the default) or `'outline'` (transparent background, border and text in the variant's color, tint-filled on hover). Has no effect on `variant="link"`, which has no color of its own to outline — same rule as `Badge`'s `appearance` having no effect on `tone="neutral"`.
   */
  appearance?: ButtonAppearance;
  /**
   * Native button type. Defaults to `'button'`, not the browser's implicit `'submit'` default, since an unintentional form submit from a stray button inside a `<form>` is a common, easy-to-miss bug.
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Escape hatch for any color scheme outside the standard variants — overrides `variant`'s color only; shape (padding, radius, the `link` treatment) still comes from `variant`. On `variant="link"`, only the base foreground is customizable — the hover color shift stays the built-in link-hover tone, and the background stays transparent.
   */
  customColors?: ButtonCustomColors;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size,
      underline = 'hover',
      appearance = 'solid',
      type = 'button',
      customColors,
      className,
      style,
      children,
      ...rest
    },
    ref,
  ) {
    const resolvedSize = size ?? (variant === 'link' ? 'inherit' : 'md');
    const classes = [
      'ddp-button',
      `ddp-button-${variant}`,
      `ddp-button-${resolvedSize}`,
      variant === 'link' && underline !== 'hover' ? `ddp-button-underline-${underline}` : undefined,
      appearance === 'outline' ? 'ddp-button-outline' : undefined,
      customColors ? 'ddp-button-custom' : undefined,
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
      <button
        ref={ref}
        type={type}
        className={classes}
        style={mergedStyle}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
