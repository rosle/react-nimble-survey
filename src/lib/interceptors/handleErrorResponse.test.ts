import { LocalStorageKey, setLocalStorageValue } from 'lib/localStorage';
import { defaultOptions } from 'lib/requestManager';
import routePath from 'routes/routePath';
import { buildAxiosError, buildAxiosResponse } from 'tests/factories/axios';
import { buildTokens } from 'tests/factories/tokens';
import { setupPolly } from 'tests/setupPolly';

import handleErrorResponse from './handleErrorResponse';

describe('handleErrorResponse', () => {
  describe('given the `invalid_token` API error', () => {
    const axiosResponse = buildAxiosResponse({
      status: 401,
      data: {
        errors: [
          {
            code: 'invalid_token',
            detail: 'The access token is invalid',
          },
        ],
      },
    });

    it('refreshes token and makes the original request again with a new access token', async () => {
      const polly = setupPolly('refresh_token_success');

      setLocalStorageValue(
        LocalStorageKey.tokens,
        buildTokens({
          refreshToken: 'woZqklaqFkc_dGOPP7cxXWJzcWJREs19EXp9dOIUo74',
        })
      );

      const axiosError = buildAxiosError({
        config: { ...defaultOptions, method: 'get', url: '/api/v1/me' },
        response: axiosResponse,
      });

      const response = await handleErrorResponse(axiosError);

      expect(response.status).toBe(200);

      await polly.stop();
    });

    describe('given NO tokens in the local storage', () => {
      it('logs the user out, redirects to the Login page and returns the rejected promise with the given error', async () => {
        const axiosError = buildAxiosError({ response: axiosResponse });

        await expect(handleErrorResponse(axiosError)).rejects.toBe(axiosError);

        expect(localStorage.getItem(LocalStorageKey.tokens)).toBe(JSON.stringify(null));
        expect(localStorage.getItem(LocalStorageKey.user)).toBe(JSON.stringify(null));

        expect(window.location.href).toBe(routePath.login);
      });
    });

    describe('given failed to refresh token', () => {
      it('logs the user out, redirects to the Login page and returns the rejected promise with the given error', async () => {
        const polly = setupPolly('refresh_token_failed');

        setLocalStorageValue(
          LocalStorageKey.tokens,
          buildTokens({
            refreshToken: 'woZqklaqFkc_dGOPP7cxXWJzcWJREs19EXp9dOIUo74',
          })
        );

        const axiosError = buildAxiosError({
          config: { ...defaultOptions, method: 'get', url: '/api/v1/me' },
          response: axiosResponse,
        });

        await expect(handleErrorResponse(axiosError)).rejects.toBe(axiosError);

        expect(localStorage.getItem(LocalStorageKey.tokens)).toBe(JSON.stringify(null));
        expect(localStorage.getItem(LocalStorageKey.user)).toBe(JSON.stringify(null));

        expect(window.location.href).toBe(routePath.login);

        await polly.stop();
      });
    });
  });

  describe('given other API errors', () => {
    it('returns the rejected promise with the given error', async () => {
      const axiosError = buildAxiosError();

      await expect(handleErrorResponse(axiosError)).rejects.toBe(axiosError);
    });
  });

  describe('given other unexpected errors', () => {
    it('returns the rejected promise with the given error', async () => {
      const axiosError = buildAxiosError({ response: undefined });

      await expect(handleErrorResponse(axiosError)).rejects.toBe(axiosError);
    });
  });
});
