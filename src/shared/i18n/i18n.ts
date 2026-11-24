import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

const FALLBACK_LANGUAGE = 'en';

i18n.on('languageChanged', () => {
  document.documentElement.lang = i18n.resolvedLanguage ?? FALLBACK_LANGUAGE;
});

export function startI18n() {
  return i18n
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
      lng: navigator.language,
      fallbackLng: FALLBACK_LANGUAGE,
      load: 'languageOnly',
      ns: ['common'],
      defaultNS: 'common',
      backend: { loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.json` },
      // React escapes the values itself.
      interpolation: { escapeValue: false },
    });
}
