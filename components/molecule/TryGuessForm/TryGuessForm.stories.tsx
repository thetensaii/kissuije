import { Meta, StoryObj } from '@storybook/react';
import { TryGuessForm } from './TryGuessForm';

const meta: Meta<typeof TryGuessForm> = {
  title: 'Molecule/Forms/TryGuessForm',
  component: TryGuessForm,
};

export default meta;

type Story = StoryObj<typeof TryGuessForm>;

export const Default: Story = {};
