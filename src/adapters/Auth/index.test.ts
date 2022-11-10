import requestManager from 'lib/requestManager';
import { mockEnv } from 'tests/mockEnv';

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

  describe('.logout()', () => {
    it('fires post request to the endpoint with the correct data', () => {
      const refreshToken = 'refresh_token_12345';

      const expectedMethod = 'post';
      const expectedEndpoint = '/api/v1/oauth/revoke';
      const expectedData = {
        token: refreshToken,
        clientId: mockClientId,
        clientSecret: mockClientSecret,
      };

      AuthAdapter.logout({ refreshToken });

      expect(requestManager).toHaveBeenCalledTimes(1);
      expect(requestManager).toHaveBeenCalledWith(expectedMethod, expectedEndpoint, { data: expectedData });
    });
  });

  describe('.refreshToken()', () => {
    it('fires post request to the endpoint with the correct data', () => {
      const refreshToken = 'refresh_token_12345';

      const expectedMethod = 'post';
      const expectedEndpoint = '/api/v1/oauth/token';
      const expectedData = {
        grantType: 'refresh_token',
        refreshToken,
        clientId: mockClientId,
        clientSecret: mockClientSecret,
      };

      AuthAdapter.refreshToken({ refreshToken });

      expect(requestManager).toHaveBeenCalledTimes(1);
      expect(requestManager).toHaveBeenCalledWith(expectedMethod, expectedEndpoint, { data: expectedData });
    });
  });
});
