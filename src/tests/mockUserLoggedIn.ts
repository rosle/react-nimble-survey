import { LOCAL_STORAGE_KEY } from 'hooks/useLocalStorage';
import { Tokens } from 'types/tokens';
import { User } from 'types/user';

import { mockLocalStorage } from './mockLocalStorage';

const mockUserLoggedIn = () => {
  const mockedLocalStorage = mockLocalStorage();

  const tokens: Tokens = {
    tokenType: 'Bearer',
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
    mockedLocalStorage.setItem(LOCAL_STORAGE_KEY.tokens, JSON.stringify(tokens));
    mockedLocalStorage.setItem(LOCAL_STORAGE_KEY.user, JSON.stringify(user));
  });

  return { user, tokens };
};

export { mockUserLoggedIn };
