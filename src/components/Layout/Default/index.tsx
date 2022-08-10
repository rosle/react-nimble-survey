import React from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

type DefaultLayoutProps = {
  children?: React.ReactNode;
};

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <HelmetProvider>
      <Helmet>
        <html className="layout-default"></html>
      </Helmet>
      <main>{children}</main>
    </HelmetProvider>
  );
};

export default DefaultLayout;
