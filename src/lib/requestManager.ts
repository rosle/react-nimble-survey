import axios, { Method as HTTPMethod, AxiosRequestConfig, AxiosResponse, AxiosTransformer } from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { JSONAPIDocument, Meta } from 'json-api-serializer';

import JsonApiSerializer from 'lib/jsonApiSerializer';

import ApiError from './errors/ApiError';
import handleErrorResponse from './interceptors/handleErrorResponse';
import initiateRequest from './interceptors/initiateRequest';

interface response<T = unknown> {
  data: T;
  meta?: Meta;
}

export const defaultOptions: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_API_BASE_URL,
  responseType: 'json',
  transformRequest: [(data) => decamelizeKeys(data), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), (data) => camelizeKeys(data)],
};

axios.interceptors.request.use(
  (config) => initiateRequest(config),
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (config) => config,
  (error) => handleErrorResponse(error)
);

/**
 * The main API access function that comes preconfigured with useful defaults.
 *
 * @param {string} [method] - the HTTP method to use
 * @param {string} [endpoint] - the API endpoint to use
 * @param {Object} [requestOptions] - params and date to be sent
 * @return {Promise} a Promise that will resolve into an object or reject with
 *                   an error object for its reason
 */

const getJsonResponseType = (apiResponse: JSONAPIDocument) => {
  const responseData = apiResponse?.data;

  if (responseData === undefined) return undefined;

  if (Array.isArray(responseData) && responseData.length === 0) {
    return undefined;
  } else if (Array.isArray(responseData)) {
    return responseData[0].type;
  } else {
    return responseData.type;
  }
};

const requestManager = <T = unknown>(
  method: HTTPMethod,
  endpoint: string,
  options: AxiosRequestConfig = {}
): Promise<response<T>> => {
  const requestOptions: AxiosRequestConfig = {
    method,
    url: endpoint,
    ...defaultOptions,
    ...options,
  };

  return axios
    .request(requestOptions)
    .then((response: AxiosResponse) => {
      const apiResponse = response.data;
      const apiResponseType = getJsonResponseType(apiResponse);

      if (apiResponseType === undefined) return apiResponse;

      return {
        ...apiResponse,
        data: JsonApiSerializer.deserialize(apiResponseType, apiResponse) as T,
      };
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
