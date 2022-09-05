import axios, { AxiosError, AxiosResponse, AxiosTransformer } from 'axios';

import mockUserLoggedIn from 'tests/mockUserLoggedIn';

import ApiError from './errors/ApiError';
import requestManager, { defaultOptions } from './requestManager';

jest.mock('axios');

describe('requestManager', () => {
  const endPoint = 'https://sample-endpoint.com/api/';

  it('fetches successfully data from an API', async () => {
    const responseData = {
      data: [
        { id: 1, value: 'first object' },
        { id: 2, value: 'second object' },
      ],
    };

    const requestSpy = jest.spyOn(axios, 'request').mockImplementation(() => Promise.resolve(responseData));

    await expect(requestManager('POST', endPoint)).resolves.toEqual(responseData.data);

    requestSpy.mockRestore();
  });

  it('fetches the provided endpoint', async () => {
    const requestOptions = { ...defaultOptions, method: 'POST', url: endPoint };

    const requestSpy = jest.spyOn(axios, 'request').mockImplementation(() => Promise.resolve({}));

    await requestManager('POST', endPoint);

    expect(axios.request).toHaveBeenCalledWith(requestOptions);

    requestSpy.mockRestore();
  });

  describe('given the tokens exists', () => {
    const { tokens } = mockUserLoggedIn();

    it('attaches authorization headers', async () => {
      const requestOptions = { ...defaultOptions, method: 'POST', url: endPoint };

      const requestSpy = jest.spyOn(axios, 'request').mockImplementation(() => Promise.resolve({}));

      await requestManager('POST', endPoint);

      expect(axios.request).toHaveBeenCalledWith({
        ...requestOptions,
        headers: {
          authorization: `Bearer ${tokens.accessToken}`,
        },
      });

      requestSpy.mockRestore();
    });
  });

  describe('given the API responds with error status', () => {
    it('throws an ApiError containing the response', async () => {
      const axiosResponse: AxiosResponse = {
        config: {},
        status: 400,
        statusText: '',
        headers: { 'content-type': 'application/json' },
        data: {
          errors: [
            {
              code: 'invalid_email_or_password',
              detail: 'Your email or password is incorrect. Please try again.',
            },
          ],
        },
      };

      const axiosError: AxiosError = {
        config: {},
        name: 'Error',
        message: 'Request failed with status code 400',
        isAxiosError: true,
        toJSON: jest.fn(),
        response: axiosResponse,
      };

      const requestSpy = jest.spyOn(axios, 'request').mockImplementation(() => Promise.reject(axiosError));
      const isAxiosErrorSpy = jest.spyOn(axios, 'isAxiosError').mockReturnValueOnce(true);

      await expect(requestManager('POST', endPoint)).rejects.toThrow(new ApiError(axiosResponse));

      requestSpy.mockRestore();
      isAxiosErrorSpy.mockRestore();
    });
  });

  describe('given other unexpected errors', () => {
    it('throws the given error', async () => {
      const error = new Error('Network Error');

      const requestSpy = jest.spyOn(axios, 'request').mockImplementation(() => Promise.reject(error));

      await expect(requestManager('POST', endPoint)).rejects.toThrow(error);

      requestSpy.mockRestore();
    });
  });

  describe('transformRequest', () => {
    it('decamelizes the keys of the object in the body', () => {
      const transformRequest = defaultOptions.transformRequest as AxiosTransformer[];

      const requestBody = {
        data: {
          clientId: 'client_id_001',
          clientSecret: 'client_secret_001',
        },
      };

      /* eslint-disable camelcase */
      expect(transformRequest[0](requestBody)).toEqual({
        data: {
          client_id: 'client_id_001',
          client_secret: 'client_secret_001',
        },
      });
      /* eslint-enable */
    });
  });

  describe('transformResponse', () => {
    it('camelizes the keys of the object in the body', () => {
      const transformResponse = defaultOptions.transformResponse as AxiosTransformer[];

      /* eslint-disable camelcase */
      const responseBody = {
        data: [
          { id: 1, first_name: 'John' },
          { id: 2, first_name: 'Jane' },
        ],
      };
      /* eslint-enable */

      expect(transformResponse[0](responseBody)).toEqual({
        data: [
          { id: 1, firstName: 'John' },
          { id: 2, firstName: 'Jane' },
        ],
      });
    });
  });
});
