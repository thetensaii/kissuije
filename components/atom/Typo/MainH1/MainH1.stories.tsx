import { Meta, StoryObj } from '@storybook/react';
import { MainH1 } from './MainH1';

const meta: Meta<typeof MainH1> = {
  title: 'Atom/Typo/MainH1',
  component: MainH1,
};

export default meta;

type Story = StoryObj<typeof MainH1>;

export const Default: Story = {
  args: {
    children: 'Main H1 Title',
  },
};
