import { Configuration } from 'webpack';

const webpackConfig: Configuration = {
  mode: 'development',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
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
};

export default webpackConfig;
