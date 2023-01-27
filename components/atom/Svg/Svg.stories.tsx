import type { Meta, StoryObj } from '@storybook/react';
import { SvgType, SvgList, AvatarList, AvatarType } from 'lib/frontend/types/svg';

import { Svg } from './Svg';

const meta: Meta<typeof Svg> = {
  title: 'Atom/Svg',
  component: Svg,
  argTypes: {
    type: {
      options: SvgList,
      control: {
        type: 'select',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Svg>;

export const Default: Story = {
  args: {
    type: SvgType.ChevronLeft,
    alt: 'Texte Alternatif',
    width: 60,
    height: 60,
  },
};

export const Avatar: Story = {
  args: {
    ...Default.args,
    type: AvatarType.AvatarHello,
  },
  argTypes: {
    type: {
      options: AvatarList,
      control: {
        type: 'select',
      },
    },
  },
};
