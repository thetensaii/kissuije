import type { Meta, StoryObj } from '@storybook/react';

import { Window } from './Window';

const meta: Meta<typeof Window> = {
  title: 'Molecule/Window',
  component: Window,
};

export default meta;

type Story = StoryObj<typeof Window>;

export const Default: Story = {
  render: () => (
    <Window>
      <h1>Content</h1>
    </Window>
  ),
};

export const WithBackButton: Story = {
  render: () => (
    <Window onBackButtonClick={(): void => undefined}>
      <h1>Content</h1>
    </Window>
  ),
};
