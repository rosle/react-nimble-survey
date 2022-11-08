import React from 'react';

import { mount } from 'cypress/react18';

import LoadingListItem, { loadingListItemTestIds } from '.';

describe('LoadingListItem', () => {
  it('renders the loading list item', () => {
    mount(<LoadingListItem />);

    cy.findByTestId(loadingListItemTestIds.loadingListItem).should('be.visible');
  });
});
