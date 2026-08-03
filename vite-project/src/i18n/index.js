import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import ru from './locales/ru.json';
import uz from './locales/uz.json';

i18n
  .use(LanguageDetector) // Автоопределение языка браузера
  .use(initReactI18next) // Передача инстанса i18n в react-i18next
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      uz: { translation: uz },
    },
    fallbackLng: 'en', // Если язык не найден, используем английский
    interpolation: {
      escapeValue: false, // React уже экранирует значения от XSS
    },
  });

export default i18n;