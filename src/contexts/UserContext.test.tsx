import React, { useContext } from 'react';

import { render, screen } from '@testing-library/react';

import { mockUserLoggedIn } from 'tests/mockUserLoggedIn';

import { UserContext, UserContextProvider } from './UserContext';

const userContextConsumerTestIds = {
  tokens: 'tokens',
  user: 'user',
};

const UserContextConsumer = () => {
  const { tokens, user } = useContext(UserContext);

  return (
    <>
      {tokens && <div data-test-id={userContextConsumerTestIds.tokens}>{tokens.accessToken}</div>}
      {user && <div data-test-id={userContextConsumerTestIds.user}>{user.email}</div>}
    </>
  );
};

describe('UserContextProvider', () => {
  describe('given the user has logged in', () => {
    const { tokens, user } = mockUserLoggedIn();

    it('provides the tokens from local storage', async () => {
      render(
        <UserContextProvider>
          <UserContextConsumer />
        </UserContextProvider>
      );

      const tokenContent = await screen.findByTestId(userContextConsumerTestIds.tokens);

      expect(tokenContent).toHaveTextContent(tokens.accessToken);
    });

    it('provides the user from local storage', async () => {
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
