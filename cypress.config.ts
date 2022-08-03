import task from '@cypress/code-coverage/task';
import { defineConfig } from 'cypress';

export default defineConfig({
  env: {
    'cypress-react-selector': {
      root: '#root',
    },
  },
  e2e: {
    setupNodeEvents(on, config) {
      task(on, config);

      return config;
    },
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.spec.ts',
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
});
