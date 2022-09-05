import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { UserContext } from 'contexts/UserContext';

const LOGIN_PAGE_PATH = '/sign_in';

type ProtectedRouteProps = {
  children: JSX.Element;
};

/*
  Routes for pages that require authentication before accessing.
*/
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useContext(UserContext);

  return user ? children : <Navigate to={LOGIN_PAGE_PATH} />;
};

export default ProtectedRoute;
