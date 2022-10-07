import requestManager from 'lib/requestManager';

import SurveyAdapter from '.';

jest.mock('lib/requestManager', () => jest.fn());

describe('SurveyAdapter', () => {
  describe('.list()', () => {
    it('fires get request to the endpoint with the correct data', () => {
      const expectedMethod = 'get';
      const expectedEndpoint = '/api/v1/surveys';

      SurveyAdapter.list();

      expect(requestManager).toHaveBeenCalledTimes(1);
      expect(requestManager).toHaveBeenCalledWith(expectedMethod, expectedEndpoint);
    });
  });
});
