import task from '@cypress/code-coverage/task';
import { defineConfig } from 'cypress';

const setupNodeEvents = (on, config) => {
  task(on, config);

  return config;
};

export default defineConfig({
  env: {
    'cypress-react-selector': {
      root: '#root',
    },
  },
  fixturesFolder: 'src/tests/fixtures',
  component: {
    setupNodeEvents: setupNodeEvents,
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
      // Need to instrument the application to collect code coverage.
      // More info: https://glebbahmutov.com/blog/component-code-coverage/
      webpackConfig: {
        mode: 'development',
        devtool: false,
        module: {
          rules: [
            {
              test: /\.(ts|tsx)$/,
              exclude: /node_modules/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
                  plugins: ['istanbul'],
                },
              },
            },
          ],
        },
      },
    },
    specPattern: 'src/**/*.cy.{ts,tsx}',
  },
  e2e: {
    setupNodeEvents: setupNodeEvents,
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.ts',
  },
  retries: {
    runMode: 2,
    openMode: 0,
  },
});
