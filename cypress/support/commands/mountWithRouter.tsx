import React from 'react';
import { BrowserRouter, MemoryRouter, MemoryRouterProps, Route, Routes } from 'react-router-dom';

import { mount } from 'cypress/react18';

import { UserContextProvider } from 'contexts/UserContext';

type customMountWithRouterOptions = {
  withContextProvider?: boolean;
};

type mountWithMemoryRouterProps = customMountWithRouterOptions &
  MemoryRouterProps & {
    routePath?: string;
  };

const renderChildren = (children: React.ReactNode, { withContextProvider = false }: customMountWithRouterOptions) => {
  return withContextProvider ? <UserContextProvider>{children}</UserContextProvider> : children;
};

const mountWithRouter = (children: React.ReactNode, { withContextProvider }: customMountWithRouterOptions = {}) => {
  return mount(<BrowserRouter>{renderChildren(children, { withContextProvider })}</BrowserRouter>);
};

const mountWithMemoryRouter = (
  children: React.ReactNode,
  { withContextProvider, routePath, ...memoryRouterProps }: mountWithMemoryRouterProps = {}
) => {
  return mount(
    <MemoryRouter {...memoryRouterProps}>
      <Routes>
        <Route path={routePath} element={renderChildren(children, { withContextProvider })} />
      </Routes>
    </MemoryRouter>
  );
};

Cypress.Commands.add('mountWithRouter', mountWithRouter);
Cypress.Commands.add('mountWithMemoryRouter', mountWithMemoryRouter);
