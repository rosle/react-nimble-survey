import { Tokens } from 'types/tokens';
import { User } from 'types/user';

export const enum LocalStorageKey {
  tokens = 'tokens',
  user = 'user',
}

export type LocalStorageValue<T> = T extends LocalStorageKey.tokens ? Nullable<Tokens> : Nullable<User>;

const getLocalStorageValue = <T extends LocalStorageKey>(key: T): LocalStorageValue<T> => {
  const storedJsonValue = localStorage.getItem(key);

  return storedJsonValue ? JSON.parse(storedJsonValue) : null;
};

const setLocalStorageValue = <T extends LocalStorageKey>(key: T, newValue: LocalStorageValue<T>): void => {
  localStorage.setItem(key, JSON.stringify(newValue));
};

export { getLocalStorageValue, setLocalStorageValue };
