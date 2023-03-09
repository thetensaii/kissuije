import type { Meta, StoryObj } from '@storybook/react';
import { Typo } from './Typo';

const meta: Meta<typeof Typo> = {
  title: 'Atom/Typo',
  component: Typo,
};

export default meta;

type Story = StoryObj<typeof Typo>;

export const MainHeading1: Story = {
  args: {
    tag: 'h1',
    variant: 'mainHeading1',
    children: 'Main Heading 1',
  },
  argTypes: {
    font: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
};

export const Heading1: Story = {
  args: {
    tag: 'h1',
    variant: 'heading1',
    children: 'Heading 1',
  },
  argTypes: {
    font: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
};

export const Heading2: Story = {
  args: {
    tag: 'h2',
    variant: 'heading2',
    font: 'medium',
    children: 'Heading 2',
  },
  argTypes: {
    font: {
      options: ['medium', 'semiBold'],
      control: {
        type: 'select',
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
};

export const Heading3: Story = {
  args: {
    tag: 'h3',
    variant: 'heading3',
    font: 'regular',
    children: 'Heading 3',
  },
  argTypes: {
    font: {
      options: ['regular', 'medium'],
      control: {
        type: 'select',
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
};

export const Question: Story = {
  args: {
    tag: 'p',
    variant: 'question',
    children: 'Question',
  },
  argTypes: {
    font: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
};

export const Body: Story = {
  args: {
    tag: 'p',
    variant: 'body',
    children: 'Body',
  },
  argTypes: {
    font: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
};

export const Button: Story = {
  args: {
    tag: 'span',
    variant: 'button',
    children: 'Button',
  },
  argTypes: {
    font: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
  },
};
