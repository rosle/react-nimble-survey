import path from 'path';

import webpack, { Configuration } from 'webpack';

const webpackConfig: Configuration = {
  mode: 'development',
  resolve: {
    extensions: ['.js', 'jsx', '.ts', '.tsx'],
    alias: {
      adapters: path.resolve(__dirname, '../../src/adapters/'),
      assets: path.resolve(__dirname, '../../src/assets/'),
      components: path.resolve(__dirname, '../../src/components/'),
      helpers: path.resolve(__dirname, '../../src/helpers/'),
      screens: path.resolve(__dirname, '../../src/screens/'),
      lib: path.resolve(__dirname, '../../src/lib/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/node_modules/],
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true, // skip typechecking for speed
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    // Fix "process is not defined" error:
    // Ref: https://stackoverflow.com/questions/41359504/webpack-bundle-js-uncaught-referenceerror-process-is-not-defined
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
};

// Patch webpackConfig.output so it returns a `publicPath`, even though output is overwritten in webpackPreprocessor
// Ref: https://github.com/cypress-io/cypress/issues/8900#issuecomment-866897397
// Ref: https://github.com/cypress-io/cypress/issues/18435
const publicPath = '';
let outputOptions = {};
Object.defineProperty(webpackConfig, 'output', {
  get: () => {
    return { ...outputOptions, publicPath };
  },
  set: function (x) {
    outputOptions = x;
  },
});

export default webpackConfig;
