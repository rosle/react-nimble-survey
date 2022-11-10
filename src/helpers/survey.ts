import { remove } from 'lodash';

import { Survey, SurveyDetail } from 'types/survey';

const parseSurveyDetail = (survey: Survey): SurveyDetail => {
  const { questions: surveyQuestions = [], ...surveyAttrs } = survey;

  if (surveyQuestions.length === 0) throw new Error('The survey has no questions');

  const [intro] = remove(surveyQuestions, { displayType: 'intro' });
  const [outro] = remove(surveyQuestions, { displayType: 'outro' });

  return {
    survey: surveyAttrs,
    intro: intro,
    questions: surveyQuestions,
    outro: outro,
  };
};

export { parseSurveyDetail };
