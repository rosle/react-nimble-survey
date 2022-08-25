import requestManager from 'lib/requestManager';
import mockEnv from 'tests/hooks/mockEnv';

import AuthAdapter from './';

const mockClientId = 'client_id_001';
const mockClientSecret = 'client_secret_001';

jest.mock('lib/requestManager', () => jest.fn());

describe('AuthAdapter', () => {
  mockEnv({
    REACT_APP_API_CLIENT_ID: mockClientId,
    REACT_APP_API_CLIENT_SECRET: mockClientSecret,
  });

  describe('.login()', () => {
    it('fires post request to the endpoint with the correct data', () => {
      const email = 'rossukhon@nimblehq.co';
      const password = 'secret22';

      const expectedMethod = 'post';
      const expectedEndpoint = '/api/v1/oauth/token';
      const expectedData = {
        grantType: 'password',
        email,
        password,
        clientId: mockClientId,
        clientSecret: mockClientSecret,
      };

      AuthAdapter.login({ email, password });

      expect(requestManager).toHaveBeenCalledTimes(1);
      expect(requestManager).toHaveBeenCalledWith(expectedMethod, expectedEndpoint, { data: expectedData });
    });
  });
});
