'use client';

import { forwardRef } from 'react';
import type { ComponentProps, HTMLAttributes, ReactNode } from 'react';
import type { FloatingContext } from '@floating-ui/react';
import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import './DropdownMenu.scss';

export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  /** The `context` returned by the consumer's own `useFloating()` call. */
  context: FloatingContext;
  /** Forwarded to Floating UI's `FloatingFocusManager`. `-1` (the default) keeps real DOM focus on the trigger — correct for a roving-tabindex listbox where arrow keys move a `tabIndex={0}` item instead of moving focus into the panel. A consumer that needs focus to land inside the panel itself (e.g. `Select`'s searchable mode, which focuses its search input) should override this. */
  initialFocus?: ComponentProps<typeof FloatingFocusManager>['initialFocus'];
  children: ReactNode;
}

// The floating panel's shell only — portal, focus management, and the scrollable card surface. Named "DropdownMenu", not "Menu": it always assumes a Floating UI `context` anchoring it to a trigger, so it can only ever be a positioned, trigger-anchored panel — never an inline or always-visible menu. The content/keyboard-nav layer lives in the separate `Menu` component, which this wraps — see Menu.tsx for why that split exists (Floating UI's interaction hooks have to combine wherever the `context` originates, so `Menu` can't own them itself).
//
// No `role`/ARIA of its own: that's owned by whatever the consumer's `useRole()` call supplies (a listbox for `Select` today), spread in via `...rest`.
export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(function DropdownMenu(
  { context, initialFocus = -1, className, children, ...rest },
  ref
) {
  if (!context.open) return null;

  return (
    <FloatingPortal>
      <FloatingFocusManager context={context} initialFocus={initialFocus} modal={false}>
        <div ref={ref} className={['ddp-dropdown-menu', className].filter(Boolean).join(' ')} {...rest}>
          {children}
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  );
});
