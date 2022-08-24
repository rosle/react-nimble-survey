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

  describe('given there are no form errors', () => {
    it('does NOT render form error', () => {
      cy.mount(
        <Form>
          <Input type="text" name="username" required />
        </Form>
      );

      cy.findByTestId(formTestIds.formError).should('not.exist');
    });
  });

  describe('given there are form errors', () => {
    describe('given an error string', () => {
      it('renders the given error string as an error message', () => {
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
    });

    describe('given a React Hook Form error object', () => {
      it('renders error messages from the given error object', () => {
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
          cy.findByTestId(alertTestIds.description).should('have.text', 'Username shared:form_error.required');
        });
      });
    });
  });
});
