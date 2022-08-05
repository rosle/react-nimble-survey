import { TFuncKey } from 'react-i18next';

import auth from '../../public/locales/en/auth.json';
import common from '../../public/locales/en/common.json';

export type TranslationKey<N> = TFuncKey<N>;

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      auth: typeof auth;
    };
  }
}
