import Serializer from 'json-api-serializer';

const register = (serializer: Serializer) => {
  serializer.register('token');
};

export default register;
