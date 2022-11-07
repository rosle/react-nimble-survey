import { faker } from '@faker-js/faker';

import { User } from 'types/user';

const buildUser = (attrs?: Partial<User>): User => {
  return {
    id: `${faker.datatype.number()}`,
    email: faker.internet.email(),
    name: faker.name.fullName(),
    avatarUrl: faker.image.imageUrl(),
    ...attrs,
  };
};

export { buildUser };
