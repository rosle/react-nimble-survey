module.exports = {
  extends: ['@nimblehq/stylelint-config-nimble'],
  rules: {
    'selector-class-pattern': [
      '^[a-z-_]+$',
      {
        'resolveNestedSelectors': true
      }
    ]
  }
};
