import type { Meta, StoryObj } from '@storybook/react-vite';
import { ClickableTile } from './ClickableTile';

const meta: Meta<typeof ClickableTile> = {
  title: 'Components/ClickableTile',
  component: ClickableTile,
};
export default meta;

type Story = StoryObj<typeof ClickableTile>;

export const Playground: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <ClickableTile onClick={() => alert('Tile clicked')}>Click anywhere on this tile, padding included.</ClickableTile>
    </div>
  ),
};

export const AsLink: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <ClickableTile href="https://example.com">Renders as a real &lt;a&gt; when href is given.</ClickableTile>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ maxWidth: 320, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <ClickableTile disabled onClick={() => alert('Should never fire')}>
        Disabled button tile — not focusable, not clickable.
      </ClickableTile>
      <ClickableTile disabled href="https://example.com">
        Disabled link tile — same treatment.
      </ClickableTile>
    </div>
  ),
};

// Illustrative composition only — a title and a short description, built entirely from this tile's own children slot. Not a component this package ships or names.
export const WithComposedContent: Story = {
  render: () => (
    <div style={{ maxWidth: 420 }}>
      <ClickableTile href="https://example.com">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ fontWeight: 600 }}>Example Title</div>
          <p style={{ margin: 0, color: 'var(--ddp-text-subtle)' }}>A short description explaining where this tile goes.</p>
        </div>
      </ClickableTile>
    </div>
  ),
};
