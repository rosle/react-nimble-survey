import { TFuncKey } from 'react-i18next';

import common from '../../public/locales/en/common.json';
import auth from '../../public/locales/en/auth.json';

export type TranslationKey<N> = TFuncKey<N>;

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common,
      auth: typeof auth
    };
  }
}
