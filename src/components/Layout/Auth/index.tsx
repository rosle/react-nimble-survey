import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

import logo from 'assets/images/logo.svg';

type AuthLayoutProps = {
  headerTitle: string;
  children?: React.ReactNode;
};

const AuthLayout = ({ headerTitle, children }: AuthLayoutProps) => {
  return (
    <HelmetProvider>
      <Helmet>
        <html className="layout-auth"></html>
      </Helmet>
      <main>
        <header className="app-header">
          <img src={logo} className="app-header__logo" alt="logo" />
          <p className="app-header__title">{headerTitle}</p>
        </header>
        <div className="app-content">{children}</div>
      </main>
    </HelmetProvider>
  );
};

export default AuthLayout;
