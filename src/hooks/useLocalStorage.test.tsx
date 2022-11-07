import React from 'react';

import { render, screen } from '@testing-library/react';
import { chain } from 'lodash';

import { LocalStorageKey, LocalStorageValue } from 'lib/localStorage';
import { User } from 'types/user';

import useLocalStorage from './useLocalStorage';

const localStorageKey = LocalStorageKey.user;
const localStorageValueListItemTestIds = 'local-storage-value-list-item';

const UseLocalStorageComponent = ({ defaultValue }: { defaultValue?: LocalStorageValue<User> }) => {
  const [localStorageValue] = useLocalStorage(localStorageKey, defaultValue);

  const valueList = chain(localStorageValue)
    .mapValues((value, key) => <li key={key} data-test-id={localStorageValueListItemTestIds}>{`${key}: ${value}`}</li>)
    .values()
    .value();

  return <ul>{valueList}</ul>;
};

describe('useLocalStorage', () => {
  describe('given NO default value', () => {
    describe('given a value in the local storage', () => {
      it('returns the current local storage value', () => {
        localStorage.setItem(localStorageKey, JSON.stringify({ name: 'John' }));

        render(<UseLocalStorageComponent />);

        const localStorageValueListItems = screen.getAllByTestId(localStorageValueListItemTestIds);

        expect(localStorageValueListItems).toHaveLength(1);
        expect(localStorageValueListItems[0]).toHaveTextContent('name: John');
      });
    });

    describe('given NO value in the local storage', () => {
      it('returns the empty object', () => {
        render(<UseLocalStorageComponent />);

        const localStorageValueListItems = screen.queryAllByTestId(localStorageValueListItemTestIds);

        expect(localStorageValueListItems).toHaveLength(0);
      });
    });
  });

  describe('given a default value', () => {
    describe('given a value in the local storage', () => {
      it('returns the current local storage value', () => {
        localStorage.setItem(localStorageKey, JSON.stringify({ name: 'John' }));

        const defaultValue = {
          id: '1',
          name: 'Jane',
          email: 'jane.doe@mail.com',
          avatarUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLH/avatar/315.jpg',
        };

        render(<UseLocalStorageComponent defaultValue={defaultValue} />);

        const localStorageValueListItems = screen.getAllByTestId(localStorageValueListItemTestIds);

        expect(localStorageValueListItems).toHaveLength(1);
        expect(localStorageValueListItems[0]).toHaveTextContent('name: John');
      });
    });

    describe('given NO value in the local storage', () => {
      it('sets and returns the default value', () => {
        const defaultValue = {
          id: '1',
          name: 'Jane',
          email: 'jane.doe@mail.com',
          avatarUrl: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLH/avatar/315.jpg',
        };

        render(<UseLocalStorageComponent defaultValue={defaultValue} />);

        const localStorageValueListItems = screen.getAllByTestId(localStorageValueListItemTestIds);

        expect(localStorageValueListItems).toHaveLength(4);
        expect(localStorageValueListItems[1]).toHaveTextContent('name: Jane');
      });
    });
  });
});
