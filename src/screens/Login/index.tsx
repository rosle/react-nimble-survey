import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Button from 'components/Button';
import Form from 'components/Form';
import Input from 'components/Input';
import AuthLayout from 'components/Layout/Auth';

const LoginScreen = () => {
  const { t } = useTranslation(['auth']);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    // TODO: To be implemented on #6
    console.info('onFormSubmit');
  };

  return (
    <AuthLayout headerTitle={t('auth:heading.sign_in')}>
      <Form onSubmit={handleSubmit(onSubmit)} errors={errors}>
        <Input type="email" label={t('auth:email')} {...register('email', { required: true })} />
        <Input type="password" label={t('auth:password')} {...register('password', { required: true })} />
        <Button type="submit" fullWidth>
          {t('auth:action.sign_in')}
        </Button>
      </Form>
    </AuthLayout>
  );
};

export default LoginScreen;
