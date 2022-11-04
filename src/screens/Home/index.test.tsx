import React from 'react';

import { screen } from '@testing-library/react';

import { renderWithRouter } from 'tests/renderWithRouter';

import HomeScreen from '.';

describe('HomeScreen', () => {
  it('renders learn react link', () => {
    renderWithRouter(<HomeScreen />);

    // TODO: this will be update later when implementing the real home page
    const homeContent = screen.queryByText('This is the home page content');

    expect(homeContent).toBeInTheDocument();
  });
});
