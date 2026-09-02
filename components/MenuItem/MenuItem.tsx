'use client';

import { forwardRef } from 'react';
import type { HTMLAttributes, ReactNode } from 'react';
import { Icon } from '../Icon';
import './MenuItem.scss';

export type MenuItemIndicator = 'check' | 'checkbox';

export interface MenuItemProps extends HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  disabled?: boolean;
  /** `'check'` (default) — a bare checkmark, only occupying space when `selected`. Right for a single-select list, where only one row is ever marked. `'checkbox'` — a persistent checkbox square, checked or not, matching the real validated multi-select precedent (the legislative-scorecard hi-fi mockup's `CategoryMenu`) — reuses the same box styling `Checkbox`/`ToggleButton`'s `has-checkbox` indicator use. */
  indicator?: MenuItemIndicator;
  children: ReactNode;
}

// A single option row — presentational only. The interaction wiring (click-to-select, roving tabIndex, keyboard highlight) is owned by whatever renders a list of these (Select and Menu today), spread in via `...rest` — see Select.tsx for how @floating-ui/react's `getItemProps()` composes with this component.
export const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(function MenuItem(
  { selected, disabled, indicator = 'check', className, children, ...rest },
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
      {indicator === 'checkbox' ? (
        <span className="ddp-menu-item-box">
          {selected && <Icon name="check" size="xs" className="ddp-menu-item-check-icon" />}
        </span>
      ) : (
        selected && <Icon name="check" size="xs" className="ddp-menu-item-check-icon" />
      )}
      <span className="ddp-menu-item-label">{children}</span>
    </div>
  );
});
