import React from 'react';

import { waitFor, screen, render } from '@testing-library/react';

import FullScreenLayout from '.';

describe('FullScreenLayout', () => {
  it('adds the html class', async () => {
    const onHelmetStateChange = jest.fn();

    render(<FullScreenLayout onHelmetStateChange={onHelmetStateChange} />);

    await waitFor(() => {
      expect(onHelmetStateChange).toHaveBeenCalledTimes(1);
    });

    const helmetState = onHelmetStateChange.mock.calls[0][0];

    expect(helmetState).toBeObjectContaining({ htmlAttributes: { class: 'layout-fullscreen' } });
  });

  it('renders the children', async () => {
    const childrenContent = 'This is component children';

    render(
      <FullScreenLayout>
        <p>{childrenContent}</p>
      </FullScreenLayout>
    );

    expect(screen.getByText(childrenContent)).toBeVisible();
  });

  describe('given the top navigation props', () => {
    it('renders the given top navigation element', async () => {
      const topNavigationContent = 'Title';

      render(<FullScreenLayout topNavigation={<h1>{topNavigationContent}</h1>} />);

      expect(screen.getByText(topNavigationContent)).toBeVisible();
    });
  });
});
