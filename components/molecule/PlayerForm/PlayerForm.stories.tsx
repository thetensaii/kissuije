import type { Meta, StoryObj } from '@storybook/react';

import { PlayerForm } from './PlayerForm';

const meta: Meta<typeof PlayerForm> = {
  title: 'Molecule/Forms/PlayerForm',
  component: PlayerForm,
};

export default meta;

type Story = StoryObj<typeof PlayerForm>;

export const CreateRoomForm: Story = {
  args: {
    initialName: '',
    type: 'createRoom',
  },
};

export const JoinRoomForm: Story = {
  args: {
    initialName: '',
    type: 'joinRoom',
  },
};
