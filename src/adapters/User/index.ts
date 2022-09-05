import requestManager from 'lib/requestManager';

const UserAdapter = () => {
  const me = () => {
    return requestManager('get', '/api/v1/me');
  };

  return { me };
};

export default UserAdapter();
