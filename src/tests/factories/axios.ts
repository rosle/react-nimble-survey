import { AxiosError, AxiosResponse } from 'axios';

const buildAxiosResponse = (attrs?: Partial<AxiosResponse>): AxiosResponse => {
  return {
    config: {},
    status: 500,
    statusText: '',
    headers: { 'content-type': 'application/json' },
    data: {
      errors: [
        {
          code: 'internal_server_error',
          detail: 'Something went wrong, please try again.',
        },
      ],
    },
    ...attrs,
  };
};

const buildAxiosError = (attrs?: Partial<AxiosError>): AxiosError => {
  return {
    config: {},
    name: 'Error',
    message: 'Request failed',
    isAxiosError: true,
    toJSON: jest.fn(),
    response: buildAxiosResponse(),
    ...attrs,
  };
};

export { buildAxiosResponse, buildAxiosError };
