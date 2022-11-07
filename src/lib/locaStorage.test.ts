import { buildUser } from 'tests/factories/user';

import { getLocalStorageValue, LocalStorageKey, setLocalStorageValue } from './localStorage';

describe('getLocalStorageValue', () => {
  describe('given there is a value in the local storage', () => {
    it('parses JSON to object and returns the value', () => {
      const localStorageKey = LocalStorageKey.user;
      const user = buildUser();

      localStorage.setItem(localStorageKey, JSON.stringify(user));

      const localStorageValue = getLocalStorageValue(localStorageKey);

      expect(localStorageValue).toEqual(user);
    });
  });

  describe('given there is NO value in the local storage', () => {
    it('returns null', () => {
      const localStorageValue = getLocalStorageValue(LocalStorageKey.user);

      expect(localStorageValue).toBeNull();
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
