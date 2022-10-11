import React from 'react';
import { RouteObject } from 'react-router-dom';

import HomeScreen from 'screens/Home';
import LoginScreen from 'screens/Login';
import SurveyScreen from 'screens/Survey';

import AuthRoute from './AuthRoute';
import ProtectedRoute from './ProtectedRoute';
import routePath from './routePath';

const authRoutes: RouteObject[] = [
  {
    path: routePath.login,
    element: (
      <AuthRoute>
        <LoginScreen />
      </AuthRoute>
    ),
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: routePath.index,
    element: (
      <ProtectedRoute>
        <HomeScreen />
      </ProtectedRoute>
    ),
  },
  {
    path: '/surveys/:surveyId',
    element: (
      <ProtectedRoute>
        <SurveyScreen />
      </ProtectedRoute>
    ),
  },
];

const routes = [...authRoutes, ...protectedRoutes];

export default routes;
