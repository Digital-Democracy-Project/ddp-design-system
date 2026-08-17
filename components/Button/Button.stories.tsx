import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { Icon } from '../Icon';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: { variant: 'primary', size: 'md', children: 'Button', disabled: false },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'tertiary', 'link'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Playground: Story = {};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Button variant="primary" disabled>Primary</Button>
      <Button variant="secondary" disabled>Secondary</Button>
      <Button variant="tertiary" disabled>Tertiary</Button>
      <Button variant="link" disabled>Link</Button>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Button variant="primary">
        <Icon name="check" size="sm" />
        Confirm
      </Button>
      <Button variant="link">
        Learn more
        <Icon name="chevron-down" size="sm" />
      </Button>
    </div>
  ),
};

export const InlineWithinText: Story = {
  render: () => (
    <p style={{ maxWidth: 400 }}>
      This paragraph contains a{' '}
      <Button variant="link">link-styled button</Button> sitting inline with
      surrounding text, to check it reads visually like a real link.
    </p>
  ),
};

export const CustomColors: Story = {
  args: {
    children: 'Custom',
    customColors: {
      background: '#fce7f3',
      foreground: '#9d174d',
      backgroundHover: '#fbcfe8',
      backgroundActive: '#f9a8d4',
    },
  },
};
