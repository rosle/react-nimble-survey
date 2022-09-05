import React from 'react';

import useLocalStorage, { LOCAL_STORAGE_KEYS } from 'hooks/useLocalStorage';
import { Tokens, User } from 'types/data';

type UserContextProviderProps = {
  children: React.ReactNode;
};

type UserContextContent = {
  tokens: Tokens | null;
  setTokens: (token: Tokens) => void;
  user: User | null;
  setUser: (user: User) => void;
};

const UserContext = React.createContext<UserContextContent>({
  tokens: null,
  setTokens: (_tokens) => {
    // do nothing
  },
  user: null,
  setUser: (_user) => {
    // do nothing
  },
});

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [tokens, setTokens] = useLocalStorage(LOCAL_STORAGE_KEYS.tokens);
  const [user, setUser] = useLocalStorage(LOCAL_STORAGE_KEYS.user);

  return <UserContext.Provider value={{ tokens, setTokens, user, setUser }}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
