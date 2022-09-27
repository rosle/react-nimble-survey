import { faker } from '@faker-js/faker';

import { User } from 'types/user';

const buildUser = (attrs?: Partial<User>): User => {
  return {
    email: faker.internet.email(),
    name: faker.name.fullName(),
    avatarUrl: faker.internet.url(),
    ...attrs,
  };
};

export { buildUser };
