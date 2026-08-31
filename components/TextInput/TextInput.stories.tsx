import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextInput } from './TextInput';

const meta: Meta<typeof TextInput> = {
  title: 'Components/TextInput',
  component: TextInput,
  args: { size: 'md', placeholder: 'Search bill title or ID...', disabled: false },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
};
export default meta;

type Story = StoryObj<typeof TextInput>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <TextInput size="sm" placeholder="Small" />
      <TextInput size="md" placeholder="Medium" />
      <TextInput size="lg" placeholder="Large" />
    </div>
  ),
};

export const Clearable: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('housing');
    return (
      <TextInput
        value={value}
        onChange={setValue}
        clearable
        placeholder="Search bill title or ID..."
      />
    );
  },
};

export const SubmitOnEnter: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [submitted, setSubmitted] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <TextInput
          placeholder="Type, then press Enter"
          onSubmit={setSubmitted}
          clearable
        />
        <span>Last submitted: {submitted || '(nothing yet)'}</span>
      </div>
    );
  },
};

export const ErrorState: Story = {
  args: {
    error: true,
    errorMessage: 'This field is required.',
    placeholder: 'Search bill title or ID...',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Search bill title or ID...',
  },
};
