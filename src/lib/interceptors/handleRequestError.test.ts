import { LocalStorageKey } from 'lib/localStorage';
import routePath from 'routes/routePath';
import { buildAxiosError, buildAxiosResponse } from 'tests/factories/axios';
import { mockUserLoggedIn } from 'tests/mockUserLoggedIn';

import handleRequestError from './handleRequestError';

describe('handleRequestError', () => {
  describe('given the `invalid_token` API error', () => {
    mockUserLoggedIn();

    it('logs the user out, redirects to the Login page and returns the rejected promise with the given error', async () => {
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

      const axiosError = buildAxiosError({ response: axiosResponse });

      await expect(handleRequestError(axiosError)).rejects.toBe(axiosError);

      expect(localStorage.getItem(LocalStorageKey.tokens)).toBe(JSON.stringify(null));
      expect(localStorage.getItem(LocalStorageKey.user)).toBe(JSON.stringify(null));

      expect(window.location.href).toBe(routePath.login);
    });
  });

  describe('given the other API errors', () => {
    it('returns the rejected promise with the given error', async () => {
      const axiosError = buildAxiosError();

      await expect(handleRequestError(axiosError)).rejects.toBe(axiosError);
    });
  });

  describe('given the other unexpected errors', () => {
    it('returns the rejected promise with the given error', async () => {
      const axiosError = buildAxiosError({ response: undefined });

      await expect(handleRequestError(axiosError)).rejects.toBe(axiosError);
    });
  });
});
