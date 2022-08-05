import React from 'react';
import Helmet from 'react-helmet';

import logo from 'assets/images/logo.svg';

type AuthLayoutProps = {
  headerTitle: string;
  children?: React.ReactNode;
};

const AuthLayout = ({ headerTitle, children }: AuthLayoutProps) => {
  return (
    <>
      <Helmet>
        <body className="layout-auth"></body>
      </Helmet>
      <header className="app-header">
        <img src={logo} className="app-header__logo" alt="logo" />
        <p className="app-header__title">{headerTitle}</p>
      </header>
      <main>{children}</main>
    </>
  );
};

export default AuthLayout;
