import React from 'react';

import { Meta, Story } from '@storybook/react';

import SurveyList, { SurveyListProps } from '.';

export default {
  component: SurveyList,
} as Meta;

const Template = (args: SurveyListProps) => <SurveyList {...args} />;

export const Default: Story<SurveyListProps> = Template.bind({});
Default.storyName = SurveyList.name;
