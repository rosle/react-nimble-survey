import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { mount } from 'cypress/react18';

import { UserContextProvider } from 'contexts/UserContext';

type customMountWithRouterOptions = {
  withContextProvider?: boolean;
};

const renderChildren = (children: React.ReactNode, { withContextProvider = false }: customMountWithRouterOptions) => {
  return withContextProvider ? <UserContextProvider>{children}</UserContextProvider> : children;
};

const mountWithRouter = (
  children: React.ReactNode,
  { withContextProvider, ...mountOptions }: customMountWithRouterOptions = {}
) => {
  return mount(<BrowserRouter>{renderChildren(children, { withContextProvider })}</BrowserRouter>, mountOptions);
};

Cypress.Commands.add('mountWithRouter', mountWithRouter);
