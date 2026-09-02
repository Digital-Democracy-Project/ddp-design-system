'use client';

import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { Icon } from '../Icon';
import './MenuItem.scss';

export interface MenuItemProps extends HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  disabled?: boolean;
  children: ReactNode;
}

// A single option row — presentational only. The interaction wiring
// (click-to-select, roving tabIndex, keyboard highlight) is owned by
// whatever renders a list of these (Select today; a future standalone
// menu later), spread in via `...rest` — see Select.tsx for how
// @floating-ui/react's `getItemProps()` composes with this component.
export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(function MenuItem(
  { selected, disabled, className, children, ...rest },
  ref
) {
  const classes = [
    'ddp-menu-item',
    selected ? 'is-selected' : undefined,
    disabled ? 'is-disabled' : undefined,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} role="option" aria-selected={selected} aria-disabled={disabled} className={classes} {...rest}>
      {selected && <Icon name="check" size="xs" className="ddp-menu-item-check-icon" />}
      <span className="ddp-menu-item-label">{children}</span>
    </div>
  );
});
