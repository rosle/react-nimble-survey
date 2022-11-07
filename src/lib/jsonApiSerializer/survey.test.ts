import { readApiResponseFromFixtures } from 'tests/apiHelpers';
import { Survey } from 'types/survey';

import JsonApiSerializer from '.';

describe('JsonApiSerializer', () => {
  describe('.deserialize()', () => {
    it('deserializes the survey list response', () => {
      const surveyListResponse = readApiResponseFromFixtures('list_survey_success.json');
      const deserializedResponse = JsonApiSerializer.deserialize('survey', surveyListResponse);

      const expectedSurvey: Survey = {
        id: 'd5de6a8f8f5f1cfe51bc',
        title: 'Scarlett Bangkok',
        description: "We'd love ot hear from you!",
        coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
        coverImageUrlLarge: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_l',
        createdAt: '2017-01-23T07:48:12.991Z',
      };

      expect(Array.isArray(deserializedResponse)).toBe(true);
      expect(deserializedResponse[0]).toEqual(expect.objectContaining(expectedSurvey));
    });
  });
});
