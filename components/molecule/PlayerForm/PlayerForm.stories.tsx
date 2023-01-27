import type { Meta, StoryObj } from '@storybook/react';

import { PlayerForm } from './PlayerForm';

const meta: Meta<typeof PlayerForm> = {
  title: 'Molecule/Forms/PlayerForm',
  component: PlayerForm,
};

export default meta;

type Story = StoryObj<typeof PlayerForm>;

export const CreateRoomForm: Story = {
  render: () => <PlayerForm initialName="Pseudo" type="createRoom" createGameRoom={(): void => undefined} />,
};

export const JoinRoomForm: Story = {
  render: () => (
    <PlayerForm
      initialName="Pseudo"
      type="joinRoom"
      createGameRoom={(): void => undefined}
      joinGameRoom={(): void => undefined}
    />
  ),
};
