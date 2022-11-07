import { readApiResponseFromFixtures } from 'tests/apiHelpers';
import { Tokens, TokenType } from 'types/tokens';

import JsonApiSerializer from '.';

describe('JsonApiSerializer', () => {
  describe('.deserialize()', () => {
    it('deserializes the token response', () => {
      const redactedTokenResponse = readApiResponseFromFixtures('login_success.json');

      // Mock access and refresh token as it is being redacted in the fixtures.
      const tokenResponse = {
        ...redactedTokenResponse,
        data: {
          ...redactedTokenResponse.data,
          attributes: {
            ...redactedTokenResponse.data.attributes,
            accessToken: '6cmbWFycYr9GK5CZ5gRL0aFKZHkUADstNvty-jMqzrE',
            refreshToken: 'oiL7neqlake97_PEbdYYGX_jKP_R8yv1JdojAQCzWus',
          },
        },
      };

      const expectedToken: Tokens = {
        tokenType: TokenType.Bearer,
        accessToken: '6cmbWFycYr9GK5CZ5gRL0aFKZHkUADstNvty-jMqzrE',
        refreshToken: 'oiL7neqlake97_PEbdYYGX_jKP_R8yv1JdojAQCzWus',
        expiresIn: 7200,
        createdAt: 1661852403,
      };

      expect(JsonApiSerializer.deserialize('token', tokenResponse)).toEqual(expect.objectContaining(expectedToken));
    });
  });
});
