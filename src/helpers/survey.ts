import { remove } from 'lodash';

import { Survey, SurveyDetail } from 'types/survey';

const parseSurveyDetail = (survey: Survey): SurveyDetail => {
  const { questions: surveyQuestions = [], ...surveyAttrs } = survey;

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
