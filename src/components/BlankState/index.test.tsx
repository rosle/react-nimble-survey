import React from 'react';

import { faker } from '@faker-js/faker';
import { render, screen } from '@testing-library/react';

import BlankState, { blankStateTestIds } from '.';

describe('BlankState', () => {
  it('displays the given emoji', () => {
    const emojiContent = '💛';

    render(<BlankState emoji={emojiContent} description={faker.lorem.sentence()} />);

    const emoji = screen.getByTestId(blankStateTestIds.emoji);

    expect(emoji).toBeVisible();
    expect(emoji).toHaveTextContent(emojiContent);
  });

  it('displays the given description', () => {
    const descriptionContent = faker.lorem.sentence();

    render(<BlankState emoji="🥳" description={descriptionContent} />);

    const description = screen.getByTestId(blankStateTestIds.description);

    expect(description).toBeVisible();
    expect(description).toHaveTextContent(descriptionContent);
  });
});
