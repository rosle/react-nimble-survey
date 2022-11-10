import { AxiosRequestConfig } from 'axios';

const attachAuthorizationHeader = (config: AxiosRequestConfig, accessToken: string) => {
  config.headers = { ...config.headers, authorization: `Bearer ${accessToken}` };

  return config;
};

export { attachAuthorizationHeader };
