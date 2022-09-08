import { LocalStorageKey } from 'hooks/useLocalStorage';
import { Tokens, TokenType } from 'types/tokens';
import { User } from 'types/user';

const mockUserLoggedIn = () => {
  const tokens: Tokens = {
    tokenType: TokenType.Bearer,
    accessToken: 'access_token_12345',
    refreshToken: 'refresh_token_12345',
    createdAt: 1661852403,
    expiresIn: 7200,
  };

  const user: User = {
    email: 'rossukhon@nimblehq.co',
    name: 'Ros',
    avatarUrl: 'https://secure.gravatar.com/avatar/252876a66bc74a8d0a8ec1ebb3dd991c',
  };

  beforeEach(() => {
    localStorage.setItem(LocalStorageKey.tokens, JSON.stringify(tokens));
    localStorage.setItem(LocalStorageKey.user, JSON.stringify(user));
  });

  return { user, tokens };
};

export { mockUserLoggedIn };