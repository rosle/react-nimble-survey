import axios, { AxiosRequestConfig } from 'axios';

import AuthAdapter from 'adapters/Auth';
import ApiError from 'lib/errors/ApiError';
import { getLocalStorageValue, LocalStorageKey, setLocalStorageValue } from 'lib/localStorage';
import routePath from 'routes/routePath';

import { attachAuthorizationHeader } from './helpers';

type ExtendedAxiosConfig = AxiosRequestConfig & {
  _refreshToken: boolean;
};

const handleErrorResponse = async (error: unknown) => {
  if (!axios.isAxiosError(error) || !error.response) {
    return Promise.reject(error);
  }

  const apiError = new ApiError(error.response);
  const originalRequest = error.config as ExtendedAxiosConfig;

  // TODO: Recheck token expired error response
  if (isInvalidTokenError(apiError)) {
    try {
      const tokens = await refreshToken();

      attachAuthorizationHeader(originalRequest, tokens.accessToken);

      return axios(originalRequest);
    } catch (_error) {
      setLocalStorageValue(LocalStorageKey.tokens, null);
      setLocalStorageValue(LocalStorageKey.user, null);

      window.location.href = routePath.login;
    }
  }

  return Promise.reject(error);
};

const isInvalidTokenError = (apiError: ApiError) => {
  return apiError.status === 401 && apiError.errors[0].code === 'invalid_token';
};

const refreshToken = async () => {
  const tokens = getLocalStorageValue(LocalStorageKey.tokens);

  if (tokens === null) throw new Error('No tokens in the current session');

  const { data: newTokens } = await AuthAdapter.refreshToken({ refreshToken: tokens?.refreshToken });

  setLocalStorageValue(LocalStorageKey.tokens, newTokens);

  return newTokens;
};

export default handleErrorResponse;
