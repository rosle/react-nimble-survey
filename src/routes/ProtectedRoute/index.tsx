import { useCallback, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UserAdapter from 'adapters/User';
import { UserContext } from 'contexts/UserContext';
import routePath from 'routes/routePath';

type ProtectedRouteProps = {
  children: JSX.Element;
};

/*
  Routes for pages that require authentication before accessing.
*/
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { tokens, setUser, user } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchUserProfile = useCallback(async () => {
    try {
      const userResponse = await UserAdapter.me();

      setUser(userResponse.data);
    } catch (_error) {
      // 401 should be raised and handle by request interceptor
    }
  }, [setUser]);

  useEffect(() => {
    if (!tokens) return navigate(routePath.login);
    if (user) return;

    fetchUserProfile();
  }, [fetchUserProfile, navigate, tokens, user]);

  return user ? children : null;
};

export default ProtectedRoute;
