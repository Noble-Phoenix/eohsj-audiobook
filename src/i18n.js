import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend) // loads translations from /public/locales
  .use(LanguageDetector) // detects user language
  .use(initReactI18next) // passes i18n instance to react-i18next
  .init({
    // List of supported languages and the default fallback
    supportedLngs: ['en', 'fr'],
    fallbackLng: 'en', 

    // Configuration for the HttpBackend plugin
    backend: {
        loadPath: '/locales/{{lng}}/translation.json',
    },

    // Detection order (detect from querystring, cookie, localStorage, then browser)
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator'],
      caches: ['localStorage', 'cookie'],
    },
    
    // Core i18n settings
    debug: false, // Set to true to see helpful logs in development
    interpolation: {
      escapeValue: false, // React already prevents XSS
    },
  });

export default i18n;