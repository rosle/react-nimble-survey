import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { isEmpty } from 'lodash';

import AuthAdapter from 'adapters/Auth';
import Button from 'components/Button';
import Form from 'components/Form';
import Input from 'components/Input';
import AuthLayout from 'components/Layout/Auth';
import useLocalStorage, { STORAGE_KEYS } from 'hooks/useLocalStorage';
import ApiError from 'lib/errors/ApiError';
import { Tokens } from 'types/data';

type LoginInput = {
  email: string;
  password: string;
};

export const loginScreenTestIds = {
  loginForm: 'login-form',
  loginEmail: 'login-form__input-email',
  loginPassWord: 'login-form__input-password',
  loginSubmit: 'login-form__button-submit',
};

const emailRegex = /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i;

const LoginScreen = () => {
  const { t } = useTranslation(['auth', 'shared']);
  const navigate = useNavigate();
  const [formSubmissionErrors, setFormSubmissionErrors] = useState<string>('');
  const [tokens, setTokens] = useLocalStorage(STORAGE_KEYS.tokens);

  const {
    formState: { isSubmitting, errors: formValidationErrors },
    handleSubmit,
    register,
  } = useForm<LoginInput>();

  const onSubmit: SubmitHandler<LoginInput> = async ({ email, password }) => {
    setFormSubmissionErrors('');

    try {
      const response = await AuthAdapter.login({ email, password });

      const tokensResponse: Tokens = response.data.attributes;
      setTokens(tokensResponse);
    } catch (error) {
      if (error instanceof ApiError) {
        setFormSubmissionErrors(error.toString());
      } else {
        setFormSubmissionErrors(t('shared:generic_error'));
      }
    }
  };

  useEffect(() => {
    if (!isEmpty(tokens)) {
      navigate('/');
    }
  }, [navigate, tokens]);

  return (
    <AuthLayout headerTitle={t('auth:heading.sign_in')}>
      <Form
        onSubmit={handleSubmit(onSubmit)}
        errors={formSubmissionErrors || formValidationErrors}
        data-test-id={loginScreenTestIds.loginForm}
      >
        <Input
          type="email"
          label={t('auth:email')}
          {...register('email', {
            required: true,
            pattern: emailRegex,
          })}
          data-test-id={loginScreenTestIds.loginEmail}
        />
        <Input
          type="password"
          label={t('auth:password')}
          {...register('password', { required: true })}
          data-test-id={loginScreenTestIds.loginPassWord}
        />
        <Button type="submit" fullWidth data-test-id={loginScreenTestIds.loginSubmit} disabled={isSubmitting}>
          {t('auth:action.sign_in')}
        </Button>
      </Form>
    </AuthLayout>
  );
};

export default LoginScreen;
