import React from 'react';

import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LocalStorageKey } from 'lib/localStorage';
import routePath from 'routes/routePath';
import { mockUserLoggedIn } from 'tests/mockUserLoggedIn';
import { renderWithRouter } from 'tests/renderWithRouter';
import { setupPolly } from 'tests/setupPolly';

import DefaultLayout, { defaultLayoutTestIds } from '.';

describe('DefaultLayout', () => {
  it('adds the html class', async () => {
    const onHelmetStateChange = jest.fn();

    renderWithRouter(<DefaultLayout onHelmetStateChange={onHelmetStateChange}></DefaultLayout>);

    await waitFor(() => {
      expect(onHelmetStateChange).toHaveBeenCalledTimes(1);
    });

    const helmetState = onHelmetStateChange.mock.calls[0][0];

    expect(helmetState).toBeObjectContaining({ htmlAttributes: { class: 'layout-default' } });
  });

  it('renders the app logo link', () => {
    renderWithRouter(<DefaultLayout />);

    const appLogoLink = screen.getByTestId(defaultLayoutTestIds.logoLink);

    expect(appLogoLink).toBeVisible();
    expect(appLogoLink).toHaveAttribute('href', routePath.index);
  });

  describe('given the user has logged in', () => {
    mockUserLoggedIn();

    it('renders the the user menu', () => {
      renderWithRouter(<DefaultLayout />, { withContextProvider: true });

      const userMenu = screen.getByTestId(defaultLayoutTestIds.userMenu);

      expect(userMenu).toBeVisible();
    });

    describe('given the user clicks on the logout menu', () => {
      it('logs the user out', async () => {
        const polly = setupPolly('logout_success');

        renderWithRouter(<DefaultLayout />, { withContextProvider: true });

        const userMenu = screen.getByTestId(defaultLayoutTestIds.userMenu);
        const logoutMenu = within(userMenu).getByText('auth:action.sign_out');

        userEvent.click(userMenu);
        userEvent.click(logoutMenu);

        await waitFor(() => {
          expect(localStorage.getItem(LocalStorageKey.tokens)).toBe(JSON.stringify(null));
        });

        expect(localStorage.getItem(LocalStorageKey.user)).toBe(JSON.stringify(null));

        await polly.stop();
      });
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
