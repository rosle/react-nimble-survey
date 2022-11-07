import { faker } from '@faker-js/faker';

import { Survey } from 'types/survey';

const buildSurvey = (attrs?: Partial<Survey>): Survey => {
  return {
    id: faker.datatype.uuid(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    coverImageUrl: faker.image.imageUrl(),
    createdAt: faker.date.recent().toString(),
    ...attrs,
  };
};

export { buildSurvey };
