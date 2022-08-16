import React from 'react';

import { render, screen } from '@testing-library/react';

import { AuthLayoutTestIds } from 'components/Layout/Auth';

import LoginScreen from '.';

describe('LoginScreen', () => {
  it('renders the AuthLayout with the correct title', () => {
    render(<LoginScreen />);

    const authLayoutHeaderTitle = screen.getByTestId(AuthLayoutTestIds.headerTitle);

    expect(authLayoutHeaderTitle).toHaveTextContent('auth:sign_in');
  });
});
