import Serializer from 'json-api-serializer';

import registerSurvey from './survey';
import registerToken from './token';
import registerUser from './user';

const JsonApiSerializer = () => {
  const serializer = new Serializer();

  registerSurvey(serializer);
  registerToken(serializer);
  registerUser(serializer);

  const deserialize = (type: string, data: Serializer.JSONAPIDocument) => {
    return serializer.deserialize(type, data);
  };

  return { deserialize };
};

export default JsonApiSerializer();
