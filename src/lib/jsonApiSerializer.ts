import Serializer from 'json-api-serializer';

import { getHiResImageUrl } from 'helpers/image';
import { Survey } from 'types/survey';

const JsonApiSerializer = () => {
  const serializer = new Serializer();

  serializer.register('user');
  serializer.register('token');

  serializer.register('survey', {
    afterDeserialize: (data) => {
      const surveyResponse = data as Survey;

      return {
        ...surveyResponse,
        coverImageUrlLarge: getHiResImageUrl(surveyResponse.coverImageUrl),
      };
    },
  });

  const deserialize = (type: string, data: Serializer.JSONAPIDocument) => {
    return serializer.deserialize(type, data);
  };

  return { deserialize };
};

export default JsonApiSerializer();
