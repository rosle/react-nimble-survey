import React from 'react';

import { mockUser } from 'tests/mockUserLoggedIn';

import UserMenu, { userMenuTestIds } from '.';

describe('UserMenu', () => {
  it('displays the user avatar', () => {
    cy.mountWithRouter(<UserMenu user={mockUser} onLogout={cy.stub()} />);

    cy.findByTestId(userMenuTestIds.userMenuContentToggler)
      .should('be.visible')
      .findByRole('img')
      .should('have.attr', 'src', mockUser.avatarUrl);
  });

  it('does NOT display the user menu collapsed content', () => {
    cy.mountWithRouter(<UserMenu user={mockUser} onLogout={cy.stub()} />);

    cy.findByTestId(userMenuTestIds.userMenuCollapse).should('have.class', 'user-menu__collapse--close');
  });

  describe('given the user clicks on the user avatar', () => {
    it('opens the menu collapsed content', () => {
      cy.mountWithRouter(<UserMenu user={mockUser} onLogout={cy.stub()} />);

      cy.findByTestId(userMenuTestIds.userMenuContentToggler).click();

      cy.findByTestId(userMenuTestIds.userMenuCollapse).should('have.class', 'user-menu__collapse--open');
    });

    it('displays the user avatar', () => {
      cy.mountWithRouter(<UserMenu user={mockUser} onLogout={cy.stub()} />);

      cy.findByTestId(userMenuTestIds.userMenuContentToggler).click();

      cy.findByTestId(userMenuTestIds.userAvatar)
        .should('be.visible')
        .findByRole('img')
        .should('have.attr', 'src', mockUser.avatarUrl);
    });

    it('displays the user name', () => {
      cy.mountWithRouter(<UserMenu user={mockUser} onLogout={cy.stub()} />);

      cy.findByTestId(userMenuTestIds.userMenuContentToggler).click();

      cy.findByTestId(userMenuTestIds.userName).should('have.text', mockUser.name);
    });

    it('displays the logout menu', () => {
      cy.mountWithRouter(<UserMenu user={mockUser} onLogout={cy.stub()} />);

      cy.findByTestId(userMenuTestIds.userMenuContentToggler).click();

      cy.findByTestId(userMenuTestIds.nav).findByText('auth:action.sign_out').should('be.visible');
    });

    it('displays the app version', () => {
      cy.mountWithRouter(<UserMenu user={mockUser} onLogout={cy.stub()} />);

      cy.findByTestId(userMenuTestIds.userMenuContentToggler).click();

      // TODO: Still haven't found a way how to test i18n with interpolation.
      cy.findByTestId(userMenuTestIds.appVersion).should('have.text', 'shared:version');
    });

    describe('given the user clicks on the logout menu', () => {
      it.only('calls the logout function', () => {
        const mockLogoutFn = cy.stub();

        cy.mountWithRouter(<UserMenu user={mockUser} onLogout={mockLogoutFn} />);

        cy.findByTestId(userMenuTestIds.userMenuContentToggler).click();

        cy.findByText('auth:action.sign_out')
          .click()
          .then(() => {
            expect(mockLogoutFn).to.be.called;
          });
      });
    });

    describe('given the user clicks on the user avatar again', () => {
      it('closes the menu collapsed content', () => {
        cy.mountWithRouter(<UserMenu user={mockUser} onLogout={cy.stub()} />);

        cy.findByTestId(userMenuTestIds.userMenuContentToggler).click();
        cy.findByTestId(userMenuTestIds.userAvatar).click();

        cy.findByTestId(userMenuTestIds.userMenuCollapse).should('have.class', 'user-menu__collapse--close');
      });
    });

    describe('given the user clicks outside the user menu', () => {
      it('closes the menu content', () => {
        cy.mountWithRouter(<UserMenu user={mockUser} onLogout={cy.stub()} />);

        cy.findByTestId(userMenuTestIds.userMenuContentToggler).click();
        cy.get('body').click(0, 0);

        cy.findByTestId(userMenuTestIds.userMenuCollapse).should('have.class', 'user-menu__collapse--close');
      });
    });
  });
});
