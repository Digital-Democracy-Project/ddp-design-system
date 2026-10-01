'use client';

import { useEffect, useId, useRef, useState } from 'react';
import type { InputHTMLAttributes, KeyboardEvent, Ref } from 'react';
import {
  useFloating,
  useListNavigation,
  useRole,
  useDismiss,
  useInteractions,
  offset,
  flip,
  shift,
  size as sizeMiddleware,
  autoUpdate,
} from '@floating-ui/react';
import { TextInput } from '../TextInput';
import { DropdownMenu } from '../DropdownMenu';
import { Menu } from '../Menu';
import type { MenuOption } from '../Menu';
import type { SizeOptions3 } from '../types';

export type SearchBarSize = SizeOptions3;

export interface SearchBarProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'onChange' | 'onSubmit' | 'value' | 'defaultValue' | 'type'
> {
  value?: string;
  defaultValue?: string;
  /** Fires on every keystroke, with the current string value — matches TextInput. */
  onChange?: (value: string) => void;
  /** Fires when Enter is pressed with no suggestion highlighted — matches TextInput's existing model exactly. Picking a suggestion (click, or Enter while it's highlighted) also fires this, with that suggestion's label, since picking one is a valid way to "submit." */
  onSubmit?: (value: string) => void;
  /** Already filtered by the consumer — SearchBar does no matching itself, same "not a search engine" rule as TextInput. Omit this prop entirely (not just an empty array) for standalone mode: SearchBar then renders as nothing more than a styled search TextInput — no floating panel, no combobox ARIA, no Menu — which is what Select's own internal search field uses. Pass an array (even `[]`) to turn on the full combobox behavior. */
  suggestions?: MenuOption[];
  onSelectSuggestion?: (suggestion: MenuOption) => void;
  size?: SearchBarSize;
  emptyMessage?: string;
  ref?: Ref<HTMLInputElement>;
}

export function SearchBar({
  value,
  defaultValue,
  onChange,
  onSubmit,
  suggestions,
  onSelectSuggestion,
  size = 'md',
  emptyMessage,
  disabled,
  className,
  ref,
  ...rest
}: SearchBarProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  // Standalone mode (suggestions omitted): none of this state/wiring below ever produces an observable effect — open never becomes true, nothing renders that reads activeIndex, etc. React's rules of hooks mean the hooks still get called either way; what changes is that their output is inert here, not that they're skipped.
  const hasSuggestions = suggestions !== undefined;

  const [open, setOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const listRef = useRef<Array<HTMLElement | null>>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const baseId = useId();
  const getItemId = (index: number) => `${baseId}-option-${index}`;

  // The panel's open state isn't purely derived from "focused + has suggestions" — Escape needs to close it and have that stick until the next real change, not get immediately recomputed back open. This only reopens it when suggestions or focus actually change, never fighting a manual setOpen(false).
  useEffect(() => {
    if (!hasSuggestions) return;
    if (suggestions.length === 0) {
      setOpen(false);
      setActiveIndex(null);
    } else if (isFocused) {
      setOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestions, isFocused, hasSuggestions]);

  const { refs, floatingStyles, context } = useFloating({
    open: hasSuggestions && open,
    onOpenChange: setOpen,
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip(),
      shift({ padding: 8 }),
      sizeMiddleware({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      }),
    ],
  });

  // virtual: true, no useClick, no useTypeahead — this is a combobox, not a listbox: focus stays on the real input the whole time (arrow keys move a virtual activeIndex, not real DOM focus — see the README for why that's a focus-safety requirement here, not just a preference), the panel opens/closes by the input being focused/typed into rather than clicked like a trigger button, and the real input is already the typeahead. See Menu's own README for why this needs a different focusMode than Select's.
  const listNavigation = useListNavigation(context, {
    listRef,
    activeIndex,
    onNavigate: setActiveIndex,
    virtual: true,
    loop: true,
  });
  const role = useRole(context, { role: 'listbox' });
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(
    [listNavigation, role, dismiss],
  );

  const commitValue = (next: string) => {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };

  const handleSelectSuggestion = (suggestion: MenuOption) => {
    commitValue(suggestion.label);
    setOpen(false);
    setActiveIndex(null);
    onSelectSuggestion?.(suggestion);
    onSubmit?.(suggestion.label);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    if (
      hasSuggestions &&
      open &&
      activeIndex != null &&
      suggestions[activeIndex]
    ) {
      e.preventDefault();
      handleSelectSuggestion(suggestions[activeIndex]);
    } else {
      onSubmit?.(currentValue);
    }
  };

  const setReference = (node: HTMLInputElement | null) => {
    inputRef.current = node;
    refs.setReference(node);
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  const comboboxProps = hasSuggestions
    ? getReferenceProps({
        onFocus: () => {
          setIsFocused(true);
          if (suggestions.length > 0) setOpen(true);
        },
        onBlur: () => setIsFocused(false),
        onKeyDown: handleKeyDown,
        role: 'combobox' as const,
        'aria-expanded': open,
        'aria-autocomplete': 'list' as const,
        'aria-activedescendant':
          open && activeIndex != null ? getItemId(activeIndex) : undefined,
      })
    : {};

  return (
    <>
      <TextInput
        ref={setReference}
        icon='search'
        type='search'
        clearable
        size={size}
        value={currentValue}
        onChange={commitValue}
        disabled={disabled}
        className={className}
        {...comboboxProps}
        {...rest}
      />
      {hasSuggestions && (
        <DropdownMenu
          context={context}
          ref={refs.setFloating}
          style={floatingStyles}
          initialFocus={-1}
          {...getFloatingProps()}
        >
          <Menu
            options={suggestions}
            onSelect={handleSelectSuggestion}
            activeIndex={activeIndex}
            focusMode='virtual'
            getItemId={getItemId}
            getItemProps={getItemProps}
            listRef={listRef}
            emptyMessage={emptyMessage}
          />
        </DropdownMenu>
      )}
    </>
  );
}
