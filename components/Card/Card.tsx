import type { HTMLAttributes, ReactNode } from 'react';
import './Card.scss';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Whether the whole card raises on hover — for a card used as a clickable list row. Off by default; a static card shouldn't imply it's clickable. */
  interactive?: boolean;
  children: ReactNode;
}

export function Card({ interactive, className, children, ...rest }: CardProps) {
  const classes = ['ddp-card', interactive ? 'is-interactive' : undefined, className].filter(Boolean).join(' ');

  return (
    <div className={classes} {...rest}>
      <div className="ddp-card-content">{children}</div>
    </div>
  );
}
