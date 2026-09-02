import type { Meta, StoryObj } from '@storybook/react-vite';
import { MenuItem } from './MenuItem';

const meta: Meta<typeof MenuItem> = {
  title: 'Components/MenuItem',
  component: MenuItem,
  args: { children: 'Environment' },
  argTypes: {
    indicator: { control: 'select', options: ['check', 'checkbox'] },
  },
};
export default meta;

type Story = StoryObj<typeof MenuItem>;

export const Playground: Story = {};

export const CheckIndicator: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, width: 220 }}>
      <MenuItem>Unselected</MenuItem>
      <MenuItem selected>Selected</MenuItem>
      <MenuItem disabled>Disabled</MenuItem>
    </div>
  ),
};

export const CheckboxIndicator: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 2, width: 220 }}>
      <MenuItem indicator="checkbox">Unchecked</MenuItem>
      <MenuItem indicator="checkbox" selected>Checked</MenuItem>
      <MenuItem indicator="checkbox" disabled>Disabled</MenuItem>
    </div>
  ),
};
