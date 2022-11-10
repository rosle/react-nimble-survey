import { omit, times } from 'lodash';

import { buildSurvey, buildSurveyQuestion, buildSurveyQuestionIntro, buildSurveyQuestionOutro } from 'tests/factories/survey';

import { parseSurveyDetail } from './survey';

describe('parseSurveyDetail', () => {
  test('extracts survey attributes, intro, questions and outro', () => {
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
});
