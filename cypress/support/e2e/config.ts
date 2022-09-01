import task from '@cypress/code-coverage/task';
import webpackPreprocessor from '@cypress/webpack-preprocessor';

import webpackConfig from './webpack.config';

const config: Cypress.CoreConfigOptions = {
  setupNodeEvents: (on, config) => {
    config.env = process.env;

    task(on, config);

    on(
      'file:preprocessor',
      webpackPreprocessor({
        webpackOptions: webpackConfig,
      })
    );

    return config;
  },
  baseUrl: 'http://localhost:3000',
  specPattern: 'cypress/e2e/**/*.cy.ts',
};

export default config;
