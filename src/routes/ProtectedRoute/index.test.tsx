import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { screen } from '@testing-library/react';

import AuthRoute from 'routes/AuthRoute';
import { mockUserLoggedIn } from 'tests/mockUserLoggedIn';
import { renderWithMemoryRouter } from 'tests/renderWithRouter';

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
  describe('given the user has logged in', () => {
    mockUserLoggedIn();

    it('renders the given page', () => {
      renderRoutes(PROTECTED_ROUTE.path);

      expect(screen.queryByText(PROTECTED_ROUTE.content)).toBeVisible();
    });
  });

  describe('given the user has NOT logged in', () => {
    it('renders the Login page', () => {
      renderRoutes(PROTECTED_ROUTE.path);

      expect(screen.queryByText(LOGIN_ROUTE.content)).toBeVisible();
    });
  });
});
