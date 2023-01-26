import type { Meta, StoryObj } from '@storybook/react';
import { Svg } from '../Svg';

import { TransparentButton } from './TransparentButton';

const meta: Meta<typeof TransparentButton> = {
  title: 'Atom/TransparentButton',
  component: TransparentButton,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof TransparentButton>;

export const Default: Story = {
  render: () => (
    <TransparentButton>
      TransparentButton <Svg type="ChevronRight" alt="Chevron Droit" width={20} height={20} />
    </TransparentButton>
  ),
};
