import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

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
