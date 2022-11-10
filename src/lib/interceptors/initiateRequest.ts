import { AxiosRequestConfig } from 'axios';

import { getLocalStorageValue, LocalStorageKey } from 'lib/localStorage';

import { attachAuthorizationHeader } from './helpers';

const initiateRequest = (config: AxiosRequestConfig) => {
  const tokens = getLocalStorageValue(LocalStorageKey.tokens);

  tokens && attachAuthorizationHeader(config, tokens?.accessToken);

  return config;
};

export default initiateRequest;
