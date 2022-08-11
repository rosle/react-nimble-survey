import task from '@cypress/code-coverage/task';
import { defineConfig } from 'cypress';

const collectCodeCoverage = (on, config) => {
  task(on, config);

  return config;
};

export default defineConfig({
  env: {
    'cypress-react-selector': {
      root: '#root',
    },
  },
  component: {
    setupNodeEvents: collectCodeCoverage,
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
    specPattern: 'src/**/*.cy.{ts,tsx}',
  },
  e2e: {
    setupNodeEvents: collectCodeCoverage,
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.ts',
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
});
