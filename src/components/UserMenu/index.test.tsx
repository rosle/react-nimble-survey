import React from 'react';

import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { mockUser } from 'tests/mockUserLoggedIn';
import { renderWithRouter } from 'tests/renderWithRouter';

import UserMenu, { userMenuTestIds } from '.';

const openUserMenu = async () => {
  const userAvatar = screen.getByTestId(userMenuTestIds.userMenuContentToggler);

  await userEvent.click(userAvatar);
};

describe('UserMenu', () => {
  it('displays the user avatar', () => {
    renderWithRouter(<UserMenu user={mockUser} />);

    const userAvatar = screen.getByTestId(userMenuTestIds.userMenuContentToggler);
    const userAvatarImage = within(userAvatar).getByRole('img');

    expect(userAvatar).toBeVisible();

    expect(userAvatarImage).toHaveAttribute('src', mockUser.avatarUrl);
  });

  it('does NOT display the user menu collapsed content', () => {
    renderWithRouter(<UserMenu user={mockUser} />);

    const userMenuCollapse = screen.getByTestId(userMenuTestIds.userMenuCollapse);

    expect(userMenuCollapse).toHaveClass('user-menu__collapse--close');
  });

  describe('given the user clicks on the user avatar', () => {
    it('opens the menu collapsed content', async () => {
      renderWithRouter(<UserMenu user={mockUser} />);

      await openUserMenu();

      const userMenuCollapse = screen.getByTestId(userMenuTestIds.userMenuCollapse);

      expect(userMenuCollapse).toHaveClass('user-menu__collapse--open');
    });

    it('displays the user avatar', async () => {
      renderWithRouter(<UserMenu user={mockUser} />);

      await openUserMenu();

      const userAvatar = screen.getByTestId(userMenuTestIds.userAvatar);
      const userAvatarImage = within(userAvatar).getByRole('img');

      expect(userAvatar).toBeVisible();
      expect(userAvatarImage).toHaveAttribute('src', mockUser.avatarUrl);
    });

    it('displays the user name', async () => {
      renderWithRouter(<UserMenu user={mockUser} />);

      await openUserMenu();

      const userName = screen.getByTestId(userMenuTestIds.userName);

      expect(userName).toBeVisible();
      expect(userName).toHaveTextContent(mockUser.name);
    });

    it('displays the logout menu', async () => {
      renderWithRouter(<UserMenu user={mockUser} />);

      await openUserMenu();

      const userMenuNav = screen.getByTestId(userMenuTestIds.nav);
      const logoutMenu = within(userMenuNav).getByText('auth:action.sign_out');

      expect(logoutMenu).toBeVisible();
    });

    it('displays the app version', async () => {
      renderWithRouter(<UserMenu user={mockUser} />);

      await openUserMenu();

      const appVersion = screen.getByTestId(userMenuTestIds.appVersion);

      expect(appVersion).toBeVisible();
      // TODO: Check for version number?
      expect(appVersion).toHaveTextContent('shared:version');
    });

    describe('given the user clicks on the user avatar again', () => {
      it('closes the menu collapsed content', async () => {
        renderWithRouter(<UserMenu user={mockUser} />);

        await openUserMenu();

        const userAvatar = screen.getByTestId(userMenuTestIds.userAvatar);

        await userEvent.click(userAvatar);

        const userMenuCollapse = screen.getByTestId(userMenuTestIds.userMenuCollapse);

        expect(userMenuCollapse).toHaveClass('user-menu__collapse--close');
      });
    });

    describe('given the user clicks outside the user menu', () => {
      it('closes the menu content', async () => {
        renderWithRouter(<UserMenu user={mockUser} />);

        await openUserMenu();

        await userEvent.click(document.body);

        const userMenuCollapse = screen.getByTestId(userMenuTestIds.userMenuCollapse);

        expect(userMenuCollapse).toHaveClass('user-menu__collapse--close');
      });
    });
  });
});
