import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionLabel } from './SectionLabel';

const meta: Meta<typeof SectionLabel> = {
  title: 'Components/SectionLabel',
  component: SectionLabel,
};
export default meta;

type Story = StoryObj<typeof SectionLabel>;

export const Playground: Story = {
  args: {
    children: 'Jurisdiction',
  },
};

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
      <SectionLabel tone="subtle">Subtle</SectionLabel>
      <SectionLabel tone="neutral">Neutral</SectionLabel>
      <SectionLabel tone="primary">Primary</SectionLabel>
      <SectionLabel tone="secondary">Secondary</SectionLabel>
      <SectionLabel tone="tertiary">Tertiary</SectionLabel>
    </div>
  ),
};

// Illustrative composition only — inline record-meta, one real use case that motivated the primary tone. Not a component this package ships or names.
export const InlineRecordMeta: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <SectionLabel tone="primary">Example ID</SectionLabel>
      <span aria-hidden="true">·</span>
      <SectionLabel tone="primary">Category A</SectionLabel>
      <span aria-hidden="true">·</span>
      <SectionLabel tone="primary">Status</SectionLabel>
    </div>
  ),
};
