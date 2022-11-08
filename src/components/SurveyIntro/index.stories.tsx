import React from 'react';

import { Meta, Story } from '@storybook/react';

import { buildSurvey, buildSurveyQuestionIntro } from 'tests/factories/survey';

import SurveyIntro, { SurveyIntroProps } from '.';

const survey = buildSurvey();
const surveyIntro = buildSurveyQuestionIntro();

export default {
  component: SurveyIntro,
} as Meta;

const Template = (args: SurveyIntroProps) => <SurveyIntro {...args} />;

export const Default: Story<SurveyIntroProps> = Template.bind({});
Default.storyName = SurveyIntro.name;
Default.args = { survey, surveyIntro };
