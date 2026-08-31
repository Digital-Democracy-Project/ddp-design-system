'use client';

import { forwardRef } from 'react';
import type { ButtonHTMLAttributes, CSSProperties } from 'react';
import { Icon } from '../Icon';
import type { IconName, IconSize } from '../Icon';
import styles from './IconButton.module.scss';

export type IconButtonTheme = 'none' | 'primary' | 'secondary' | 'tertiary';

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'aria-label'> {
  /**
   * Native button type. Defaults to `'button'`, not the browser's implicit
   * `'submit'` default, since an unintentional form submit is a common,
   * easy-to-miss bug.
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * Required, not optional — IconButton has no visible label, so this is
   * the only accessible name a screen reader gets.
   */
  'aria-label': string;
  /** Which icon to render — see `assets/icons/` for the full source set. */
  iconName: IconName;
  /** Maps to Icon's own `size`. */
  iconSize?: IconSize | number;
  /**
   * Sets the icon's CSS `color` directly. Named `iconColor`, not `iconFill`
   * — our icons use `fill="currentColor"` internally, which tracks the CSS
   * `color` property, not the SVG `fill` attribute; a raw `fill` override
   * on the root `<svg>` wouldn't actually recolor them.
   */
  iconColor?: string;
  /**
   * `'none'` (default, transparent background, muted icon color) or a
   * brand color (`'primary'` | `'secondary'` | `'tertiary'` — solid
   * background, safe foreground icon color, same pairing Button's solid
   * variant uses). `iconColor` overrides whatever the theme would
   * otherwise set.
   */
  theme?: IconButtonTheme;
  /** Defaults to 0 (no padding) — the one look actually validated so far. Add explicitly for more breathing room. */
  padding?: string | number;
  width?: string | number;
  height?: string | number;
  /** Stretch to 100% of the parent's box, instead of sizing to content. Opt-in, not the default — depends on the parent being predictably sized. */
  fill?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  {
    type = 'button',
    iconName,
    iconSize = 'md',
    iconColor,
    theme = 'none',
    padding,
    width,
    height,
    fill,
    style,
    className,
    ...rest
  },
  ref
) {
  const classes = [styles.iconButton, styles[theme], fill ? styles.fill : undefined, className]
    .filter(Boolean)
    .join(' ');

  const mergedStyle: CSSProperties = { padding, width, height, ...style };

  return (
    <button ref={ref} type={type} className={classes} style={mergedStyle} {...rest}>
      <Icon name={iconName} size={iconSize} style={iconColor ? { color: iconColor } : undefined} />
    </button>
  );
});
