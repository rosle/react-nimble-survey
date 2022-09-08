module.exports = {
  extends: ['@nimblehq/stylelint-config-nimble'],
  rules: {
    'selector-class-pattern': [
      '^[a-z-_]+$',
      {
        resolveNestedSelectors: true,
      },
    ],
    'selector-max-compound-selectors': 4,
    'scss/at-extend-no-missing-placeholder': null,
  },
};
