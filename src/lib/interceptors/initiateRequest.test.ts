import { LocalStorageKey, setLocalStorageValue } from 'lib/localStorage';
import { defaultOptions } from 'lib/requestManager';
import { buildTokens } from 'tests/factories/tokens';

import initiateRequest from './initiateRequest';

describe('initiateRequest', () => {
  describe('given the tokens exist', () => {
    it('attaches the authorization header', () => {
      const tokens = buildTokens();
      const axiosRequestConfig = { ...defaultOptions, headers: undefined };

      setLocalStorageValue(LocalStorageKey.tokens, tokens);

      const attachedHeaderConfig = initiateRequest(axiosRequestConfig);

      expect(attachedHeaderConfig.headers).toEqual({
        authorization: `Bearer ${tokens.accessToken}`,
      });
    });
  });

  describe('given the tokens do NOT exist', () => {
    it('does NOT attach the authorization header', () => {
      const axiosRequestConfig = { ...defaultOptions, headers: undefined };

      const attachedHeaderConfig = initiateRequest(axiosRequestConfig);

      expect(attachedHeaderConfig.headers).toBeUndefined();
    });
  });
});
