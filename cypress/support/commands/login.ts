import { Tokens, TokenType } from 'types/tokens';
import { User } from 'types/user';

const mockTokens: Tokens = {
  tokenType: TokenType.Bearer,
  accessToken: 'access_token_12345',
  refreshToken: 'refresh_token_12345',
  createdAt: 1661852403,
  expiresIn: 7200,
};

const mockUser: User = {
  email: 'rossukhon@nimblehq.co',
  name: 'Ros',
  avatarUrl: 'https://secure.gravatar.com/avatar/252876a66bc74a8d0a8ec1ebb3dd991c',
};

const login = (user: User = mockUser, tokens: Tokens = mockTokens) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('tokens', JSON.stringify(tokens));
};

Cypress.Commands.add('login', login);
