import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { screen } from '@testing-library/react';

import ProtectedRoute from 'routes/ProtectedRoute';
import { mockUserLoggedIn } from 'tests/mockUserLoggedIn';
import { renderWithMemoryRouter } from 'tests/renderWithRouter';

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
  describe('given the user has already logged in', () => {
    mockUserLoggedIn();

    it('redirects to Home page', () => {
      renderRoutes(AUTH_ROUTE.path);

      expect(screen.queryByText(HOME_ROUTE.content)).toBeVisible();
    });
  });

  describe('given the user has NOT logged in', () => {
    it('renders the given page', () => {
      renderRoutes(AUTH_ROUTE.path);

      expect(screen.queryByText(AUTH_ROUTE.content)).toBeVisible();
    });
  });
});
