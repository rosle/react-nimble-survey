import { faker } from '@faker-js/faker';

import { getHiResImageUrl } from './image';

describe('getHiResImageUrl', () => {
  it('returns the high resolution image url', () => {
    const imageUrl = faker.image.imageUrl();

    const hiResImageUrl = getHiResImageUrl(imageUrl);

    expect(hiResImageUrl).toBe(`${imageUrl}l`);
  });
});
