import { remove } from 'lodash';

import { Survey, SurveyStep } from 'types/survey';

const parseSurveyStep = (survey: Survey): SurveyStep => {
  const surveyQuestions = survey.questions || [];

  const [intro] = remove(surveyQuestions, { displayType: 'intro' });
  const [outro] = remove(surveyQuestions, { displayType: 'outro' });

  return {
    intro: intro,
    questions: surveyQuestions,
    outro: outro,
  };
};

export { parseSurveyStep };
