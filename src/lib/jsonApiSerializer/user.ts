import Serializer from 'json-api-serializer';

const register = (serializer: Serializer) => {
  serializer.register('user');
};

export default register;
