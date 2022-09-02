import React from 'react';

import useLocalStorage, { STORAGE_KEYS } from 'hooks/useLocalStorage';
import { Tokens } from 'types/data';

type UserContextProviderProps = {
  children: React.ReactNode;
};

// TODO: Update tokens to user
type UserContextContent = {
  user: Tokens | null;
  setUser: (user: Tokens) => void;
};

const UserContext = React.createContext<UserContextContent>({
  user: null,
  setUser: (user) => user,
});

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useLocalStorage(STORAGE_KEYS.tokens);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
