import React, { useContext } from 'react';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { getLocalStorageValue, LocalStorageKey } from 'hooks/useLocalStorage';
import { mockUserLoggedIn } from 'tests/mockUserLoggedIn';
import { TokenType } from 'types/tokens';

import { UserContext, UserContextProvider } from './UserContext';

const userContextConsumerTestIds = {
  tokens: 'tokens',
  setTokenButton: 'set-tokens',
  user: 'user',
  setUserButton: 'set-user',
};

const newTokens = {
  tokenType: TokenType.Bearer,
  accessToken: 'new_access_token_12345',
  refreshToken: 'new_refresh_token_12345',
  createdAt: 1661852403,
  expiresIn: 7200,
};

const newUser = {
  email: 'new_user@nimblehq.co',
  name: 'Newcomer',
  avatarUrl: 'https://secure.gravatar.com/avatar/252876a66bc74a8d0a8ec1ebb3dd991c',
};

const UserContextConsumer = () => {
  const { tokens, setTokens, user, setUser } = useContext(UserContext);

  return (
    <>
      {tokens && <div data-test-id={userContextConsumerTestIds.tokens}>{tokens.accessToken}</div>}
      {user && <div data-test-id={userContextConsumerTestIds.user}>{user.email}</div>}

      <button data-test-id={userContextConsumerTestIds.setTokenButton} onClick={() => setTokens(newTokens)} />
      <button data-test-id={userContextConsumerTestIds.setUserButton} onClick={() => setUser(newUser)} />
    </>
  );
};

describe('UserContextProvider', () => {
  it('provides the setTokens function to set the value to the local storage', async () => {
    render(
      <UserContextProvider>
        <UserContextConsumer />
      </UserContextProvider>
    );

    expect(getLocalStorageValue(LocalStorageKey.tokens)).toBeNull();

    const setTokenButton = screen.getByTestId(userContextConsumerTestIds.setTokenButton);

    userEvent.click(setTokenButton);

    const tokenContent = await screen.findByTestId(userContextConsumerTestIds.tokens);

    expect(getLocalStorageValue(LocalStorageKey.tokens)).toEqual(newTokens);
    expect(tokenContent).toHaveTextContent(newTokens.accessToken);
  });

  it('provides the setUser function to set the value to the local storage', async () => {
    render(
      <UserContextProvider>
        <UserContextConsumer />
      </UserContextProvider>
    );

    expect(getLocalStorageValue(LocalStorageKey.user)).toBeNull();

    const setUserButton = screen.getByTestId(userContextConsumerTestIds.setUserButton);

    userEvent.click(setUserButton);

    const userContent = await screen.findByTestId(userContextConsumerTestIds.user);

    expect(getLocalStorageValue(LocalStorageKey.user)).toEqual(newUser);
    expect(userContent).toHaveTextContent(newUser.email);
  });

  describe('given the user has logged in', () => {
    const { tokens, user } = mockUserLoggedIn();

    it('provides the tokens from the local storage', async () => {
      render(
        <UserContextProvider>
          <UserContextConsumer />
        </UserContextProvider>
      );

      const tokenContent = await screen.findByTestId(userContextConsumerTestIds.tokens);

      expect(tokenContent).toHaveTextContent(tokens.accessToken);
    });

    it('provides the user from the local storage', async () => {
      render(
        <UserContextProvider>
          <UserContextConsumer />
        </UserContextProvider>
      );

      const userContent = await screen.findByTestId(userContextConsumerTestIds.user);

      expect(userContent).toHaveTextContent(user.email);
    });
  });

  describe('given the user has NOT logged in', () => {
    it('provides the NULL tokens', async () => {
      render(
        <UserContextProvider>
          <UserContextConsumer />
        </UserContextProvider>
      );

      const tokenContent = screen.queryByTestId(userContextConsumerTestIds.tokens);

      expect(tokenContent).not.toBeInTheDocument();
    });

    it('provides the NULL user', async () => {
      render(
        <UserContextProvider>
          <UserContextConsumer />
        </UserContextProvider>
      );

      const userContent = screen.queryByTestId(userContextConsumerTestIds.user);

      expect(userContent).not.toBeInTheDocument();
    });
  });
});
