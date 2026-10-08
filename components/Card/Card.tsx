import type { HTMLAttributes, ReactNode } from 'react';
import './Card.scss';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the whole card raises on hover — for a card used as a clickable list row. Off by default; a static card shouldn't imply it's clickable. */
  interactive?: boolean;
  /** Class for the inner content element (padding and baseline type). Every Card style is a zero-specificity default, so this (e.g. a spacing utility like `pa-5`, or a module class) overrides any of it; `className` does the same for the outer chrome. */
  contentClassName?: string;
  children: ReactNode;
}

export function Card({ interactive, className, contentClassName, children, ...rest }: CardProps) {
  const classes = ['ddp-card', interactive ? 'is-interactive' : undefined, className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      <div className={contentClassName ? `ddp-card-content ${contentClassName}` : 'ddp-card-content'}>{children}</div>
    </div>
  );
}
