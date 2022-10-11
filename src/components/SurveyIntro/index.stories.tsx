import React from 'react';

import { Meta, Story } from '@storybook/react';

import { Survey, SurveyQuestion } from 'types/survey';

import SurveyIntro, { SurveyIntroProps } from '.';

const survey: Survey = {
  id: 'd5de6a8f8f5f1cfe51bc',
  title: 'Scarlett Bangkok',
  description: "We'd love ot hear from you!",
  coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
  createdAt: '2017-01-23T07:48:12.991Z',
};

const surveyIntro: SurveyQuestion = {
  id: 'd3afbcf2b1d60af845dc',
  text: 'Thank you for visiting Scarlett!\n Please take a moment to share your feedback.',
  shortText: 'introduction',
  pick: 'none',
  displayOrder: 0,
  displayType: 'intro',
  isMandatory: false,
  imageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/2001ebbfdcbf6c00c757_',
  coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
  coverImageOpacity: 0.6,
};

export default {
  component: SurveyIntro,
  argTypes: { onStart: { action: 'clicked' } },
} as Meta;

const Template = (args: SurveyIntroProps) => <SurveyIntro {...args} />;

export const Default: Story<SurveyIntroProps> = Template.bind({});
Default.storyName = SurveyIntro.name;
Default.args = { survey, surveyIntro };
