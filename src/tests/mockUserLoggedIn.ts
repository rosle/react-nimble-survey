import { LOCAL_STORAGE_KEYS } from 'hooks/useLocalStorage';
import { Tokens, User } from 'types/data';

import mockLocalStorage from './mockLocalStorage';

const mockUserLoggedIn = () => {
  const localStorage = mockLocalStorage();

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

  localStorage.setItem(LOCAL_STORAGE_KEYS.tokens, JSON.stringify(tokens));
  localStorage.setItem(LOCAL_STORAGE_KEYS.user, JSON.stringify(user));

  return { user, tokens };
};

export default mockUserLoggedIn;
