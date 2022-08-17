import React from 'react';

import { Meta, Story } from '@storybook/react';

import Button, { ButtonProps } from './';

export default {
  component: Button,
  args: {
    label: 'Submit',
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

export const LinkButton: Story<ButtonProps> = Template.bind({});
LinkButton.args = {
  buttonStyle: 'link',
};
