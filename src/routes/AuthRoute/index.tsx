import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { UserContext } from 'contexts/UserContext';

const HOME_PAGE_PATH = '/';

type AuthRouteProps = {
  children: JSX.Element;
};

/*
  Routes for authentication pages e.g. Login, Register.
  Which should not be accessible after the user logged in.
*/
const AuthRoute = ({ children }: AuthRouteProps) => {
  const { user } = useContext(UserContext);

  return user ? <Navigate to={HOME_PAGE_PATH} /> : children;
};

export default AuthRoute;
