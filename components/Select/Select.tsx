'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import type { ButtonHTMLAttributes, Ref } from 'react';
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useListNavigation,
  useTypeahead,
  useInteractions,
  offset,
  flip,
  shift,
  size as sizeMiddleware,
  autoUpdate,
} from '@floating-ui/react';
import { Icon } from '../Icon';
import { TextInput } from '../TextInput';
import { DropdownMenu } from '../DropdownMenu';
import { Menu } from '../Menu';
import type { MenuOption } from '../Menu';
import './Select.scss';

export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectOption = MenuOption;

export interface SelectProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange' | 'value' | 'defaultValue' | 'type'> {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  size?: SelectSize;
  /** Adds a filter `TextInput` inside the panel — a real, validated pattern (Aqua's `AquaDropdown`, the legislative-scorecard hi-fi mockup's `CategoryMenu`), not speculative. Off by default. */
  searchable?: boolean;
  searchPlaceholder?: string;
  ref?: Ref<HTMLButtonElement>;
}

export function Select({
  options,
  value,
  defaultValue,
  onChange,
  placeholder = 'Select…',
  size = 'md',
  searchable,
  searchPlaceholder = 'Search…',
  disabled,
  className,
  ref,
  ...rest
}: SelectProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [query, setQuery] = useState('');

  const listRef = useRef<Array<HTMLElement | null>>([]);
  const labelsRef = useRef<Array<string | null>>([]);
  const referenceRef = useRef<HTMLButtonElement | null>(null);

  const filteredOptions = useMemo(() => {
    if (!searchable || !query) return options;
    const q = query.toLowerCase();
    return options.filter((option) => option.label.toLowerCase().includes(q));
  }, [options, searchable, query]);

  const disabledIndices = useMemo(
    () =>
      filteredOptions.reduce<number[]>((acc, option, index) => {
        if (option.disabled) acc.push(index);
        return acc;
      }, []),
    [filteredOptions]
  );

  const selectedOption = options.find((option) => option.value === currentValue);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: (next) => {
      setOpen(next);
      if (!next) {
        setQuery('');
        setActiveIndex(null);
      }
    },
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip(),
      shift({ padding: 8 }),
      sizeMiddleware({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, { width: `${rects.reference.width}px` });
        },
      }),
    ],
  });

  // Preselect the current value on open, matching native <select> — keyboard navigation starts near the existing selection instead of the top.
  useEffect(() => {
    if (open) {
      const index = filteredOptions.findIndex((option) => option.value === currentValue);
      setActiveIndex(index >= 0 ? index : null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const click = useClick(context, { enabled: !disabled });
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: 'listbox' });
  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    disabledIndices,
    loop: true,
  });
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    onMatch: open ? setActiveIndex : undefined,
    enabled: !searchable,
  });

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([
    click,
    dismiss,
    role,
    listNavigation,
    typeahead,
  ]);

  const handleSelect = (option: SelectOption) => {
    if (option.disabled) return;
    if (!isControlled) setInternalValue(option.value);
    onChange?.(option.value);
    setOpen(false);
    referenceRef.current?.focus();
  };

  const setReference = (node: HTMLButtonElement | null) => {
    referenceRef.current = node;
    refs.setReference(node);
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  const classes = ['ddp-select', `ddp-select-${size}`, open ? 'is-open' : undefined, className]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <button
        ref={setReference}
        type="button"
        disabled={disabled}
        className={classes}
        {...getReferenceProps(rest)}
      >
        <span className="ddp-select-value">
          {selectedOption ? selectedOption.label : <span className="ddp-select-placeholder">{placeholder}</span>}
        </span>
        <Icon name="chevron-down" size="sm" className="ddp-select-chevron" />
      </button>
      <DropdownMenu
        context={context}
        ref={refs.setFloating}
        style={floatingStyles}
        initialFocus={searchable ? 0 : -1}
        {...getFloatingProps()}
      >
        {/* Plain TextInput deliberately, not a styled-up search field — no type="search", no leading icon. TextInput has no icon-prop capability at all (a past deliberate decision, see its own README), and reopening that just for this one usage isn't worth it now that SearchBar is coming soon anyway. Swap this for SearchBar once it exists, rather than growing TextInput here. */}
        {searchable && (
          <div className="ddp-select-search">
            <TextInput
              size="sm"
              value={query}
              onChange={setQuery}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
            />
          </div>
        )}
        <Menu
          options={filteredOptions}
          selected={currentValue}
          onSelect={handleSelect}
          activeIndex={activeIndex}
          getItemProps={getItemProps}
          listRef={listRef}
          labelsRef={searchable ? undefined : labelsRef}
        />
      </DropdownMenu>
    </>
  );
}
