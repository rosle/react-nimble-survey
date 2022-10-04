import React from 'react';

import { Meta, Story } from '@storybook/react';

import CaretRight from 'components/Icon/CaretRight';

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

export const LinkButton: Story<ButtonProps> = Template.bind({});
LinkButton.args = {
  buttonStyle: 'link',
};

export const RoundButton: Story<ButtonProps> = Template.bind({});
RoundButton.args = {
  round: true,
  children: <CaretRight />,
};
