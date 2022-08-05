import React from 'react';

import logo from 'assets/images/logo.svg';

type AuthLayoutProps = {
  headerTitle: string;
  children?: React.ReactNode;
};

const AuthLayout = ({ headerTitle, children }: AuthLayoutProps) => {
  return (
    <>
      <header className="app-header">
        <img src={logo} className="app-header__logo" alt="logo" />
        <p className="app-header__title">{headerTitle}</p>
      </header>
      <main>{children}</main>
    </>
  );
};

export default AuthLayout;
