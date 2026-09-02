'use client';

import type { MutableRefObject } from 'react';
import { MenuItem } from '../MenuItem';
import './Menu.scss';

export interface MenuOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MenuProps {
  options: MenuOption[];
  /**
   * A single value (single-select) or an array of values (multi-select) —
   * mode is inferred from which shape this is, not a separate `multiple`
   * flag that could drift out of sync with it. Single-select items show a
   * bare checkmark when selected (`MenuItem`'s `'check'` indicator);
   * multi-select items show a persistent checkbox square (`'checkbox'`),
   * matching the real validated precedent (the legislative-scorecard
   * hi-fi mockup's `CategoryMenu`).
   */
  selected?: string | string[];
  onSelect: (option: MenuOption) => void;
  /** Which option is keyboard-highlighted right now — drives roving `tabIndex`. */
  activeIndex: number | null;
  /**
   * The consumer's already-computed Floating UI `getItemProps` (or an
   * equivalent shape). Deliberately untyped against `@floating-ui/react`
   * directly — `Menu` only needs "a function that returns per-item props
   * to spread," not a hard dependency on that library, since the
   * interaction-hook orchestration (`useListNavigation`/`useTypeahead`/
   * `useInteractions`) has to live wherever the floating `context`
   * originates (today, `Select`) — Floating UI merges all of that in one
   * place, so `Menu` can't own it. `Menu` only owns turning `options` into
   * correctly-wired `MenuItem`s.
   */
  getItemProps: (userProps?: Record<string, unknown>) => Record<string, unknown>;
  /** Populated with each rendered item's DOM node, in `options` order — feeds the consumer's `useListNavigation`. */
  listRef: MutableRefObject<Array<HTMLElement | null>>;
  /** Populated with each item's label, in `options` order — feeds the consumer's `useTypeahead`. Omit if the consumer doesn't need typeahead (e.g. a searchable `Select`). */
  labelsRef?: MutableRefObject<Array<string | null>>;
  emptyMessage?: string;
}

// The content/keyboard-nav-target layer, as distinct from DropdownMenu's
// positioning shell — see DropdownMenu.tsx for why they're split. Built
// now (not deferred) because Select needed this exact list-rendering
// logic and a second consumer was judged likely enough to extract it
// immediately rather than let Select duplicate it later.
export function Menu({
  options,
  selected,
  onSelect,
  activeIndex,
  getItemProps,
  listRef,
  labelsRef,
  emptyMessage = 'No options found',
}: MenuProps) {
  if (options.length === 0) {
    return <div className="ddp-menu-empty">{emptyMessage}</div>;
  }

  const isMultiple = Array.isArray(selected);
  const isSelected = (value: string) => (isMultiple ? selected.includes(value) : selected === value);

  return (
    <>
      {options.map((option, index) => (
        <MenuItem
          key={option.value}
          ref={(node) => {
            listRef.current[index] = node;
            if (labelsRef) labelsRef.current[index] = option.label;
          }}
          selected={isSelected(option.value)}
          indicator={isMultiple ? 'checkbox' : 'check'}
          disabled={option.disabled}
          tabIndex={activeIndex === index ? 0 : -1}
          {...getItemProps({ onClick: () => onSelect(option) })}
        >
          {option.label}
        </MenuItem>
      ))}
    </>
  );
}
