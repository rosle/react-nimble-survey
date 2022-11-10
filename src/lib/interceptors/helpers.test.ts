import { defaultOptions } from 'lib/requestManager';

import { attachAuthorizationHeader } from './helpers';

describe('attachAuthorizationHeader', () => {
  it('attaches the authorization header to the given config', () => {
    const accessToken = 'access_token_12345';
    const axiosRequestConfig = { ...defaultOptions, headers: undefined };

    const attachedHeaderConfig = attachAuthorizationHeader(axiosRequestConfig, accessToken);

    expect(attachedHeaderConfig.headers).toEqual({
      authorization: `Bearer ${accessToken}`,
    });
  });
});
