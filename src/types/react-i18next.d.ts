import { TFuncKey } from 'react-i18next';

import auth from '../../public/locales/en/auth.json';
import shared from '../../public/locales/en/shared.json';

export type TranslationKey<N> = TFuncKey<N>;

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'shared';
    resources: {
      shared: typeof shared;
      auth: typeof auth;
    };
  }
}
