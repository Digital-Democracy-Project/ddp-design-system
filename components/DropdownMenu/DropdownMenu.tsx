'use client';

import { forwardRef } from 'react';
import type { ComponentProps, HTMLAttributes, ReactNode } from 'react';
import type { FloatingContext } from '@floating-ui/react';
import { FloatingFocusManager, FloatingPortal } from '@floating-ui/react';
import styles from './DropdownMenu.module.scss';

export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  /** The `context` returned by the consumer's own `useFloating()` call. */
  context: FloatingContext;
  /**
   * Forwarded to Floating UI's `FloatingFocusManager`. `-1` (the default)
   * keeps real DOM focus on the trigger — correct for a roving-tabindex
   * listbox where arrow keys move a `tabIndex={0}` item instead of moving
   * focus into the panel. A consumer that needs focus to land inside the
   * panel itself (e.g. `Select`'s searchable mode, which focuses its
   * search input) should override this.
   */
  initialFocus?: ComponentProps<typeof FloatingFocusManager>['initialFocus'];
  children: ReactNode;
}

// The floating panel's shell only — portal, focus management, and the
// scrollable card surface. Named "DropdownMenu", not "Menu": it always
// assumes a Floating UI `context` anchoring it to a trigger, so it can
// only ever be a positioned, trigger-anchored panel — never an inline or
// always-visible menu. A genuinely positioning-agnostic `Menu` is a
// separate, not-yet-built component for if/when a real inline-menu need
// shows up (nothing in the research validated one yet).
//
// No `role`/ARIA of its own: that's owned by whatever the consumer's
// `useRole()` call supplies (a listbox for `Select` today), spread in via
// `...rest`. Doesn't own the interaction hooks itself either
// (useListNavigation/useTypeahead/etc. all need the full option list,
// which only the consumer has) — see Select.tsx.
export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(function DropdownMenu(
  { context, initialFocus = -1, className, children, ...rest },
  ref
) {
  if (!context.open) return null;

  return (
    <FloatingPortal>
      <FloatingFocusManager context={context} initialFocus={initialFocus} modal={false}>
        <div ref={ref} className={[styles.dropdownMenu, className].filter(Boolean).join(' ')} {...rest}>
          {children}
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  );
});
