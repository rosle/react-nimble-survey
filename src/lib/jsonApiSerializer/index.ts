import Serializer from 'json-api-serializer';

import registerSurvey from './survey';
import registerToken from './token';
import registerUser from './user';

const JsonApiSerializer = () => {
  const serializer = new Serializer();

  registerSurvey(serializer);
  registerToken(serializer);
  registerUser(serializer);

  return serializer;
};

export default JsonApiSerializer();
