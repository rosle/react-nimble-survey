import React from 'react';

import { screen, waitFor } from '@testing-library/react';

import AuthAdapter from 'adapters/Auth';
import UserAdapter from 'adapters/User';
import { formTestIds } from 'components/Form';
import { authLayoutTestIds } from 'components/Layout/Auth';
import { fillInput, submitForm } from 'tests/helpers';
import { renderWithRouter } from 'tests/renderWithRouter';
import { setupPolly } from 'tests/setupPolly';

import LoginScreen, { loginScreenTestIds } from '.';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('LoginScreen', () => {
  it('renders the AuthLayout with the correct title', () => {
    renderWithRouter(<LoginScreen />);

    const authLayoutHeaderTitle = screen.getByTestId(authLayoutTestIds.headerTitle);

    expect(authLayoutHeaderTitle).toHaveTextContent('auth:heading.sign_in');
  });

  describe('given the valid credential', () => {
    it('does NOT display the errors and redirects to the Home page', async () => {
      const polly = setupPolly('login_success');

      renderWithRouter(<LoginScreen />, { withContextProvider: true });

      const emailInput = screen.getByTestId(loginScreenTestIds.loginEmail);
      const passwordInput = screen.getByTestId(loginScreenTestIds.loginPassWord);
      const submitButton = screen.getByTestId(loginScreenTestIds.loginSubmit);

      fillInput(emailInput, 'rossukhon@nimblehq.co');
      fillInput(passwordInput, 'secret22');
      submitForm(submitButton);

      const formError = screen.queryByTestId(formTestIds.formError);

      expect(formError).not.toBeInTheDocument();

      await waitFor(() => {
        expect(mockUseNavigate).toHaveBeenCalledWith('/');
      });

      await polly.stop();
      mockUseNavigate.mockRestore();
    });
  });

  describe('given the INVALID inputs', () => {
    it('displays the validation errors', async () => {
      renderWithRouter(<LoginScreen />);

      const submitButton = screen.getByTestId(loginScreenTestIds.loginSubmit);

      submitForm(submitButton);

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

  describe('given the INVALID credential', () => {
    it('displays the API errors', async () => {
      const polly = setupPolly('login_failed');

      renderWithRouter(<LoginScreen />);

      const emailInput = screen.getByTestId(loginScreenTestIds.loginEmail);
      const passwordInput = screen.getByTestId(loginScreenTestIds.loginPassWord);
      const submitButton = screen.getByTestId(loginScreenTestIds.loginSubmit);

      fillInput(emailInput, 'ros@nimblehq.co');
      fillInput(passwordInput, 'invalid22');
      submitForm(submitButton);

      const formError = await screen.findByTestId(formTestIds.formError);

      expect(formError).toBeVisible();
      expect(formError).toHaveTextContent('Your email or password is incorrect. Please try again.');

      await polly.stop();
    });
  });

  describe('given the login API request failed', () => {
    it('displays the generic errors', async () => {
      renderWithRouter(<LoginScreen />);

      const emailInput = screen.getByTestId(loginScreenTestIds.loginEmail);
      const passwordInput = screen.getByTestId(loginScreenTestIds.loginPassWord);
      const submitButton = screen.getByTestId(loginScreenTestIds.loginSubmit);

      const requestSpy = jest.spyOn(AuthAdapter, 'login').mockRejectedValueOnce(new Error('Timeout'));

      fillInput(emailInput, 'ros@nimblehq.co');
      fillInput(passwordInput, 'invalid22');
      submitForm(submitButton);

      const formError = await screen.findByTestId(formTestIds.formError);

      expect(formError).toBeVisible();
      expect(formError).toHaveTextContent('shared:generic_error');

      requestSpy.mockRestore();
    });
  });

  describe('given the user API request failed', () => {
    it('displays the generic errors', async () => {
      const polly = setupPolly('login_success');

      renderWithRouter(<LoginScreen />, { withContextProvider: true });

      const emailInput = screen.getByTestId(loginScreenTestIds.loginEmail);
      const passwordInput = screen.getByTestId(loginScreenTestIds.loginPassWord);
      const submitButton = screen.getByTestId(loginScreenTestIds.loginSubmit);

      const requestSpy = jest.spyOn(UserAdapter, 'me').mockRejectedValueOnce(new Error('Timeout'));

      fillInput(emailInput, 'rossukhon@nimblehq.co');
      fillInput(passwordInput, 'secret22');
      submitForm(submitButton);

      const formError = await screen.findByTestId(formTestIds.formError);

      expect(formError).toBeVisible();
      expect(formError).toHaveTextContent('shared:generic_error');

      await polly.stop();
      requestSpy.mockRestore();
    });
  });
});
