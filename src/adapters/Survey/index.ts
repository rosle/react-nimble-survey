import requestManager from 'lib/requestManager';

const surveyAdapter = () => {
  const list = () => {
    return requestManager('get', '/api/v1/surveys');
  };

  return { list };
};

export default surveyAdapter();
