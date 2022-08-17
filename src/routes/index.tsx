import React from 'react';
import { RouteObject } from 'react-router-dom';

import HomeScreen from 'screens/Home';
import LoginScreen from 'screens/Login';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomeScreen />,
  },
  {
    path: '/sign_in',
    element: <LoginScreen />,
  },
];

export default routes;
