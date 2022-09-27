import { buildUser } from 'tests/factories/user';

import { getLocalStorageValue, LocalStorageKey, setLocalStorageValue } from './localStorage';

describe('getLocalStorageValue', () => {
  describe('given there is a value in the local storage', () => {
    it('parses JSON to object and returns the value', () => {
      const localStorageKey = LocalStorageKey.user;
      const user = buildUser();

      localStorage.setItem(localStorageKey, JSON.stringify(user));

      expect(getLocalStorageValue(localStorageKey)).toEqual(user);
    });
  });

  describe('given there is NO value in the local storage', () => {
    it('returns null', () => {
      expect(getLocalStorageValue(LocalStorageKey.user)).toBeNull();
    });
  });
});

describe('setLocalStorageValue', () => {
  it('sets the given value as a JSON to the local storage', () => {
    const localStorageKey = LocalStorageKey.user;
    const user = buildUser();

    setLocalStorageValue(localStorageKey, user);

    expect(localStorage.getItem(localStorageKey)).toBe(JSON.stringify(user));
  });
});
