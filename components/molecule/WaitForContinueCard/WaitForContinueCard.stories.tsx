import { Meta, StoryObj } from '@storybook/react';
import { WaitForContinueCard } from './WaitForContinueCard';

const meta: Meta<typeof WaitForContinueCard> = {
  title: 'Molecule/WaitCard/WaitForContinueCard',
  component: WaitForContinueCard,
};

export default meta;

type Story = StoryObj<typeof WaitForContinueCard>;

export const Default: Story = {};
