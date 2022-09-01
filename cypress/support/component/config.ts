import task from '@cypress/code-coverage/task';

import webpackConfig from "./webpack.config";

const config: Cypress.ComponentConfigOptions = {
  setupNodeEvents: (on, config) => {
    task(on, config);

    return config;
  },
  devServer: {
    framework: 'create-react-app',
    bundler: 'webpack',
    // Need to instrument the application to collect code coverage.
    // More info: https://glebbahmutov.com/blog/component-code-coverage/
    webpackConfig: webpackConfig,
  },
  specPattern: 'src/**/*.cy.{ts,tsx}',
};

export default config;
