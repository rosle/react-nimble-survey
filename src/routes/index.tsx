import React from 'react';
import { RouteObject } from 'react-router-dom';

import HomeScreen from 'screens/Home';
import LoginScreen from 'screens/Login';

import AuthRoute from './AuthRoute';
import ProtectedRoute from './ProtectedRoute';

const authRoutes: RouteObject[] = [
  {
    path: '/sign_in',
    element: (
      <AuthRoute>
        <LoginScreen />
      </AuthRoute>
    ),
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <HomeScreen />
      </ProtectedRoute>
    ),
  },
];

const routes = [...authRoutes, ...protectedRoutes];

export default routes;
