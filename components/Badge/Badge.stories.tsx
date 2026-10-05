import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';
import { Icon } from '../Icon';
import { AllColorTones } from '../utils';

// Every tone with real soft+solid CSS, straight from AllColorTones -- styles/core/_tones.scss's $-tone-solid map now covers all of them, including 'unaffiliated'.
const ALL_TONES = Object.values(AllColorTones);

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  args: { tone: 'neutral', appearance: 'soft', size: 'md', children: 'Badge' },
  argTypes: {
    tone: { control: 'select', options: ALL_TONES },
    appearance: { control: 'select', options: ['soft', 'solid'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const Playground: Story = {};

export const AllTones: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {ALL_TONES.map((tone) => (
        <Badge key={tone} tone={tone}>
          {tone}
        </Badge>
      ))}
    </div>
  ),
};

export const SoftVsSolid: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div
        style={{
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {ALL_TONES.map((tone) => (
          <Badge key={tone} tone={tone} appearance='soft'>
            Soft
          </Badge>
        ))}
      </div>
      <div
        style={{
          display: 'flex',
          gap: 12,
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {ALL_TONES.map((tone) => (
          <Badge key={tone} tone={tone} appearance='solid'>
            Solid
          </Badge>
        ))}
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <Badge size='sm'>Small</Badge>
      <Badge size='md'>Medium</Badge>
      <Badge size='lg'>Large</Badge>
    </div>
  ),
};

export const CustomColors: Story = {
  args: {
    children: 'Custom',
    customColors: { background: '#fce7f3', foreground: '#9d174d' },
  },
};

// The five valence roles, real `tone` values now (styles/core/_tones.scss) -- no more customColors workaround.
const VALENCE_ROLES = [
  'positive',
  'negative',
  'caution',
  'info',
  'neutral',
] as const;

export const ValenceRolesCurrentTokens: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      {VALENCE_ROLES.map((role) => (
        <Badge key={role} tone={role}>
          {role}
        </Badge>
      ))}
    </div>
  ),
};

// The ordinal grade scale (--ddp-scale-1..5): scale-1 jade, scale-2 lime, scale-3 amber, scale-4 ochre, scale-5 red. Deliberately NOT part of the tone system -- it's an ordinal position, not a named semantic role, so it stays on customColors pointed at the scale tokens directly rather than joining AllColorTones.
const ORDINAL_GRADES = [1, 2, 3, 4, 5] as const;

// Local data-theme overrides (not the toolbar toggle) so both themes render simultaneously, side by side, each still reading the real live tokens.
function OrdinalRow() {
  return (
    <div
      style={{
        display: 'flex',
        gap: 10,
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
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
      <div
        data-theme='light'
        style={{
          background: '#FFFFFF',
          padding: 24,
          border: '1px solid #D7DDE6',
        }}
      >
        <p style={{ color: '#56647C', fontSize: 12, marginBottom: 12 }}>
          Light theme
        </p>
        <OrdinalRow />
      </div>
      <div data-theme='dark' style={{ background: '#14212F', padding: 24 }}>
        <p style={{ color: '#97A3B4', fontSize: 12, marginBottom: 12 }}>
          Dark theme
        </p>
        <OrdinalRow />
      </div>
    </div>
  ),
};

// Party colors never re-theme -- same tint/tint-foreground in light and dark, and the solid/icon color is fixed at -500 always. Real `tone="democratic"`/`tone="republican"` now, same as any other role.
const PARTY_ICON_NAME: Record<'democratic' | 'republican', string> = {
  democratic: 'democrat',
  republican: 'republican',
};

function PartyBadge({ party }: { party: 'democratic' | 'republican' }) {
  return (
    <Badge tone={party} style={{ gap: 6 }}>
      <Icon name={PARTY_ICON_NAME[party]} size='xs' />
      {party === 'democratic' ? 'Democratic' : 'Republican'}
    </Badge>
  );
}

// DECIDED — solid party badges: background = color('{party}') (the fixed -500 anchor, same in both themes), white text in both themes (6.98:1 democratic, 6.85:1 republican). The icon is the one deliberate exception to "party icon color never changes": here it's recolored to match the white text, by overriding the `--ddp-color-{party}` custom property on a wrapper scoped to just the icon -- this doesn't touch the real token (Badge's own background, set one level up, already resolved before this override exists) or affect the icon anywhere else it's used. This override is markup-level, not something `_tones.scss`'s mixins can express, so it stays here rather than in the design-system CSS.
function SolidPartyBadge({ party }: { party: 'democratic' | 'republican' }) {
  const iconOverrideStyle = {
    ['--ddp-color-' + party]: '#FFFFFF',
  } as React.CSSProperties;
  return (
    <Badge tone={party} appearance='solid' style={{ gap: 6 }}>
      <span style={{ display: 'inline-flex', ...iconOverrideStyle }}>
        <Icon name={PARTY_ICON_NAME[party]} size='xs' />
      </span>
      {party === 'democratic' ? 'Democratic' : 'Republican'}
    </Badge>
  );
}

export const PartyBadges: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div
        data-theme='light'
        style={{
          background: '#FFFFFF',
          padding: 24,
          border: '1px solid #D7DDE6',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', gap: 12 }}>
          <PartyBadge party='democratic' />
          <PartyBadge party='republican' />
          <Badge tone='unaffiliated'>Unaffiliated</Badge>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <SolidPartyBadge party='democratic' />
          <SolidPartyBadge party='republican' />
          <Badge tone='unaffiliated' appearance='solid'>
            Unaffiliated
          </Badge>
        </div>
      </div>
      <div
        data-theme='dark'
        style={{
          background: '#14212F',
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', gap: 12 }}>
          <PartyBadge party='democratic' />
          <PartyBadge party='republican' />
          <Badge tone='unaffiliated'>Unaffiliated</Badge>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <SolidPartyBadge party='democratic' />
          <SolidPartyBadge party='republican' />
          <Badge tone='unaffiliated' appearance='solid'>
            Unaffiliated
          </Badge>
        </div>
      </div>
    </div>
  ),
};

// DECIDED — solid valence badges, now real CSS via styles/core/_tones.scss's $-tone-solid map. positive/negative/caution/info are fully unthemed, same as party colors: one fixed background (the light-theme -500 primitive) + white text, in both light and dark. caution is the one background exception among these four -- pinned to a one-off `#F0C043` ("true amber") rather than jade/red/violet's own -500, since darkening/hue-shifting amber-500 kept reading as brown and white never had workable contrast at any of amber's light steps -- but it's still identical in both themes, with neutral-900 text instead of white. neutral is the ONE role that stays theme-dependent: light darkens the background one step (neutral-500 -> neutral-600) so white text passes; dark keeps the existing neutral-400 step with dark text instead (--ddp-color-neutral-solid-bg/-fg in colors_and_type.scss carry that asymmetry at the token layer, so _tones.scss's map didn't need a special case).
const SOLID_CONTRAST: Record<
  (typeof VALENCE_ROLES)[number],
  { light: string; dark: string }
> = {
  positive: { light: '4.65:1', dark: '4.65:1' },
  negative: { light: '4.94:1', dark: '4.94:1' },
  caution: { light: '9.57:1', dark: '9.57:1' },
  info: { light: '5.39:1', dark: '5.39:1' },
  neutral: { light: '5.98:1', dark: '6.38:1' },
};

// Soft-tint contrast, both themes, all five roles.
const SOFT_CONTRAST: Record<
  (typeof VALENCE_ROLES)[number],
  { light: string; dark: string }
> = {
  positive: { light: '7.30:1', dark: '6.12:1' },
  negative: { light: '6.99:1', dark: '6.48:1' },
  caution: { light: '4.86:1', dark: '6.77:1' },
  info: { light: '7.66:1', dark: '5.58:1' },
  neutral: { light: '7.62:1', dark: '7.24:1' },
};

function ValenceTonesPreview({ theme }: { theme: 'light' | 'dark' }) {
  const captionColor = theme === 'light' ? '#56647C' : '#97A3B4';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div>
        <p style={{ fontSize: 11, opacity: 0.6, marginBottom: 8 }}>soft</p>
        <div
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            alignItems: 'flex-end',
          }}
        >
          {VALENCE_ROLES.map((role) => (
            <div
              key={role}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                alignItems: 'center',
              }}
            >
              <Badge tone={role}>{role}</Badge>
              <span style={{ fontSize: 10, color: captionColor }}>
                {SOFT_CONTRAST[role][theme]}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <p style={{ fontSize: 11, opacity: 0.6, marginBottom: 8 }}>solid</p>
        <div
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            alignItems: 'flex-end',
          }}
        >
          {VALENCE_ROLES.map((role) => (
            <div
              key={role}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                alignItems: 'center',
              }}
            >
              <Badge tone={role} appearance='solid'>
                {role}
              </Badge>
              <span style={{ fontSize: 10, color: captionColor }}>
                {SOLID_CONTRAST[role][theme]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export const ValenceTonesSoftVsSolid: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div
        data-theme='light'
        style={{
          background: '#FFFFFF',
          padding: 24,
          border: '1px solid #D7DDE6',
        }}
      >
        <p style={{ color: '#56647C', fontSize: 12, marginBottom: 12 }}>
          Light theme
        </p>
        <ValenceTonesPreview theme='light' />
      </div>
      <div data-theme='dark' style={{ background: '#14212F', padding: 24 }}>
        <p style={{ color: '#97A3B4', fontSize: 12, marginBottom: 12 }}>
          Dark theme
        </p>
        <ValenceTonesPreview theme='dark' />
      </div>
    </div>
  ),
};
