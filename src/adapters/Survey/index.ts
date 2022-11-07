import requestManager from 'lib/requestManager';

const SurveyAdapter = () => {
  const list = () => {
    return requestManager('get', '/api/v1/surveys');
  };

  return { list };
};

export default SurveyAdapter();
