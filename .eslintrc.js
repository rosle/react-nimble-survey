module.exports = {
  extends: ['react-app', '@nimblehq/eslint-config-nimble-react', 'plugin:storybook/recommended'],
  ignorePatterns: ['!.storybook'],
  overrides: [
    {
      // Layout components using Helmet to modify html class.
      files: ['src/components/Layout/**/*'],
      rules: {
        'jsx-a11y/html-has-lang': 'off',
      },
    },
    {
      files: ['**/*.stories.*'],
      rules: {
        'import/no-anonymous-default-export': 'off',
      },
    },
  ],
};
