import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { formTestIds } from 'components/Form';
import { authLayoutTestIds } from 'components/Layout/Auth';
import { fillInput } from 'tests/helpers';

import LoginScreen, { loginScreenTestIds } from '.';

describe('LoginScreen', () => {
  it('renders the AuthLayout with the correct title', () => {
    render(<LoginScreen />);

    const authLayoutHeaderTitle = screen.getByTestId(authLayoutTestIds.headerTitle);

    expect(authLayoutHeaderTitle).toHaveTextContent('auth:heading.sign_in');
  });

  it('displays the error if any of the inputs is invalid', async () => {
    render(<LoginScreen />);

    const submitButton = screen.getByTestId(loginScreenTestIds.loginSubmit);

    userEvent.click(submitButton);

    const formError = await screen.findByTestId(formTestIds.formError);

    expect(formError).toBeVisible();
    expect(formError).toHaveTextContent('Email shared:form_error.required');
    expect(formError).toHaveTextContent('Password shared:form_error.required');

    const emailInput = screen.getByTestId(loginScreenTestIds.loginEmail);
    const passwordInput = screen.getByTestId(loginScreenTestIds.loginPassWord);

    fillInput(emailInput, 'rossukhon');
    fillInput(passwordInput, '123456');

    await waitFor(() => {
      expect(formError).toHaveTextContent('Email shared:form_error.pattern');
    });

    expect(formError).not.toHaveTextContent('Password shared:form_error.required');
  });
});
