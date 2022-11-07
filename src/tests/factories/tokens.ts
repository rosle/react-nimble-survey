import { faker } from '@faker-js/faker';

import { Tokens, TokenType } from 'types/tokens';

const buildTokens = (attrs?: Partial<Tokens>): Tokens => {
  return {
    tokenType: TokenType.Bearer,
    accessToken: `access_token_${faker.datatype.number()}`,
    refreshToken: `refresh_token_${faker.datatype.number()}`,
    createdAt: 1661852403,
    expiresIn: 7200,
    ...attrs,
  };
};

export { buildTokens };
