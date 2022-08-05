import React from 'react';
import Helmet from 'react-helmet';

type DefaultLayoutProps = {
  children?: React.ReactNode;
};

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <>
      <Helmet>
        <body className="layout-default"></body>
      </Helmet>
      <main>{children}</main>
    </>
  );
};

export default DefaultLayout;
