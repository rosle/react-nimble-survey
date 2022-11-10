import { omit, times } from 'lodash';

import { buildSurvey, buildSurveyQuestion, buildSurveyQuestionIntro, buildSurveyQuestionOutro } from 'tests/factories/survey';

import { parseSurveyDetail } from './survey';

describe('parseSurveyDetail', () => {
  test('extracts the survey attributes, intro, questions and outro', () => {
    const intro = buildSurveyQuestionIntro();
    const outro = buildSurveyQuestionOutro();
    const questions = times(2, () => buildSurveyQuestion());
    const survey = buildSurvey({ questions: [...questions, intro, outro] });

    const surveyDetail = parseSurveyDetail(survey);

    expect(surveyDetail.survey).toEqual(omit(survey, 'questions'));
    expect(surveyDetail.intro).toEqual(intro);
    expect(surveyDetail.outro).toEqual(outro);
    expect(surveyDetail.questions).toEqual(questions);
  });

  describe('given a survey without questions', () => {
    test('throws an exception', () => {
      const surveywithoutQuestions = buildSurvey();

      expect(() => parseSurveyDetail(surveywithoutQuestions)).toThrow('The survey has no questions');
    });
  });
});
