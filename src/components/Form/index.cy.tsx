import React from 'react';
import ReactHookForm from 'react-hook-form';

import { alertTestIds } from 'components/Alert';
import { warningIconTestId } from 'components/Icon/Warning';
import Input, { inputTestIds } from 'components/Input';

import Form, { formTestIds } from '.';

describe('Form', () => {
  it('renders form children', () => {
    cy.mount(
      <Form>
        <Input type="text" name="username" required />
      </Form>
    );

    cy.findByTestId(formTestIds.form).should('be.visible');

    cy.findByTestId(formTestIds.form).within(() => {
      cy.findByTestId(inputTestIds.input).should('be.visible');
    });
  });

  it('does NOT render form error if there are no form errors', () => {
    cy.mount(
      <Form>
        <Input type="text" name="username" required />
      </Form>
    );

    cy.findByTestId(formTestIds.formError).should('not.exist');
  });

  it('renders form error if there is an error string', () => {
    const errorInString = 'Something went wrong!';

    cy.mount(
      <Form errors={errorInString}>
        <Input type="text" name="username" required />
      </Form>
    );

    cy.findByTestId(formTestIds.formError).should('be.visible');

    cy.findByTestId(formTestIds.form).within(() => {
      cy.findByTestId(warningIconTestId).should('be.visible');
      cy.findByTestId(alertTestIds.title).should('have.text', 'shared:error');
      cy.findByTestId(alertTestIds.description).should('have.text', errorInString);
    });
  });

  it('renders form error if there is an react hook form error object', () => {
    const reactHookFormErrors: ReactHookForm.FieldErrors = {
      username: { type: 'required', message: '' },
    };

    cy.mount(
      <Form errors={reactHookFormErrors}>
        <Input type="text" name="username" required />
      </Form>
    );

    cy.findByTestId(formTestIds.formError).should('be.visible');

    cy.findByTestId(formTestIds.form).within(() => {
      cy.findByTestId(warningIconTestId).should('be.visible');
      cy.findByTestId(alertTestIds.title).should('have.text', 'shared:error');
      cy.findByTestId(alertTestIds.description).should('have.text', 'username shared:form_error.required');
    });
  });
});
