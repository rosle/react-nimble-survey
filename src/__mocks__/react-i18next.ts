const useMock = {
  t: (k: string, options?: Record<string, string>): string => {
    if (!options) return k;

    const values = Object.values(options);

    return `${k}|${values.join()}`;
  },
  i18n: {},
};

export const useTranslation = (): { t: (k: string) => string; i18n: Record<string, never> } => useMock;
