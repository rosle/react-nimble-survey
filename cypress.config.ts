import { defineConfig } from 'cypress';

import componentConfig from './cypress/support/component/config';
import e2eConfig from './cypress/support/e2e/config';

export default defineConfig({
  env: {
    'cypress-react-selector': {
      root: '#root',
    },
  },
  component: componentConfig,
  e2e: e2eConfig,
  retries: {
    runMode: 2,
    openMode: 0,
  },
});
