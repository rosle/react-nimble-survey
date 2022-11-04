import requestManager from 'lib/requestManager';

import UserAdapter from './';

jest.mock('lib/requestManager', () => jest.fn());

describe('UserAdapter', () => {
  describe('.me()', () => {
    it('fires get request to the endpoint with the correct data', () => {
      const expectedMethod = 'get';
      const expectedEndpoint = '/api/v1/me';

      UserAdapter.me();

      expect(requestManager).toHaveBeenCalledTimes(1);
      expect(requestManager).toHaveBeenCalledWith(expectedMethod, expectedEndpoint);
    });
  });
});
