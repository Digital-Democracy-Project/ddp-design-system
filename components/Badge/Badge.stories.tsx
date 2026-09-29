import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';
import { Icon } from '../Icon';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  args: { tone: 'neutral', appearance: 'soft', size: 'md', children: 'Badge' },
  argTypes: {
    tone: { control: 'select', options: ['neutral', 'primary', 'secondary', 'tertiary'] },
    appearance: { control: 'select', options: ['soft', 'solid'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Playground: Story = {};

export const AllTones: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Badge tone="neutral">Neutral</Badge>
      <Badge tone="primary">Primary</Badge>
      <Badge tone="secondary">Secondary</Badge>
      <Badge tone="tertiary">Tertiary</Badge>
    </div>
  ),
};

export const SoftVsSolid: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Badge tone="primary" appearance="soft">Soft</Badge>
        <Badge tone="secondary" appearance="soft">Soft</Badge>
        <Badge tone="tertiary" appearance="soft">Soft</Badge>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Badge tone="primary" appearance="solid">Solid</Badge>
        <Badge tone="secondary" appearance="solid">Solid</Badge>
        <Badge tone="tertiary" appearance="solid">Solid</Badge>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <Badge tone="neutral" appearance="solid">Neutral stays soft</Badge>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

export const CustomColors: Story = {
  args: {
    children: 'Custom',
    customColors: { background: '#fce7f3', foreground: '#9d174d' },
  },
};

// The five valence roles (positive/negative/caution/info/neutral-status) exist as tokens in colors_and_type.css but aren't exposed as a Badge `tone` value yet, so this uses `customColors` pointed at the real var() names -- responds correctly to the toolbar's light/dark toggle since it reads the live tokens, not a snapshot.
const VALENCE_ROLES = ['positive', 'negative', 'caution', 'info', 'neutral-status'] as const;

export const ValenceRolesCurrentTokens: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
      {VALENCE_ROLES.map((role) => (
        <Badge
          key={role}
          customColors={{
            background: `var(--ddp-color-${role}-tint)`,
            foreground: `var(--ddp-color-${role}-tint-foreground)`,
          }}
        >
          {role}
        </Badge>
      ))}
    </div>
  ),
};

// The ordinal grade scale (--ddp-scale-1..5): scale-1 jade, scale-2 lime, scale-3 amber, scale-4 ochre, scale-5 red. Reads the real `--ddp-scale-N-tint`/`-tint-foreground` custom properties, so it can never silently drift from the actual tokens.
const ORDINAL_GRADES = [1, 2, 3, 4, 5] as const;

// Local data-theme overrides (not the toolbar toggle) so both themes render simultaneously, side by side, each still reading the real live tokens.
function OrdinalRow() {
  return (
    <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
      {ORDINAL_GRADES.map((n) => (
        <Badge
          key={n}
          customColors={{
            background: `var(--ddp-scale-${n}-tint)`,
            foreground: `var(--ddp-scale-${n}-tint-foreground)`,
          }}
        >
          Grade {n}
        </Badge>
      ))}
    </div>
  );
}

export const OrdinalScaleFinal: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div data-theme="light" style={{ background: '#FFFFFF', padding: 24, border: '1px solid #D7DDE6' }}>
        <p style={{ color: '#56647C', fontSize: 12, marginBottom: 12 }}>Light theme</p>
        <OrdinalRow />
      </div>
      <div data-theme="dark" style={{ background: '#14212F', padding: 24 }}>
        <p style={{ color: '#97A3B4', fontSize: 12, marginBottom: 12 }}>Dark theme</p>
        <OrdinalRow />
      </div>
    </div>
  ),
};

// Party colors never re-theme -- same tint/tint-foreground in light and dark, and the solid/icon color is fixed at -500 always. Reads the live tokens, so this reflects whatever's actually applied.
const PARTY_ICON_NAME: Record<'democratic' | 'republican', string> = {
  democratic: 'democrat',
  republican: 'republican',
};

function PartyBadge({ party }: { party: 'democratic' | 'republican' }) {
  return (
    <Badge
      style={{ gap: 6 }}
      customColors={{
        background: `var(--ddp-color-${party}-tint)`,
        foreground: `var(--ddp-color-${party}-tint-foreground)`,
      }}
    >
      <Icon name={PARTY_ICON_NAME[party]} size="xs" />
      {party === 'democratic' ? 'Democratic' : 'Republican'}
    </Badge>
  );
}

export const PartyBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ background: '#FFFFFF', padding: 24, border: '1px solid #D7DDE6', display: 'flex', gap: 12 }}>
        <PartyBadge party="democratic" />
        <PartyBadge party="republican" />
      </div>
      <div style={{ background: '#14212F', padding: 24, display: 'flex', gap: 12 }}>
        <PartyBadge party="democratic" />
        <PartyBadge party="republican" />
      </div>
    </div>
  ),
};
