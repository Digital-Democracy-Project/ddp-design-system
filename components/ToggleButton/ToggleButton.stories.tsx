import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToggleButton } from './ToggleButton';

const meta: Meta<typeof ToggleButton> = {
  title: 'Components/ToggleButton',
  component: ToggleButton,
  args: { tone: 'primary', size: 'md', indicator: 'none', disabled: false, children: 'Hide voice votes' },
  argTypes: {
    tone: { control: 'select', options: ['neutral', 'primary', 'secondary', 'tertiary'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    indicator: { control: 'select', options: ['none', 'checkbox'] },
  },
};
export default meta;

type Story = StoryObj<typeof ToggleButton>;

export const Playground: Story = {};

export const PlainChip: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [years, setYears] = useState<string[]>(['2025']);
    const toggle = (year: string) =>
      setYears((prev) => (prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]));
    return (
      <div style={{ display: 'flex', gap: 8 }}>
        {['2023', '2024', '2025'].map((year) => (
          <ToggleButton key={year} indicator="none" tone="secondary" pressed={years.includes(year)} onPressedChange={() => toggle(year)}>
            {year}
          </ToggleButton>
        ))}
      </div>
    );
  },
};

export const CheckboxIndicator: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [hideVoice, setHideVoice] = useState(false);
    return (
      <ToggleButton indicator="checkbox" pressed={hideVoice} onPressedChange={setHideVoice}>
        Hide voice votes
      </ToggleButton>
    );
  },
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {(['neutral', 'primary', 'secondary', 'tertiary'] as const).map((tone) => (
        <div key={tone} style={{ display: 'flex', gap: 8 }}>
          <ToggleButton tone={tone} indicator="none">{tone}</ToggleButton>
          <ToggleButton tone={tone} indicator="none" defaultPressed>{tone} pressed</ToggleButton>
          <ToggleButton tone={tone} indicator="checkbox">{tone}</ToggleButton>
          <ToggleButton tone={tone} indicator="checkbox" defaultPressed>{tone} pressed</ToggleButton>
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <ToggleButton size="sm" indicator="checkbox" defaultPressed>Small</ToggleButton>
      <ToggleButton size="md" indicator="checkbox" defaultPressed>Medium</ToggleButton>
      <ToggleButton size="lg" indicator="checkbox" defaultPressed>Large</ToggleButton>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8 }}>
      <ToggleButton disabled indicator="checkbox">Unpressed, disabled</ToggleButton>
      <ToggleButton disabled indicator="checkbox" defaultPressed>Pressed, disabled</ToggleButton>
    </div>
  ),
};
