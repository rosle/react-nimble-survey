import React from 'react';

import { Meta, Story } from '@storybook/react';

import Button, { ButtonProps } from './';

export default {
  component: Button,
  args: {
    children: 'Submit',
  },
} as Meta;

const Template = (args: ButtonProps) => <Button {...args} />;

export const PrimaryButton: Story<ButtonProps> = Template.bind({});
PrimaryButton.args = {
  buttonStyle: 'primary',
  buttonSize: 'md',
};

export const SecondaryButton: Story<ButtonProps> = Template.bind({});
SecondaryButton.args = {
  buttonStyle: 'secondary',
};
