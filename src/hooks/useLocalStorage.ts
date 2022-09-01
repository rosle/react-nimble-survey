import { useEffect, useState } from 'react';

export const STORAGE_KEYS = {
  tokens: 'tokens',
  user: 'user',
};

const useLocalStorage = (key: string, defaultValue: object = {}) => {
  const [value, setValue] = useState(() => {
    const storedJsonValue = localStorage.getItem(key);
    const initialValue = storedJsonValue ? JSON.parse(storedJsonValue) : null;
    return initialValue || defaultValue;
  });

  console.log(key);
  console.log(value);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export default useLocalStorage;
