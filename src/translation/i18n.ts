import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './en.json';
import ru from './ru.json';

const resources = {
  en: { translations: en },
  ru: { translations: ru },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ru',
  ns: ['translations'],
  defaultNS: 'translations',

  keySeparator: false,

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
