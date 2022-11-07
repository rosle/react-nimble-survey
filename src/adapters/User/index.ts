import requestManager from 'lib/requestManager';
import { User } from 'types/user';

const UserAdapter = () => {
  const me = () => {
    return requestManager<User>('get', '/api/v1/me');
  };

  return { me };
};

export default UserAdapter();
