import { useEffect, useState } from 'react';

export const LOCAL_STORAGE_KEY = {
  tokens: 'tokens',
  user: 'user',
};

export type LocalStorageValue = object | null;

export const getLocalStorageValue = (key: string) => {
  const storedJsonValue = localStorage.getItem(key);

  return storedJsonValue ? JSON.parse(storedJsonValue) : null;
};

const useLocalStorage = (key: string, defaultValue: LocalStorageValue = null) => {
  const [value, setValue] = useState(() => {
    const initialValue = getLocalStorageValue(key);

    return initialValue || defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
