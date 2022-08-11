import '../../src/assets/stylesheets/application.scss';

import '@cypress/code-coverage/support';
import './commands';
import './configure-testing-library';
import './component-selector';

import { mount } from 'cypress/react';

Cypress.Commands.add('mount', mount);
