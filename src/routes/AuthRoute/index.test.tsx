import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { screen, waitFor } from '@testing-library/react';

import ProtectedRoute from 'routes/ProtectedRoute';
import { mockTokensLoggedIn } from 'tests/mockUserLoggedIn';
import { renderWithMemoryRouter } from 'tests/renderWithRouter';
import { setupPolly } from 'tests/setupPolly';

import AuthRoute from '.';

const HOME_ROUTE = {
  path: '/',
  content: 'Home page',
};

const AUTH_ROUTE = {
  path: '/sign_in',
  content: 'Login page',
};

const TestRoutes = () => {
  return (
    <Routes>
      <Route
        path={HOME_ROUTE.path}
        element={
          <ProtectedRoute>
            <div>{HOME_ROUTE.content}</div>
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path={AUTH_ROUTE.path}
        element={
          <AuthRoute>
            <div>{AUTH_ROUTE.content}</div>
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

describe('AuthRoute', () => {
  describe('given there are tokens in the local storage', () => {
    mockTokensLoggedIn();

    it('redirects to the Home page', async () => {
      const polly = setupPolly('get_user_profile_success');

      renderRoutes(AUTH_ROUTE.path);

      await waitFor(() => {
        expect(screen.queryByText(HOME_ROUTE.content)).toBeVisible();
      });

      await polly.stop();
    });
  });

  describe('given NO tokens in the local storage', () => {
    it('renders the given page', () => {
      renderRoutes(AUTH_ROUTE.path);

      expect(screen.queryByText(AUTH_ROUTE.content)).toBeVisible();
    });
  });
});
