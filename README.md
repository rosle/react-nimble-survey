# React Nimble Survey

A Nimble Internal Certification project to learn and have fun with React 🚀


[![Netlify Status](https://api.netlify.com/api/v1/badges/410ea63b-c0fc-4184-a49f-0aa4018d1181/deploy-status)](https://app.netlify.com/sites/react-nimble-survey-staging/deploys) Staging: https://react-nimble-survey-staging.netlify.app/


[![Netlify Status](https://api.netlify.com/api/v1/badges/dc81fd86-3a45-4646-93cc-b1a3870433a0/deploy-status)](https://app.netlify.com/sites/react-nimble-survey/deploys) Production: https://react-nimble-survey.netlify.app/

*📝 This project was bootstrapped with [Nimble React template](https://github.com/nimblehq/react-templates).*

## Usage

Clone the repository

`git clone https://github.com/rosle/react-nimble-survey`

## Available Scripts

In the project directory, you can run:

`npm start`: Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

`npm test`: Launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

`npm run test:coverage`: Both Unit Tests (Jest) and UI Tests (cypress) generate test coverage analytics. The below command runs all tests and merges both coverage files into a single report.

> Use the `.nyc_output/out.json` artefact in your CI/CD pipeline to reuse the code coverage data.

`npm run build`: Builds the app for production to the `build` folder. It correctly bundles React in production mode and
optimizes the build for the best performance. The build is minified and the filenames include the hashes. Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

`npm run eject`: If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This
command will remove the single build dependency from your project. Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them.
All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them.

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

`npm run lint`: Run ESLint in the project.

`npm run lint:fix`: Fix auto-correctable ESLint errors in the project.

`npm run stylelint`: Run Stylelint in the project.

`npm run stylelint:fix`: Fix auto-correctable Stylelint errors in the project.

`npm run codebase:lint`: Run ESLint and Stylelint together in the project.

`npm run codebase:fix`: Fix auto-correctable ESLint and Stylelint errors together in the project.

`npm run cypress:run`: Runs Cypress tests to completion. By default, cypress run will run all tests headlessly in the Electron browser. [Check options](https://docs.cypress.io/guides/guides/command-line#cypress-run)

`npm run cypress:open`: Opens the Cypress Test Runner. [Check options](https://docs.cypress.io/guides/guides/command-line#cypress-open)

## Localization

This project uses the [react-i18next](https://react.i18next.com/) package to handle the project locales.

To add a new language

- Add the new language bigram to the `supportedLanguages` array in `src/i18n.ts` — use this array to list all available languages in a 'change language' component
- Add the new translation file in `public/locales/{lang_bigram}/translation.json`

To change the default fallback language

- Either edit the value of the environment variable `REACT_APP_DEFAULT_LANGUAGE` (cf. the `env.example` file)
- Either directly edit the const `DEFAULT_FALLBACK_LANGUAGE` in `src/i18n.ts`

## Deployment

### GitHub Actions for Netlify

The `.github/workflows` folder already includes GitHub Actions to deploy previews and releases of your app in Netlify.

How to use it?

1. Create a new empty application in Netlify (use Drag&Drop and drop their demo project)
2. Configure the following action secrets in the Github repository:
  - `NETLIFY_SITE_ID` available in the `Site settings` tab.
  - `NETLIFY_AUTH_TOKEN`: created under `User settings, Applications, Personal access tokens`
3. Push your code to the repository.

Any push under `main` or `master` triggers a release in production.
Any push under another branch triggers a preview deployment.
Once a preview is deployed, the Preview URL is displayed in the Pull Request thread.

## License

This project is Copyright (c) 2014 and onwards Nimble. It is free software and may be redistributed under the terms specified in the [LICENSE] file.

[LICENSE]: /LICENSE

## About

<a href="https://nimblehq.co/">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://assets.nimblehq.co/logo/dark/logo-dark-text-160.png">
    <img alt="Nimble logo" src="https://assets.nimblehq.co/logo/light/logo-light-text-160.png">
  </picture>
</a>

This project is maintained and funded by Nimble.

We ❤️ open source and do our part in sharing our work with the community!
See [our other projects][community] or [hire our team][hire] to help build your product.

Want to join? [Check out our Jobs][jobs]!

[community]: https://github.com/nimblehq
[hire]: https://nimblehq.co/
[jobs]: https://jobs.nimblehq.co/
