import Serializer from 'json-api-serializer';

const JsonApiSerializer = () => {
  const serializer = new Serializer();

  serializer.register('survey', { id: 'id' });

  const deserialize = (type: string, data: Serializer.JSONAPIDocument) => {
    return serializer.deserialize(type, data);
  };

  return { deserialize };
};

export default JsonApiSerializer();
