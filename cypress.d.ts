import { mount } from 'cypress/react18';

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      mountWithRouter: typeof mount;
      login(email: string, password: string): typeof Chainable;
    }
  }
}
