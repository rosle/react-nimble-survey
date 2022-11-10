import { readApiResponseFromFixtures } from 'tests/apiHelpers';
import { Survey, SurveyAnswer, SurveyQuestion } from 'types/survey';

import JsonApiSerializer from '.';

describe('JsonApiSerializer', () => {
  describe('.deserialize()', () => {
    it('deserializes the survey list response', () => {
      const surveyListResponse = readApiResponseFromFixtures('list_survey_success.json');
      const surveyList = JsonApiSerializer.deserialize('survey', surveyListResponse);

      const expectedSurvey: Survey = {
        id: 'd5de6a8f8f5f1cfe51bc',
        title: 'Scarlett Bangkok',
        description: "We'd love ot hear from you!",
        coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
        coverImageUrlLarge: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_l',
        createdAt: '2017-01-23T07:48:12.991Z',
      };

      expect(surveyList).toBeArrayContainingObject(expectedSurvey);
    });

    it('deserializes the survey response', () => {
      const surveyResponse = readApiResponseFromFixtures('get_survey_success.json');
      const survey = JsonApiSerializer.deserialize('survey', surveyResponse);

      const expectedSurvey: Survey = {
        id: 'd5de6a8f8f5f1cfe51bc',
        title: 'Scarlett Bangkok',
        description: "We'd love ot hear from you!",
        coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_',
        coverImageUrlLarge: 'https://dhdbhh0jsld0o.cloudfront.net/m/1ea51560991bcb7d00d0_l',
        createdAt: '2017-01-23T07:48:12.991Z',
      };

      const expectedQuestion: SurveyQuestion = {
        id: '940d229e4cd87cd1e202',
        text: 'Food â€“ Variety, Taste and Presentation',
        shortText: 'Food',
        pick: 'one',
        displayOrder: 1,
        displayType: 'star',
        isMandatory: false,
        coverImageUrl: 'https://dhdbhh0jsld0o.cloudfront.net/m/b41c84934fa8e4c34269_',
        coverImageUrlLarge: 'https://dhdbhh0jsld0o.cloudfront.net/m/b41c84934fa8e4c34269_l',
        coverImageOpacity: 0.75,
      };

      const expectedAnswer: SurveyAnswer = {
        id: '4cbc3e5a1c87d99bc7ee',
        text: '1',
        displayOrder: 0,
        isMandatory: false,
      };

      expect(survey).toBeObjectContaining(expectedSurvey);

      const surveyQuestions = survey.questions;

      expect(surveyQuestions).toBeArrayContainingObject(expectedQuestion);

      const surveyQuestionAnswers = survey.questions[1].answers;

      expect(surveyQuestionAnswers).toBeArrayContainingObject(expectedAnswer);
    });
  });
});
