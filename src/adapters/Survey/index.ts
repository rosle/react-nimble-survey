import requestManager from 'lib/requestManager';
import { Survey } from 'types/survey';

const SurveyAdapter = () => {
  const list = () => {
    return requestManager<Survey[]>('get', '/api/v1/surveys');
  };

  return { list };
};

export default SurveyAdapter();
