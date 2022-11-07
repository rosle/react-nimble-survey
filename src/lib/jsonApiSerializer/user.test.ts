import { readApiResponseFromFixtures } from 'tests/apiHelpers';
import { User } from 'types/user';

import JsonApiSerializer from '.';

describe('JsonApiSerializer', () => {
  describe('.deserialize()', () => {
    it('deserializes the user response', () => {
      const userResponse = readApiResponseFromFixtures('get_user_profile_success.json');

      const expectedUser: User = {
        id: '41',
        email: 'rossukhon@nimblehq.co',
        name: 'Rossukhon',
        avatarUrl: 'https://secure.gravatar.com/avatar/252876a66bc74a8d0a8ec1ebb3dd991c',
      };

      expect(JsonApiSerializer.deserialize('user', userResponse)).toEqual(expect.objectContaining(expectedUser));
    });
  });
});
