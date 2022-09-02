import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { UserContext } from 'contexts/UserContext';

type AuthRouteProps = {
  children: JSX.Element;
};

const AuthRoute = ({ children }: AuthRouteProps) => {
  const { user } = useContext(UserContext);

  return user ? <Navigate to="/" /> : children;
};

export default AuthRoute;
