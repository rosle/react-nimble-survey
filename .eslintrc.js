module.exports = {
  extends: ['react-app', '@nimblehq/eslint-config-nimble-react', 'plugin:storybook/recommended'],
  ignorePatterns: ['!.storybook'],
  rules: {
    'react/prop-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
  },
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
    {
      // Turn off the error when using Chai assertions.
      files: ['**/*.cy.tsx'],
      rules: {
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
      },
    },
  ],
};
