import type { Meta, StoryObj } from '@storybook/react';
import { SvgType } from 'lib/frontend/types/svg';
import { Svg } from '../Svg';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Atom/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['primary', 'secondary', 'ternary', 'transparent'],
      control: {
        type: 'select',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

export const Ternary: Story = {
  args: {
    variant: 'ternary',
    children: 'Ternary Button',
  },
};

export const Transparent: Story = {
  args: {
    variant: 'transparent',
    children: (
      <>
        TransparentButton
        <Svg type="ChevronRight" alt="Chevron Droit" width={25} height={25} />
      </>
    ),
  },
};

export const WithLeftIcon: Story = {
  args: {
    children: 'With Left Icon',
    leftIcon: SvgType.ChevronLeft,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: 'With Right Icon',
    rightIcon: SvgType.ChevronRight,
  },
};

export const WithBothIcon: Story = {
  args: {
    children: 'With Both Icon',
    leftIcon: SvgType.ChevronLeft,
    rightIcon: SvgType.ChevronRight,
  },
};
