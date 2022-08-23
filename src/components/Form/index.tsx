import React from 'react';
import ReactHookForm from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import _ from 'lodash';

import Alert from 'components/Alert';
import WarningIcon from 'components/Icon/Warning';

export const formTestIds = {
  form: 'form',
  formError: 'form-error',
};

type FormErrors = string | ReactHookForm.FieldErrors;
type FieldErrorType = 'required' | 'pattern';
type FieldError = { type: FieldErrorType };

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
  errors?: FormErrors;
}

const Form = ({ children, errors, ...formAttributes }: FormProps) => {
  const { t } = useTranslation(['shared']);

  const errorMessage = (formErrors: FormErrors): React.ReactNode => {
    if (typeof formErrors === 'string') return formErrors;

    const errorList = _.chain(formErrors)
      .mapValues(({ type: fieldErrorType }: FieldError, key) => (
        <li key={key}>{`${_.capitalize(key)} ${t(`shared:form_error.${fieldErrorType}`)}`}</li>
      ))
      .values()
      .value();

    return <ul>{errorList}</ul>;
  };

  return (
    <form className="form" data-test-id={formTestIds.form} {...formAttributes}>
      {errors && !_.isEmpty(errors) && (
        <div className="form__error" data-test-id={formTestIds.formError}>
          <Alert Icon={WarningIcon} title={t('shared:error')}>
            {errorMessage(errors)}
          </Alert>
        </div>
      )}
      {children}
    </form>
  );
};

export default Form;
