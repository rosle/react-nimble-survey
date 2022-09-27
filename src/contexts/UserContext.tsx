import React from 'react';

import useLocalStorage from 'hooks/useLocalStorage';
import { LocalStorageKey } from 'lib/localStorage';
import { Tokens } from 'types/tokens';
import { User } from 'types/user';

type UserContextProviderProps = {
  children: React.ReactNode;
};

type UserContextContent = {
  tokens: Nullable<Tokens>;
  setTokens: (token: Nullable<Tokens>) => void;
  user: Nullable<User>;
  setUser: (user: Nullable<User>) => void;
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
  const [tokens, setTokens] = useLocalStorage(LocalStorageKey.tokens);
  const [user, setUser] = useLocalStorage(LocalStorageKey.user);

  return <UserContext.Provider value={{ tokens, setTokens, user, setUser }}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
