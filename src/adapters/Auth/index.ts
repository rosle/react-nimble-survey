import requestManager from 'lib/requestManager';
import { Tokens } from 'types/tokens';

type loginParams = {
  email: string;
  password: string;
};

type logoutParams = {
  refreshToken: string;
};

type refreshTokenParams = {
  refreshToken: string;
};

const apiCredential = () => ({
  clientId: process.env.REACT_APP_API_CLIENT_ID,
  clientSecret: process.env.REACT_APP_API_CLIENT_SECRET,
});

const AuthAdapter = () => {
  const login = ({ email, password }: loginParams) => {
    const data = {
      grantType: 'password',
      email,
      password,
      ...apiCredential(),
    };

    return requestManager<Tokens>('post', '/api/v1/oauth/token', { data: data });
  };

  const logout = ({ refreshToken }: logoutParams) => {
    const data = {
      token: refreshToken,
      ...apiCredential(),
    };

    return requestManager('post', '/api/v1/oauth/revoke', { data: data });
  };

  const refreshToken = ({ refreshToken }: refreshTokenParams) => {
    const data = {
      grantType: 'refresh_token',
      refreshToken,
      ...apiCredential(),
    };

    return requestManager('post', '/api/v1/oauth/token', { data: data });
  };

  return { login, logout, refreshToken };
};

export default AuthAdapter();
