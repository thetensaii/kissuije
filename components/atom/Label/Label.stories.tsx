import type { Meta, StoryObj } from '@storybook/react';

import { Label } from './Label';

const meta: Meta<typeof Label> = {
  title: 'Atom/Label',
  component: Label,
};

export default meta;

type Story = StoryObj<typeof Label>;

export const Default: Story = {
  render: () => <Label>Label</Label>,
};
