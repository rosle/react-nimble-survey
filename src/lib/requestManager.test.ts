import axios, { AxiosTransformer } from 'axios';

import { buildAxiosError, buildAxiosResponse } from 'tests/factories/axios';
import { mockTokensLoggedIn } from 'tests/mockUserLoggedIn';
import { User } from 'types/user';

import ApiError from './errors/ApiError';
import requestManager, { defaultOptions } from './requestManager';

jest.mock('axios');

describe('requestManager', () => {
  const endPoint = 'https://sample-endpoint.com/api/';

  it('fetches the provided endpoint', async () => {
    const requestOptions = { ...defaultOptions, method: 'POST', url: endPoint };

    const axiosResponse = buildAxiosResponse({status: 200, data: {}})
    const requestSpy = jest.spyOn(axios, 'request').mockImplementation(() => Promise.resolve(axiosResponse));

    await requestManager('POST', endPoint);

    expect(axios.request).toHaveBeenCalledWith(requestOptions);

    requestSpy.mockRestore();
  });

  describe('given the tokens exists', () => {
    const { tokens } = mockTokensLoggedIn();

    it('attaches the authorization header', async () => {
      const requestOptions = { ...defaultOptions, method: 'POST', url: endPoint };

      const axiosResponse = buildAxiosResponse({status: 200, data: {}})
      const requestSpy = jest.spyOn(axios, 'request').mockImplementation(() => Promise.resolve(axiosResponse));

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

  describe('given the API responds with success status', () => {
    it('returns the API response', async () => {
      const apiResponse = {
        meta: {
          message: 'You will receive a password recovery link at your email address in a few minutes.',
        },
      };

      const axiosResponse = buildAxiosResponse({status: 200, data: apiResponse})
      const requestSpy = jest.spyOn(axios, 'request').mockImplementation(() => Promise.resolve(axiosResponse));

      await expect(requestManager('POST', endPoint)).resolves.toEqual(apiResponse);

      requestSpy.mockRestore();
    });

    describe('given a specific typed response', () => {
      it('returns the deserialized API response in the given type', async () => {
        const apiResponse = {
          data: {
            id: '1',
            type: 'user',
            attributes: {
              email: 'dev@nimblehq.co',
              name: 'Team Nimble',
              avatarUrl: 'https://secure.gravatar.com/avatar/6733d09432e89459dba795de8312ac2d',
            },
          },
        };

        const expectedDeserializedResponse = {
          data: {
            id: '1',
            email: 'dev@nimblehq.co',
            name: 'Team Nimble',
            avatarUrl: 'https://secure.gravatar.com/avatar/6733d09432e89459dba795de8312ac2d',
          } as User,
        };

        const axiosResponse = buildAxiosResponse({status: 200, data: apiResponse})
        const requestSpy = jest.spyOn(axios, 'request').mockImplementation(() => Promise.resolve(axiosResponse));

        await expect(requestManager<User>('POST', endPoint)).resolves.toEqual(expectedDeserializedResponse);

        requestSpy.mockRestore();
      });
    });
  });

  describe('given the API responds with error status', () => {
    it('throws an ApiError containing the response', async () => {
      const axiosResponse = buildAxiosResponse({
        status: 400,
        data: {
          errors: [
            {
              code: 'invalid_email_or_password',
              detail: 'Your email or password is incorrect. Please try again.',
            },
          ],
        },
      });

      const axiosError = buildAxiosError({ response: axiosResponse });

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
