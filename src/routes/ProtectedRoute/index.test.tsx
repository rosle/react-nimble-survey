import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { screen, waitFor } from '@testing-library/react';

import { LocalStorageKey } from 'lib/localStorage';
import AuthRoute from 'routes/AuthRoute';
import { mockTokensLoggedIn, mockUserLoggedIn } from 'tests/mockUserLoggedIn';
import { renderWithMemoryRouter } from 'tests/renderWithRouter';
import { setupPolly } from 'tests/setupPolly';

import ProtectedRoute from '.';

const PROTECTED_ROUTE = {
  path: '/',
  content: 'Home page',
};

const LOGIN_ROUTE = {
  path: '/sign_in',
  content: 'Login page',
};

const TestRoutes = () => {
  return (
    <Routes>
      <Route
        path={PROTECTED_ROUTE.path}
        element={
          <ProtectedRoute>
            <div>{PROTECTED_ROUTE.content}</div>
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path={LOGIN_ROUTE.path}
        element={
          <AuthRoute>
            <div>{LOGIN_ROUTE.content}</div>
          </AuthRoute>
        }
      />
    </Routes>
  );
};

const renderRoutes = (initialPath: string) => {
  renderWithMemoryRouter(<TestRoutes />, {
    initialEntries: [initialPath],
    withContextProvider: true,
  });
};

describe('ProtectedRoute', () => {
  describe('given there are tokens in the local storage', () => {
    describe('given there is a user in the local storage', () => {
      mockUserLoggedIn();

      it('renders the given page', () => {
        renderRoutes(PROTECTED_ROUTE.path);

        expect(screen.queryByText(PROTECTED_ROUTE.content)).toBeVisible();
      });
    });

    describe('given NO user in the local storage', () => {
      mockTokensLoggedIn();

      it('fetches the user profile and renders the given page', async () => {
        const polly = setupPolly('get_user_profile_success');

        const expectedUser = {
          email: 'rossukhon@nimblehq.co',
          name: 'Rossukhon',
          avatarUrl: 'https://secure.gravatar.com/avatar/252876a66bc74a8d0a8ec1ebb3dd991c',
        };

        renderRoutes(PROTECTED_ROUTE.path);

        await waitFor(() => {
          expect(screen.queryByText(PROTECTED_ROUTE.content)).toBeVisible();
        });

        expect(localStorage.getItem(LocalStorageKey.user)).toBe(JSON.stringify(expectedUser));

        await polly.stop();
      });

      describe('given fetch user profile failed', () => {
        it('clears the tokens and redirects to the Login page', async () => {
          const polly = setupPolly('get_user_profile_failed');

          renderRoutes(PROTECTED_ROUTE.path);

          await waitFor(() => {
            expect(localStorage.getItem(LocalStorageKey.tokens)).toBe(JSON.stringify(null));
          });

          expect(window.location.href).toBe('/sign_in');

          await polly.stop();
        });
      });
    });
  });

  describe('given NO tokens in the local storage', () => {
    it('redirects to the Login page', () => {
      renderRoutes(PROTECTED_ROUTE.path);

      expect(screen.queryByText(LOGIN_ROUTE.content)).toBeVisible();
    });
  });
});
