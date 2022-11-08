import Serializer from 'json-api-serializer';

import { getHiResImageUrl } from 'helpers/image';
import { Survey, SurveyQuestion } from 'types/survey';

const JsonApiSerializer = () => {
  const serializer = new Serializer();

  serializer.register('answer');
  serializer.register('token');
  serializer.register('user');

  serializer.register('survey', {
    afterDeserialize: (data) => {
      const survey = data as Survey;

      return {
        ...survey,
        coverImageUrlLarge: getHiResImageUrl(survey.coverImageUrl),
      };
    },
  });

  serializer.register('question', {
    afterDeserialize: (data) => {
      const surveyQuestion = data as SurveyQuestion;

      return {
        ...surveyQuestion,
        coverImageUrlLarge: getHiResImageUrl(surveyQuestion.coverImageUrl),
      };
    },
  });

  return serializer;
};

export default JsonApiSerializer();
