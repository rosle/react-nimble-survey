import Serializer from 'json-api-serializer';

import { getHiResImageUrl } from 'helpers/image';
import { Survey } from 'types/survey';

const register = (serializer: Serializer) => {
  serializer.register('survey', {
    afterDeserialize: (data) => {
      const surveyResponse = data as Survey;

      return {
        ...surveyResponse,
        coverImageUrlLarge: getHiResImageUrl(surveyResponse.coverImageUrl),
      };
    },
  });
};

export default register;
