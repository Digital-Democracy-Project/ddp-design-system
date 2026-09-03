import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToggleSwitch } from './ToggleSwitch';

const meta: Meta<typeof ToggleSwitch> = {
  title: 'Components/ToggleSwitch',
  component: ToggleSwitch,
};
export default meta;

type Story = StoryObj<typeof ToggleSwitch>;

export const Playground: Story = {
  args: {
    children: 'Show only scored bills',
  },
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    return <ToggleSwitch checked={checked} onChange={setChecked}>Enabled: {String(checked)}</ToggleSwitch>;
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <ToggleSwitch size="sm" defaultChecked>Small</ToggleSwitch>
      <ToggleSwitch size="md" defaultChecked>Medium</ToggleSwitch>
      <ToggleSwitch size="lg" defaultChecked>Large</ToggleSwitch>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <ToggleSwitch disabled>Disabled, off</ToggleSwitch>
      <ToggleSwitch disabled defaultChecked>Disabled, on</ToggleSwitch>
    </div>
  ),
};

export const WithoutLabel: Story = {
  render: () => <ToggleSwitch aria-label="Toggle setting" />,
};
