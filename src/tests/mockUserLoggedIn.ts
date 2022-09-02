import { STORAGE_KEYS } from 'hooks/useLocalStorage';
import { Tokens } from 'types/data';

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
  localStorage.setItem(STORAGE_KEYS.tokens, JSON.stringify(tokens));
};

export default mockUserLoggedIn;
