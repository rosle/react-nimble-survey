import React from 'react';

import { Meta, Story } from '@storybook/react';

import Textarea, { TextareaProps } from './';

export default { component: Textarea } as Meta;

const Template = (arg: TextareaProps) => <Textarea {...arg} />;

export const WithLabel: Story = Template.bind({});
WithLabel.args = {
  label: 'content',
  name: 'content',
};

export const WithoutLabel: Story = Template.bind({});
