import React from 'react';

import { Meta, Story } from '@storybook/react';
import { times } from 'lodash';

import { buildSurvey } from 'tests/factories/survey';

import SurveyList, { SurveyListProps } from '.';

const surveys = times(2, () => buildSurvey());

export default {
  component: SurveyList,
} as Meta;

const Template = (args: SurveyListProps) => <SurveyList {...args} />;

export const Default: Story<SurveyListProps> = Template.bind({});
Default.storyName = SurveyList.name;
Default.args = {
  isLoading: false,
  surveys: surveys,
};
