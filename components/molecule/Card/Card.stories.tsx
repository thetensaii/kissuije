import type { Meta, StoryObj } from '@storybook/react';

import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Molecule/Card',
  component: Card,
};

export default meta;

type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card>
      <h1>Content</h1>
    </Card>
  ),
};

export const WithBackButton: Story = {
  render: () => (
    <Card onBackButtonClick={(): void => undefined}>
      <h1>Content</h1>
    </Card>
  ),
};
