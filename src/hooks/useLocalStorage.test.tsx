import React from 'react';

import { render, screen } from '@testing-library/react';
import { chain } from 'lodash';

import mockLocalStorage from 'tests/mockLocalStorage';

import useLocalStorage from './useLocalStorage';

describe('useLocalStorage', () => {
  const localStorage = mockLocalStorage();
  const localStorageKey = 'user';
  const localStorageValueListTestIds = {
    list: 'local-storage-value-list',
    listItem: 'local-storage-value-list-item',
  };

  const UseLocalStorageComponent = ({ defaultValue }: { defaultValue?: { [key: string]: string } }) => {
    const [localStorageValue] = useLocalStorage(localStorageKey, defaultValue);

    const valueList = chain(localStorageValue)
      .mapValues((value, key) => <li key={key} data-test-id={localStorageValueListTestIds.listItem}>{`${key}: ${value}`}</li>)
      .values()
      .value();

    return <ul data-test-id={localStorageValueListTestIds.list}>{valueList}</ul>;
  };

  describe('given NO default value', () => {
    it('returns the current local storage value', () => {
      localStorage.setItem(localStorageKey, JSON.stringify({ name: 'John' }));

      render(<UseLocalStorageComponent />);

      const localStorageValueListItems = screen.getAllByTestId(localStorageValueListTestIds.listItem);

      expect(localStorageValueListItems).toHaveLength(1);
      expect(localStorageValueListItems[0]).toHaveTextContent('name: John');
    });

    it('returns the empty object if there is NO value in the local storage', () => {
      render(<UseLocalStorageComponent />);

      const localStorageValueListItems = screen.queryAllByTestId(localStorageValueListTestIds.listItem);

      expect(localStorageValueListItems).toHaveLength(0);
    });
  });

  describe('given a default value', () => {
    it('returns the current local storage value if there is the value in the local storage', () => {
      localStorage.setItem(localStorageKey, JSON.stringify({ name: 'John' }));

      render(<UseLocalStorageComponent defaultValue={{ name: 'Jane' }} />);

      const localStorageValueListItems = screen.getAllByTestId(localStorageValueListTestIds.listItem);

      expect(localStorageValueListItems).toHaveLength(1);
      expect(localStorageValueListItems[0]).toHaveTextContent('name: John');
    });

    it('sets and returns the default value if there is NO value in the local storage', () => {
      render(<UseLocalStorageComponent defaultValue={{ name: 'Jane' }} />);

      const localStorageValueListItems = screen.getAllByTestId(localStorageValueListTestIds.listItem);

      expect(localStorageValueListItems).toHaveLength(1);
      expect(localStorageValueListItems[0]).toHaveTextContent('name: Jane');
    });
  });
});
