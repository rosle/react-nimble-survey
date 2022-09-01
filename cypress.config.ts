import task from '@cypress/code-coverage/task';
import webpackPreprocessor from '@cypress/webpack-preprocessor';
import { defineConfig } from 'cypress';

import componentWebpackConfig from './cypress/support/component.webpack.config';
import e2eWebpackConfig from './cypress/support/e2e.webpack.config';

export default defineConfig({
  env: {
    'cypress-react-selector': {
      root: '#root',
    },
  },
  component: {
    setupNodeEvents: (on, config) => {
      task(on, config);

      return config;
    },
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
      // Need to instrument the application to collect code coverage.
      // More info: https://glebbahmutov.com/blog/component-code-coverage/
      webpackConfig: componentWebpackConfig,
    },
    specPattern: 'src/**/*.cy.{ts,tsx}',
  },
  e2e: {
    setupNodeEvents: (on, config) => {
      config.env = process.env;

      task(on, config);

      on(
        'file:preprocessor',
        webpackPreprocessor({
          webpackOptions: e2eWebpackConfig,
        })
      );

      return config;
    },
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.ts',
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
});
