import React from 'react';

import { render, screen } from '@testing-library/react';

import { authLayoutTestIds } from 'components/Layout/Auth';

import LoginScreen from '.';

describe('LoginScreen', () => {
  it('renders the AuthLayout with the correct title', () => {
    render(<LoginScreen />);

    const authLayoutHeaderTitle = screen.getByTestId(authLayoutTestIds.headerTitle);

    expect(authLayoutHeaderTitle).toHaveTextContent('auth:heading.sign_in');
  });
});
