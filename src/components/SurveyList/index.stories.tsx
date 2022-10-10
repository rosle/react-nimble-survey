import React from 'react';

import { Meta, Story } from '@storybook/react';

import SurveyList, { SurveyListProps } from '.';

const mockSurveyListResponse = {
  data: [
    {
      id: 'd5de6a8f8f5f1cfe51bc',
      type: 'survey',
      attributes: {
        title: 'Scarlett Bangkok',
        description: "We'd love ot hear from you!",
        coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
        createdAt: '2017-01-23T07:48:12.991Z',
      },
    },
    {
      id: 'ed1d4f0ff19a56073a14',
      type: 'survey',
      attributes: {
        title: 'ibis Bangkok Riverside',
        description: "We'd love ot hear from you!",
        coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/287db81c5e4242412cc0_',
        createdAt: '2017-01-23T03:32:24.585Z',
      },
    },
  ],
};

export default {
  component: SurveyList,
  parameters: {
    mockData: [
      {
        url: `${process.env.REACT_APP_API_BASE_URL}/api/v1/surveys`,
        method: 'GET',
        status: 200,
        response: mockSurveyListResponse,
      },
    ],
  },
} as Meta;

const Template = (args: SurveyListProps) => <SurveyList {...args} />;

export const Default: Story<SurveyListProps> = Template.bind({});
Default.storyName = SurveyList.name;
