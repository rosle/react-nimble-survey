import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { UserContext } from 'contexts/UserContext';

type ProtectedRouteProps = {
  children: JSX.Element;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useContext(UserContext);

  return user ? children : <Navigate to="/sign_in" />;
};

export default ProtectedRoute;
