import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Импортируйте ваши переводы или укажите их здесь
import translationEN from './locales/en.json';
import translationRU from './locales/ru.json';
import translationUZ from './locales/uz.json';

const resources = {
  en: { translation: translationEN },
  ru: { translation: translationRU },
  uz: { translation: translationUZ },
};

i18n
  .use(initReactI18next) // <--- Обязательно подключаем плагин
  .init({
    resources,
    lng: 'ru', // Язык по умолчанию
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;