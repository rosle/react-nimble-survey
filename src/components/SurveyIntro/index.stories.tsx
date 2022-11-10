import React from 'react';

import { Meta, Story } from '@storybook/react';

import { buildSurveyDetail } from 'tests/factories/survey';

import SurveyIntro, { SurveyIntroProps } from '.';

const surveyDetail = buildSurveyDetail();

export default {
  component: SurveyIntro,
} as Meta;

const Template = (args: SurveyIntroProps) => <SurveyIntro {...args} />;

export const Default: Story<SurveyIntroProps> = Template.bind({});
Default.storyName = SurveyIntro.name;
Default.args = { surveyDetail };
