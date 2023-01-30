import type { Meta, StoryObj } from '@storybook/react';

import { InputText } from './InputText';

const meta: Meta<typeof InputText> = {
  title: 'Atom/InputText',
  component: InputText,
};

export default meta;

type Story = StoryObj<typeof InputText>;

export const Default: Story = {
  args: {
    placeholder: 'Input Text',
  },
};
