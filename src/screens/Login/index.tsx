import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import AuthAdapter from 'adapters/Auth';
import Button from 'components/Button';
import Form from 'components/Form';
import Input from 'components/Input';
import AuthLayout from 'components/Layout/Auth';
import ApiError from 'lib/errors/ApiError';

export const loginScreenTestIds = {
  loginForm: 'login-form',
  loginEmail: 'login-form__input-email',
  loginPassWord: 'login-form__input-password',
  loginSubmit: 'login-form__button-submit',
};

const emailRegex = /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+.)+[^<>()[\].,;:\s@"]{2,})$/i;

const LoginScreen = () => {
  const { t } = useTranslation(['auth']);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // TODO: To be implemented on issue#6
  /* istanbul ignore next */
  const onSubmit = async () => {
    console.info('onFormSubmit');

    try {
      const response = await AuthAdapter.login({
        email: 'rossukhon@nimblehq.co',
        password: '12345',
      });

      console.log(response);
    } catch (error) {
      if (error instanceof ApiError) {
        console.log(`${error}`);
      } else {
        console.log('Something went wrong!');
      }
    }
  };

  return (
    <AuthLayout headerTitle={t('auth:heading.sign_in')}>
      <Form onSubmit={handleSubmit(onSubmit)} errors={errors} data-test-id={loginScreenTestIds.loginForm}>
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
        <Button type="submit" fullWidth data-test-id={loginScreenTestIds.loginSubmit}>
          {t('auth:action.sign_in')}
        </Button>
      </Form>
    </AuthLayout>
  );
};

export default LoginScreen;
