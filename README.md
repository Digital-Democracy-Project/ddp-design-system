# @digital-democracy-project/design-system

DDP design tokens, SCSS foundation, and React component library shared across Digital Democracy Project web products.

## Installation

```bash
npm install @digital-democracy-project/design-system
```

## Usage

```tsx
import { Button, Badge, Icon } from '@digital-democracy-project/design-system';
import '@digital-democracy-project/design-system/styles.css';

<Button variant="primary">Save</Button>
<Badge tone="secondary">New</Badge>
<Icon name="check" size="sm" />
```

One stylesheet import is all that's needed — `styles.css` ships both the token definitions (every `--ddp-*` custom property) and the compiled component CSS together, tokens first. In a Next.js App Router project, import it once in the root layout (global CSS can't be imported from nested pages). A token-only stylesheet is also available separately at `@digital-democracy-project/design-system/styles/tokens.css`, for non-component use.

Raw Sass (tokens, mixins) is also available for consumers authoring their own components:

```scss
@use '@digital-democracy-project/design-system/styles' as *;
.thing {
  padding: space(3);
  color: color('primary');
}
```

Static assets — brand marks, raw icon SVGs, and the font files — are published too, each under its own subpath:

```tsx
import wordmark from '@digital-democracy-project/design-system/brand/ddp-wordmark.svg';
import searchIcon from '@digital-democracy-project/design-system/icons/search.svg';
```

```html
<link rel="preload" as="font" type="font/woff2" crossorigin
      href="@digital-democracy-project/design-system/fonts/PublicSans-Roman-VF.woff2">
```

The subpaths are deliberately shorter than the on-disk layout (`./brand/*`, not `./assets/brand/*`) so `assets/` can be reorganized without a breaking change. Every asset is stored once, at the largest size the web needs — there are no parallel "master" copies in this repo, so treat these as the canonical files. React consumers should prefer the `<Icon>` component over importing icon SVGs directly; it inlines the same files at build time. Fonts need no import at all in the normal case — `styles.css` already declares every `@font-face` and resolves the files relatively.

See each component's own README under `components/<Name>/` for its full prop reference.

## Development roadmap

_Temporary section — remove once the initial component library and consuming-app migration are far enough along that this reads as a finished package, not a work in progress._

**Phase 1 — Core component library**

- [x] Build Icon
- [x] Build Button
- [x] Build Badge/Pill
- [x] Checkpoint: review Button + Badge together, lock in conventions
- [x] Build IconButton (new, separate from Button — opinionated icon-only control)
- [x] Build Text Input
- [x] Build Checkbox
- [x] Build ToggleButton (renamed from "Toggle button/group"; folds in an optional checkbox indicator, validated against `CheckboxItem`/`ToggleChip` in `ddp-scorecard-react` and the legislative-scorecard hi-fi mockup)
- [x] Build MenuItem, Menu, DropdownMenu, Select (single-select only — see component READMEs for the multi-select deferral reasoning)
- [x] Build SearchBar (composes TextInput + DropdownMenu + Menu; standalone mode for Select's own internal search field, combobox mode for suggestions)
- [ ] Theming/visual refinements to `SearchBar` and `Select` — flagged during Storybook review, deliberately deferred to keep pace; not blocking
- [x] Build Card (generic container — reprioritized ahead of ToggleSwitch, needed for upcoming page mockups)
- [x] Build ClickableTile (single-element link/button surface, whole box including padding is the hit target — the answer to "can the whole Card be a clickable link")
- [x] Build ToggleSwitch (the track-and-knob control, deliberately built last — reuses `Checkbox`'s real-input-driven structural pattern, not `ToggleButton`'s button-based one) — last v1 component done
- [x] Introduce `SizeOptions` (shared `'sm' | 'md' | 'lg'` type in `components/shared/types.ts`), retrofitted into Button/Badge/Checkbox/Select/SearchBar/TextInput/ToggleButton/ToggleSwitch
- [x] Eyebrow audit: added the missing `section-label` mixin/`.ddp .section-label` class (quieter field-label role `eyebrow` didn't cover) and the `SectionLabel` component; documented the `.ddp`-scoping requirement in `styles/README.md`
- [ ] `SectionLabel`: allow the rendered element to be flexible (e.g. an `as`/polymorphic prop) — real usage will commonly want it as an actual `h*` tag, not always a `<span>`
- [ ] Scope decision: `ddp-mapapp`-derived candidates (Accordion, Stat, Spinner, Slide-over, Drawer, Expandable text)

**Phase 2 — Package/publish readiness**

- [x] Claim npm scope
- [x] `"type": "module"` in package.json
- [x] First `npm publish` (`0.1.0`)
- [x] Root README (this file)
- [x] CSS distribution: merged into one stylesheet (tokens + components, tokens first)
- [x] Delete Tier 4 legacy token aliases in `colors_and_type.css`
- [ ] License field decision
- [ ] Set up Changesets

**Phase 3 — Keep the Claude Design project in sync** (parallel to Phase 1)

- [x] Run `/design-sync` for current state (Icon, Button, Badge, tokens, fonts) — uploaded and verified
- [ ] Re-sync after each new component lands
- [ ] Retire superseded static previews as real components land
- [ ] Decide fate of `ui_kits/*` and token-doc preview pages

**Phase 4 — Migrate consuming apps**

- [ ] `ddp-next`: replace Tailwind/ad hoc UI
- [ ] `ddp-scorecard-react`: adapt at its own pace
- [ ] `ddp-mapapp` → `ddp-next` page migration

**Phase 5 — Deferred hygiene**

- [ ] Tests (Vitest/RTL/axe)
- [ ] Visual regression
- [ ] CI
- [ ] Lint/format tooling
- [x] Convert component CSS from CSS Modules to manual BEM naming (`ddp-` prefix)
- [ ] `stylelint` rule enforcing the `ddp-` prefix (pairs with lint/format tooling above)
