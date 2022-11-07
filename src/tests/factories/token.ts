import { Tokens, TokenType } from 'types/tokens';

const buildTokens = (attrs?: Partial<Tokens>): Tokens => {
  return {
    tokenType: TokenType.Bearer,
    accessToken: 'access_token_12345',
    refreshToken: 'refresh_token_12345',
    createdAt: 1661852403,
    expiresIn: 7200,
    ...attrs,
  };
};

export { buildTokens };
