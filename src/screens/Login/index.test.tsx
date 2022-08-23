import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { formTestIds } from 'components/Form';
import { authLayoutTestIds } from 'components/Layout/Auth';

import LoginScreen, { loginScreenTestIds } from '.';

describe('LoginScreen', () => {
  it('renders the AuthLayout with the correct title', () => {
    render(<LoginScreen />);

    const authLayoutHeaderTitle = screen.getByTestId(authLayoutTestIds.headerTitle);

    expect(authLayoutHeaderTitle).toHaveTextContent('auth:heading.sign_in');
  });

  it('displays an error if any of the required inputs is blank', async () => {
    render(<LoginScreen />);

    const submitButton = screen.getByTestId(loginScreenTestIds.loginSubmit);

    userEvent.click(submitButton);

    const formError = await screen.findByTestId(formTestIds.formError);

    expect(formError).toBeVisible();
    expect(formError).toHaveTextContent('Email shared:form_error.required');
    expect(formError).toHaveTextContent('Password shared:form_error.required');

    const emailInput = screen.getByTestId(loginScreenTestIds.loginEmail);

    userEvent.type(emailInput, 'rossukhon@nimblehq.co');

    await waitFor(() => {
      expect(formError).not.toHaveTextContent('Email shared:form_error.required');
    });

    expect(formError).toHaveTextContent('Password shared:form_error.required');
  });
});
