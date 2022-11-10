import requestManager from 'lib/requestManager';
import { Survey } from 'types/survey';

const SurveyAdapter = () => {
  const list = () => {
    return requestManager<Survey[]>('get', '/api/v1/surveys');
  };

  const get = (id: string) => {
    return requestManager<Survey>('get', `/api/v1/surveys/${id}`);
  };

  return { list, get };
};

export default SurveyAdapter();
