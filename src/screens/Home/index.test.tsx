import React from 'react';

import { screen } from '@testing-library/react';

import { renderWithRouter } from 'tests/renderWithRouter';

import HomeScreen from '.';

describe('HomeScreen', () => {
  it('renders learn react link', () => {
    renderWithRouter(<HomeScreen />);

    const linkElement = screen.getByTestId('app-link');

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent('sample_page.learn_react');
  });
});
