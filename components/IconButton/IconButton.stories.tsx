import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  args: { iconName: 'close', iconSize: 'sm', theme: 'none', 'aria-label': 'Clear' },
  argTypes: {
    iconSize: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    theme: { control: 'select', options: ['none', 'primary', 'secondary', 'tertiary'] },
  },
};
export default meta;

type Story = StoryObj<typeof IconButton>;

export const Playground: Story = {};

export const AllThemes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <IconButton iconName="close" theme="none" aria-label="Close" />
      <IconButton iconName="close" theme="primary" aria-label="Close" />
      <IconButton iconName="close" theme="secondary" aria-label="Close" />
      <IconButton iconName="close" theme="tertiary" aria-label="Close" />
    </div>
  ),
};

export const WithPadding: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <IconButton iconName="check" theme="primary" padding={8} aria-label="Confirm" />
      <IconButton iconName="check" theme="secondary" padding={12} aria-label="Confirm" />
    </div>
  ),
};

export const CustomIconColor: Story = {
  args: { iconName: 'trash', iconColor: '#c8412f', 'aria-label': 'Delete' },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <IconButton iconName="close" theme="none" disabled aria-label="Close" />
      <IconButton iconName="close" theme="primary" disabled aria-label="Close" />
    </div>
  ),
};

export const InTextInputContext: Story = {
  render: () => (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        height: 40,
        padding: '0 8px 0 12px',
        border: '1px solid var(--ddp-border-default)',
        borderRadius: 'var(--ddp-radius-md)',
      }}
    >
      <span>housing</span>
      <IconButton iconName="close" iconSize="sm" theme="none" fill aria-label="Clear" />
    </div>
  ),
};
