import React from 'react';

import useLocalStorage, { LOCAL_STORAGE_KEY } from 'hooks/useLocalStorage';
import { Tokens } from 'types/tokens';
import { User } from 'types/user';

type UserContextProviderProps = {
  children: React.ReactNode;
};

type UserContextContent = {
  tokens: Tokens | null;
  setTokens: (token: Tokens) => void;
  user: User | null;
  setUser: (user: User) => void;
};

/* istanbul ignore next */
const UserContext = React.createContext<UserContextContent>({
  tokens: null,
  setTokens: () => {
    // Do nothing for default set tokens.
  },
  user: null,
  setUser: () => {
    // Do nothing for default set user.
  },
});

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [tokens, setTokens] = useLocalStorage(LOCAL_STORAGE_KEY.tokens);
  const [user, setUser] = useLocalStorage(LOCAL_STORAGE_KEY.user);

  return <UserContext.Provider value={{ tokens, setTokens, user, setUser }}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
