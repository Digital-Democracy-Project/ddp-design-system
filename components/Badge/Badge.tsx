import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import './Badge.scss';

export type BadgeTone = 'neutral' | 'primary' | 'secondary' | 'tertiary';
export type BadgeAppearance = 'soft' | 'solid';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeCustomColors {
  background: string;
  foreground: string;
}

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Color role. Deliberately just the brand roles plus a token-backed
   * `'neutral'` default — not a valence/status/grade vocabulary. A
   * component like ValencePill or GradeChip that needs domain-specific
   * color mapping should wrap this one with its own explicit color choice
   * rather than this component guessing at meaning.
   */
  tone?: BadgeTone;
  /**
   * `'soft'` (tinted background, the default) or `'solid'` (filled).
   * `'solid'` only has real effect on `'primary'`/`'secondary'`/`'tertiary'`
   * — `'neutral'` has no dedicated safe-foreground-on-solid token, so it
   * stays soft regardless.
   */
  appearance?: BadgeAppearance;
  size?: BadgeSize;
  /**
   * Escape hatch for any color scheme outside `tone`/`appearance` — sets
   * this badge's background/foreground directly as inline styles, so it
   * still composes normally with `size` and everything else. Takes
   * priority over `tone`/`appearance` when provided.
   */
  customColors?: BadgeCustomColors;
  children: ReactNode;
}

export function Badge({
  tone = 'neutral',
  appearance = 'soft',
  size = 'md',
  customColors,
  className,
  style,
  children,
  ...rest
}: BadgeProps) {
  const classes = [
    'ddp-badge',
    `ddp-badge-${tone}`,
    appearance === 'solid' ? 'ddp-badge-solid' : undefined,
    `ddp-badge-${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const mergedStyle: CSSProperties | undefined = customColors
    ? { backgroundColor: customColors.background, color: customColors.foreground, ...style }
    : style;

  return (
    <span className={classes} style={mergedStyle} {...rest}>
      {children}
    </span>
  );
}
