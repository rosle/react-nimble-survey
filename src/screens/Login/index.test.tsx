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

  describe('given the valid inputs', () => {
    // TODO: Add expectation after form submit on issue#6
    it('does NOT display the error', () => {
      render(<LoginScreen />);

      const emailInput = screen.getByTestId(loginScreenTestIds.loginEmail);
      const passwordInput = screen.getByTestId(loginScreenTestIds.loginPassWord);
      const submitButton = screen.getByTestId(loginScreenTestIds.loginSubmit);

      fillInput(emailInput, 'rossukhon@nimblehq.co');
      fillInput(passwordInput, 'secret1234');

      userEvent.click(submitButton);

      const formError = screen.queryByTestId(formTestIds.formError);

      expect(formError).not.toBeInTheDocument();
    });
  });

  describe('given the INVALID inputs', () => {
    it('displays the errors', async () => {
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
});
