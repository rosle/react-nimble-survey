import { ReactNode } from 'react';

import { mount } from 'cypress/react18';

import { Tokens } from 'types/tokens';
import { User } from 'types/user';

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      mountWithRouter: typeof mount;
      mountWithMemoryRouter(jsx: ReactNode, options: mountWithMemoryRouterProps): typeof Chainable;
      login(): typeof Chainable;
      login(user: Nullable<User>, tokens: Nullable<Tokens>): typeof Chainable;
    }
  }
}
