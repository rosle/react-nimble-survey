import { useCallback, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UserAdapter from 'adapters/User';
import { UserContext } from 'contexts/UserContext';

const LOGIN_PAGE_PATH = '/sign_in';

type ProtectedRouteProps = {
  children: JSX.Element;
};

/*
  Routes for pages that require authentication before accessing.
*/
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { tokens, setTokens, setUser, user } = useContext(UserContext);
  const navigate = useNavigate();

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await UserAdapter.me();
      const userResponse = response.data.attributes;

      setUser(userResponse);
    } catch (error) {
      setTokens(null);
      navigate(LOGIN_PAGE_PATH);
    }
  }, [navigate, setTokens, setUser]);

  useEffect(() => {
    if (!tokens) return navigate(LOGIN_PAGE_PATH);
    if (user) return;

    fetchUserProfile();
  }, [fetchUserProfile, navigate, tokens, user]);

  return user ? children : null;
};

export default ProtectedRoute;
