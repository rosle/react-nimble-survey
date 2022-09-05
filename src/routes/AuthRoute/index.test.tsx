import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { render, screen } from '@testing-library/react';

import { UserContextProvider } from 'contexts/UserContext';
import ProtectedRoute from 'routes/ProtectedRoute';
import { mockUserLoggedIn } from 'tests/mockUserLoggedIn';

import AuthRoute from '.';

const TestRoutes = () => {
  return (
    <MemoryRouter initialEntries={['/sign_in']}>
      <UserContextProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div>Home page</div>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/sign_in"
            element={
              <AuthRoute>
                <div>Login page</div>
              </AuthRoute>
            }
          />
        </Routes>
      </UserContextProvider>
    </MemoryRouter>
  );
};

describe('AuthRoute', () => {
  describe('given the user has already logged in', () => {
    mockUserLoggedIn();

    it('redirects to Home page', () => {
      render(<TestRoutes />);

      expect(screen.queryByText('Home page')).toBeVisible();
    });
  });

  describe('given the user has NOT logged in', () => {
    it('renders the given page', () => {
      render(<TestRoutes />);

      expect(screen.queryByText('Login page')).toBeVisible();
    });
  });
});
