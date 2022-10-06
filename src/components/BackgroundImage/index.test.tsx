import React from 'react';

import { faker } from '@faker-js/faker';
import { render, screen, within } from '@testing-library/react';

import BackgroundImage, { backgroundImageTestIds } from '.';

describe('BackgroundImage', () => {
  it('displays the given image url', () => {
    const imageUrl = faker.image.imageUrl();

    render(<BackgroundImage imageUrl={imageUrl} />);

    const backgroundImage = screen.getByTestId(backgroundImageTestIds.backgroundImage);
    const image = within(backgroundImage).getByRole('img');

    expect(backgroundImage).toBeVisible();
    expect(image).toHaveAttribute('src', imageUrl);
  });
});
