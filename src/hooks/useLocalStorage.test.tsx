import React from 'react';

import { render, screen } from '@testing-library/react';
import { chain } from 'lodash';

import { mockLocalStorage } from 'tests/mockLocalStorage';

import useLocalStorage, { LOCAL_STORAGE_KEY } from './useLocalStorage';

describe('useLocalStorage', () => {
  const mockedLocalStorage = mockLocalStorage();
  const localStorageKey = LOCAL_STORAGE_KEY.user;
  const localStorageValueListItemTestIds = 'local-storage-value-list-item';

  const UseLocalStorageComponent = ({ defaultValue }: { defaultValue?: { [key: string]: string } }) => {
    const [localStorageValue] = useLocalStorage(localStorageKey, defaultValue);

    const valueList = chain(localStorageValue)
      .mapValues((value, key) => <li key={key} data-test-id={localStorageValueListItemTestIds}>{`${key}: ${value}`}</li>)
      .values()
      .value();

    return <ul>{valueList}</ul>;
  };

  describe('given NO default value', () => {
    it('returns the current local storage value', () => {
      mockedLocalStorage.setItem(localStorageKey, JSON.stringify({ name: 'John' }));

      render(<UseLocalStorageComponent />);

      const localStorageValueListItems = screen.getAllByTestId(localStorageValueListItemTestIds);

      expect(localStorageValueListItems).toHaveLength(1);
      expect(localStorageValueListItems[0]).toHaveTextContent('name: John');
    });

    it('returns the empty object if there is NO value in the local storage', () => {
      render(<UseLocalStorageComponent />);

      const localStorageValueListItems = screen.queryAllByTestId(localStorageValueListItemTestIds);

      expect(localStorageValueListItems).toHaveLength(0);
    });
  });

  describe('given a default value', () => {
    it('returns the current local storage value if there is the value in the local storage', () => {
      mockedLocalStorage.setItem(localStorageKey, JSON.stringify({ name: 'John' }));

      render(<UseLocalStorageComponent defaultValue={{ name: 'Jane' }} />);

      const localStorageValueListItems = screen.getAllByTestId(localStorageValueListItemTestIds);

      expect(localStorageValueListItems).toHaveLength(1);
      expect(localStorageValueListItems[0]).toHaveTextContent('name: John');
    });

    it('sets and returns the default value if there is NO value in the local storage', () => {
      render(<UseLocalStorageComponent defaultValue={{ name: 'Jane' }} />);

      const localStorageValueListItems = screen.getAllByTestId(localStorageValueListItemTestIds);

      expect(localStorageValueListItems).toHaveLength(1);
      expect(localStorageValueListItems[0]).toHaveTextContent('name: Jane');
    });
  });
});
