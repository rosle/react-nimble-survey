import React, { useState } from 'react';

import { LocalStorageKey, LocalStorageValue, getLocalStorageValue, setLocalStorageValue } from 'lib/localStorage';

const useLocalStorage = <T extends LocalStorageKey>(
  key: T,
  defaultValue: LocalStorageValue<T> = null as LocalStorageValue<T>
): [LocalStorageValue<T>, React.Dispatch<LocalStorageValue<T>>] => {
  const [value, setStateValue] = useState(() => {
    return getLocalStorageValue(key) || defaultValue;
  });

  const setValue = (newValue: LocalStorageValue<T>) => {
    setLocalStorageValue(key, newValue);
    setStateValue(newValue);
  };

  return [value, setValue];
};

export default useLocalStorage;
