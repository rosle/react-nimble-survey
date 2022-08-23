import React from 'react';
import ReactHookForm from 'react-hook-form';

import { render, screen, within } from '@testing-library/react';

import { alertTestIds } from 'components/Alert';
import { warningIconTestId } from 'components/Icon/Warning';
import Input, { inputTestIds } from 'components/Input';

import Form, { formTestIds } from '.';

describe('Form', () => {
  it('renders form children', () => {
    render(
      <Form>
        <Input type="text" name="username" required />
      </Form>
    );

    const form = screen.getByTestId(formTestIds.form);

    expect(form).toBeVisible();

    const formInput = within(form).getByTestId(inputTestIds.input);

    expect(formInput).toBeVisible();
  });

  it('does NOT render form error if there are no form errors', () => {
    render(
      <Form>
        <Input type="text" name="username" required />
      </Form>
    );

    const formError = screen.queryByTestId(formTestIds.formError);

    expect(formError).not.toBeInTheDocument();
  });

  it('renders form error if there is an error string', () => {
    const errorInString = 'Something went wrong!';

    render(
      <Form errors={errorInString}>
        <Input type="text" name="username" required />
      </Form>
    );

    const formError = screen.getByTestId(formTestIds.formError);

    expect(formError).toBeVisible();

    const formErrorIcon = within(formError).getByTestId(warningIconTestId);
    const formErrorTitle = within(formError).getByTestId(alertTestIds.title);
    const formErrorDescription = within(formError).getByTestId(alertTestIds.description);

    expect(formErrorIcon).toBeVisible();
    expect(formErrorTitle).toHaveTextContent('shared:error');
    expect(formErrorDescription).toHaveTextContent(errorInString);
  });

  it('renders form error if there is an react hook form error object', () => {
    const reactHookFormErrors: ReactHookForm.FieldErrors = {
      username: { type: 'required', message: '' },
    };

    render(
      <Form errors={reactHookFormErrors}>
        <Input type="text" name="username" required />
      </Form>
    );

    const formError = screen.getByTestId(formTestIds.formError);

    expect(formError).toBeVisible();

    const formErrorIcon = within(formError).getByTestId(warningIconTestId);
    const formErrorTitle = within(formError).getByTestId(alertTestIds.title);
    const formErrorDescription = within(formError).getByTestId(alertTestIds.description);

    expect(formErrorIcon).toBeVisible();
    expect(formErrorTitle).toHaveTextContent('shared:error');
    expect(formErrorDescription).toHaveTextContent('Username shared:form_error.required');
  });
});
