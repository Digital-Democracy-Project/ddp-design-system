'use client';

import { forwardRef } from 'react';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ComponentType, ReactNode, Ref } from 'react';
import './ClickableTile.scss';

export type ClickableTileLinkComponent = ComponentType<
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; ref?: Ref<HTMLAnchorElement> }
>;

type ClickableTileAnchorProps = {
  href: string;
  /** Render the link with a different component instead of a native `<a>` — e.g. Next.js's `Link` or a React Router `Link`, for client-side routing. The component must accept `href`, `className`, `children`, and forward a ref to the underlying `<a>`. React Router's `Link` takes `to` instead of `href`; wrap it in a small adapter component that renames the prop. Defaults to `'a'`. */
  as?: ClickableTileLinkComponent;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'className' | 'children'>;

type ClickableTileButtonProps = { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children' | 'type'>;

export type ClickableTileProps = (ClickableTileAnchorProps | ClickableTileButtonProps) & {
  /** Dims the tile, removes it from the tab order, and blocks clicks — works for the link and button render paths alike. */
  disabled?: boolean;
  className?: string;
  children: ReactNode;
};

export const ClickableTile = forwardRef<HTMLAnchorElement | HTMLButtonElement, ClickableTileProps>(
  function ClickableTile({ href, disabled, className, children, ...rest }, ref) {
    const classes = ['ddp-clickable-tile', className].filter(Boolean).join(' ');

    if (href !== undefined) {
      const { as: LinkComponent = 'a', ...linkRest } = rest as Omit<ClickableTileAnchorProps, 'href'>;
      return (
        <LinkComponent
          ref={ref as Ref<HTMLAnchorElement>}
          href={href}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : undefined}
          className={classes}
          {...linkRest}
        >
          {children}
        </LinkComponent>
      );
    }

    return (
      <button
        ref={ref as Ref<HTMLButtonElement>}
        type="button"
        disabled={disabled}
        className={classes}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {children}
      </button>
    );
  }
);
