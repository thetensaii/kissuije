import type { Meta, StoryObj } from '@storybook/react';
import { AvatarType } from 'lib/frontend/types/svg';

import { Player } from './Player';

const meta: Meta<typeof Player> = {
  title: 'Molecule/Player',
  component: Player,
};

export default meta;

type Story = StoryObj<typeof Player>;

export const Default: Story = {
  args: {
    name: 'Player',
    avatar: AvatarType.AvatarHello,
    isPlayer: false,
  },
};

export const Owner: Story = {
  args: {
    ...Default.args,
    name: 'Owner',
    isOwner: true,
  },
};

export const Me: Story = {
  args: {
    ...Default.args,
    name: 'Me',
    isPlayer: true,
  },
};

export const MeOwner: Story = {
  args: {
    ...Default.args,
    name: 'MeOwner',
    isPlayer: true,
    isOwner: true,
  },
};

export const NameOverflow: Story = {
  args: {
    ...Default.args,
    name: 'HelloIChooseToHaveALongNameJustToTestOverflow',
    isPlayer: true,
    isOwner: true,
  },
};

export const TextAfter: Story = {
  args: {
    ...Default.args,
    afterSpanText: <span>Voici le texte après</span>,
  },
};
