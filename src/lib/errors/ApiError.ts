import { AxiosResponse } from 'axios';

class ApiError extends Error {
  status: number;
  headers: { [key: string]: string };
  errors: [{ code: string; detail: string }];

  constructor({ status, headers, data }: AxiosResponse) {
    super();

    this.name = 'ApiError';
    this.status = status;
    this.headers = headers;
    this.errors = data.errors;
  }

  toString = (): string => {
    return this.errors.map(({ detail }) => detail).join(', ');
  };
}

export default ApiError;
