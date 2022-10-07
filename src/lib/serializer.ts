import JsonApiSerializer from 'json-api-serializer';

const Serializer = () => {
  const serializer = new JsonApiSerializer();

  serializer.register('survey', { id: 'id' });

  const deserialize = (type: string, data: JsonApiSerializer.JSONAPIDocument) => {
    return serializer.deserialize(type, data);
  };

  return { deserialize };
};

export default Serializer();
