import axios, { Method as HTTPMethod, AxiosRequestConfig, AxiosResponse, AxiosTransformer } from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';

import { getLocalStorageValue, LOCAL_STORAGE_KEY } from 'hooks/useLocalStorage';
import { Tokens } from 'types/tokens';

import ApiError from './errors/ApiError';

export const defaultOptions: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
  responseType: 'json',
  transformRequest: [(data) => decamelizeKeys(data), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), (data) => camelizeKeys(data)],
};

/**
 * The main API access function that comes preconfigured with useful defaults.
 *
 * @param {string} [method] - the HTTP method to use
 * @param {string} [endpoint] - the API endpoint to use
 * @param {Object} [requestOptions] - params and date to be sent
 * @return {Promise} a Promise that will resolve into an object or reject with
 *                   an error object for its reason
 */

const attachAuthorizationHeader = (requestOptions: AxiosRequestConfig) => {
  const tokens = getLocalStorageValue(LOCAL_STORAGE_KEY.tokens);

  if (tokens) {
    requestOptions.headers = {
      ...requestOptions.headers,
      authorization: `Bearer ${(tokens as Tokens).accessToken}`,
    };
  }

  return requestOptions;
};

const requestManager = (method: HTTPMethod, endpoint: string, options: AxiosRequestConfig = {}): Promise<AxiosResponse> => {
  let requestOptions: AxiosRequestConfig = {
    method,
    url: endpoint,
    ...defaultOptions,
    ...options,
  };

  requestOptions = attachAuthorizationHeader(requestOptions);

  return axios
    .request(requestOptions)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch((error) => {
      if (axios.isAxiosError(error) && error.response) {
        throw new ApiError(error.response);
      } else {
        throw error;
      }
    });
};

export default requestManager;
