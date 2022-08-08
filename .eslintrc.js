module.exports = {
  extends: ['@nimblehq/eslint-config-nimble-react'],
  overrides: [
    {
      // Layout components using Helmet to modify html class.
      files: ["src/components/Layout/**/*"],
      rules: {
        "jsx-a11y/html-has-lang": "off"
      }
    }
  ]
};
