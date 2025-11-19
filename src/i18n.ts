
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import en from './locales/en/translation.json';
import fr from './locales/fr/translation.json';
import de from './locales/de/translation.json';
import it from './locales/it/translation.json';
import ru from './locales/ru/translation.json';

i18n
  .use(LanguageDetector) // Detects browser language
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      de: { translation: de },
      it: { translation: it },
      ru: { translation: ru },
    },
    fallbackLng: 'en', // Default if detection fails
    detection: {
      // Use URL path to detect language first
      order: ['path', 'navigator', 'htmlTag', 'localStorage', 'cookie'],
      lookupFromPathIndex: 0, // Looks at first segment of URL: /fr/page
      caches: ['localStorage', 'cookie'], // optional: persist selected language
    },
    interpolation: { escapeValue: false },
  });

export default i18n;
