import type { Meta, StoryObj } from '@storybook/react';

import { BulletPoint } from './BulletPoint';

const meta: Meta<typeof BulletPoint> = {
  title: 'Atom/BulletPoint',
  component: BulletPoint,
};

export default meta;

type Story = StoryObj<typeof BulletPoint>;

export const Default: Story = {
  args: {
    number: 1,
  },
};
