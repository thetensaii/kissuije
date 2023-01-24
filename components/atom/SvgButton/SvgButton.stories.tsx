import type { Meta, StoryObj } from '@storybook/react';

import { SvgButton } from './SvgButton';

const meta: Meta<typeof SvgButton> = {
  title: 'SvgButton',
  component: SvgButton,
  argTypes: {
    src: {
      options: ['/svgs/ChevronLeft.svg', '/svgs/ChevronRight.svg'],
      control: {
        type: 'select',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof SvgButton>;

export const Default: Story = {
  args: {
    src: '/svgs/ChevronLeft.svg',
    alt: 'Svg Button',
    svgWidth: 40,
    svgHeight: 40,
  },
};
