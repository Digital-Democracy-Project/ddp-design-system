import type { HTMLAttributes, ReactNode } from 'react';
import './SectionLabel.scss';

export type SectionLabelTone = 'subtle' | 'neutral' | 'primary' | 'secondary' | 'tertiary';

export interface SectionLabelProps extends HTMLAttributes<HTMLSpanElement> {
  /** `'subtle'` (default) for a quiet field/section label; `'neutral'` for the same look at full-strength text color; `'primary'`/`'secondary'`/`'tertiary'` for brand-colored inline record-meta. */
  tone?: SectionLabelTone;
  children: ReactNode;
}

// tone is a peer-choice axis (every value, including the default, is an actually-rendered look), so its class is always applied explicitly — same convention as Badge's own tone prop.
export function SectionLabel({ tone = 'subtle', className, children, ...rest }: SectionLabelProps) {
  const classes = ['ddp-section-label', `ddp-section-label-${tone}`, className].filter(Boolean).join(' ');

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
}
