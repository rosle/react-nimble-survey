import axios from 'axios';

import ApiError from 'lib/errors/ApiError';
import { LocalStorageKey, setLocalStorageValue } from 'lib/localStorage';
import routePath from 'routes/routePath';

const handleRequestError = (error: unknown) => {
  if (!axios.isAxiosError(error) || !error.response) {
    return Promise.reject(error);
  }

  const apiError = new ApiError(error.response);

  if (isInvalidTokenError(apiError)) {
    console.info('API TOKEN EXPIRED');
    setLocalStorageValue(LocalStorageKey.tokens, null);
    setLocalStorageValue(LocalStorageKey.user, null);

    window.location.href = routePath.login;
  }

  return Promise.reject(error);
};

const isInvalidTokenError = (apiError: ApiError) => {
  return apiError.status === 401 && apiError.errors[0].code === 'invalid_token';
};

export default handleRequestError;
