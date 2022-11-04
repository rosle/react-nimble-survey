import React from 'react';

import { screen, waitFor } from '@testing-library/react';

import { mockUserLoggedIn } from 'tests/mockUserLoggedIn';
import { renderWithRouter } from 'tests/renderWithRouter';

import DefaultLayout, { defaultLayoutTestIds } from '.';

describe('DefaultLayout', () => {
  it('adds the html class', async () => {
    const onHelmetStateChange = jest.fn();

    renderWithRouter(<DefaultLayout onHelmetStateChange={onHelmetStateChange}></DefaultLayout>);

    await waitFor(() => {
      expect(onHelmetStateChange).toHaveBeenCalledTimes(1);
    });

    const helmetState = onHelmetStateChange.mock.calls[0][0];

    expect(helmetState).toEqual(expect.objectContaining({ htmlAttributes: { class: 'layout-default' } }));
  });

  it('renders the app logo link', () => {
    renderWithRouter(<DefaultLayout />);

    const appLogoLink = screen.getByTestId(defaultLayoutTestIds.logoLink);

    expect(appLogoLink).toBeVisible();
    expect(appLogoLink).toHaveAttribute('href', '/');
  });

  describe('given the user has logged in', () => {
    mockUserLoggedIn();

    it('renders the the user menu', () => {
      renderWithRouter(<DefaultLayout />, { withContextProvider: true });

      const userMenu = screen.getByTestId(defaultLayoutTestIds.userMenu);

      expect(userMenu).toBeVisible();
    });
  });

  describe('given the user has NOT logged in', () => {
    it('does NOT render the the user menu', () => {
      renderWithRouter(<DefaultLayout />, { withContextProvider: true });

      const userMenu = screen.queryByTestId(defaultLayoutTestIds.userMenu);

      expect(userMenu).not.toBeInTheDocument();
    });
  });

  it('renders the children', () => {
    const childrenContent = 'This is component children';

    renderWithRouter(
      <DefaultLayout>
        <p>{childrenContent}</p>
      </DefaultLayout>
    );

    expect(screen.getByText(childrenContent)).toBeVisible();
  });
});
