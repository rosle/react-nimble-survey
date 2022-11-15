import React from 'react';

import { Meta, Story } from '@storybook/react';

import TodayDate, { TodayDateProps } from '.';

export default {
  component: TodayDate,
} as Meta;

const Template = (args: TodayDateProps) => <TodayDate {...args} />;

export const Default: Story<TodayDateProps> = Template.bind({});
Default.storyName = TodayDate.name;
