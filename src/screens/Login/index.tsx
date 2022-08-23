import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Button from 'components/Button';
import Form from 'components/Form';
import Input from 'components/Input';
import AuthLayout from 'components/Layout/Auth';

export const loginScreenTestIds = {
  loginForm: 'login-form',
  loginEmail: 'login-form__input-email',
  loginPassWord: 'login-form__input-password',
  loginSubmit: 'login-form__button-submit',
};

const LoginScreen = () => {
  const { t } = useTranslation(['auth']);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /* istanbul ignore next */
  const onSubmit = () => {
    // TODO: To be implemented on issue#6
    console.info('onFormSubmit');
  };

  return (
    <AuthLayout headerTitle={t('auth:heading.sign_in')}>
      <Form onSubmit={handleSubmit(onSubmit)} errors={errors} data-test-id={loginScreenTestIds.loginForm}>
        <Input
          type="email"
          label={t('auth:email')}
          {...register('email', { required: true })}
          data-test-id={loginScreenTestIds.loginEmail}
        />
        <Input
          type="password"
          label={t('auth:password')}
          {...register('password', { required: true })}
          data-test-id={loginScreenTestIds.loginPassWord}
        />
        <Button type="submit" fullWidth data-test-id={loginScreenTestIds.loginSubmit}>
          {t('auth:action.sign_in')}
        </Button>
      </Form>
    </AuthLayout>
  );
};

export default LoginScreen;
