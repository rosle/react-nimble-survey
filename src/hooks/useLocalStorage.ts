import React, { useState } from 'react';

import { Tokens } from 'types/tokens';
import { User } from 'types/user';

export const enum LocalStorageKey {
  tokens = 'tokens',
  user = 'user',
}

export type LocalStorageValue<T> = T extends LocalStorageKey.tokens ? Nullable<Tokens> : Nullable<User>;

export const getLocalStorageValue = <T extends LocalStorageKey>(key: T): LocalStorageValue<T> => {
  const storedJsonValue = localStorage.getItem(key);

  return storedJsonValue ? JSON.parse(storedJsonValue) : null;
};

const useLocalStorage = <T extends LocalStorageKey>(
  key: T,
  defaultValue: LocalStorageValue<T> = null as LocalStorageValue<T>
): [LocalStorageValue<T>, React.Dispatch<LocalStorageValue<T>>] => {
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
