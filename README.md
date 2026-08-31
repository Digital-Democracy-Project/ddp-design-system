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
.thing { padding: space(3); color: color('primary'); }
```

See each component's own README under `components/<Name>/` for its full prop reference.

## Development roadmap

*Temporary section — remove once the initial component library and consuming-app migration are far enough along that this reads as a finished package, not a work in progress.*

**Phase 1 — Core component library**
- [x] Build Icon
- [x] Build Button
- [x] Build Badge/Pill
- [ ] Checkpoint: review Button + Badge together, lock in conventions
- [x] Build IconButton (new, separate from Button — opinionated icon-only control)
- [x] Build Text Input
- [ ] Build remaining v1 components: Checkbox → Toggle button/group → Select/Menu/MenuItem → SearchBar (new — composes TextInput + Menu) → Toggle switch
- [ ] Scope decision: Card (bill/legislator)
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
- [ ] Convert component CSS from CSS Modules to manual BEM naming (`ddp-` prefix) — not a priority, explicitly backlogged; do before too many more components exist
