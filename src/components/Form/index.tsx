import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Alert from 'components/Alert';
import WarningIcon from 'components/Icon/Warning';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

const Form = ({ children }: FormProps) => {
  const { t } = useTranslation(['shared']);
  const [isError] = useState(false);

  const errorMessage = () => (
    <>
      <ul>
        <li>Email can&apos;t be blank</li>
        <li>Password can&apos;t be blank</li>
      </ul>
    </>
  );

  console.log(isError);

  return (
    <form className="form">
      {isError && (
        <div className="form__alert">
          <Alert Icon={WarningIcon} title={t('shared:error')}>
            {errorMessage()}
          </Alert>
        </div>
      )}
      {children}
    </form>
  );
};

export default Form;
