import { LocalStorageKey } from 'lib/localStorage';
import { Tokens, TokenType } from 'types/tokens';
import { User } from 'types/user';

export const mockTokens: Tokens = {
  tokenType: TokenType.Bearer,
  accessToken: 'access_token_12345',
  refreshToken: 'refresh_token_12345',
  createdAt: 1661852403,
  expiresIn: 7200,
};

export const mockUser: User = {
  email: 'rossukhon@nimblehq.co',
  name: 'Ros',
  avatarUrl: 'https://secure.gravatar.com/avatar/252876a66bc74a8d0a8ec1ebb3dd991c',
};

const mockTokensLoggedIn = () => {
  beforeEach(() => {
    localStorage.setItem(LocalStorageKey.tokens, JSON.stringify(mockTokens));
  });

  return { tokens: mockTokens };
};

const mockUserLoggedIn = () => {
  beforeEach(() => {
    localStorage.setItem(LocalStorageKey.tokens, JSON.stringify(mockTokens));
    localStorage.setItem(LocalStorageKey.user, JSON.stringify(mockUser));
  });

  return { mockTokens, mockUser };
};

export { mockTokensLoggedIn, mockUserLoggedIn };
