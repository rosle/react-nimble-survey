import React from 'react';

import TodayDate, { todayDateTestIds } from '.';

describe('TodayDate', () => {
  it('displays the current date', () => {
    const now = Date.parse('2022-09-29T04:15:27.898Z');
    cy.clock(now, ['Date']);

    cy.mount(<TodayDate />);

    cy.findByTestId(todayDateTestIds.date).should('be.visible').should('have.text', 'Thursday, September 29');
  });

  it('displays the today title', () => {
    cy.mount(<TodayDate />);

    cy.findByTestId(todayDateTestIds.title);
  });
});
