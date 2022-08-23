import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Button from 'components/Button';
import Form from 'components/Form';
import Input from 'components/Input';
import AuthLayout from 'components/Layout/Auth';

export const loginScreenTestIds = {
  emailInput: 'input-email',
  passwordInput: 'input-password',
  submitButton: 'button-submit',
};

const LoginScreen = () => {
  const { t } = useTranslation(['auth']);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    // TODO: To be implemented on issue#6
    console.info('onFormSubmit');
  };

  return (
    <AuthLayout headerTitle={t('auth:heading.sign_in')}>
      <Form onSubmit={handleSubmit(onSubmit)} errors={errors}>
        <Input
          type="email"
          label={t('auth:email')}
          {...register('email', { required: true })}
          data-test-id={loginScreenTestIds.emailInput}
        />
        <Input
          type="password"
          label={t('auth:password')}
          {...register('password', { required: true })}
          data-test-id={loginScreenTestIds.passwordInput}
        />
        <Button type="submit" fullWidth data-test-id={loginScreenTestIds.submitButton}>
          {t('auth:action.sign_in')}
        </Button>
      </Form>
    </AuthLayout>
  );
};

export default LoginScreen;
