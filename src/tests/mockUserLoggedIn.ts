import { LocalStorageKey } from 'lib/localStorage';

import { buildTokens } from './factories/tokens';
import { buildUser } from './factories/user';

export const mockTokens = buildTokens({
  accessToken: 'access_token_12345',
  refreshToken: 'refresh_token_12345',
});

export const mockUser = buildUser();

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
