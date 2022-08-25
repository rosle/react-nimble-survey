import requestManager from 'lib/requestManager';

type loginParams = {
  email: string;
  password: string;
};

const apiCredential = {
  clientId: process.env.REACT_APP_API_CLIENT_ID,
  clientSecret: process.env.REACT_APP_API_CLIENT_SECRET,
};

const AuthAdapter = () => {
  const login = ({ email, password }: loginParams) => {
    const data = {
      grantType: 'password',
      email: email,
      password: password,
      ...apiCredential,
    };

    return requestManager('post', '/api/v1/oauth/token', { data: data });
  };

  return { login };
};

export default AuthAdapter();
