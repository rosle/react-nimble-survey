import axios, { Method as HTTPMethod, AxiosRequestConfig, AxiosResponse, AxiosTransformer } from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';

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

const requestManager = (
  method: HTTPMethod,
  endpoint: string,
  customRequestOptions: AxiosRequestConfig = {}
): Promise<AxiosResponse> => {
  const requestOptions: AxiosRequestConfig = {
    method,
    url: endpoint,
    ...defaultOptions,
    ...customRequestOptions,
  };

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
