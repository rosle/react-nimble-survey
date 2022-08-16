import React from 'react';

import { Meta, Story } from '@storybook/react';

import Input, { InputProps } from './';

export default { component: Input } as Meta;

const Template = (arg: InputProps) => <Input {...arg} />;

export const TextInput: Story = Template.bind({});
TextInput.args = {
  label: 'First name',
  name: 'first_name',
  type: 'text',
};

export const PasswordInput: Story = Template.bind({});
PasswordInput.args = {
  label: 'Password',
  name: 'password',
  type: 'password',
};

export const WithoutLabel: Story = Template.bind({});
