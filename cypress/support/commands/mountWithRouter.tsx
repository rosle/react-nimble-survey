import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { mount } from 'cypress/react18';

const mountWithRouter = (component, mountOptions = {}) => {
  return mount(<BrowserRouter>{component}</BrowserRouter>, mountOptions);
};

Cypress.Commands.add('mountWithRouter', mountWithRouter);
