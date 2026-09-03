import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';
import { Badge } from '../Badge';
import { Button } from '../Button';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
};
export default meta;

type Story = StoryObj<typeof Card>;

export const Playground: Story = {
  args: {
    children: 'Card content goes here.',
  },
};

export const Interactive: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Card interactive>Hover to see the elevation raise — for a card used as a clickable list row.</Card>
    </div>
  ),
};

// Illustrative composition only — a title, tags, and a trailing action, all built from this package's own generic pieces. Not a component this package ships or names.
export const WithTagsAndAction: Story = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <Card interactive>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontWeight: 600 }}>Example Title</div>
          <p style={{ margin: 0 }}>A short description of this item, showing how body copy reads inside a card.</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <Badge tone="secondary">Category</Badge>
            <Badge tone="tertiary">Tag</Badge>
          </div>
          <Button size="sm">Take action</Button>
        </div>
      </Card>
    </div>
  ),
};

// Illustrative composition only — an avatar-style placeholder, a heading, and a stat, showing a different real content shape than the example above.
export const WithAvatarAndStat: Story = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <Card>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'var(--ddp-surface-sunken)',
              flexShrink: 0,
            }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600 }}>Example Name</div>
            <div style={{ color: 'var(--ddp-text-muted)', fontSize: 'var(--ddp-font-size-sm)' }}>Subtitle detail</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: 700, fontSize: 'var(--ddp-font-size-xl)' }}>92</div>
            <div style={{ color: 'var(--ddp-text-muted)', fontSize: 'var(--ddp-font-size-xs)' }}>Score</div>
          </div>
        </div>
      </Card>
    </div>
  ),
};
