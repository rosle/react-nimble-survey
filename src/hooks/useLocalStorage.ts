import { useState } from 'react';

import { Tokens } from 'types/tokens';
import { User } from 'types/user';

export const enum LocalStorageKey {
  tokens = 'tokens',
  user = 'user',
}

export type LocalStorageValue<T> = T extends LocalStorageKey.tokens
  ? Tokens | null
  : T extends LocalStorageKey.user
  ? User | null
  : any;

export const getLocalStorageValue = <T extends LocalStorageKey>(key: T): LocalStorageValue<T> => {
  const storedJsonValue = localStorage.getItem(key);

  return storedJsonValue ? JSON.parse(storedJsonValue) : null;
};

const useLocalStorage = <T>(key: LocalStorageKey, defaultValue?: LocalStorageValue<T>) => {
  const [value, setStateValue] = useState(() => {
    const initialValue = getLocalStorageValue(key);

    return initialValue || defaultValue;
  });

  const setValue = (newValue: LocalStorageValue<T>) => {
    localStorage.setItem(key, JSON.stringify(newValue));
    setStateValue(newValue);
  };

  return [value, setValue];
};

export default useLocalStorage;
