import { themes } from '@storybook/theming';
import { withRouter } from 'storybook-addon-react-router-v6';

import '../src/assets/stylesheets/application.scss';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  backgrounds: {
    default: 'dark',
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  docs: {
    theme: themes.dark,
  },
};

export const decorators = [withRouter];
