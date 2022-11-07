import { faker } from '@faker-js/faker';

import { Survey } from 'types/survey';

const buildSurvey = (attrs?: Partial<Survey>): Survey => {
  const coverImageUrl = faker.image.imageUrl();

  return {
    id: faker.datatype.uuid(),
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraph(),
    coverImageUrl: coverImageUrl,
    coverImageUrlLarge: `${coverImageUrl}l`,
    createdAt: faker.date.recent().toString(),
    ...attrs,
  };
};

export { buildSurvey };
