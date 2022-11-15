import React from 'react';

import { Meta, Story } from '@storybook/react';

import BlankState, { BlankStateProps } from '.';

export default {
  component: BlankState,
} as Meta;

const Template = (args: BlankStateProps) => <BlankState {...args} />;

export const Default: Story<BlankStateProps> = Template.bind({});
Default.storyName = BlankState.name;
Default.args = {
  emoji: '😎',
  description: 'You’ve completed all the surveys.',
};
